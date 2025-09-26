import "./WeatherApp.scss";
import WeatherSearch from "./WeatherSearch";
import WeatherAbout from "./WeatherAbout";
import WeatherContent from "./WeatherContent";
import WeatherDateTime from "./WeatherDateTime";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherAnimation from "../Animations/WeatherAnimation";
import NightEffect from "../Mode/Night";
import DayEffect from "../Mode/Day";
import defaultImg from "../../assets/img/defaut.png";
import {
  CloudyLoading,
  RainLoading,
  SnowLoading,
  SunLoading,
  ThunderLoading,
  WindLoading,
} from "../Loading";
import SlidingSidebar from "../SideBar";
import ModernSidebar from "../SideBar";
import { setWeatherData } from "../../features/Weather/weatherSlice";
import { Navigate } from "react-router-dom";
import { getImageFromUnsplash } from "../../services/locationService";
import {
  getAirPollutionbyLocation,
  getWeatherbyLocation,
} from "../../services/weatherService";
const WeatherApp = () => {
  const weatherData = useSelector((state) => state.weather.value);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [randomVal, setRandomVal] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  const generateRandomVal = () => {
    setRandomVal(Math.floor(Math.random() * LoadingAnimation.length));
  };
  const turnOnLoading = () => {
    setIsLoading(true);
  };
  const turnOffLoading = () => {
    setIsLoading(false);
  };
  const LoadingAnimation = [
    <SunLoading />,
    <RainLoading />,
    <CloudyLoading />,
    <ThunderLoading />,
    <WindLoading />,
    <SnowLoading />,
  ];
  const footerContent = (
    <div className="text-center">
      <p className="text-xs opacity-75">© 2025 Weather app</p>
      <p className="text-xs opacity-50">Version 1.0.0</p>
    </div>
  );
  const sampleUser = {
    name: weatherData ? weatherData.current.condition.text : "Condition",
    avatar: weatherData ? weatherData.current.condition.icon : defaultImg,
  };
  const fetchData = async (location) => {
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
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    let saved = localStorage.getItem("my_location");
    if (saved && weatherData === null) {
      const location = JSON.parse(saved);
      turnOnLoading();
      fetchData(location);
      turnOffLoading();
    }
  }, []);
  return (
    <>
      <div className="weatherApp ">
        <ModernSidebar
          isOpen={openSidebar}
          onClose={() => toggleSidebar()}
          title="Condition"
          user={sampleUser}
          // menuItems={}
          theme={"light"}
          position={"right"}
          showSearch={true}
          footer={footerContent}
        />
        <WeatherAnimation
          key={weatherData?.location?.name || "default"}
          weatherCondition={
            !isLoading && weatherData
              ? weatherData.current.condition.text
                  .toLowerCase()
                  .includes("clear")
                ? weatherData.current.is_day
                  ? "sun"
                  : "moon"
                : weatherData.current.condition.text.toLowerCase()
              : "none"
          }
        >
          <div
            className="weatherApp__main"
            style={{
              backgroundImage: weatherData && `url(${weatherData.locationImg})`,
            }}
          >
            {isLoading && LoadingAnimation[randomVal]}
            {weatherData &&
              (!weatherData.current.is_day ? <NightEffect /> : <DayEffect />)}
            <WeatherSearch
              generateRandomVal={generateRandomVal}
              turnOn={turnOnLoading}
              turnOff={turnOffLoading}
              toggleSidebar={toggleSidebar}
            />
            <WeatherDateTime />
            <WeatherContent />
            <div
              className="weatherApp__main__predict"
              style={{
                color:
                  weatherData && !weatherData.current.is_day
                    ? "white"
                    : "black",
              }}
            >
              {weatherData ? weatherData.current.condition.text : "Condition"}
            </div>
            <WeatherAbout />
          </div>
        </WeatherAnimation>
      </div>
    </>
  );
};
export default WeatherApp;
