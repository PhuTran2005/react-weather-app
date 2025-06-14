import { useRef } from "react";
import defaultImg from "../../assets/img/defaut.png";
import { useSelector } from "react-redux";
const WeatherContent = () => {
  const weatherData = useSelector((state) => state.weather.value);

  const divContent = useRef(null);
  const divContentTemp = useRef(null);
  const divContentIcon = useRef(null);
  const handleClickTemperature = () => {
    if (!divContent.current.classList.contains("rotate")) {
      divContent.current.classList.add("rotate");
      setTimeout(() => {
        divContentTemp.current.classList.toggle("hide");
        divContentIcon.current.classList.toggle("hide");
      }, 900);
      setTimeout(() => {
        divContent.current.classList.remove("rotate");
      }, 2000);
    }
  };
  return (
    <>
      <div
        ref={divContent}
        className="weatherApp__main__content"
        onClick={handleClickTemperature}
      >
        <div ref={divContentTemp} className="weatherApp__main__temperature">
          <strong
            id="temperature"
            style={{
              color:
                weatherData && !weatherData.current.is_day ? "white" : "black",
            }}
          >
            {weatherData ? weatherData.current.temp_c : "Temp"}
          </strong>
          <strong
            style={{
              color:
                weatherData && !weatherData.current.is_day ? "white" : "black",
            }}
          >
            <sup
              style={{
                color:
                  weatherData && !weatherData.current.is_day
                    ? "white"
                    : "black",
              }}
            >
              o
            </sup>
            C
          </strong>
        </div>
        <div ref={divContentIcon} className="weatherApp__main__icon hide">
          <img
            src={weatherData ? weatherData.current.condition.icon : defaultImg}
            alt="a"
          />
        </div>
      </div>
    </>
  );
};
export default WeatherContent;
