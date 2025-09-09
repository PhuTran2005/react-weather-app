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
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/weather-app"); // chuyển hướng sau khi xong
            }
          });
        }
      );
    } else {
      Swal.fire({
        title: "Error",
        text: "Browser does not support Geolocation",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Navigate to home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/weather-app"); // chuyển hướng sau khi xong
        }
      });
    } // oce
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
