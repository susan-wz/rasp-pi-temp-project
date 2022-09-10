import { google } from "googleapis";

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

  return sheetData;
};
