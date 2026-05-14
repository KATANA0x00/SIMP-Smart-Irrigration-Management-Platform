export default function MarkerPin() {
  return (
    <div className="bg-green-400 w-(--marker-outer-size) h-(--marker-outer-size) rounded-[50%] flex flex-col items-center justify-center reletive">
      <div className="bg-sky-400 w-(--marker-inner-size) h-[calc(var(--marker-inner-size)/2)] rounded-t-[calc(var(--marker-inner-size)/2)]" />
      <div className="bg-blue-400 w-(--marker-inner-size) h-[calc(var(--marker-inner-size)/2)] rounded-b-[calc(var(--marker-inner-size)/2)]" />
      <span className="absolute text-white font-bold text-[20px]">S1</span>
    </div>
  );
}
