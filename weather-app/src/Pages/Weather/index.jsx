import { Outlet } from "react-router-dom";
import ClickSpark from "../../Components/Animations/ClickSpark";
import Aurora from "../../Components/Background/Aurora";
import WeatherApp from "../../Components/weatherApp";
import { useWindowSize } from "../../helpers";

const Weather = () => {
  const { width } = useWindowSize();
  return (
    <>
      {width > 475 && (
        <Aurora
          colorStops={["#5227FF", "#7CFF67", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      )}
      <WeatherApp />
      <Outlet />
    </>
  );
};
export default Weather;
