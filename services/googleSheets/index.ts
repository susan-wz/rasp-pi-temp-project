import { google } from "googleapis";
import { getHourlyIncrementsForDateRange } from "../../utils/getHourlyIncrementsForDateRange";

export const getGoogleSheetData = async () => {
  const auth = await google.auth.getClient({
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

  const tempLogs = {};
  hourlyData.forEach((log) => {
    const time = `${log[0]} ${log[1]}`;
    tempLogs[time] = parseInt(log[2]);
  });
  const humidityLogs = {};
  hourlyData.forEach((log) => {
    const time = `${log[0]} ${log[1]}`;
    humidityLogs[time] = parseInt(log[3]);
  });

  return { temp: tempLogs, humidity: humidityLogs };
};
