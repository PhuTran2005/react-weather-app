import React, { useEffect, useState } from "react";
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
  Star,
  Shield,
  Award,
  Users,
} from "lucide-react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const features = [
    {
      id: "current-weather",
      title: "Thời Tiết Hiện Tại",
      description:
        "Xem thông tin thời tiết chi tiết tại vị trí của bạn với độ chính xác cao",
      icon: Sun,
      path: "/weather-app",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      iconColor: "#ff7b3d",
    },
    {
      id: "forecast",
      title: "Dự Báo 7 Ngày",
      description:
        "Theo dõi xu hướng thời tiết trong tuần tới với biểu đồ trực quan",
      icon: Calendar,
      path: "/weather-app",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      iconColor: "#667eea",
    },
    {
      id: "radar",
      title: "Bản Đồ Thời Tiết",
      description: "Xem bản đồ radar mưa và mây trực tiếp với công nghệ AI",
      icon: Globe,
      path: "/weather-app",
      gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      iconColor: "#764ba2",
    },
    {
      id: "alerts",
      title: "Cảnh Báo Thời Tiết",
      description:
        "Nhận thông báo về các hiện tượng thời tiết cực đoan kịp thời",
      icon: Bell,
      path: "/weather-app",
      gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      iconColor: "#667eea",
    },
    {
      id: "locations",
      title: "Nhiều Địa Điểm",
      description:
        "Theo dõi thời tiết ở nhiều thành phố khác nhau trên toàn thế giới",
      icon: MapPin,
      path: "/weather-app",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      iconColor: "#red",
    },
    {
      id: "analytics",
      title: "Thống Kê & Xu Hướng",
      description: "Phân tích dữ liệu thời tiết theo thời gian với AI insights",
      icon: TrendingUp,
      path: "/weather-app",
      gradient: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      iconColor: "#667eea",
    },
  ];

  const stats = [
    { label: "Thành phố", value: "500+", icon: MapPin, color: "#667eea" },
    { label: "Độ chính xác", value: "98%", icon: Award, color: "#fa709a" },
    { label: "Cập nhật", value: "5 phút", icon: Zap, color: "#4ecdc4" },
    { label: "Người dùng", value: "1M+", icon: Users, color: "#45b7d1" },
  ];

  const testimonials = [
    {
      name: "Trần Văn Phú",
      role: "Nông dân",
      content:
        "Ứng dụng giúp tôi dự báo thời tiết chính xác, rất hữu ích cho việc canh tác.",
      rating: 5,
      avatar: "👨‍🌾",
    },
    {
      name: "Trần Ngọc Hoài",
      role: "Du lịch viên",
      content:
        "Giao diện đẹp, thông tin chi tiết. Không thể thiếu khi đi du lịch!",
      rating: 5,
      avatar: "✈️",
    },
    {
      name: "Trần Thị Ngọc Quý",
      role: "Thủy thủ",
      content:
        "Cảnh báo thời tiết cực đoan rất kịp thời, giúp tôi tránh được nhiều rủi ro.",
      rating: 5,
      avatar: "⚓",
    },
  ];

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="animated-bg" />

      {/* Floating Weather Icons */}
      <div className="floating-elements">
        {[Sun, Cloud, CloudRain, Wind].map((Icon, index) => (
          <div key={index} className="floating-icon">
            <Icon size={24} style={{ color: "rgba(255,255,255,0.1)" }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <Cloud size={28} color="white" />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">WeatherPro</h1>
              <p className="logo-subtitle">Thời tiết thông minh</p>
            </div>
          </div>

          <div className="header-right">
            <div className="time-display">
              <p className="time">{currentTime.toLocaleTimeString("vi-VN")}</p>
              <p className="date">{currentTime.toLocaleDateString("vi-VN")}</p>
            </div>
            <button className="settings-btn">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero fade-in-up">
        <div className="hero-content">
          <div className="hero-icon">
            <Cloud size={60} color="white" />
          </div>

          <h1 className="hero-title">
            Weather<span className="hero-title-accent">Pro</span>
          </h1>

          <p className="hero-description">
            Ứng dụng thời tiết thông minh với AI, dự báo chính xác 98%, giao
            diện đẹp mắt và trải nghiệm người dùng tuyệt vời
          </p>

          <div className="hero-buttons">
            <button
              onClick={() => navigate("./weather-app")}
              className="primary-btn"
            >
              <Sun size={20} />
              <span>Khám Phá Ngay</span>
              <ChevronRight size={20} />
            </button>
            <button className="secondary-btn">Xem Demo</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div
                className="stat-icon"
                style={{ backgroundColor: stat.color }}
              >
                <stat.icon size={24} color="white" />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Tính Năng Nổi Bật</h2>
          <p className="section-description">
            Khám phá các tính năng mạnh mẽ được tích hợp AI và machine learning
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card"
              style={{ background: feature.gradient }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className="feature-icon"
                style={{ color: feature.iconColor }}
              >
                <feature.icon size={32} />
              </div>

              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>

              <div className="feature-link">
                <a href={feature.path}>Khám phá ngay</a>
                <ChevronRight
                  size={16}
                  style={{
                    transform:
                      hoveredFeature === feature.id
                        ? "translateX(5px)"
                        : "translateX(0)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">Người Dùng Nói Gì</h2>
          <p className="section-description">
            Hơn 1 triệu người dùng tin tưởng WeatherPro
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    style={{ color: "#ffd700", fill: "#ffd700" }}
                  />
                ))}
              </div>

              <p className="testimonial-content">"{testimonial.content}"</p>

              <div className="testimonial-author">
                <span className="testimonial-avatar">{testimonial.avatar}</span>
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Sẵn sàng trải nghiệm thời tiết thông minh?
          </h2>
          <p className="cta-description">
            Tham gia cùng hàng triệu người dùng đang tin tưởng WeatherPro
          </p>

          <div className="cta-buttons">
            <button className="cta-primary-btn">
              <Thermometer size={20} />
              <span>Bắt Đầu Miễn Phí</span>
            </button>
            <button className="cta-secondary-btn">Tải Ứng Dụng</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Cloud size={24} color="white" />
            </div>
            <div>
              <h3 className="footer-logo-text">WeatherPro</h3>
              <p className="footer-logo-subtext">Thời tiết thông minh</p>
            </div>
          </div>

          <div className="footer-copyright">
            © 2025 WeatherPro. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
