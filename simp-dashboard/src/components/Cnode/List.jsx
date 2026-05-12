import Image from "next/image";

export default function CnodeList({ data = {}, onClick }) {
  const statusConfig = {
    true: {
      label: "ON",
      textClass: "text-green-500",
      bgClass: "bg-green-200 hover:bg-green-300",
      icon: "/Valve-on.svg",
    },
    false: {
      label: "OFF",
      textClass: "text-gray-500",
      bgClass: "bg-gray-200 hover:bg-gray-300",
      icon: "/Valve-off.svg",
    },
    error: {
      label: "ERROR",
      textClass: "text-red-500",
      bgClass: "bg-gray-200 hover:bg-gray-300",
      icon: "/Valve-off.svg",
    },
  };

  // Resolve current status state
  const stateKey = data.control_status === null || data.control_status === undefined 
    ? "error" 
    : String(data.control_status);
  
  const current = statusConfig[stateKey];

  return (
    <div className="border-2 border-gray-200 rounded-lg px-[20px] py-[10px] flex justify-between">
      <div>
        <div className="flex items-center gap-2 text-[22px]">
          <span className="font-bold">{data.name || "Value 1"}</span>
          <span>({data.online !== false ? "Online" : "Offline"})</span>
        </div>
        <div className="flex items-center gap-2 text-[20px]">
          <span>Status:</span>
          <span className={current.textClass}>
            {current.label}
          </span>
        </div>
      </div>
      <button
        className={`rounded-lg p-[10px] ${current.bgClass} aspect-square flex items-center justify-center cursor-pointer`}
        onClick={onClick}
      >
        <Image
          src={current.icon}
          alt={`Valve status ${current.label}`}
          width={32}
          height={17}
          style={{ height: "auto" }}
          className="object-contain"
        />
      </button>
    </div>
  );
}
