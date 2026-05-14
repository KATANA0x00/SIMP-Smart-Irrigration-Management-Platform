"use client";

import dynamic from "next/dynamic";
import MarkerSnode from "./MarkerSnode";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapSnode() {
  const customPoint = [
    {
      lat: 14.845783636760975,
      lng: 99.79327078944151,
    },
    {
      lat: 14.847854130286136,
      lng: 99.7942232384677,
    },
  ];

  return (
    <div className="w-full h-full min-h-[400px] relative z-0">
      <div className="absolute"></div>
      <MapContent markers={customPoint} iconComponent={<MarkerSnode />} />
    </div>
  );
}
