import { Get } from "../utils/Api";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
export const getWeather = async (location = "ha noi", numsForcastDay = 2) => {
  const WeatherAPI_DOMAIN = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${location}&days=${numsForcastDay}&aqi=yes&alerts=yes`;
  const response = await Get(WeatherAPI_DOMAIN);
  return response;
};
export const getWeatherTest = async () => {
  const WeatherAPI_DOMAIN = `https://api.openweathermap.org/data/2.5/forecast?q=Ho%20Chi%20Minh&units=metric&appid=${weatherKey}
`;
  const response = await Get(WeatherAPI_DOMAIN);
  return response;
};
