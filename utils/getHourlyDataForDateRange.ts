import { getHourlyIncrementsForDateRange } from "./getHourlyIncrementsForDateRange";

export const getHourlyDataForDateRange = (
  data: string[][],
  startDate?: string,
  startTime?: string,
  endDate?: string,
  endTime?: string
): string[][] => {
  const dateHourRange = getHourlyIncrementsForDateRange(data, startDate, startTime, endDate, endTime);
  console.log('dateHourRange', dateHourRange)

  return [["temp"]];
};

