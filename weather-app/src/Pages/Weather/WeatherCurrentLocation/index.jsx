import React, { useState, useEffect } from "react";
import {
  CloudyLoading,
  RainLoading,
  SnowLoading,
  SunLoading,
  ThunderLoading,
  WindLoading,
} from "../../../Components/Loading";
import Swal from "sweetalert2";
import {
  getAirPollutionbyLocation,
  getWeatherbyLocation,
} from "../../../services/weatherService";
import { useDispatch } from "react-redux";
import { getImageFromUnsplash } from "../../../services/locationService";
import { setWeatherData } from "../../../features/Weather/weatherSlice";
import { useNavigate } from "react-router-dom";

const LoadingAnimation = [
  <SunLoading />,
  <RainLoading />,
  <CloudyLoading />,
  <ThunderLoading />,
  <WindLoading />,
  <SnowLoading />,
];

const WeatherCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomVal] = useState(
    Math.floor(Math.random() * LoadingAnimation.length)
  );

  // Lấy vị trí
  useEffect(() => {
    const saved = localStorage.getItem("my_location");
    if (saved) {
      setLocation(JSON.parse(saved));
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(coords);
          localStorage.setItem("my_location", JSON.stringify(coords));
        },
        (error) => {
          console.warn("Geolocation error:", error);

          let fallback = { lat: 21.0285, lng: 105.8542 }; // Hà Nội mặc định
          setLocation(fallback);
          localStorage.setItem("my_location", JSON.stringify(fallback));

          Swal.fire({
            title: "Không lấy được vị trí",
            text: "Ứng dụng sẽ dùng vị trí mặc định.",
            icon: "warning",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/weather-app");
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      let fallback = { lat: 21.0285, lng: 105.8542 };
      setLocation(fallback);
      localStorage.setItem("my_location", JSON.stringify(fallback));

      Swal.fire({
        title: "Trình duyệt không hỗ trợ",
        text: "Ứng dụng sẽ dùng vị trí mặc định.",
        icon: "info",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/weather-app");
      });
    }
  }, []);

  // Lấy weather data khi đã có location
  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      try {
        const data = await getWeatherbyLocation(location.lat, location.lng);
        const airPollutionData = await getAirPollutionbyLocation(
          location.lat,
          location.lng
        );
        console.log("Air Pollution Data:", airPollutionData);
        const locationImg = await getImageFromUnsplash(data.name);

        dispatch(
          setWeatherData({
            ...data,
            locationImg,
            airPollution: airPollutionData.list[0],
          })
        );
        navigate("/weather-app"); // chuyển hướng sau khi xong
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [location, dispatch, navigate]);

  return LoadingAnimation[randomVal];
};

export default WeatherCurrentLocation;
