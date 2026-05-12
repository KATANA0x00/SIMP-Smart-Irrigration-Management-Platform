export default function BatteryBar({ nodePallate = { G: 1, Y: 1, R: 1 } }) {
  const total = nodePallate.G + nodePallate.Y + nodePallate.R;
  const GPercentage = total > 0 ? (nodePallate.G / total) * 100 : 0;
  const YPercentage = total > 0 ? (nodePallate.Y / total) * 100 : 0;
  const RPercentage = total > 0 ? (nodePallate.R / total) * 100 : 0;

  return (
    <div>
      <div className="flex gap-[2px] w-full">
        {nodePallate.R > 0 && (
          <div 
            className="h-[14px] rounded-[3px] bg-(--mtr-color-battery-red)" 
            style={{ width: `${RPercentage}%` }}
          ></div>
        )}
        {nodePallate.Y > 0 && (
          <div 
            className="h-[14px] rounded-[3px] bg-(--mtr-color-battery-yellow)" 
            style={{ width: `${YPercentage}%` }}
          ></div>
        )}
        {nodePallate.G > 0 && (
          <div 
            className="h-[14px] rounded-[3px] bg-(--mtr-color-battery-green)" 
            style={{ width: `${GPercentage}%` }}
          ></div>
        )}
      </div>
      <div className="w-full flex items-center gap-[20px] mt-1">
        <div className="flex items-center gap-[5px]">
          <div className="w-[10px] h-[10px] bg-(--mtr-color-battery-red) rounded-full"></div>
          <div>&lt;29%:</div>
          <div className="font-bold">{nodePallate.R}</div>
        </div>
        <div className="flex items-center gap-[5px]">
          <div className="w-[10px] h-[10px] bg-(--mtr-color-battery-yellow) rounded-full"></div>
          <div>30-59%:</div>
          <div className="font-bold">{nodePallate.Y}</div>
        </div>
        <div className="flex items-center gap-[5px]">
          <div className="w-[10px] h-[10px] bg-(--mtr-color-battery-green) rounded-full"></div>
          <div>60-100%:</div>
          <div className="font-bold">{nodePallate.G}</div>
        </div>
        <div className="ml-auto">
          <span> TOTAL :</span>
          <span className="font-bold "> {total}</span>
        </div>
      </div>
    </div>
  );
}
