import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Gauge,
  Droplets,
  Eye,
  Sunrise,
  Sunset,
} from "lucide-react";
import defaultImg from "../../assets/img/defaut.png";
import "./WeatherDashboard.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../Components/Empty";
import { changeStandardDateTime } from "../../helpers";

const WeatherDashboard = () => {
  const weatherData = useSelector((state) => state.weather.value);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const handleChoose = () => {
    navigate("/weather-app");
  };
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatTime = (timeString) => {
    const hour = new Date(timeString).getHours();
    return `${hour.toString().padStart(2, "0")}:00`;
  };
  // Mobile: "8h", "14h", "20h"
  const formatTimeForMobile = (timeString) => {
    const hour = new Date(timeString).getHours();
    return `${hour.toString().padStart(2, "0")}h`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="custom-tooltip__time">{`Time: ${formatTime(label)}`}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="custom-tooltip__value"
            >
              {`${entry.name}: ${entry.value}${
                entry.name === "Temperature"
                  ? "°C"
                  : entry.name === "Wind Speed"
                  ? " km/h"
                  : entry.name === "Pressure"
                  ? " mb"
                  : entry.name === "Humidity"
                  ? "%"
                  : entry.name === "Rain Chance"
                  ? "%"
                  : ""
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="weather-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading weather data...</p>
        </div>
      </div>
    );
  }

  const hourlyData = weatherData
    ? weatherData.forecast.forecastday[0].hour.map((hour) => ({
        time: hour.time,
        temperature: Math.round(hour.temp_c),
        windSpeed: Math.round(hour.wind_kph),
        pressure: Math.round(hour.pressure_mb),
        humidity: Math.round(hour.humidity),
        rainChance: Math.round(hour.chance_of_rain),
      }))
    : [];

  // Filter data for mobile to show every 2-3 hours
  const mobileHourlyData = isMobile
    ? hourlyData.filter((_, index) => index % 1 === 0)
    : hourlyData;

  const chartHeight = isMobile ? 200 : 280;
  const tickInterval = isMobile ? 3 : 3;

  return (
    <>
      {weatherData ? (
        <div className="weather-dashboard">
          <div className="weather-container">
            {/* Header */}
            <div className="weather-header">
              <div className="weather-header__location">
                <h1 className="weather-header__title">
                  {weatherData.location.name}
                </h1>
                <p className="weather-header__country">
                  {weatherData.location.country}
                </p>
                <p className="weather-header__time">
                  {changeStandardDateTime(weatherData.current.last_updated) +
                    (!weatherData.current.is_day ? ", Night" : ", Day")}
                </p>
              </div>
              <div className="weather-header__current">
                <div className="weather-header__temp-container">
                  <img
                    src={
                      weatherData
                        ? weatherData.current.condition.icon
                        : defaultImg
                    }
                    alt={defaultImg}
                  />
                  <span className="weather-header__temperature">
                    {weatherData.current.temp_c}°C
                  </span>
                </div>
                <p className="weather-header__condition">
                  {weatherData.current.condition.text}
                </p>
              </div>
            </div>

            {/* Current Stats */}
            <div className="weather-stats">
              <div className="weather-stat">
                <Wind className="weather-stat__icon weather-stat__icon--wind" />
                <p className="weather-stat__value">
                  {weatherData.current.wind_kph}
                </p>
                <p className="weather-stat__unit">km/h</p>
              </div>
              <div className="weather-stat">
                <Gauge className="weather-stat__icon weather-stat__icon--pressure" />
                <p className="weather-stat__value">
                  {weatherData.current.pressure_mb}
                </p>
                <p className="weather-stat__unit">mb</p>
              </div>
              <div className="weather-stat">
                <Droplets className="weather-stat__icon weather-stat__icon--humidity" />
                <p className="weather-stat__value">
                  {weatherData.current.humidity}%
                </p>
                <p className="weather-stat__unit">Humidity</p>
              </div>
              <div className="weather-stat">
                <Eye className="weather-stat__icon weather-stat__icon--visibility" />
                <p className="weather-stat__value">
                  {weatherData.current.vis_km}
                </p>
                <p className="weather-stat__unit">km</p>
              </div>
            </div>

            {/* Charts */}
            <div className="weather-charts">
              {/* Temperature Chart */}
              <div className="weather-chart">
                <h3 className="weather-chart__title">
                  <Thermometer className="weather-chart__icon" />
                  <span>Temperature (24h)</span>
                </h3>
                <div
                  className="weather-chart__container"
                  style={{ height: chartHeight }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mobileHourlyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="tempGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ff6b6b"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ff6b6b"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <XAxis
                        dataKey="time"
                        tickFormatter={
                          isMobile ? formatTimeForMobile : formatTime
                        }
                        stroke="rgba(255,255,255,0.8)"
                        interval={tickInterval}
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.8)"
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        width={isMobile ? 30 : 40}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stroke="#ff6b6b"
                        fillOpacity={1}
                        fill="url(#tempGradient)"
                        strokeWidth={isMobile ? 2 : 3}
                        name="Temperature"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Wind Speed Chart */}
              <div className="weather-chart">
                <h3 className="weather-chart__title">
                  <Wind className="weather-chart__icon" />
                  <span>Wind Speed (24h)</span>
                </h3>
                <div
                  className="weather-chart__container"
                  style={{ height: chartHeight }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mobileHourlyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <XAxis
                        dataKey="time"
                        tickFormatter={
                          isMobile ? formatTimeForMobile : formatTime
                        }
                        stroke="rgba(255,255,255,0.8)"
                        interval={tickInterval}
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.8)"
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        width={isMobile ? 30 : 40}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="windSpeed"
                        stroke="#4ecdc4"
                        strokeWidth={isMobile ? 2 : 3}
                        dot={{
                          fill: "#4ecdc4",
                          strokeWidth: 2,
                          r: isMobile ? 3 : 4,
                        }}
                        name="Wind Speed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pressure Chart */}
              <div className="weather-chart">
                <h3 className="weather-chart__title">
                  <Gauge className="weather-chart__icon" />
                  <span>Atmospheric Pressure (24h)</span>
                </h3>
                <div
                  className="weather-chart__container"
                  style={{ height: chartHeight }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mobileHourlyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <XAxis
                        dataKey="time"
                        tickFormatter={
                          isMobile ? formatTimeForMobile : formatTime
                        }
                        stroke="rgba(255,255,255,0.8)"
                        interval={tickInterval}
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.8)"
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        width={isMobile ? 35 : 40}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="pressure"
                        stroke="#ffd93d"
                        strokeWidth={isMobile ? 2 : 3}
                        dot={{
                          fill: "#ffd93d",
                          strokeWidth: 2,
                          r: isMobile ? 3 : 4,
                        }}
                        name="Pressure"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Combined Humidity & Rain Chance */}
              <div className="weather-chart">
                <h3 className="weather-chart__title">
                  <Droplets className="weather-chart__icon" />
                  <span>Humidity & Rain Chance (24h)</span>
                </h3>
                <div
                  className="weather-chart__container"
                  style={{ height: chartHeight }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={mobileHourlyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <XAxis
                        dataKey="time"
                        tickFormatter={
                          isMobile ? formatTimeForMobile : formatTime
                        }
                        stroke="rgba(255,255,255,0.8)"
                        interval={tickInterval}
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.8)"
                        fontSize={isMobile ? 10 : 12}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        width={isMobile ? 30 : 40}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="rainChance"
                        fill="rgba(74, 144, 226, 0.6)"
                        name="Rain Chance"
                        radius={[2, 2, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="#6c5ce7"
                        strokeWidth={isMobile ? 2 : 3}
                        dot={{
                          fill: "#6c5ce7",
                          strokeWidth: 2,
                          r: isMobile ? 3 : 4,
                        }}
                        name="Humidity"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          title="Cant find the location data"
          description="Please choose location !"
          type="products"
          action={handleChoose}
          actionText="Choose your location now !"
          size="large"
        />
      )}
    </>
  );
};

export default WeatherDashboard;
