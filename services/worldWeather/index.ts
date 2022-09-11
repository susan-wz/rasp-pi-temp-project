import { worldWeather } from "./gateway";

export const getHistoricalWeather = async () => {
  const startDate = "2022-09-07";
  const today = "2022-09-10";
  const worldWeatherUrl = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${process.env.WORLD_WEATHER_KEY}&q=${process.env.POSTAL_CODE}&format=json&date=${startDate}&enddate=${today}&tp=1`;
  const response = await worldWeather(worldWeatherUrl);
  console.log("response", response?.data?.weather);
  return response;
};
