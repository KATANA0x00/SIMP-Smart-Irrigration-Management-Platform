"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";

export default function MapContent({
  center = [14.846144906286868, 99.79371285438914],
  zoom = 18,
  markers = [],
  iconComponent,
  iconSize = [64, 64],
  iconAnchor = [32, 32],
  children,
  ...props
}) {
  const markerIcon = new L.DivIcon({
    className: "custom-marker-pin",
    html: iconComponent
      ? renderToString(iconComponent)
      : `<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      attributionControl={false}
      style={{ height: "100%", width: "100%", minHeight: "400px", zIndex: 0 }}
      {...props}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {markers.map((pt, index) => (
        <Marker key={index} position={[pt.lat, pt.lng]} icon={markerIcon} />
      ))}
      {children}
    </MapContainer>
  );
}
