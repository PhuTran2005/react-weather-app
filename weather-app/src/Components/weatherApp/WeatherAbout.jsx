import { useEffect, useRef, useState } from "react";
import { Wind, Droplets, Eye } from "lucide-react";
import { useSelector } from "react-redux";

const WeatherAbout = () => {
  const weatherData = useSelector((state) => state.weather.value);

  const [isBloss, setIsBloss] = useState(false);
  const divAbout = useRef(null);
  const divAboutFog = useRef(null);
  useEffect(() => {
    const divAboutChild = divAbout.current.querySelectorAll("div");
    divAboutChild.forEach((element) => {
      element.addEventListener("click", function () {
        if (this.classList.contains("bloss")) {
          divAboutChild.forEach((element) => {
            if (element != this) {
              element.style.display = "flex";
            }
          });
          this.classList.remove("bloss");
          divAboutFog.current.classList.remove("open");
          setIsBloss(false);
        } else {
          divAboutChild.forEach((element) => {
            if (element != this) {
              element.style.display = "none";
            }
          });
          this.classList.add("bloss");
          divAboutFog.current.classList.add("open");
          setIsBloss(true);
        }
      });
    });
  }, []);

  return (
    <>
      <div className="weatherApp__main__about" ref={divAbout}>
        <p className="weatherApp__main__fog" ref={divAboutFog}></p>
        <div className="weatherApp__main__windSpeed">
          <Wind
            color={
              weatherData && !weatherData.current.is_day ? "white" : "black"
            }
            size={30}
            strokeWidth={1.75}
          />

          <p
            style={{
              color:
                weatherData && !weatherData.current.is_day ? "white" : "black",
            }}
          >
            {isBloss ? "WindSpeed: " : ""}
            {weatherData ? weatherData.current.wind_kph : 0} (km/h)
          </p>
        </div>
        <div className="weatherApp__main__visibleDistant">
          <Eye
            color={
              weatherData && !weatherData.current.is_day ? "white" : "black"
            }
            size={30}
            strokeWidth={1.75}
          />
          <p
            style={{
              color:
                weatherData && !weatherData.current.is_day ? "white" : "black",
            }}
          >
            {isBloss ? "Visible Distance: " : ""}
            {weatherData ? weatherData.current.vis_miles : 0} (m)
          </p>
        </div>
        <div className="weatherApp__main__humidity">
          <Droplets
            color={
              weatherData && !weatherData.current.is_day ? "white" : "black"
            }
            size={30}
            strokeWidth={1.75}
          />
          <p
            style={{
              color:
                weatherData && !weatherData.current.is_day ? "white" : "black",
            }}
          >
            {isBloss ? "Humidity: " : ""}
            {weatherData ? weatherData.current.humidity : 0} (%)
          </p>
        </div>
      </div>
    </>
  );
};
export default WeatherAbout;
