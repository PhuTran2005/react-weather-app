import React, { useState, useEffect } from "react";
import "./WeatherAnimation.scss";
import { useWindowSize } from "../../../helpers";
// Component hiệu ứng thời tiết
const WeatherAnimation = ({ weatherCondition, children, className = "" }) => {
  const [particles, setParticles] = useState([]);
  const [thunderFlash, setThunderFlash] = useState(false);
  const [lightningBolt, setLightningBolt] = useState(null);
  const [mistLayers, setMistLayers] = useState([]);
  // Tạo particle (mưa/tuyết)
  const createParticle = (type) => {
    const baseParticle = {
      id: Math.random(),
      left: Math.random() * 100,
      duration: Math.random() * 1 + 1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    };

    switch (type) {
      case "rain":
        return { ...baseParticle, width: 2, height: 10, color: "#3b82f6" };
      case "snow":
        return {
          ...baseParticle,
          width: 4,
          height: 4,
          color: "#ffffff",
          duration: Math.random() * 2 + 2,
        };
      case "drizzle":
        return {
          ...baseParticle,
          width: 2,
          height: 6,
          color: "#60a5fa",
          opacity: 0.6,
        };
      default:
        return baseParticle;
    }
  };

  // Tạo tia chớp
  const createLightningBolt = () => ({
    id: Math.random(),
    startX: Math.random() * 60 + 20,
    segments: generateLightningPath(),
  });

  const generateLightningPath = () => {
    const segments = [];
    let currentX = 0;
    let currentY = 0;

    for (let i = 0; i < 6; i++) {
      const nextX = currentX + (Math.random() - 0.5) * 60;
      const nextY = currentY + 50 + Math.random() * 30;
      segments.push({ x: nextX, y: nextY });
      currentX = nextX;
      currentY = nextY;
    }
    return segments;
  };
  // Tạo lớp sương mù
  const createMistLayer = () => ({
    id: Math.random(),
    left: Math.random() * 120 - 10, // Từ -10% đến 110%
    top: Math.random() * 80 + 10, // Từ 10% đến 90%
    width: Math.random() * 200 + 100, // 100px đến 300px
    height: Math.random() * 60 + 40, // 40px đến 100px
    opacity: Math.random() * 0.4 + 0.1, // 0.1 đến 0.5
    duration: Math.random() * 15 + 10, // 10s đến 25s
    delay: Math.random() * 5,
  });
  // Hiệu ứng sấm chớp
  const triggerThunder = () => {
    setLightningBolt(createLightningBolt());
    setThunderFlash(true);
    setTimeout(() => setThunderFlash(false), 100);

    setTimeout(() => {
      setThunderFlash(true);
      setTimeout(() => setThunderFlash(false), 80);
    }, 150);

    setTimeout(() => {
      setThunderFlash(true);
      setTimeout(() => {
        setThunderFlash(false);
        setLightningBolt(null);
      }, 60);
    }, 280);
  };

  // Quản lý hiệu ứng theo thời tiết
  useEffect(() => {
    let particleInterval;
    let thunderInterval;
    let sunInterval;
    let mistInterval;
    // Reset particles
    setParticles([]);
    setMistLayers([]);
    if (weatherCondition.includes("rain")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 5; i++) {
            newParticles.push(createParticle("rain"));
          }
          return newParticles.slice(-40);
        });
      }, 100);
    }

    if (weatherCondition.includes("thunderstorm")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 6; i++) {
            newParticles.push(createParticle("rain"));
          }
          return newParticles.slice(-50);
        });
      }, 80);

      thunderInterval = setInterval(() => {
        if (Math.random() < 0.4) {
          triggerThunder();
        }
      }, 2000);
    }
    if (weatherCondition.includes("thunder")) {
      thunderInterval = setInterval(() => {
        if (Math.random() < 0.4) {
          triggerThunder();
        }
      }, 2000);
    }
    if (weatherCondition.includes("snow")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 3; i++) {
            newParticles.push(createParticle("snow"));
          }
          return newParticles.slice(-30);
        });
      }, 200);
    }

    if (weatherCondition.includes("drizzle")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 2; i++) {
            newParticles.push(createParticle("drizzle"));
          }
          return newParticles.slice(-20);
        });
      }, 150);
    }
    if (weatherCondition.includes("mist") || weatherCondition.includes("fog")) {
      // Tạo các lớp sương mù ban đầu
      const initialMistLayers = [];
      for (let i = 0; i < 6; i++) {
        initialMistLayers.push(createMistLayer());
      }
      setMistLayers(initialMistLayers);

      // Thêm lớp sương mù mới theo thời gian
      mistInterval = setInterval(() => {
        setMistLayers((prev) => {
          const newLayers = [...prev];
          if (newLayers.length < 8) {
            newLayers.push(createMistLayer());
          }
          return newLayers;
        });
      }, 3000);
    }

    return () => {
      clearInterval(particleInterval);
      clearInterval(thunderInterval);
      clearInterval(sunInterval);
    };
  }, [weatherCondition]);
  const { width } = useWindowSize();

  return (
    <div
      className={`relative overflow-hidden transition-all duration-1000  ${className}`}
      style={{
        backgroundColor: "transparent",
        borderRadius: "10px",
        width: width <= 475 ? "100%" : "",
        height: width <= 475 ? "100%" : "",
      }}
    >
      {/* Hiệu ứng sấm chớp */}
      {thunderFlash && (
        <>
          <div className="absolute inset-0 bg-white opacity-80 pointer-events-none z-20"></div>
          <div className="absolute inset-0 bg-blue-200 opacity-60 pointer-events-none z-19"></div>
          <div className="absolute inset-0 bg-yellow-100 opacity-40 pointer-events-none z-18"></div>
        </>
      )}

      {/* Tia chớp */}
      {lightningBolt && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-21">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={`M ${lightningBolt.startX} 0 ${lightningBolt.segments
              .map((seg) => `L ${lightningBolt.startX + seg.x} ${seg.y}`)
              .join(" ")}`}
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            opacity="0.9"
          />
        </svg>
      )}

      {/* Particles (mưa/tuyết) */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            backgroundColor: particle.color,
            borderRadius: weatherCondition === "snow" ? "50%" : "0",
            opacity: particle.opacity,
            animation: `fall ${particle.duration}s linear infinite`,
          }}
        />
      ))}

      {/* Hiệu ứng ánh nắng */}
      {(weatherCondition.includes("day") ||
        weatherCondition.includes("sun")) && (
        <>
          {/* Mặt trời */}
          <div className="pointer-events-none absolute top-20 right-9 w-14 h-14 bg-yellow-400 rounded-full opacity-80 animate-pulse z-20"></div>
          <div className="pointer-events-none absolute top-[75px] right-[25px] w-20 h-20 bg-yellow-300 rounded-full opacity-40 animate-ping z-10"></div>

          {/* Container quay các tia nắng */}
          <div
            className="pointer-events-none absolute top-20 right-8 w-16 h-16 animate-spin-slow z-10 origin-center"
            style={{ transformOrigin: "center center" }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/4 w-0.5 h-5 bg-yellow-300 opacity-60"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-45px)`,
                  transformOrigin: "center bottom",
                }}
              />
            ))}
          </div>
        </>
      )}
      {/* Hiệu ứng mặt trăng */}
      {(weatherCondition.includes("night") ||
        weatherCondition.includes("moon")) && (
        <>
          {/* Mặt trăng chính */}
          <div className="pointer-events-none absolute top-20 right-9 w-14 h-14 bg-gray-100 rounded-full opacity-90 animate-pulse z-20 shadow-lg shadow-gray-300/50">
            {/* Miệng núi trên mặt trăng */}
            <div className="absolute top-2 left-3 w-2 h-2 bg-gray-300 rounded-full opacity-60"></div>
            <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-50"></div>
            <div className="absolute bottom-3 left-2 w-1 h-1 bg-gray-300 rounded-full opacity-40"></div>
          </div>

          {/* Halo ánh sáng mặt trăng */}
          <div className="pointer-events-none absolute top-[70px] right-[25px] w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-ping z-10"></div>
          <div className="pointer-events-none absolute top-[60px] right-[17px] w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-pulse z-5"></div>

          {/* Container quay các tia sáng mặt trăng */}
          {/* <div
            className="pointer-events-none absolute top-20 right-8 w-16 h-16 animate-spin-slow z-10 origin-center"
            style={{
              transformOrigin: "center center",
              animationDuration: "20s", // Quay chậm hơn mặt trời
            }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/4 w-0.5 h-4 bg-blue-200 opacity-50"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-45px)`,
                  transformOrigin: "center bottom",
                }}
              />
            ))}
          </div> */}

          {/* Các ngôi sao nhỏ xung quanh */}
          <div className="pointer-events-none absolute top-[200px] right-20 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse z-20"></div>
          <div
            className="pointer-events-none absolute top-[100px] right-14 w-0.5 h-0.5 bg-blue-100 rounded-full opacity-70 animate-pulse z-20"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="pointer-events-none absolute top-10 right-32 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse z-20"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="pointer-events-none absolute top-[150px] right-10 w-1 h-1 bg-blue-200 rounded-full opacity-75 animate-pulse z-20"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Hiệu ứng ánh sáng mặt trăng lan tỏa */}
          <div
            className="pointer-events-none absolute top-16 right-4 w-32 h-32 bg-gradient-radial from-blue-100/20 via-blue-50/10 to-transparent rounded-full opacity-60 animate-pulse z-5"
            style={{ animationDuration: "4s" }}
          ></div>
        </>
      )}
      {/* Hiệu ứng sương mù */}
      {(weatherCondition.includes("mist") ||
        weatherCondition.includes("fog")) && (
        <div className="absolute inset-0 pointer-events-none z-15">
          {mistLayers.map((layer) => (
            <div
              key={layer.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${layer.left}%`,
                top: `${layer.top}%`,
                width: `${layer.width}px`,
                height: `${layer.height}px`,
                opacity: layer.opacity,
                filter: "blur(8px)",
                animation: `mistFloat ${layer.duration}s ease-in-out infinite`,
                animationDelay: `${layer.delay}s`,
              }}
            />
          ))}
          {/* Overlay sương mù tổng thể */}
          <div className="absolute inset-0 bg-white opacity-20"></div>
          <div className="absolute inset-0 bg-gray-100 opacity-10"></div>
        </div>
      )}
      {/* Hiệu ứng mây */}
      {(weatherCondition.includes("thunderstorm") ||
        weatherCondition.includes("thunder") ||
        weatherCondition.includes("rain") ||
        weatherCondition.includes("cloudy") ||
        weatherCondition.includes("overcast")) && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-20 left-[-100px] w-36 h-16 bg-gray-400 rounded-full opacity-70 animate-cloudMoveSlow"></div>
          <div className="absolute top-[170px] left-[-150px] w-40 h-20 bg-gray-500 rounded-full opacity-60 animate-cloudMoveFast delay-500"></div>
          <div className="absolute top-[125px] left-[-200px] w-48 h-24 bg-gray-600 rounded-full opacity-50 animate-cloudMoveSlow delay-1000"></div>
        </div>
      )}

      {/* Nội dung */}
      <div
        className="relative z-0"
        style={{
          width: width <= 475 ? "100%" : "",
          height: width <= 475 ? "100%" : "",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default WeatherAnimation;
