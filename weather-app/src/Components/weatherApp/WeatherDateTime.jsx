import { useSelector } from "react-redux";
import { changeStandardDateTime } from "../../helpers";
import { SunIcon } from "../CreatedIcon";

const WeatherDateTime = () => {
  const weatherData = useSelector((state) => state.weather.value);
  return (
    <>
      <div className="weatherApp__main__adrress">
        <strong
          style={{
            color:
              weatherData && !weatherData.current.is_day ? "white" : "black",
          }}
        >
          {weatherData
            ? `${weatherData.location.name}, ${weatherData.location.country}`
            : "City,Country"}
        </strong>
      </div>
      <div className="weatherApp__main__time">
        <strong
          style={{
            color:
              weatherData && !weatherData.current.is_day ? "white" : "black",
          }}
        >
          {weatherData
            ? changeStandardDateTime(weatherData.location.localtime) +
              (!weatherData.current.is_day ? ", Night" : ", Day")
            : "day/month/year, hour:minute"}
        </strong>
      </div>
    </>
  );
};
export default WeatherDateTime;
