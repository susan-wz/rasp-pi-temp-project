import { openMeteo } from "./gateway";
import { SingleWeatherLineType } from "../../types";

export const getForecast = async () => {
  const FORECAST_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=43.6664&longitude=-79.3823&hourly=temperature_2m,relativehumidity_2m&timezone=America%2FNew_York";

  const response = await openMeteo(FORECAST_API_URL);
  const timeLabels: string[] = [];
  if (response) {
    response.hourly.time.forEach((hour) => {
      const date = hour.split("T")[0];
      const time = hour.split("T")[1];
      timeLabels.push(`${date} ${time}`);
    });

    const forecast: SingleWeatherLineType = {};
    timeLabels.forEach((time, index) => {
      forecast[time] = response.hourly.temperature_2m[index];
    });
    return { temp: forecast, humidity: [] };
  }
};
