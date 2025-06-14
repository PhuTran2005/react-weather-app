import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Eye,
} from "lucide-react";

// Weather icons mapping
const getWeatherIcon = (condition, temp) => {
  const iconProps = { size: 24, className: "text-white" };

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return <CloudRain {...iconProps} className="text-blue-400" />;
  } else if (condition.includes("snow")) {
    return <CloudSnow {...iconProps} className="text-blue-200" />;
  } else if (condition.includes("cloud")) {
    return <Cloud {...iconProps} className="text-gray-400" />;
  } else if (condition.includes("clear") || condition.includes("sunny")) {
    return <Sun {...iconProps} className="text-yellow-400" />;
  } else {
    return <Wind {...iconProps} className="text-gray-300" />;
  }
};

// Weather marker component
const WeatherMarker = ({ city }) => {
  const markerIcon = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="${
        city.temp > 25 ? "#ef4444" : city.temp > 10 ? "#f59e0b" : "#3b82f6"
      }" stroke="#fff" stroke-width="2"/>
      <text x="20" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${Math.round(
        city.temp
      )}°</text>
    </svg>
  `)}`;

  return (
    <Marker
      position={[city.lat, city.lng]}
      icon={L.divIcon({
        html: `<img src="${markerIcon}" width="40" height="40" />`,
        className: "custom-weather-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })}
    >
      <Popup className="weather-popup">
        <div className="p-4 min-w-[250px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">{city.name}</h3>
            {getWeatherIcon(city.condition.toLowerCase(), city.temp)}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Thermometer size={16} className="text-red-500" />
              <span className="font-semibold">{Math.round(city.temp)}°C</span>
            </div>

            <div className="flex items-center space-x-2">
              <Droplets size={16} className="text-blue-500" />
              <span>{city.humidity}%</span>
            </div>

            <div className="flex items-center space-x-2">
              <Wind size={16} className="text-gray-500" />
              <span>{city.windSpeed} km/h</span>
            </div>

            <div className="flex items-center space-x-2">
              <Eye size={16} className="text-purple-500" />
              <span>{city.visibility} km</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 capitalize">{city.condition}</p>
            <p className="text-xs text-gray-500 mt-1">
              Cảm giác như {Math.round(city.feelsLike)}°C
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

// Loading overlay component
const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[1000]">
    <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      <span className="text-gray-700">Đang tải dữ liệu thời tiết...</span>
    </div>
  </div>
);

// Main weather map component
const WeatherWorldMap = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState("temperature");

  // Sample cities with mock weather data
  const cities = [
    { name: "Hồ Chí Minh", lat: 10.8231, lng: 106.6297, country: "Vietnam" },
    { name: "Hà Nội", lat: 21.0285, lng: 105.8542, country: "Vietnam" },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503, country: "Japan" },
    { name: "New York", lat: 40.7128, lng: -74.006, country: "USA" },
    { name: "London", lat: 51.5074, lng: -0.1278, country: "UK" },
    { name: "Paris", lat: 48.8566, lng: 2.3522, country: "France" },
    { name: "Sydney", lat: -33.8688, lng: 151.2093, country: "Australia" },
    { name: "Moscow", lat: 55.7558, lng: 37.6173, country: "Russia" },
    { name: "Beijing", lat: 39.9042, lng: 116.4074, country: "China" },
    { name: "Mumbai", lat: 19.076, lng: 72.8777, country: "India" },
    { name: "São Paulo", lat: -23.5505, lng: -46.6333, country: "Brazil" },
    { name: "Cairo", lat: 30.0444, lng: 31.2357, country: "Egypt" },
    { name: "Lagos", lat: 6.5244, lng: 3.3792, country: "Nigeria" },
    { name: "Mexico City", lat: 19.4326, lng: -99.1332, country: "Mexico" },
    { name: "Toronto", lat: 43.6532, lng: -79.3832, country: "Canada" },
  ];

  // Mock weather conditions
  const weatherConditions = [
    "Clear",
    "Partly Cloudy",
    "Cloudy",
    "Light Rain",
    "Heavy Rain",
    "Snow",
    "Sunny",
  ];

  // Generate mock weather data
  const generateWeatherData = () => {
    return cities.map((city, index) => ({
      ...city,
      id: index,
      temp: Math.round(Math.random() * 40 - 10), // -10 to 30°C
      feelsLike: Math.round(Math.random() * 40 - 5),
      humidity: Math.round(Math.random() * 100),
      windSpeed: Math.round(Math.random() * 30),
      visibility: Math.round(Math.random() * 20 + 5),
      condition:
        weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      pressure: Math.round(Math.random() * 100 + 1000),
      uvIndex: Math.round(Math.random() * 11),
    }));
  };

  // Simulate API call
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setWeatherData(generateWeatherData());
        setLoading(false);
      }, 2000);
    };

    fetchWeatherData();
  }, []);

  // Refresh weather data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setWeatherData(generateWeatherData());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Cloud className="text-blue-500" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">
              Bản đồ thời tiết thế giới
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="temperature">Nhiệt độ</option>
              <option value="humidity">Độ ẩm</option>
              <option value="wind">Gió</option>
              <option value="pressure">Áp suất</option>
            </select>

            <button
              onClick={refreshData}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Wind size={16} />
              <span>Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="pt-20 h-full">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {weatherData.map((city) => (
            <WeatherMarker key={city.id} city={city} />
          ))}
        </MapContainer>
      </div>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <h3 className="font-semibold text-gray-800 mb-2">Chú thích nhiệt độ</h3>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Lạnh (&lt; 10°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span>Ôn hòa (10-25°C)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Nóng (&gt; 25°C)</span>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="absolute top-24 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] w-64">
        <h3 className="font-semibold text-gray-800 mb-3">Thống kê toàn cầu</h3>
        {weatherData.length > 0 && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Nhiệt độ trung bình:</span>
              <span className="font-semibold">
                {Math.round(
                  weatherData.reduce((acc, city) => acc + city.temp, 0) /
                    weatherData.length
                )}
                °C
              </span>
            </div>
            <div className="flex justify-between">
              <span>Độ ẩm trung bình:</span>
              <span className="font-semibold">
                {Math.round(
                  weatherData.reduce((acc, city) => acc + city.humidity, 0) /
                    weatherData.length
                )}
                %
              </span>
            </div>
            <div className="flex justify-between">
              <span>Thành phố nóng nhất:</span>
              <span className="font-semibold text-red-500">
                {
                  weatherData.reduce((prev, current) =>
                    prev.temp > current.temp ? prev : current
                  ).name
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Thành phố lạnh nhất:</span>
              <span className="font-semibold text-blue-500">
                {
                  weatherData.reduce((prev, current) =>
                    prev.temp < current.temp ? prev : current
                  ).name
                }
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Leaflet CSS */}
      <style jsx>{`
        .leaflet-container {
          font-family: inherit;
        }
        .custom-weather-marker {
          border: none !important;
          background: transparent !important;
        }
        .weather-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .weather-popup .leaflet-popup-content {
          margin: 0;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default WeatherWorldMap;
