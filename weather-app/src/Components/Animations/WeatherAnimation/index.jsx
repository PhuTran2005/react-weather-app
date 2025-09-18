import React, { useState, useEffect } from "react";
import "./WeatherAnimation.scss";
import { useWindowSize } from "../../../helpers";

// Component hiệu ứng thời tiết mở rộng
const WeatherAnimation = ({ weatherCondition, children, className = "" }) => {
  const [particles, setParticles] = useState([]);
  const [thunderFlash, setThunderFlash] = useState(false);
  const [lightningBolt, setLightningBolt] = useState(null);
  const [mistLayers, setMistLayers] = useState([]);
  const [windEffect, setWindEffect] = useState(false);
  const [sandParticles, setSandParticles] = useState([]);
  const [leaves, setLeaves] = useState([]);

  // Tạo particle (mưa/tuyết/mưa đá/blizzard)
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

      case "blizzard":
        return {
          ...baseParticle,
          width: Math.random() * 6 + 2,
          height: Math.random() * 6 + 2,
          color: "#ffffff",
          duration: Math.random() * 0.8 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          windOffset: Math.random() * 30 - 15, // Hiệu ứng gió thổi
        };

      case "hail":
        return {
          ...baseParticle,
          width: Math.random() * 8 + 4,
          height: Math.random() * 8 + 4,
          color: "#e5e7eb",
          duration: Math.random() * 0.6 + 0.4,
          opacity: 0.9,
          bounce: true, // Hiệu ứng nảy
        };

      case "sleet":
        return {
          ...baseParticle,
          width: Math.random() * 3 + 1,
          height: Math.random() * 8 + 4,
          color: "#cbd5e1",
          duration: Math.random() * 1.2 + 0.8,
          opacity: 0.7,
        };

      case "freezing_rain":
        return {
          ...baseParticle,
          width: 2,
          height: 8,
          color: "#38bdf8",
          duration: Math.random() * 1.5 + 1,
          opacity: 0.8,
          freeze: true, // Hiệu ứng đóng băng
        };

      default:
        return baseParticle;
    }
  };

  // Tạo particle cát cho bão cát
  const createSandParticle = () => ({
    id: Math.random(),
    left: Math.random() * 120 - 20,
    top: Math.random() * 100,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 3 + 2,
    color: `#${
      ["d97706", "f59e0b", "fbbf24", "fde047"][Math.floor(Math.random() * 4)]
    }`,
    windForce: Math.random() * 40 + 20,
  });

  // Tạo lá rơi
  const createLeaf = () => ({
    id: Math.random(),
    left: Math.random() * 100,
    size: Math.random() * 15 + 10,
    rotation: Math.random() * 360,
    duration: Math.random() * 4 + 3,
    opacity: Math.random() * 0.8 + 0.2,
    color: `#${
      ["f59e0b", "f97316", "dc2626", "ea580c", "92400e"][
        Math.floor(Math.random() * 5)
      ]
    }`,
    sway: Math.random() * 30 - 15,
  });

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
    left: Math.random() * 120 - 10,
    top: Math.random() * 80 + 10,
    width: Math.random() * 200 + 100,
    height: Math.random() * 60 + 40,
    opacity: Math.random() * 0.4 + 0.1,
    duration: Math.random() * 15 + 10,
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

  // Hiệu ứng gió mạnh
  const triggerWindEffect = () => {
    setWindEffect(true);
    setTimeout(() => setWindEffect(false), 2000);
  };

  // Quản lý hiệu ứng theo thời tiết
  useEffect(() => {
    let particleInterval;
    let thunderInterval;
    let windInterval;
    let mistInterval;
    let sandInterval;
    let leafInterval;

    // Reset particles
    setParticles([]);
    setMistLayers([]);
    setSandParticles([]);
    setLeaves([]);

    // Mưa thường
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

    // Bão tố
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

    // Sấm chớp
    if (weatherCondition.includes("thunder")) {
      thunderInterval = setInterval(() => {
        if (Math.random() < 0.4) {
          triggerThunder();
        }
      }, 2000);
    }

    // Tuyết rơi
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

    // Bão tuyết (Blizzard)
    if (weatherCondition.includes("blizzard")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 8; i++) {
            newParticles.push(createParticle("blizzard"));
          }
          return newParticles.slice(-60);
        });
      }, 60);

      windInterval = setInterval(() => {
        if (Math.random() < 0.7) {
          triggerWindEffect();
        }
      }, 3000);
    }

    // Mưa đá
    if (weatherCondition.includes("hail")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 4; i++) {
            newParticles.push(createParticle("hail"));
          }
          return newParticles.slice(-35);
        });
      }, 120);
    }

    // Mưa tuyết (Sleet)
    if (weatherCondition.includes("sleet")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 3; i++) {
            newParticles.push(createParticle("sleet"));
          }
          return newParticles.slice(-25);
        });
      }, 150);
    }

    // Mưa đóng băng
    if (weatherCondition.includes("freezing")) {
      particleInterval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 4; i++) {
            newParticles.push(createParticle("freezing_rain"));
          }
          return newParticles.slice(-30);
        });
      }, 130);
    }

    // Mưa phùn
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

    // Sương mù
    if (weatherCondition.includes("mist") || weatherCondition.includes("fog")) {
      const initialMistLayers = [];
      for (let i = 0; i < 6; i++) {
        initialMistLayers.push(createMistLayer());
      }
      setMistLayers(initialMistLayers);

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

    // Bão cát
    if (
      weatherCondition.includes("sandstorm") ||
      weatherCondition.includes("dust")
    ) {
      sandInterval = setInterval(() => {
        setSandParticles((prev) => {
          const newParticles = [...prev];
          for (let i = 0; i < 10; i++) {
            newParticles.push(createSandParticle());
          }
          return newParticles.slice(-80);
        });
      }, 100);

      windInterval = setInterval(() => {
        triggerWindEffect();
      }, 2000);
    }

    // Gió mạnh
    if (weatherCondition.includes("windy")) {
      windInterval = setInterval(() => {
        if (Math.random() < 0.6) {
          triggerWindEffect();
        }
      }, 4000);
    }

    // Mùa thu - lá rơi
    if (
      weatherCondition.includes("autumn") ||
      weatherCondition.includes("fall")
    ) {
      leafInterval = setInterval(() => {
        setLeaves((prev) => {
          const newLeaves = [...prev];
          for (let i = 0; i < 2; i++) {
            newLeaves.push(createLeaf());
          }
          return newLeaves.slice(-15);
        });
      }, 800);
    }

    return () => {
      clearInterval(particleInterval);
      clearInterval(thunderInterval);
      clearInterval(windInterval);
      clearInterval(mistInterval);
      clearInterval(sandInterval);
      clearInterval(leafInterval);
    };
  }, [weatherCondition]);

  const { width } = useWindowSize();

  return (
    <div
      className={`relative overflow-hidden transition-all duration-1000 ${className} ${
        windEffect ? "animate-shake" : ""
      }`}
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

      {/* Particles chính (mưa/tuyết/mưa đá) */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: `${particle.left + (particle.windOffset || 0)}%`,
            top: "-10px",
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            backgroundColor: particle.color,
            borderRadius:
              weatherCondition.includes("snow") ||
              weatherCondition.includes("blizzard") ||
              particle.bounce
                ? "50%"
                : "0",
            opacity: particle.opacity,
            animation: particle.bounce
              ? `fallBounce ${particle.duration}s linear infinite`
              : `fall ${particle.duration}s linear infinite`,
            boxShadow: particle.freeze ? "0 0 4px #38bdf8" : "none",
          }}
        />
      ))}

      {/* Particles cát cho bão cát */}
      {sandParticles.map((sand) => (
        <div
          key={sand.id}
          className="absolute pointer-events-none z-12"
          style={{
            left: `${sand.left}%`,
            top: `${sand.top}%`,
            width: `${sand.size}px`,
            height: `${sand.size}px`,
            backgroundColor: sand.color,
            borderRadius: "50%",
            opacity: sand.opacity,
            animation: `sandStorm ${sand.duration}s ease-out infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Lá rơi mùa thu */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none z-11"
          style={{
            left: `${leaf.left}%`,
            top: "-20px",
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            backgroundColor: leaf.color,
            opacity: leaf.opacity,
            borderRadius: "50% 0",
            transform: `rotate(${leaf.rotation}deg)`,
            animation: `leafFall ${leaf.duration}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Hiệu ứng ánh nắng */}
      {(weatherCondition.includes("day") ||
        weatherCondition.includes("sun")) && (
        <>
          <div className="pointer-events-none absolute top-20 right-9 w-14 h-14 bg-yellow-400 rounded-full opacity-80 animate-pulse z-20"></div>
          <div className="pointer-events-none absolute top-[75px] right-[25px] w-20 h-20 bg-yellow-300 rounded-full opacity-40 animate-ping z-10"></div>
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
          <div className="pointer-events-none absolute top-20 right-9 w-14 h-14 bg-gray-100 rounded-full opacity-90 animate-pulse z-20 shadow-lg shadow-gray-300/50">
            <div className="absolute top-2 left-3 w-2 h-2 bg-gray-300 rounded-full opacity-60"></div>
            <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-50"></div>
            <div className="absolute bottom-3 left-2 w-1 h-1 bg-gray-300 rounded-full opacity-40"></div>
          </div>
          <div className="pointer-events-none absolute top-[70px] right-[25px] w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-ping z-10"></div>
          <div className="pointer-events-none absolute top-[60px] right-[17px] w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-pulse z-5"></div>

          {/* Ngôi sao */}
          <div className="pointer-events-none absolute top-[200px] right-20 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse z-20"></div>
          <div
            className="pointer-events-none absolute top-[100px] right-14 w-0.5 h-0.5 bg-blue-100 rounded-full opacity-70 animate-pulse z-20"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="pointer-events-none absolute top-10 right-32 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse z-20"
            style={{ animationDelay: "1s" }}
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
          <div className="absolute inset-0 bg-white opacity-20"></div>
          <div className="absolute inset-0 bg-gray-100 opacity-10"></div>
        </div>
      )}

      {/* Hiệu ứng bão cát */}
      {(weatherCondition.includes("sandstorm") ||
        weatherCondition.includes("dust")) && (
        <div className="absolute inset-0 pointer-events-none z-14">
          <div className="absolute inset-0 bg-yellow-600 opacity-20"></div>
          <div className="absolute inset-0 bg-orange-400 opacity-15"></div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(45deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.2) 100%)",
              filter: "blur(2px)",
            }}
          ></div>
        </div>
      )}

      {/* Hiệu ứng mây */}
      {(weatherCondition.includes("thunderstorm") ||
        weatherCondition.includes("thunder") ||
        weatherCondition.includes("rain") ||
        weatherCondition.includes("cloudy") ||
        weatherCondition.includes("overcast") ||
        weatherCondition.includes("blizzard")) && (
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
