import { Get } from "../utils/Api";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
export const getWeather = async (location = "ha noi", numsForcastDay = 2) => {
  const WeatherAPI_DOMAIN = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${location}&days=${numsForcastDay}&aqi=yes&alerts=yes`;
  const response = await Get(WeatherAPI_DOMAIN);
  return response;
};
export const getWeatherTest = async () => {
  const WeatherAPI_DOMAIN = `https://maps.openweathermap.org/maps/2.0/weather/1h/APM/{1}/{1}/{4}?date=1618898990&appid=${weatherKey}`;
  const response = await Get(WeatherAPI_DOMAIN);
  return response;
};
