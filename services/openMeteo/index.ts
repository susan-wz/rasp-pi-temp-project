export const getForecast = async () => {
  const WEATHER_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=43.6664&longitude=-79.3823&hourly=temperature_2m,relativehumidity_2m&timezone=America%2FNew_York";

  try {
    let response = await fetch(WEATHER_API_URL);
    if (response.status === 200) {
      let data = await response.json();
      return data?.hourly;
    } else {
      throw "Error fetching users list";
    }
  } catch (error) {
    console.log("error calling weather API: ", error);
  }
};
