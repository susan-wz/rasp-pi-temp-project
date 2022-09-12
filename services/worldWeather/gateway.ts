import { WorldWeatherResponse } from "../../types";

export const worldWeather = async (
  url: string
): Promise<WorldWeatherResponse | undefined> => {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();
      return data;
    } else {
      throw "error calling worldWeather";
    }
  } catch (error) {
    console.log("error calling worldWeather: ", error);
  }
};
