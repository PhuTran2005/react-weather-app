import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherCloudMap = () => {
  const appid = "db56dab392f74dd09c7110432241012";

  // Chọn forecast 1 giờ sau (UTC)
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 1, 0, 0, 0);
  const tm = now.toISOString().slice(0, 19) + "Z";

  const cloudTileUrl = `https://maps.openweathermap.org/maps/2.0/clouds_new/{z}/{x}/{y}?appid=${appid}&tm=${tm}`;

  return (
    <MapContainer
      center={[35, 139]}
      zoom={4}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      <TileLayer
        url={cloudTileUrl}
        attribution="&copy; OpenWeatherMap"
        opacity={0.9}
      />
    </MapContainer>
  );
};

export default WeatherCloudMap;
