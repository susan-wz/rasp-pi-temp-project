import { google } from "googleapis";
import { SingleWeatherLineType, WeatherServiceResponse } from "../../types";

export const getGoogleSheetData = async (): Promise<
  WeatherServiceResponse | undefined
> => {
  const privateKey = JSON.parse(process.env.PRIVATE_KEY || '');
  const clientEmail = process.env.CLIENT_EMAIL;
  const auth = await google.auth.getClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `Sheet1!A:D`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const sheetData = response?.data?.values;

  const hourlyData = sheetData?.filter((minuteData) => {
    return minuteData[1].substring(3) === "00";
  });

  const tempLogs: SingleWeatherLineType = {};
  const humidityLogs: SingleWeatherLineType = {};

  if (hourlyData) {
    hourlyData.forEach((log) => {
      const time = `${log[0]} ${log[1]}`;
      tempLogs[time] = parseInt(log[2]);
    });

    hourlyData.forEach((log) => {
      const time = `${log[0]} ${log[1]}`;
      humidityLogs[time] = parseInt(log[3]);
    });
  }

  return { temp: tempLogs, humidity: humidityLogs };
};
