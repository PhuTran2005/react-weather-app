import { Get } from "../utils/Api";
const weatherKey_current_weather = import.meta.env.VITE_CURRENT_WEATHER_API_KEY;
const weatherKey_open_weather = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const weatherKey_weatherbit = import.meta.env.VITE_WEATHERBIT_API_KEY;
export const getWeather = async (location = "ha noi", numsForcastDay = 2) => {
  const WeatherAPI_DOMAIN = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey_current_weather}&q=${location}&days=${numsForcastDay}&aqi=yes&alerts=yes`;
  const response = await Get(WeatherAPI_DOMAIN);
  return response;
};

export const getWeatherbyLocationMap = async (lat, lng) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKey_current_weather}&q=${lat},${lng}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`WeatherAPI error ${response.status}`);
    }

    const data = await response.json();
    console.log("WeatherAPI data:", data);
    // Chuẩn hóa dữ liệu để bạn render giống như OpenWeather
    return {
      visibility: data.current.vis_km,
      uv: data.current.uv,
      country: data.location.country,
      name: data.location.name,
      coord: { lat: data.location.lat, lon: data.location.lon },
      main: {
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity,
      },
      wind: { speed: data.current.wind_kph / 3.6 }, // km/h → m/s
      weather: [
        {
          description: data.current.condition.text,
          icon: data.current.condition.icon,
        },
      ],
    };
  } catch (err) {
    console.error("Lỗi lấy WeatherAPI:", err);
    return null;
  }
};
export const getWeatherbyLocation = async (lat, lng) => {
  try {
    const WeatherAPI_DOMAIN = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey_current_weather}&q=${lat},${lng}&days=1&aqi=yes&alerts=yes`;
    const response = await fetch(WeatherAPI_DOMAIN);

    if (!response.ok) {
      throw new Error(`WeatherAPI error ${response.status}`);
    }

    const data = await response.json();
    console.log("WeatherAPI data:", data);
    // Chuẩn hóa dữ liệu để bạn render giống như OpenWeather
    return data;
  } catch (err) {
    console.error("Lỗi lấy WeatherAPI:", err);
    return null;
  }
};
export const getWeatherAlertbyLocation = async (lat, lng) => {
  try {
    const WeatherAPI_DOMAIN = `https://api.weatherbit.io/v2.0/alerts?lat=${lat}&lon=${lng}&key=${weatherKey_weatherbit}`;
    const response = await fetch(WeatherAPI_DOMAIN);
    console.log("Fetch URL:", WeatherAPI_DOMAIN);

    if (!response.ok) {
      throw new Error(`WeatherAPI error ${response.status}`);
    }

    const data = await response.json();
    console.log("WeatherAPI data:", data);
    // Chuẩn hóa dữ liệu để bạn render giống như OpenWeather
    return data;
  } catch (err) {
    console.error("Lỗi lấy WeatherAPI:", err);
    return null;
  }
};
export const getAirPollutionbyLocation = async (lat, lng) => {
  try {
    const WeatherAPI_DOMAIN = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${weatherKey_open_weather}`;
    const response = await fetch(WeatherAPI_DOMAIN);
    console.log("Fetch URL:", WeatherAPI_DOMAIN);

    if (!response.ok) {
      throw new Error(`WeatherAPI error ${response.status}`);
    }

    const data = await response.json();
    console.log("WeatherAPI data:", data);
    // Chuẩn hóa dữ liệu để bạn render giống như OpenWeather
    return data;
  } catch (err) {
    console.error("Lỗi lấy WeatherAPI:", err);
    return null;
  }
};
