import { Search, AlignJustify, MapPin } from "lucide-react";
import "./WeatherApp.scss";
import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import {
  getImageFromUnsplash,
  getLocation,
} from "../../services/locationService";
import {
  getAirPollutionbyLocation,
  getWeather,
} from "../../services/weatherService";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "../../features/Weather/weatherSlice";

const WeatherSearch = (prop) => {
  const { generateRandomVal, turnOff, turnOn, toggleSidebar } = prop;
  const [query, setQuery] = useState(""); // giá trị tìm kiếm kiếm
  const [suggestions, setSuggestions] = useState([]); // arr đề xuất địa điểm
  const [isSearch, setIsSearch] = useState(false); // var check có đang tìm kiếmm hay ko
  const [isFocused, setIsFocused] = useState(false);
  const weatherData = useSelector((state) => state.weather.value);
  const searchBtn = useRef(null);
  const searchInput = useRef(null);
  const menuBtn = useRef(null);
  const dispatch = useDispatch();

  const resetSearch = () => {
    searchInput.current.classList.remove("showInput");
    searchBtn.current.style.left = "0px";
    menuBtn.current.classList.remove("hide");
    setQuery("");
  };
  const fetchApi = async (val) => {
    turnOn();
    generateRandomVal();

    try {
      const data = await getWeather(val);
      const location = await getImageFromUnsplash(query);
      const airPollutionData = await getAirPollutionbyLocation(
        data.location.lat,
        data.location.lon
      );
      console.log("Air Pollution Data:", airPollutionData);
      if (!data) {
        Swal.fire({
          title: "Erorr",
          text: "The location is not found !",
          icon: "error",
          confirmButtonText: "OK",
        });

        return;
      }
      dispatch(
        setWeatherData({
          ...data,
          locationImg: location,
          airPollution: airPollutionData.list[0],
        })
      );
    } catch (err) {
      Swal.fire({
        title: "Erorr",
        text: "The location is not found !",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    turnOff();
  };
  const handleSearch = () => {
    if (!isSearch) {
      searchInput.current.classList.add("showInput");
      searchBtn.current.style.left = "calc(100% - 37px)";
      searchInput.current.focus();
      searchInput.current.value = "";
      menuBtn.current.classList.add("hide");
    } else {
      if (query) {
        fetchApi(query);

        resetSearch();
      } else {
        resetSearch();
      }
    }
    setIsSearch(!isSearch);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchApi(query);
      resetSearch();
    }
  };
  const fetchCities = async (value) => {
    const data = await getLocation(value);
    if (data) {
      setSuggestions([
        ...data.data.map((city) => `${city.city}, ${city.country}`),
      ]);
    }
  };
  // Debounced version of fetch
  const debouncedFetchCities = useCallback(debounce(fetchCities, 700), []);
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchCities(value);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 150);
  };
  const handleChooseSuggestion = (item) => {
    fetchApi(item);
    resetSearch();
  };

  return (
    <>
      <div className="weatherApp__main__search">
        <button
          ref={searchBtn}
          onClick={handleSearch}
          className="weatherApp__main__search--searchbtn px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-cyan-400/50 hover:shadow-lg animate-pulse"
        >
          <Search
            color={
              weatherData && !weatherData.current.is_day ? "white" : "black"
            }
            size={28}
            strokeWidth={1.5}
          />
        </button>

        <input
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={searchInput}
          placeholder="Enter your location or cordinate"
          id="searchInput"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          ref={menuBtn}
          onClick={() => toggleSidebar()}
          className="weatherApp__main__search--menu px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-cyan-400/50 hover:shadow-lg animate-pulse"
        >
          <AlignJustify
            color={
              weatherData && !weatherData.current.is_day ? "white" : "black"
            }
            size={28}
            strokeWidth={1.5}
          />
        </button>
        <div className="weatherApp__main__suggestion">
          {isFocused && suggestions.length > 0 && query && (
            <>
              {suggestions.map((item, i) => (
                <div key={i} onClick={() => handleChooseSuggestion(item)}>
                  {<MapPin size={17} style={{ marginRight: "5px" }} />}
                  {item}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default WeatherSearch;
