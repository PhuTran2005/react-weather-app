import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Eye,
  Droplets,
  Navigation,
  MapPin,
  Calendar,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      id: "current-weather",
      title: "Thời Tiết Hiện Tại",
      description: "Xem thông tin thời tiết chi tiết tại vị trí của bạn",
      icon: Sun,
      path: "/weather",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
    },
    {
      id: "forecast",
      title: "Dự Báo 7 Ngày",
      description: "Theo dõi xu hướng thời tiết trong tuần tới",
      icon: Calendar,
      path: "/forecast",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      id: "radar",
      title: "Bản Đồ Thời Tiết",
      description: "Xem bản đồ radar mưa và mây trực tiếp",
      icon: Globe,
      path: "/radar",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      id: "alerts",
      title: "Cảnh Báo Thời Tiết",
      description: "Nhận thông báo về các hiện tượng thời tiết cực đoan",
      icon: Bell,
      path: "/alerts",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    {
      id: "locations",
      title: "Nhiều Địa Điểm",
      description: "Theo dõi thời tiết ở nhiều thành phố khác nhau",
      icon: MapPin,
      path: "/locations",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    {
      id: "analytics",
      title: "Thống Kê & Xu Hướng",
      description: "Phân tích dữ liệu thời tiết theo thời gian",
      icon: TrendingUp,
      path: "/analytics",
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
    },
  ];

  const stats = [
    { label: "Thành phố", value: "500+", icon: MapPin },
    { label: "Độ chính xác", value: "98%", icon: Eye },
    { label: "Cập nhật", value: "5 phút", icon: Zap },
    { label: "Người dùng", value: "1M+", icon: Smartphone },
  ];

  const weatherAnimation = [
    { icon: Sun, delay: "0s", position: "top-20 left-20" },
    { icon: Cloud, delay: "1s", position: "top-32 right-32" },
    { icon: CloudRain, delay: "2s", position: "top-40 left-40" },
    { icon: Wind, delay: "3s", position: "top-16 right-16" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {weatherAnimation.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} opacity-10 animate-pulse`}
            style={{ animationDelay: item.delay, animationDuration: "4s" }}
          >
            <item.icon className="w-24 h-24 text-blue-300" />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  WeatherPro
                </h1>
                <p className="text-xs text-gray-500">
                  Ứng dụng thời tiết thông minh
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {currentTime.toLocaleTimeString("vi-VN")}
                </p>
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString("vi-VN")}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl mb-6 shadow-lg">
              <Cloud className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                WeatherPro
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ứng dụng thời tiết thông minh với dự báo chính xác, giao diện đẹp
              mắt và nhiều tính năng hữu ích cho cuộc sống hàng ngày của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/weather")}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Sun className="w-5 h-5" />
                <span>Xem Thời Tiết Ngay</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính Năng Nổi Bật
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá các tính năng mạnh mẽ giúp bạn nắm bắt thông tin thời
              tiết một cách toàn diện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${feature.bgColor} border border-gray-100`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => (window.location.href = feature.path)}
              >
                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    <span>Khám phá ngay</span>
                    <ChevronRight
                      className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                        hoveredFeature === feature.id ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn sàng trải nghiệm thời tiết thông minh?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bắt đầu khám phá thời tiết với độ chính xác cao và giao diện trực
            quan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/weather")}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Thermometer className="w-5 h-5" />
              <span>Bắt Đầu Ngay</span>
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
              Xem Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">WeatherPro</h3>
                <p className="text-sm text-gray-400">Thời tiết thông minh</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 WeatherPro. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
