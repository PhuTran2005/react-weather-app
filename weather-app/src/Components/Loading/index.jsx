import React, { useState, useEffect } from "react";

// Sun Loading Animation
export const SunLoading = () => (
  <div
    className="flex flex-col items-center justify-center h-48 bg-gradient-to-b from-yellow-500 to-red-300 rounded-2xl"
    style={{
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "101",
      borderRadius: "10px",
    }}
  >
    <div className="relative">
      {/* Sun rays */}
      <div className="absolute inset-0 animate-spin">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-yellow-400 rounded-full"
            style={{
              transformOrigin: "2px 32px",
              transform: `rotate(${i * 45}deg)`,
              top: "-16px",
              left: "50%",
              marginLeft: "-2px",
            }}
          />
        ))}
      </div>
      {/* Sun core */}
      <div className="w-16 h-16 bg-yellow-500 rounded-full shadow-lg animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-yellow-200 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
    <p className="mt-4 text-orange-700 font-semibold">Đang tải dữ liệu ...</p>
  </div>
);

// Rain Loading Animation
export const RainLoading = () => (
  <div
    className="flex flex-col items-center justify-center h-48 bg-gradient-to-b from-gray-400 to-blue-500 rounded-2xl relative overflow-hidden"
    style={{
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "101",
      borderRadius: "10px",
    }}
  >
    {/* Cloud */}
    <div className="relative mb-6">
      <div className="w-20 h-12 bg-gray-600 rounded-full relative">
        <div className="absolute -left-2 top-2 w-8 h-8 bg-gray-600 rounded-full"></div>
        <div className="absolute -right-2 top-1 w-10 h-10 bg-gray-600 rounded-full"></div>
      </div>
    </div>

    {/* Rain drops */}
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-6 bg-blue-300 rounded-full animate-bounce opacity-70"
          style={{
            left: `${20 + i * 5}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
            top: "60%",
          }}
        />
      ))}
    </div>

    <p className="mt-8 text-blue-100 font-semibold relative z-10">
      Đang tải dữ liệu ...
    </p>
  </div>
);

// Snow Loading Animation
export const SnowLoading = () => (
  <div
    className="flex flex-col items-center justify-center h-48 bg-gradient-to-b from-blue-200 to-white rounded-2xl relative overflow-hidden"
    style={{
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "101",
      borderRadius: "10px",
    }}
  >
    {/* Snowflakes */}
    <div className="absolute inset-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-blue-400 animate-bounce opacity-80"
          style={{
            left: `${Math.random() * 90}%`,
            fontSize: `${12 + Math.random() * 8}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            top: `${10 + Math.random() * 70}%`,
          }}
        >
          ❄
        </div>
      ))}
    </div>

    {/* Snowman */}
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-300 mb-1"></div>
      <div className="w-12 h-12 bg-white rounded-full border-2 border-blue-300 mb-1"></div>
      <div className="w-16 h-16 bg-white rounded-full border-2 border-blue-300"></div>
    </div>

    <p className="mt-4 text-blue-700 font-semibold relative z-10">
      Đang tải dữ liệu ...
    </p>
  </div>
);

// Wind Loading Animation
export const WindLoading = () => (
  <div
    className="flex flex-col items-center justify-center h-48 bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl"
    style={{
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "101",
      borderRadius: "10px",
    }}
  >
    {/* Wind lines */}
    <div className="space-y-3 mb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-1">
          {[...Array(3)].map((_, j) => (
            <div
              key={j}
              className="h-1 bg-white rounded-full animate-pulse"
              style={{
                width: `${20 + j * 10}px`,
                animationDelay: `${i * 0.1 + j * 0.05}s`,
                opacity: 0.7 - i * 0.1,
              }}
            />
          ))}
        </div>
      ))}
    </div>

    {/* Spinning leaves */}
    <div className="relative">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute text-green-600 animate-spin text-lg"
          style={{
            animationDuration: `${1 + i * 0.5}s`,
            left: `${i * 20}px`,
            top: `${i * 10}px`,
          }}
        >
          🍃
        </div>
      ))}
    </div>

    <p className="mt-8 text-teal-800 font-semibold">Đang tải dữ liệu ...</p>
  </div>
);

// Thunder Loading Animation
export const ThunderLoading = () => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center h-48 bg-gradient-to-b from-gray-800 to-purple-900 rounded-2xl transition-all duration-200 ${
        flash ? "bg-white" : ""
      }`}
      style={{
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        zIndex: "101",
        borderRadius: "10px",
      }}
    >
      {/* Dark cloud */}
      <div className="relative mb-4">
        <div className="w-24 h-14 bg-gray-900 rounded-full relative">
          <div className="absolute -left-3 top-3 w-10 h-10 bg-gray-900 rounded-full"></div>
          <div className="absolute -right-3 top-2 w-12 h-12 bg-gray-900 rounded-full"></div>
        </div>
      </div>

      {/* Lightning bolt */}
      <div className="text-yellow-400 text-4xl animate-pulse">⚡</div>

      <p
        className={`mt-4 font-semibold transition-colors duration-200 ${
          flash ? "text-gray-800" : "text-yellow-300"
        }`}
      >
        Đang tải dữ liệu ...
      </p>
    </div>
  );
};

// Cloudy Loading Animation
export const CloudyLoading = () => (
  <div
    className="flex flex-col items-center justify-center h-48 bg-gradient-to-b from-gray-300 to-gray-500 rounded-2xl"
    style={{
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "101",
      borderRadius: "10px",
    }}
  >
    {/* Floating clouds */}
    <div className="relative">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-16 h-10 bg-white rounded-full opacity-${
            70 - i * 10
          } animate-pulse`}
          style={{
            left: `${i * 15}px`,
            top: `${i * 8}px`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + i * 0.5}s`,
          }}
        >
          <div className="absolute -left-2 top-2 w-6 h-6 bg-white rounded-full"></div>
          <div className="absolute -right-2 top-1 w-8 h-8 bg-white rounded-full"></div>
        </div>
      ))}
    </div>

    <p className="mt-12 text-gray-700 font-semibold">Đang tải dữ liệu...</p>
  </div>
);
