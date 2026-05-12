import Image from "next/image";

export default function CnodeSchedule() {
  const statusConfig = {
    true: {
      label: "ON",
      textClass: "text-green-500",
      bgClass: "bg-green-200 hover:bg-green-300",
      icon: "/Schedule_on.svg",
    },
    false: {
      label: "OFF",
      textClass: "text-gray-500",
      bgClass: "bg-gray-200 hover:bg-gray-300",
      icon: "/Schedule_off.svg",
    },
  };
  return (
    <div className="border-2 border-gray-200 rounded-lg px-[20px] py-[10px] flex justify-between">
      <div className="flex gap-5">
        <button className={`rounded-lg p-[10px] ${statusConfig.true.bgClass} aspect-square flex items-center justify-center cursor-pointer`}>
          <Image
            src={statusConfig.true.icon}
            alt={`Valve status ${statusConfig.true.label}`}
            width={32}
            height={17}
            style={{ height: "auto" }}
            className="object-contain"
          />
        </button>
        <div className="flex flex-col text-[18px]">
          <div>
            <span className="font-bold">08:00 - 09:00</span>
          </div>
          <div className="flex items-center gap-2">
            <span>V1, V2, V3</span>
            <div className="w-1 h-1 bg-black rounded-[50%]"></div>
            <span>Everyday</span>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <button className={`rounded-lg px-[10px] py-[5px] text-green-700 ${statusConfig.true.bgClass} flex items-center justify-center cursor-pointer`}>
          <span className="text-[14px]">ACTIVE</span>
        </button>
        <button className={`rounded-lg px-[10px] py-[5px] flex items-center justify-center cursor-pointer aspect-square hover:bg-red-200`}>
          <Image
            src="/Delete.svg"
            alt={`delete schedule`}
            width={18}
            height={18}
            style={{ height: "auto" }}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
}
