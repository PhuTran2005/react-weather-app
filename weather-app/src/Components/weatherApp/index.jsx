import "./WeatherApp.scss";
import WeatherSearch from "./WeatherSearch";
import WeatherAbout from "./WeatherAbout";
import WeatherContent from "./WeatherContent";
import WeatherDateTime from "./WeatherDateTime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WeatherAnimation from "../Animations/WeatherAnimation";
import NightEffect from "../Mode/Night";
import DayEffect from "../Mode/Day";
import {
  CloudyLoading,
  RainLoading,
  SnowLoading,
  SunLoading,
  ThunderLoading,
  WindLoading,
} from "../Loading";
const WeatherApp = () => {
  const weatherData = useSelector((state) => state.weather.value);
  const [isLoading, setIsLoading] = useState(false);
  const [randomVal, setRandomVal] = useState(0);
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
  useEffect(() => {}, []);
  return (
    <>
      <div className="weatherApp ">
        <WeatherAnimation
          key={weatherData?.location?.name || "default"}
          weatherCondition={
            !isLoading && weatherData
              ? weatherData.current.condition.text.toLowerCase()
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
