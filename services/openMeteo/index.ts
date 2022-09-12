import { openMeteo } from "./gateway";

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

    const forecast: Array<{}> = [];
    timeLabels.forEach((time, index) => {
      forecast.push({ [time]: response.hourly.temperature_2m[index] });
    });

    // forecast is the right data structure but i haven't returned it instead of response yet

    console.log("response", response);
    return response.hourly;
  }
};
