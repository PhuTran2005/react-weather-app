import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Map.scss";
import { useEffect, useState } from "react";
import GradientLegend from "../../Components/Legend";
import WeatherMapSidebar from "../../Components/SideBar/sidebar-map";
import { getWeatherbyLocation } from "../../services/weatherService";
import WeatherPanel from "../../Components/weatherPanel";
import MarkerClusterGroup from "react-leaflet-markercluster";

// Fix lỗi icon không hiện trên React
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component listen zoom
function ZoomCities({ setZoom }) {
  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const Map = () => {
  const [cities, setCities] = useState([]);

  const [locationData, setLocationData] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [layer, setLayer] = useState("default");
  const [mapType, setMapType] = useState({
    name: "Streets",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  });
  const [opacity, setOpacity] = useState(0.6);
  const [citiesVisible, setCitiesVisible] = useState(true);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  const LocationMarker = () => {
    useMapEvents({
      async click(e) {
        console.log("Map clicked at:", e.latlng);
        const data = await getWeatherbyLocation(e.latlng.lat, e.latlng.lng);
        console.log("Weather data:", data);
        setLocationData(data);
      },
    });
    return null;
  };
  useEffect(() => {
    const fetchCities = async () => {
      let file = "";
      if (zoom < 3) file = "/data/cities_10M.json";
      else if (zoom < 6) file = "/data/cities_5M.json";
      else file = "/data/cities_05M.json";

      const res = await fetch(file);
      const data = await res.json();
      setCities(data);
    };

    fetchCities();
  }, [zoom]);

  return (
    <>
      <div className="map-controls">
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          Toggle Sidebar
        </button>
      </div>
      <MapContainer
        center={[20, 0]}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url={mapType.url} attribution={mapType.attribution} />
        {/* Active weather layer */}
        {layer !== "default" && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/${
              layer === "default" ? "" : layer
            }/{z}/{x}/{y}.png?appid=${API_KEY}`}
            attribution="&copy; OpenWeather"
            opacity={opacity}
          />
        )}
        <MarkerClusterGroup chunkedLoading>
          {citiesVisible &&
            cities &&
            cities.map((city, i) => (
              <Marker key={i} position={[city.lat, city.lng]} icon={customIcon}>
                <Popup>
                  <b>{city.city}</b> ({city.country}) <br />
                  Dân số: {city.population.toLocaleString()}
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
        <ZoomCities setZoom={setZoom} />
        <LocationMarker />
      </MapContainer>
      {/* Legend */}
      {layer && <GradientLegend selectedLayer={layer} />}
      <WeatherMapSidebar
        isOpen={openSidebar}
        onClose={toggleSidebar}
        onSetLayer={setLayer}
        onSetMapType={setMapType}
        onSetOpacity={setOpacity}
        onSetCityVisible={setCitiesVisible}
        layers={layer}
        opacity={opacity}
        mapType={mapType}
        citiesVisible={citiesVisible}
      />
      {locationData && (
        <WeatherPanel
          locationData={locationData}
          onSetLocationData={setLocationData}
        />
      )}
    </>
  );
};
export default Map;
