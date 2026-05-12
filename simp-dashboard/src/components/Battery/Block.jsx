import Image from "next/image";

export default function BatteryBlock({ level = 0 }) {
  const getBatteryIcon = (lvl) => {
    if (lvl === null || lvl === undefined) return "/Battery-20.svg";
    if (lvl <= 20) return "/Battery-20.svg";
    if (lvl <= 40) return "/Battery-40.svg";
    if (lvl <= 60) return "/Battery-60.svg";
    if (lvl <= 80) return "/Battery-80.svg";
    return "/Battery-100.svg";
  };

  const clampedLevel = level === null ? 0 : Math.min(100, Math.max(0, level));
  const iconPath = getBatteryIcon(clampedLevel);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Image
          src={iconPath}
          alt={`Battery ${clampedLevel}%`}
          width={32}
          height={17}
          style={{ height: "auto" }}
          className="object-contain"
        />
      </div>
      <span className="text-sm font-bold text-gray-700 leading-tight">
        {level !== null ? `${level}%` : "N/A"}
      </span>
    </div>
  );
}
