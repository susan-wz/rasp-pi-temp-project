export interface PageProps {
  sheetData: SheetDataType;
  forecast: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
  };
}

export type SheetDataType = string[][] | undefined | null;

export type SingleWeatherLineType = Array<{}>
