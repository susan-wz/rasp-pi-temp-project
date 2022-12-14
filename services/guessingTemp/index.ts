import { SingleWeatherLineType, WeatherServiceResponse } from "../../types";

const average = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev + curr) / numbers.length;

export const getInsideForecastGuess = (
  loggedData: WeatherServiceResponse | undefined,
  forecast: WeatherServiceResponse | undefined
): WeatherServiceResponse | undefined => {
  if (!loggedData || !forecast) return { temp: {}, humidity: {} };
  const { temp: loggedTemp } = loggedData;
  const { temp: forecastTemp } = forecast;

  const loggedMeanTemp = average(Object.values(loggedTemp));

  const times = Object.keys(forecastTemp);
  const guessForecasts: SingleWeatherLineType = {};
  times.forEach((time) => {
    const averageVsOutsideDiff = loggedMeanTemp - forecastTemp[time];
    switch (true) {
      case averageVsOutsideDiff >= -2 && averageVsOutsideDiff <= 1: // 24 - 27
        guessForecasts[time] = forecastTemp[time] + 1;
        break;
      case averageVsOutsideDiff > 1: // below 24
        guessForecasts[time] =
          forecastTemp[time] + averageVsOutsideDiff - (averageVsOutsideDiff / 3) + 2;
        break;
      case averageVsOutsideDiff < -2: // above 27
        guessForecasts[time] = forecastTemp[time] - averageVsOutsideDiff / 2;
        break;
    }
    if (guessForecasts[time] <= 20) guessForecasts[time] = 20;
  });

  return { temp: guessForecasts, humidity: {} };
};
