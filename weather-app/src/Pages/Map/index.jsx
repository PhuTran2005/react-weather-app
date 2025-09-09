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
import {
  getAirPollutionbyLocation,
  getWeatherbyLocation,
  getWeatherbyLocationMap,
} from "../../services/weatherService";
import WeatherPanel from "../../Components/weatherPanel";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { SunLoading } from "../../Components/Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageFromUnsplash } from "../../services/locationService";
import { setWeatherData } from "../../features/Weather/weatherSlice";
import { Crosshair } from "lucide-react";

// Fix lỗi icon không hiện trên React
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = async (lat, lon) => {
    try {
      setIsLoading(true);
      const data = await getWeatherbyLocation(lat, lon);
      const locationImg = await getImageFromUnsplash(data.name);
      const airPollutionData = await getAirPollutionbyLocation(
        data.location.lat,
        data.location.lon
      );
      dispatch(
        setWeatherData({
          ...data,
          locationImg,
          airPollution: airPollutionData.list[0],
        })
      );
      navigate("/weather-app"); // chuyển hướng sau khi xong
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setIsLoading(false);
  };
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  // Component listen zoom
  function ZoomCities({ setZoom }) {
    useMapEvents({
      zoomend: (e) => {
        setZoom(e.target.getZoom());
      },
    });
    return null;
  }
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  const LocationMarker = () => {
    useMapEvents({
      async click(e) {
        console.log("Map clicked at:", e.latlng);
        setIsLoading(true);
        const data = await getWeatherbyLocationMap(e.latlng.lat, e.latlng.lng);
        console.log("Weather data:", data);
        setLocationData(data);
        setIsLoading(false);
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
  console.log(zoom);

  return (
    <>
      {isLoading && <SunLoading />}
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
                  <button
                    className="navigate-btn"
                    style={{ color: "blue", marginTop: "5px" }}
                    onClick={() => handleNavigate(city.lat, city.lng)}
                  >
                    <Crosshair size={20} />
                    Use this location
                  </button>
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
