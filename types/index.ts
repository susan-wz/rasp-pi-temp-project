export interface PageProps {
  sheetData: WeatherServiceResponse;
  forecast: WeatherServiceResponse;
  historicalWeather: WeatherServiceResponse;
  insideForecastGuess: WeatherServiceResponse
}

export type SheetDataType = string[][] | undefined | null;

export type WeatherServiceResponse = {
  temp: SingleWeatherLineType;
  humidity: SingleWeatherLineType;
};

export interface TempChartProps {
  loggedTemp: SingleWeatherLineType
  forecastTemp: SingleWeatherLineType
  historicalTemp: SingleWeatherLineType
  insideForecastTemp: SingleWeatherLineType
}

export interface HumidityChartProps {
  loggedHumidity: SingleWeatherLineType
  forecastHumidity: SingleWeatherLineType
  historicalHumidity: SingleWeatherLineType
  insideForecastHumidity: SingleWeatherLineType
}

export type SingleWeatherLineType = { [key: string]: number };

export interface WorldWeatherHour {
  time: string;
  tempC: string;
}

export interface WorldWeatherDate {
  date: string;
  hourly: WorldWeatherHour[];
}

export interface WorldWeatherResponse {
  data: {
    weather: WorldWeatherDate[];
  };
}

export interface OpenMeteoResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}
