"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ESPLoader, Transport } from "esptool-js";

export default function ConfigPage() {
  const [port, setPort] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [baudRate, setBaudRate] = useState(115200);
  const [logs, setLogs] = useState([]);
  const [chipName, setChipName] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [serialInput, setSerialInput] = useState("");
  
  const terminalRef = useRef(null);
  const transportRef = useRef(null);
  const esploaderRef = useRef(null);
  const readerRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Check for Web Serial support
  useEffect(() => {
    if (!navigator.serial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(false);
    }
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    // Handle both string and raw byte objects if they come through
    const msgString = typeof message === "string" ? message : JSON.stringify(message);
    setLogs((prev) => [...prev, { timestamp, message: msgString, type }]);
  };

  const cleanLogs = () => setLogs([]);

  const terminal = {
    clean: () => cleanLogs(),
    writeLine: (data) => addLog(data),
    write: (data) => addLog(data),
  };

  const stopMonitoring = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
      } catch (e) {}
      readerRef.current = null;
    }
    setIsMonitoring(false);
    addLog("Serial monitor stopped.", "info");
  };

  const startMonitoring = async (devicePort = port) => {
    if (!devicePort) return;
    
    try {
      if (devicePort.opened) {
        // Port might be open from previous step
      } else {
        await devicePort.open({ baudRate });
      }
      
      setIsMonitoring(true);
      setIsConnected(true);
      addLog("Serial monitor started. Listening for data...", "success");
      
      const decoder = new TextDecoder();
      abortControllerRef.current = new AbortController();
      
      while (devicePort.readable && !abortControllerRef.current.signal.aborted) {
        const reader = devicePort.readable.getReader();
        readerRef.current = reader;
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const text = decoder.decode(value);
            // Append to log without line breaks if possible for raw feel, 
            // but our log system handles lines.
            addLog(text, "default");
          }
        } catch (error) {
          console.error("Read error:", error);
          if (!abortControllerRef.current.signal.aborted) {
            addLog(`Read error: ${error.message}`, "error");
          }
        } finally {
          reader.releaseLock();
        }
        if (abortControllerRef.current.signal.aborted) break;
      }
    } catch (error) {
      console.error(error);
      addLog(`Monitor failed: ${error.message}`, "error");
      setIsMonitoring(false);
    }
  };

  const handleConnect = async () => {
    try {
      await stopMonitoring();
      
      addLog("Requesting serial port...", "info");
      const device = await navigator.serial.requestPort();
      setPort(device);
      
      const transport = new Transport(device, true);
      transportRef.current = transport;

      const loader = new ESPLoader({
        transport: transport,
        baudrate: baudRate,
        terminal: terminal,
      });
      esploaderRef.current = loader;

      addLog("Connecting to ESP32 device...", "info");
      const chip = await loader.main();
      setChipName(chip);
      setIsConnected(true);
      addLog(`Connected to ${chip}`, "success");
    } catch (error) {
      console.error(error);
      addLog(`Connection failed: ${error.message}`, "error");
    }
  };

  const handleDisconnect = async () => {
    try {
      await stopMonitoring();
      if (transportRef.current) {
        await transportRef.current.disconnect();
      }
      if (port && port.opened) {
        await port.close();
      }
      setPort(null);
      setIsConnected(false);
      setChipName("");
      addLog("Disconnected from device", "info");
    } catch (error) {
      addLog(`Disconnect failed: ${error.message}`, "error");
    }
  };

  const handleFlash = async () => {
    if (!isConnected || !esploaderRef.current) return;

    try {
      setIsFlashing(true);
      setProgress(0);
      addLog("Fetching firmware.bin...", "info");
      
      const response = await fetch("/firmware.bin");
      if (!response.ok) throw new Error("Failed to fetch firmware file from server.");
      
      const arrayBuffer = await response.arrayBuffer();
      const binaryData = new Uint8Array(arrayBuffer);
      
      addLog(`Firmware loaded: ${binaryData.length} bytes`, "info");
      addLog("Starting flash process...", "info");

      const flashOptions = {
        fileArray: [{ data: binaryData, address: 0x0 }],
        flashSize: "keep",
        flashMode: "keep",
        flashFreq: "keep",
        eraseAll: false,
        compress: true,
        reportProgress: (fileIndex, written, total) => {
          const percent = Math.round((written / total) * 100);
          setProgress(percent);
        },
      };

      await esploaderRef.current.writeFlash(flashOptions);
      
      addLog("Flash completed successfully!", "success");
      addLog("Performing custom reset sequence...", "info");
      
      // Custom reset sequence to trigger app boot on USB-JTAG
      const CUSTOM_RESET_SEQUENCE = "D1|R0|W100|D0|R1|W100|D1|R1|W100|D0|R0";
      await esploaderRef.current.after("custom_reset", false, CUSTOM_RESET_SEQUENCE);
      
      addLog("Device reset triggered. Waiting 2 seconds for boot...", "info");
      
      // Disconnect current transport to free the port
      if (transportRef.current) {
        await transportRef.current.disconnect();
      }

      // Wait 2 seconds as requested
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addLog("Attempting auto-reconnect to Monitor...", "info");
      
      // Try to re-connect using the same port object
      // If the port object is gone (USB detached), we might need to find it again
      let activePort = port;
      try {
        if (!activePort || !activePort.connected) {
          const ports = await navigator.serial.getPorts();
          // Find the one with ESP32-H2 JTAG VID/PID
          activePort = ports.find(p => {
             const info = p.getInfo();
             return info.usbVendorId === 0x303a && info.usbProductId === 0x1001;
          }) || activePort;
          setPort(activePort);
        }
        
        if (activePort) {
          startMonitoring(activePort);
        } else {
          addLog("Auto-reconnect failed: Device port not found.", "error");
        }
      } catch (reconnectErr) {
        addLog(`Auto-reconnect failed: ${reconnectErr.message}`, "error");
      }

    } catch (error) {
      console.error(error);
      addLog(`Flash failed: ${error.message}`, "error");
    } finally {
      setIsFlashing(false);
    }
  };

  const sendSerialCommand = async (e) => {
    e?.preventDefault();
    if (!port || !port.writable || !serialInput) return;
    
    try {
      const encoder = new TextEncoder();
      const writer = port.writable.getWriter();
      // Add newline if desired, or send raw
      await writer.write(encoder.encode(serialInput + "\n"));
      writer.releaseLock();
      addLog(`> ${serialInput}`, "success");
      setSerialInput("");
    } catch (error) {
      addLog(`Send failed: ${error.message}`, "error");
    }
  };

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-900 text-center">
          <div className="text-red-500 mb-4 text-5xl">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Web Serial Not Supported</h1>
          <p className="mb-6 opacity-80">
            Your browser does not support the Web Serial API. Please use 
            <strong> Google Chrome</strong>, <strong>Microsoft Edge</strong>, or 
            <strong> Opera</strong> on a desktop computer.
          </p>
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Firmware Control
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Upload firmware & Monitor Serial for ESP32H2
            </p>
          </div>
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition flex items-center gap-1 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back Home
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Connection Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                    Baud Rate
                  </label>
                  <select 
                    value={baudRate}
                    onChange={(e) => setBaudRate(parseInt(e.target.value))}
                    disabled={isConnected && !isMonitoring}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
                  >
                    <option value={9600}>9600 bps</option>
                    <option value={115200}>115200 bps</option>
                    <option value={230400}>230400 bps</option>
                    <option value={460800}>460800 bps</option>
                    <option value={921600}>921600 bps</option>
                  </select>
                </div>

                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Connect Device
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleDisconnect}
                      className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-gray-600 dark:text-gray-300 font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-1 text-sm"
                    >
                      Disconnect
                    </button>
                    {!isMonitoring && !isFlashing && (
                       <button
                       onClick={() => startMonitoring()}
                       className="flex-1 py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all active:scale-95 text-sm"
                     >
                       Monitor
                     </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Flash Firmware
              </h2>
              
              <div className="space-y-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-bold ${isConnected ? "text-green-500" : "text-gray-400"}`}>
                    {isMonitoring ? "Monitoring" : isConnected ? `Ready (${chipName})` : "Disconnected"}
                  </span>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold inline-block text-blue-600">
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                    ></div>
                  </div>
                </div>

                <button
                  disabled={!isConnected || isFlashing}
                  onClick={handleFlash}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100"
                >
                  {isFlashing ? "FLASHING..." : "UPLOAD FIRMWARE"}
                </button>
              </div>
            </div>

            {/* Parameter Editor Section */}
            {isMonitoring && (
               <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Parameter Editor
                </h2>
                <form onSubmit={sendSerialCommand} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Serial Command
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={serialInput}
                        onChange={(e) => setSerialInput(e.target.value)}
                        placeholder="e.g. SET_PARAM 10"
                        className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-bold"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Type commands above to interact with your firmware parameters via serial.
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* Console Section */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-1 min-h-[500px] flex flex-col bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
              <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-2 text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    {isMonitoring ? "Raw Serial Monitor" : "ESPLoader Console"}
                    {isMonitoring && <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>}
                  </span>
                </div>
                <button 
                  onClick={cleanLogs}
                  className="text-[10px] uppercase font-bold text-gray-500 hover:text-white transition"
                >
                  Clear Logs
                </button>
              </div>
              
              <div 
                ref={terminalRef}
                className="flex-1 p-6 font-mono text-sm overflow-y-auto scroll-smooth custom-scrollbar"
              >
                {logs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-600 animate-pulse">
                    Waiting for activity...
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="mb-1.5 flex gap-3 group">
                      <span className="text-gray-600 select-none opacity-50 text-[10px] w-14 shrink-0 pt-1">
                        {log.timestamp}
                      </span>
                      <span className={`
                        ${log.type === "error" ? "text-red-400" : ""}
                        ${log.type === "success" ? "text-green-400" : ""}
                        ${log.type === "info" ? "text-blue-400" : ""}
                        ${!log.type || log.type === "default" ? "text-gray-300" : ""}
                        break-all leading-relaxed
                      `}>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
}
