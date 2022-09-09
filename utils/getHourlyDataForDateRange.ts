import { getHourlyIncrementsForDateRange } from "./getHourlyIncrementsForDateRange";

// this is going to be horribly inefficient
// can also come back to this to find +/- a minute for those that are missing on the hour

export const getHourlyDataForDateRange = (
  data: string[][],
  startDate?: string,
  startTime?: string,
  endDate?: string,
  endTime?: string
): string[][] => {
  const dateHourRange = getHourlyIncrementsForDateRange(
    data,
    startDate,
    startTime,
    endDate,
    endTime
  );

  const hourlyData: string[][] = [];

  dateHourRange.forEach((time) => {
    const [match] = data.filter(
      (entry) => entry[0] === time[0] && entry[1] === time[1]
    );
    if (match) {
      hourlyData.push(match);
    } else {
      hourlyData.push([time[0], time[1], undefined, undefined]);
    }
  });
  return hourlyData;
};
