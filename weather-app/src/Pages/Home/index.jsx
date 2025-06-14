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
import { useEffect, useState } from "react";
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
      path: "/weather",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      iconColor: "#ff7b3d",
    },
    {
      id: "forecast",
      title: "Dự Báo 7 Ngày",
      description:
        "Theo dõi xu hướng thời tiết trong tuần tới với biểu đồ trực quan",
      icon: Calendar,
      path: "/forecast",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      iconColor: "#667eea",
    },
    {
      id: "radar",
      title: "Bản Đồ Thời Tiết",
      description: "Xem bản đồ radar mưa và mây trực tiếp với công nghệ AI",
      icon: Globe,
      path: "/radar",
      gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      iconColor: "#764ba2",
    },
    {
      id: "alerts",
      title: "Cảnh Báo Thời Tiết",
      description:
        "Nhận thông báo về các hiện tượng thời tiết cực đoan kịp thời",
      icon: Bell,
      path: "/alerts",
      gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      iconColor: "#667eea",
    },
    {
      id: "locations",
      title: "Nhiều Địa Điểm",
      description:
        "Theo dõi thời tiết ở nhiều thành phố khác nhau trên toàn thế giới",
      icon: MapPin,
      path: "/locations",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      iconColor: "#fa709a",
    },
    {
      id: "analytics",
      title: "Thống Kê & Xu Hướng",
      description: "Phân tích dữ liệu thời tiết theo thời gian với AI insights",
      icon: TrendingUp,
      path: "/analytics",
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
      name: "Nguyễn Văn An",
      role: "Nông dân",
      content:
        "Ứng dụng giúp tôi dự báo thời tiết chính xác, rất hữu ích cho việc canh tác.",
      rating: 5,
      avatar: "👨‍🌾",
    },
    {
      name: "Trần Thị Bình",
      role: "Du lịch viên",
      content:
        "Giao diện đẹp, thông tin chi tiết. Không thể thiếu khi đi du lịch!",
      rating: 5,
      avatar: "✈️",
    },
    {
      name: "Lê Minh Cường",
      role: "Thủy thủ",
      content:
        "Cảnh báo thời tiết cực đoan rất kịp thời, giúp tôi tránh được nhiều rủi ro.",
      rating: 5,
      avatar: "⚓",
    },
  ];

  // const parallaxOffset = scrollY * 0.5;

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div
        style={{
          ...styles.animatedBg,
          transform: `translateY(${0}px)`,
        }}
      />

      {/* Floating Weather Icons */}
      <div style={styles.floatingElements}>
        {[Sun, Cloud, CloudRain, Wind].map((Icon, index) => (
          <div
            key={index}
            style={{
              ...styles.floatingIcon,
              top: `${20 + index * 15}%`,
              left: `${10 + index * 20}%`,
              animationDelay: `${index * 2}s`,
            }}
          >
            <Icon size={24} style={{ color: "rgba(255,255,255,0.1)" }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Cloud size={28} color="white" />
            </div>
            <div style={styles.logoText}>
              <h1 style={styles.logoTitle}>WeatherPro</h1>
              <p style={styles.logoSubtitle}>Thời tiết thông minh</p>
            </div>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.timeDisplay}>
              <p style={styles.time}>
                {currentTime.toLocaleTimeString("vi-VN")}
              </p>
              <p style={styles.date}>
                {currentTime.toLocaleDateString("vi-VN")}
              </p>
            </div>
            <button style={styles.settingsBtn}>
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroIcon}>
            <Cloud size={60} color="white" />
          </div>

          <h1 style={styles.heroTitle}>
            Weather<span style={styles.heroTitleAccent}>Pro</span>
          </h1>

          <p style={styles.heroDescription}>
            Ứng dụng thời tiết thông minh với AI, dự báo chính xác 98%, giao
            diện đẹp mắt và trải nghiệm người dùng tuyệt vời
          </p>

          <div style={styles.heroButtons}>
            <button
              onClick={() => navigate("/weather-app")}
              style={styles.primaryBtn}
            >
              <Sun size={20} />
              <span>Khám Phá Ngay</span>
              <ChevronRight size={20} />
            </button>
            <button style={styles.secondaryBtn}>Xem Demo</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: stat.color }}>
                <stat.icon size={24} color="white" />
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Tính Năng Nổi Bật</h2>
          <p style={styles.sectionDescription}>
            Khám phá các tính năng mạnh mẽ được tích hợp AI và machine learning
          </p>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature) => (
            <div
              key={feature.id}
              style={{
                ...styles.featureCard,
                background: feature.gradient,
                transform:
                  hoveredFeature === feature.id
                    ? "translateY(-10px) scale(1.02)"
                    : "translateY(0) scale(1)",
              }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{ ...styles.featureIcon, color: feature.iconColor }}>
                <feature.icon size={32} />
              </div>

              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>

              <div style={styles.featureLink}>
                <span>Khám phá ngay</span>
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
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Người Dùng Nói Gì</h2>
          <p style={styles.sectionDescription}>
            Hơn 1 triệu người dùng tin tưởng WeatherPro
          </p>
        </div>

        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    style={{ color: "#ffd700", fill: "#ffd700" }}
                  />
                ))}
              </div>

              <p style={styles.testimonialContent}>"{testimonial.content}"</p>

              <div style={styles.testimonialAuthor}>
                <span style={styles.testimonialAvatar}>
                  {testimonial.avatar}
                </span>
                <div>
                  <div style={styles.testimonialName}>{testimonial.name}</div>
                  <div style={styles.testimonialRole}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>
            Sẵn sàng trải nghiệm thời tiết thông minh?
          </h2>
          <p style={styles.ctaDescription}>
            Tham gia cùng hàng triệu người dùng đang tin tưởng WeatherPro
          </p>

          <div style={styles.ctaButtons}>
            <button style={styles.ctaPrimaryBtn}>
              <Thermometer size={20} />
              <span>Bắt Đầu Miễn Phí</span>
            </button>
            <button style={styles.ctaSecondaryBtn}>Tải Ứng Dụng</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.footerLogoIcon}>
              <Cloud size={24} color="white" />
            </div>
            <div>
              <h3 style={styles.footerLogoText}>WeatherPro</h3>
              <p style={styles.footerLogoSubtext}>Thời tiết thông minh</p>
            </div>
          </div>

          <div style={styles.footerCopyright}>
            © 2025 WeatherPro. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    color: "#333",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  animatedBg: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "120%",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 20s ease infinite",
    zIndex: -2,
  },

  floatingElements: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: -1,
  },

  floatingIcon: {
    position: "absolute",
    animation: "float 6s ease-in-out infinite",
  },

  header: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  logoIcon: {
    width: "50px",
    height: "50px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
  },

  logoText: {
    color: "white",
  },

  logoTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
  },

  logoSubtitle: {
    fontSize: "0.9rem",
    opacity: 0.8,
    margin: 0,
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },

  timeDisplay: {
    textAlign: "right",
    color: "white",
  },

  time: {
    fontSize: "1.1rem",
    fontWeight: "600",
    margin: 0,
  },

  date: {
    fontSize: "0.9rem",
    opacity: 0.8,
    margin: 0,
  },

  settingsBtn: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },

  hero: {
    padding: "120px 2rem",
    textAlign: "center",
    position: "relative",
  },

  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  heroIcon: {
    width: "120px",
    height: "120px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 2rem",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },

  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 5rem)",
    fontWeight: "800",
    margin: "0 0 1.5rem",
    color: "white",
    textShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  heroTitleAccent: {
    background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroDescription: {
    fontSize: "1.3rem",
    color: "rgba(255,255,255,0.9)",
    margin: "0 0 3rem",
    lineHeight: 1.7,
  },

  heroButtons: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    padding: "18px 36px",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 15px 35px rgba(102, 126, 234, 0.4)",
    minWidth: "200px",
    justifyContent: "center",
  },

  secondaryBtn: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "2px solid rgba(255,255,255,0.3)",
    padding: "18px 36px",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(20px)",
    minWidth: "150px",
  },

  statsSection: {
    padding: "80px 2rem",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
  },

  statsGrid: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },

  statCard: {
    textAlign: "center",
    color: "white",
  },

  statIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  },

  statValue: {
    fontSize: "2.5rem",
    fontWeight: "800",
    margin: "0 0 0.5rem",
    textShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },

  statLabel: {
    fontSize: "1.1rem",
    opacity: 0.9,
  },

  featuresSection: {
    padding: "120px 2rem",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))",
    backdropFilter: "blur(20px)",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: "4rem",
    maxWidth: "600px",
    margin: "0 auto 4rem",
  },

  sectionTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    margin: "0 0 1rem",
    color: "#2d3748",
  },

  sectionDescription: {
    fontSize: "1.2rem",
    color: "#4a5568",
    lineHeight: 1.7,
  },

  featuresGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
  },

  featureCard: {
    padding: "2.5rem",
    borderRadius: "25px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.5)",
    position: "relative",
    overflow: "hidden",
  },

  featureIcon: {
    marginBottom: "1.5rem",
    display: "inline-block",
  },

  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 1rem",
    color: "#2d3748",
  },

  featureDescription: {
    fontSize: "1rem",
    color: "#4a5568",
    lineHeight: 1.7,
    margin: "0 0 2rem",
  },

  featureLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#667eea",
    fontWeight: "600",
    fontSize: "1rem",
  },

  testimonialsSection: {
    padding: "120px 2rem",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  testimonialsGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },

  testimonialCard: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    padding: "2rem",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
  },

  testimonialStars: {
    display: "flex",
    gap: "0.2rem",
    marginBottom: "1rem",
  },

  testimonialContent: {
    fontSize: "1.1rem",
    fontStyle: "italic",
    lineHeight: 1.7,
    margin: "0 0 1.5rem",
  },

  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  testimonialAvatar: {
    fontSize: "2rem",
  },

  testimonialName: {
    fontWeight: "600",
    fontSize: "1rem",
  },

  testimonialRole: {
    fontSize: "0.9rem",
    opacity: 0.8,
  },

  ctaSection: {
    padding: "120px 2rem",
    background: "linear-gradient(135deg, #2d3748, #4a5568)",
    textAlign: "center",
  },

  ctaContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },

  ctaTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "white",
    margin: "0 0 1.5rem",
  },

  ctaDescription: {
    fontSize: "1.2rem",
    color: "rgba(255,255,255,0.9)",
    margin: "0 0 3rem",
    lineHeight: 1.7,
  },

  ctaButtons: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  ctaPrimaryBtn: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    padding: "18px 36px",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 15px 35px rgba(102, 126, 234, 0.4)",
  },

  ctaSecondaryBtn: {
    background: "transparent",
    color: "white",
    border: "2px solid rgba(255,255,255,0.3)",
    padding: "18px 36px",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  footer: {
    background: "#1a202c",
    padding: "3rem 2rem",
  },

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2rem",
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  footerLogoIcon: {
    width: "50px",
    height: "50px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footerLogoText: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "white",
    margin: 0,
  },

  footerLogoSubtext: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  },

  footerCopyright: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.9rem",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @media (max-width: 768px) {
    .heroButtons, .ctaButtons {
      flex-direction: column;
      align-items: center;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Home;
