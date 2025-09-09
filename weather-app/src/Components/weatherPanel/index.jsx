import React from "react";
import {
  Crosshair,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Thermometer,
  Wind,
  X,
} from "lucide-react";
import "./weatherPanel.scss";
import { useDispatch } from "react-redux";
import {
  getAirPollutionbyLocation,
  getWeatherbyLocation,
} from "../../services/weatherService";
import { getImageFromUnsplash } from "../../services/locationService";
import { setWeatherData } from "../../features/Weather/weatherSlice";
import { useNavigate } from "react-router-dom";
const WeatherPanel = ({ locationData, onSetLocationData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = async (lat, lon) => {
    try {
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
  };
  console.log("Rendering WeatherPanel with data:", locationData);
  return (
    <div className="info-panel" id="infoPanel">
      <div className="panel-header">
        <div className="header-left">
          <h3 className="location-title">
            <MapPin size={20} />
            {locationData.name}
          </h3>
          <p className="location-subtitle">
            {locationData.country || "Vietnam"}
          </p>
          <button
            className="navigate-btn"
            onClick={() =>
              handleNavigate(locationData.coord.lat, locationData.coord.lon)
            }
          >
            <Crosshair size={20} />
            Use this location
          </button>
        </div>
        <button
          onClick={() => onSetLocationData(null)}
          className={`
              p-2 rounded-full transition-all duration-200 
              text-white hover:text-white hover:bg-gray-800
              hover:scale-110 active:scale-95 z-10
            `}
        >
          <X size={20} />
        </button>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          <img
            src={locationData.weather[0].icon}
            alt={locationData.weather[0].description}
          />
        </div>
        <div className="weather-info">
          <p className="temperature">{Math.round(locationData.main.temp)}°C</p>
          <p className="description">{locationData.weather[0].description}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="details-grid">
          <div className="detail-item">
            <div className="detail-header">
              <Thermometer className="detail-icon" />
              <span className="detail-label">Cảm giác</span>
            </div>
            <p className="detail-value">
              {Math.round(locationData.main.feels_like)}°C
            </p>
          </div>

          <div className="detail-item">
            <div className="detail-header">
              <Droplets className="detail-icon" />
              <span className="detail-label">Độ ẩm</span>
            </div>
            <p className="detail-value">{locationData.main.humidity}%</p>
          </div>

          <div className="detail-item">
            <div className="detail-header">
              <Wind className="detail-icon" />
              <span className="detail-label">Gió</span>
            </div>
            <p className="detail-value">
              {locationData.wind.speed.toFixed(2)} m/s{" "}
              {locationData.wind.dir && `${locationData.wind.dir}`}
            </p>
          </div>

          <div className="detail-item">
            <div className="detail-header">
              <Gauge className="detail-icon" />
              <span className="detail-label">Áp suất</span>
            </div>
            <p className="detail-value">
              {locationData.main.pressure || 1013} hPa
            </p>
          </div>

          {locationData.visibility !== null && (
            <div className="detail-item">
              <div className="detail-header">
                <Eye className="detail-icon" />
                <span className="detail-label">Tầm nhìn</span>
              </div>
              <p className="detail-value">{locationData.visibility} km</p>
            </div>
          )}

          {locationData.uv !== null && (
            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-icon">☀️</span>
                <span className="detail-label">UV Index</span>
              </div>
              <p className="detail-value">{locationData.uv}</p>
            </div>
          )}

          <div className="detail-item coordinates">
            <div className="detail-header">
              <MapPin className="detail-icon" />
              <span className="detail-label">Tọa độ</span>
            </div>
            <p className="detail-value">
              {locationData.coord.lat.toFixed(3)},{" "}
              {locationData.coord.lon.toFixed(3)}
            </p>
          </div>
        </div>
      </div>

      {locationData.last_updated && (
        <div className="last-updated">
          Cập nhật lần cuối: {locationData.last_updated}
        </div>
      )}
    </div>
  );
};
export default WeatherPanel;
