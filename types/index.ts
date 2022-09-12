export interface PageProps {
  sheetData: SheetDataType;
  forecast: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
  };
}

export type SheetDataType = string[][] | undefined | null;

export type SingleWeatherLineType = { [key: string]: number }[];

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
    time: string[]
    temperature_2m: number[]
  }
}