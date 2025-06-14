import React, { useState } from "react";

// Sun Icon Component
const SunIcon = ({ size = 56, glowIntensity = "normal", className = "" }) => {
  const sizeClasses = {
    24: "w-24 h-24",
    32: "w-32 h-32",
    40: "w-40 h-40",
    48: "w-48 h-48",
    56: "w-56 h-56",
    64: "w-64 h-64",
  };

  const glowStyles = {
    subtle: "0 0 40px rgba(255, 193, 7, 0.6), 0 0 80px rgba(255, 193, 7, 0.3)",
    normal:
      "0 0 80px rgba(255, 193, 7, 0.9), 0 0 160px rgba(255, 193, 7, 0.5), 0 0 240px rgba(255, 193, 7, 0.3)",
    intense:
      "0 0 120px rgba(255, 193, 7, 1), 0 0 200px rgba(255, 193, 7, 0.7), 0 0 300px rgba(255, 193, 7, 0.4)",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className="w-full h-full rounded-full bg-gradient-radial from-yellow-200 via-yellow-400 to-orange-500 relative transition-all duration-300 hover:scale-105"
        style={{
          boxShadow: glowStyles[glowIntensity],
        }}
      >
        {/* Long sun rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`long-${i}`}
            className="absolute w-1.5 h-16 bg-gradient-to-t from-transparent via-yellow-300 to-yellow-200 rounded-full"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-${size * 2.5}px)`,
              transformOrigin: `center ${size * 2.5}px`,
            }}
          />
        ))}

        {/* Short sun rays */}
        {[...Array(16)].map((_, i) => (
          <div
            key={`short-${i}`}
            className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-yellow-300 rounded-full opacity-70"
            style={{
              transform: `rotate(${i * 22.5 + 11.25}deg) translateY(-${
                size * 2.2
              }px)`,
              transformOrigin: `center ${size * 2.2}px`,
            }}
          />
        ))}

        {/* Sun core */}
        <div className="absolute inset-2 rounded-full bg-gradient-radial from-white via-yellow-200 to-orange-400 overflow-hidden">
          {/* Solar surface patterns */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-3 w-2 h-2 bg-orange-500 rounded-full blur-sm"></div>
            <div className="absolute top-5 right-4 w-1.5 h-1.5 bg-red-400 rounded-full blur-sm"></div>
            <div className="absolute bottom-4 left-2 w-2.5 h-2.5 bg-orange-600 rounded-full blur-md"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-yellow-600 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-orange-400 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Bright center */}
          <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

// Moon Icon Component
const MoonIcon = ({
  size = 56,
  glowIntensity = "normal",
  phase = "full",
  className = "",
}) => {
  const sizeClasses = {
    24: "w-24 h-24",
    32: "w-32 h-32",
    40: "w-40 h-40",
    48: "w-48 h-48",
    56: "w-56 h-56",
    64: "w-64 h-64",
  };

  const glowStyles = {
    subtle:
      "0 0 30px rgba(229, 231, 235, 0.5), 0 0 60px rgba(229, 231, 235, 0.2)",
    normal:
      "0 0 60px rgba(229, 231, 235, 0.8), 0 0 120px rgba(229, 231, 235, 0.4), 0 0 180px rgba(156, 163, 175, 0.2)",
    intense:
      "0 0 80px rgba(229, 231, 235, 1), 0 0 160px rgba(229, 231, 235, 0.6), 0 0 240px rgba(156, 163, 175, 0.3)",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className="w-full h-full rounded-full bg-gradient-radial from-gray-100 via-gray-200 to-gray-400 relative transition-all duration-300 hover:scale-105 overflow-hidden"
        style={{
          boxShadow: glowStyles[glowIntensity],
        }}
      >
        {/* Moon craters */}
        <div className="absolute inset-2 rounded-full overflow-hidden">
          <div className="absolute top-3 left-4 w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
          <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-40"></div>
          <div className="absolute top-6 left-2 w-1 h-1 bg-gray-400 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-gray-400 rounded-full opacity-45"></div>
          <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-35"></div>
          <div className="absolute top-1/2 left-1.5 w-1 h-1 bg-gray-400 rounded-full opacity-55"></div>
          <div className="absolute top-4 right-1.5 w-2 h-2 bg-gray-400 rounded-full opacity-40"></div>

          {/* Maria (dark areas) */}
          <div className="absolute top-1/3 left-1/4 w-4 h-3 bg-gray-400 rounded-full opacity-25 blur-sm"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-2 bg-gray-400 rounded-full opacity-20 blur-sm"></div>

          {/* Phase shadow effect */}
          {phase === "crescent" && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-transparent to-transparent opacity-60 rounded-full"></div>
          )}
          {phase === "half" && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-600 to-transparent opacity-50 rounded-full"></div>
          )}

          {/* 3D shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-400 opacity-15 rounded-full"></div>
        </div>

        {/* Twinkling stars around moon */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Stars Component
const Stars = ({ count = 25, className = "" }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Clouds Component
const Clouds = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="absolute top-16 left-16 w-32 h-16 bg-white rounded-full opacity-80 animate-float blur-sm"></div>
      <div
        className="absolute top-24 right-20 w-24 h-12 bg-white rounded-full opacity-60 animate-float blur-sm"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-40 left-1/3 w-20 h-10 bg-white rounded-full opacity-70 animate-float blur-sm"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  );
};

// Demo Component
const DayNightDemo = () => {
  const [isDay, setIsDay] = useState(true);
  const [sunSize, setSunSize] = useState(56);
  const [moonSize, setMoonSize] = useState(56);
  const [sunGlow, setSunGlow] = useState("normal");
  const [moonGlow, setMoonGlow] = useState("normal");
  const [moonPhase, setMoonPhase] = useState("full");

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isDay
          ? "bg-gradient-to-b from-sky-400 via-sky-200 to-yellow-100"
          : "bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900"
      }`}
    >
      {/* Environmental Effects */}
      {isDay && <Clouds />}
      {!isDay && <Stars count={30} />}

      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        {/* Main Icons */}
        <div className="flex gap-16 mb-8">
          {isDay ? (
            <SunIcon
              size={sunSize}
              glowIntensity={sunGlow}
              className="cursor-pointer"
              onClick={() => setIsDay(false)}
            />
          ) : (
            <MoonIcon
              size={moonSize}
              glowIntensity={moonGlow}
              phase={moonPhase}
              className="cursor-pointer"
              onClick={() => setIsDay(true)}
            />
          )}
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl">
          <h3 className="text-white text-xl font-bold mb-4 text-center">
            Tùy chỉnh Components
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sun Controls */}
            <div className="space-y-4">
              <h4 className="text-yellow-300 font-semibold">Sun Icon</h4>

              <div>
                <label className="block text-white text-sm mb-2">
                  Kích thước:
                </label>
                <select
                  value={sunSize}
                  onChange={(e) => setSunSize(Number(e.target.value))}
                  className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                >
                  <option value={24}>24 (96px)</option>
                  <option value={32}>32 (128px)</option>
                  <option value={40}>40 (160px)</option>
                  <option value={48}>48 (192px)</option>
                  <option value={56}>56 (224px)</option>
                  <option value={64}>64 (256px)</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Độ phát sáng:
                </label>
                <select
                  value={sunGlow}
                  onChange={(e) => setSunGlow(e.target.value)}
                  className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                >
                  <option value="subtle">Nhẹ</option>
                  <option value="normal">Bình thường</option>
                  <option value="intense">Mạnh</option>
                </select>
              </div>
            </div>

            {/* Moon Controls */}
            <div className="space-y-4">
              <h4 className="text-gray-300 font-semibold">Moon Icon</h4>

              <div>
                <label className="block text-white text-sm mb-2">
                  Kích thước:
                </label>
                <select
                  value={moonSize}
                  onChange={(e) => setMoonSize(Number(e.target.value))}
                  className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                >
                  <option value={24}>24 (96px)</option>
                  <option value={32}>32 (128px)</option>
                  <option value={40}>40 (160px)</option>
                  <option value={48}>48 (192px)</option>
                  <option value={56}>56 (224px)</option>
                  <option value={64}>64 (256px)</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Độ phát sáng:
                </label>
                <select
                  value={moonGlow}
                  onChange={(e) => setMoonGlow(e.target.value)}
                  className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                >
                  <option value="subtle">Nhẹ</option>
                  <option value="normal">Bình thường</option>
                  <option value="intense">Mạnh</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Pha trăng:
                </label>
                <select
                  value={moonPhase}
                  onChange={(e) => setMoonPhase(e.target.value)}
                  className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                >
                  <option value="full">Trăng tròn</option>
                  <option value="crescent">Trăng lưỡi liềm</option>
                  <option value="half">Trăng bán nguyệt</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsDay(!isDay)}
          className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-105 ${
            isDay
              ? "bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white shadow-lg hover:shadow-orange-400/50"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-purple-400/50"
          }`}
        >
          Chuyển sang {isDay ? "Đêm" : "Ngày"}
        </button>

        {/* Usage Examples */}
        <div className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 max-w-4xl">
          <h3 className="text-white text-xl font-bold mb-4">
            Cách sử dụng Components:
          </h3>
          <div className="space-y-4 text-sm">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-green-400 mb-2">// Sun Icon</div>
              <div className="text-gray-300 font-mono">
                {`<SunIcon size={48} glowIntensity="normal" className="my-class" />`}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-green-400 mb-2">// Moon Icon</div>
              <div className="text-gray-300 font-mono">
                {`<MoonIcon size={56} glowIntensity="subtle" phase="crescent" className="my-class" />`}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-green-400 mb-2">// Stars Background</div>
              <div className="text-gray-300 font-mono">
                {`<Stars count={30} className="my-class" />`}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-green-400 mb-2">// Clouds Background</div>
              <div className="text-gray-300 font-mono">
                {`<Clouds className="my-class" />`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(5px);
          }
          66% {
            transform: translateY(-5px) translateX(-3px);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default DayNightDemo;
export { SunIcon, MoonIcon, Stars, Clouds };
