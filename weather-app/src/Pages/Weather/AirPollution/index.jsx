import { useSelector } from "react-redux";
import EmptyState from "../../../Components/Empty";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import HealthRecommendations from "../../../Components/HealthRecommendations";

const AirPollution = () => {
  const weatherData = useSelector((state) => state.weather.value);
  const navigate = useNavigate();
  // Mock data dựa trên cấu trúc bạn cung cấp
  const handleChoose = () => {
    //Chuyển đến trang thời tiết
    navigate("/weather-app");
  };

  const [animatedValues, setAnimatedValues] = useState({});

  // Animation cho các giá trị số
  useEffect(() => {
    if (!weatherData || !weatherData.airPollution) return;
    const components = weatherData.airPollution.components;
    Object.keys(components).forEach((key) => {
      let start = 0;
      const end = components[key];
      const duration = 2000;
      const increment = end / (duration / 16);

      const animate = () => {
        start += increment;
        if (start < end) {
          setAnimatedValues((prev) => ({ ...prev, [key]: start.toFixed(2) }));
          requestAnimationFrame(animate);
        } else {
          setAnimatedValues((prev) => ({ ...prev, [key]: end }));
        }
      };
      setTimeout(() => animate(), Math.random() * 500);
    });
  }, [weatherData]);

  // Định nghĩa màu sắc cho các chất ô nhiễm
  const pollutantColors = {
    co: "#FF6B6B",
    nh3: "#4ECDC4",
    no: "#45B7D1",
    no2: "#96CEB4",
    o3: "#FFEAA7",
    pm2_5: "#DDA0DD",
    pm10: "#98D8C8",
    so2: "#F7DC6F",
  };

  // Định nghĩa mức độ AQI
  const getAQILevel = (aqi) => {
    const levels = {
      1: { label: "Good", color: "#00E400", bgColor: "rgba(0, 228, 0, 0.1)" },
      2: {
        label: "Pretty good",
        color: "#FFFF00",
        bgColor: "rgba(255, 255, 0, 0.1)",
      },
      3: {
        label: "Medium",
        color: "#FF7E00",
        bgColor: "rgba(255, 126, 0, 0.1)",
      },
      4: { label: "Kém", color: "#FF0000", bgColor: "rgba(255, 0, 0, 0.1)" },
      5: {
        label: "Very poor",
        color: "#8F3F97",
        bgColor: "rgba(143, 63, 151, 0.1)",
      },
    };
    return levels[aqi] || levels[1];
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData =
    weatherData &&
    Object.entries(weatherData.airPollution.components).map(([key, value]) => ({
      name: key.toUpperCase(),
      value: value,
      color: pollutantColors[key],
    }));

  const pieData = weatherData && chartData.filter((item) => item.value > 5);

  const aqiLevel =
    weatherData && getAQILevel(weatherData.airPollution.main.aqi);

  return (
    <>
      {weatherData && weatherData.airPollution ? (
        <div className="air-pollution-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          {/* Header */}
          <div className="dashboard-header text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
              Air Pollution
            </h1>
            <div className="location-info text-lg text-gray-600">
              📍 {weatherData.location.name}, {weatherData.location.region}{" "}
              {weatherData.location.country}
            </div>
          </div>

          {/* AQI Status Card */}
          <div className="aqi-status-card max-w-md mx-auto mb-8">
            <div
              className="bg-white rounded-2xl p-6 shadow-xl border-l-8 transform hover:scale-105 transition-all duration-300"
              style={{
                borderLeftColor: aqiLevel.color,
                backgroundColor: aqiLevel.bgColor,
              }}
            >
              <div className="text-center">
                <div
                  className="text-6xl font-bold mb-2"
                  style={{ color: aqiLevel.color }}
                >
                  {weatherData.airPollution.main.aqi}
                </div>
                <div className="text-xl font-semibold text-gray-700">
                  {aqiLevel.label}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Air Quality Index
                </div>
              </div>
            </div>
          </div>

          {/* Pollutants Grid */}
          <div className="pollutants-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(weatherData.airPollution.components).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="pollutant-card bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4"
                  style={{ borderTopColor: pollutantColors[key] }}
                >
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: pollutantColors[key] }}
                    >
                      {animatedValues[key] || 0}
                    </div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                      {key.replace("_", ".")}
                    </div>
                    <div className="text-xs text-gray-400">μg/m³</div>
                  </div>
                  <div
                    className="mt-3 h-1 rounded-full animate-pulse"
                    style={{
                      backgroundColor: pollutantColors[key],
                      width: `${Math.min((value / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              )
            )}
          </div>

          {/* Charts Section */}
          <div className="charts-section grid lg:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart */}
            <div className="chart-container bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Concentration of Pollutants
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="chart-container bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Ratio of Main Ingredients
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Recommendations */}

          <HealthRecommendations
            aqi={weatherData.airPollution.main.aqi}
            components={weatherData.airPollution.components}
          />

          {/* Footer */}
          <div className="footer text-center mt-8 text-gray-500 text-sm">
            The last update:{" "}
            {new Date(weatherData.airPollution.dt * 1000).toLocaleString(
              "vi-VN"
            )}
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

export default AirPollution;
