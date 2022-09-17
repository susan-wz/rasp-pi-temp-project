import { WeatherServiceResponse, SingleWeatherLineType } from "../../types";
import { worldWeather } from "./gateway";
import { getTodayFormatted } from "../../utils/getTodayFormatted";
import { getLatestHour } from "../../utils/getLatestHour";

export const getHistoricalWeather = async (): Promise<
  WeatherServiceResponse | undefined
> => {
  const startDate = "2022-09-07";
  const today = getTodayFormatted();
  const worldWeatherUrl = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${process.env.WORLD_WEATHER_KEY}&q=${process.env.POSTAL_CODE}&format=json&date=${startDate}&enddate=${today}&tp=1`;
  const response = await worldWeather(worldWeatherUrl);

  const weatherData = response?.data?.weather;

  const historicalWeather: SingleWeatherLineType = {};
  const historicalHumidity: SingleWeatherLineType = {};
  const latestHour = getLatestHour();

  let stop = false; // stops historical at current time, otherwise returns til the end of day
  if (weatherData) {
    weatherData.forEach((day) => {
      day.hourly.forEach((hour) => {
        if (!stop) {
          const label = `${day.date} ${hour.time
            .slice(0, -2)
            .padStart(2, "0")}:00`;
          if (label === latestHour) stop = true;
          const temp = parseInt(hour.tempC);
          const humidity = parseInt(hour.humidity);
          historicalWeather[label] = temp;
          historicalHumidity[label] = humidity;
        }
      });
    });

    return { temp: historicalWeather, humidity: historicalHumidity };
  }
};
