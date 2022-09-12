import { WeatherServiceResponse, SingleWeatherLineType } from "../../types";
import { worldWeather } from "./gateway";

export const getHistoricalWeather = async (): Promise<
  WeatherServiceResponse | undefined
> => {
  const startDate = "2022-09-07";
  const today = "2022-09-10";
  const worldWeatherUrl = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${process.env.WORLD_WEATHER_KEY}&q=${process.env.POSTAL_CODE}&format=json&date=${startDate}&enddate=${today}&tp=1`;
  const response = await worldWeather(worldWeatherUrl);

  const weatherData = response?.data?.weather;
  const historicalWeather = {};
  if (weatherData) {
    weatherData.forEach((day) => {
      day.hourly.forEach((hour) => {
        const label = `${day.date} ${hour.time
          .slice(0, -2)
          .padStart(2, "0")}:00`;
        const temp = parseInt(hour.tempC);
        historicalWeather[label] = temp;
      });
    });
    return { temp: historicalWeather, humidity: [] };
  }
};
