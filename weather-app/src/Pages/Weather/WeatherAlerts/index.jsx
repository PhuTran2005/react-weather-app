import React from "react";
import {
  AlertTriangle,
  Cloud,
  Wind,
  Thermometer,
  Eye,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { useSelector } from "react-redux";
import EmptyState from "../../../Components/Empty";
import { useNavigate } from "react-router-dom";

const WeatherAlerts = () => {
  const weatherData = useSelector((state) => state.weather.value);

  const navigate = useNavigate();
  // Mock data dựa trên cấu trúc bạn cung cấp
  const handleChoose = () => {
    //Chuyển đến trang thời tiết
    navigate("/weather-app");
  };
  const getSeverityConfig = (severity) => {
    const configs = {
      warning: {
        color: "bg-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
        icon: AlertTriangle,
        label: "Cảnh báo",
      },
      watch: {
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-800",
        icon: Eye,
        label: "Theo dõi",
      },
      advisory: {
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-800",
        icon: Thermometer,
        label: "Khuyến cáo",
      },
    };
    return configs[severity] || configs.advisory;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {weatherData === null || weatherData.alerts.alert.length === 0 ? (
        <EmptyState
          title="Cant find the location data"
          description="Please choose location !"
          type="products"
          action={handleChoose}
          actionText="Choose your location now !"
          size="large"
        />
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Main Content */}
            {/* Header */}
            <div className="bg-white shadow-lg border-b border-gray-200">
              <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">
                        Weather Alerts
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Các Cảnh Báo Hiện Tại
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {weatherData.alerts.alert.length} cảnh báo
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {weatherData.alerts.alert.map((alert) => {
                    const config = getSeverityConfig(alert.severity);
                    const IconComponent = config.icon;

                    return (
                      <div
                        key={alert.id}
                        className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`${config.color} p-2 rounded-lg`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <span
                            className={`${config.textColor} bg-white px-2 py-1 rounded-full text-xs font-semibold`}
                          >
                            {config.label}
                          </span>
                        </div>

                        {/* Content */}
                        <h3
                          className={`${config.textColor} text-lg font-bold mb-3`}
                        >
                          {alert.title}
                        </h3>

                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                          {alert.description}
                        </p>

                        {/* Time Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-16">Từ:</span>
                            <span>{formatDate(alert.start_date)}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-16">Đến:</span>
                            <span>{formatDate(alert.end_date)}</span>
                          </div>
                        </div>

                        {/* Regions */}
                        {alert.regions && alert.regions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              Khu vực ảnh hưởng:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {alert.regions.map((region, index) => (
                                <span
                                  key={index}
                                  className="bg-white text-gray-700 px-2 py-1 rounded text-xs border"
                                >
                                  {region}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-gray-300">
                  Dữ liệu thời tiết được cung cấp bởi Weatherbit.io
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Cập nhật lần cuối: {new Date().toLocaleString("vi-VN")}
                </p>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default WeatherAlerts;
