"use client";
import { useState } from "react";
import Dropdown from "@/components/Input/Dropdown";
import Grid from "@/components/Grid";
import Box from "@/components/Box";
import Button from "@/components/Button";

export default function ControlPage() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  };

  return (
    <Grid>
      {/* Valve control Header */}
      <div className="col-span-7 row-1 text-3xl font-bold">Valve Control</div>
      {/* Control all valves */}
      <div className="col-span-5 row-1 flex justify-end items-center gap-4">
        {/* Turn all valves on button */}
        <Button className="bg-(--mtr-color-button-on)! flex items-center gap-2">
          <img
            src="/Turn-all-on.svg"
            alt="Turn all valves on"
            className="w-[18px] h-[18px]"
          />
          Turn On All Valves
        </Button>
        {/* Turn all valves off button */}
        <Button className="bg-(--mtr-color-button-off)! flex items-center gap-2">
          <img
            src="/Turn-all-off.svg"
            alt="Turn all valves off"
            className="w-[18px] h-[18px]"
          />
          Turn Off All Valves
        </Button>
      </div>
      {/* Map */}
      <Box className="col-span-7 row-2"></Box>
      {/* Control panel */}
      <Box className="col-span-5 row-2">
        <div className="m-6 flex flex-col">
          {/* Valve list content */}
          <div className="text-xl font-bold mb-3">Valve List</div>
          {/* Valve list */}
          <div className="w-full flex flex-col gap-4 overflow-y-scroll h-[400px]">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[60px] bg-gray-200 rounded shadow"
              ></div>
            ))}
          </div>
        </div>
      </Box>
      {/* Time schedule header */}
      <div className="col-span-12 row-3 text-2xl font-bold">
        Time Schedule Valve
      </div>
      {/* Time schedule setting */}
      <Box className="col-span-5 row-4">
        <div className="mx-15 my-6">
          {/* Time schedule setting header */}
          <div className="text-xl font-bold mb-3">New Schedule</div>
          {/* Time schedule setting content */}
          <div className="w-full flex flex-col gap-4">
            {/* Dropdown for selecting valve */}
            <div>
              <label className="block mb-2">Select Valve:</label>
              <Dropdown
                lists={["Node A", "Node B", "Node C", "Gateway 1"]}
                value={selectedNodes}
                onChange={setSelectedNodes}
                placeholder="Select Node"
                className="w-full"
              />
            </div>
            {/* Time selection */}
            <div className="flex items-center gap-10">
              {/* Time on */}
              <div>
                <label className="block mb-2">Select Time On:</label>
                <input
                  type="time"
                  className="w-40 px-3 py-2 border border-(--mtr-gray) rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              {/* Time off */}
              <div>
                <label className="block mb-2">Select Time Off:</label>
                <input
                  type="time"
                  className="w-40 px-3 py-2 border border-(--mtr-gray) rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            {/* Repeat weekly selection */}
            <div>
              <label className="block mb-2">Repeat weekly on:</label>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-2 py-2 border border-(--mtr-gray) rounded-md cursor-pointer transition-colors ${isSelected ? "bg-(--mtr-blue) text-white border-(--mtr-blue)" : "bg-white text-gray-700 hover:bg-slate-100"}`}
                      >
                        {day}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
            {/* Add schedule button */}
            <div className="w-full flex justify-center">
              <Button className="mt-6 bg-(--mtr-blue)!">Add Schedule</Button>
            </div>
          </div>
        </div>
      </Box>
      {/* Time schedule list */}
      <Box className="col-span-7 row-4">
        <div className="m-6">
          <div className="w-full flex flex-col">
            <div className="text-xl font-bold mb-3">Schedule List</div>
          </div>
          <div className="w-full flex flex-col gap-2 overflow-y-scroll h-[400px]">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[60px] bg-gray-200 rounded shadow mb-4"
              ></div>
            ))}
          </div>
        </div>
      </Box>
    </Grid>
  );
}
