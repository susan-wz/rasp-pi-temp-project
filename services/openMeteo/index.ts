import { openMeteo } from "./gateway";

export const getForecast = async () => {
  const FORECAST_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=43.6664&longitude=-79.3823&hourly=temperature_2m,relativehumidity_2m&timezone=America%2FNew_York";

    const response = await openMeteo(FORECAST_API_URL)
    return response
};
