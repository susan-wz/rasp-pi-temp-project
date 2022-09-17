import { openMeteo } from "./gateway";
import { SingleWeatherLineType, WeatherServiceResponse } from "../../types";
import { getLatestHour } from "../../utils/getLatestHour";

export const getForecast = async (): Promise<
  WeatherServiceResponse | undefined
> => {
  const FORECAST_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=43.6664&longitude=-79.3823&hourly=temperature_2m,relativehumidity_2m&timezone=America%2FNew_York";

  const response = await openMeteo(FORECAST_API_URL);
  const timeLabels: string[] = [];
  const latestHour = getLatestHour();

  let start = false; // starts it at the latest hour instead of the start of the day
  let startIndex = 0;
  if (response) {
    response.hourly.time.forEach((hour, index) => {
      const date = hour.split("T")[0];
      const time = hour.split("T")[1];
      const label = `${date} ${time}`;
      if (label === latestHour) {
        start = true;
        startIndex = index;
      }
      if (start) {
        timeLabels.push(`${date} ${time}`);
      }
    });

    const tempLogs: SingleWeatherLineType = {};
    const humidityLogs: SingleWeatherLineType = {};
    const tempFromLatestHour = response.hourly.temperature_2m.slice(startIndex)
    const humidityFromLatestHour = response.hourly.relativehumidity_2m.slice(startIndex)
    timeLabels.forEach((time, index) => {
      tempLogs[time] = tempFromLatestHour[index];
      humidityLogs[time] = humidityFromLatestHour[index];
    });
    return { temp: tempLogs, humidity: humidityLogs };
  }
};
