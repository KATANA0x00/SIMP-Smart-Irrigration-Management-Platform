export default function MarkerPin() {
  return (
    <div className="bg-green-400 w-(--marker-outer-size) h-(--marker-outer-size) rounded-[50%] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-white font-bold text-[18px] leading-none">V1</span>
        <span className="text-white text-[16px] leading-none">ON</span>
      </div>
    </div>
  );
}
