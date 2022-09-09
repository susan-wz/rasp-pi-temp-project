export const getHourlyIncrementsForDateRange = (
  data: string[][],
  startDate?: string,
  startTime?: string,
  endDate?: string,
  endTime?: string
): string[][] => {

  // starts at either the specified date or start/end of data available
  const start: string = startDate ?? data[0][0];
  const end: string = endDate ?? data[data.length - 1][0];

  // creates array of dates between start/end dates inclusive
  let dates: string[] = [];
  for (
    let i = new Date(start);
    i <= new Date(end);
    i.setDate(i.getDate() + 1)
  ) {
    dates.push(i.toISOString().split("T")[0]);
  }

  // starts at specified time or start/end time of data available
  const startHour: number =
    parseInt(startTime?.substring(0, 2)) ||
    parseInt(data[0][1].substring(0, 2));
  const endHour: number = parseInt(
    endTime?.substring(0, 2) ||
      parseInt(data[data.length - 1][1].substring(0, 2))
  );

  const minHour = 0;
  const maxHour = 23;
  const formatHourToString = (hour: number) => { return `${hour.toString().padStart(2, "0")}:00`}

  const hourlyIncrements = dates.map((date, index) => {
    const datesWithHours = [];
    if (index === 0) {
      for (let i = startHour; i <= maxHour; i++) {
        datesWithHours.push([date, formatHourToString(i)]);
      }
    } else if (index === dates.length - 1) {
      for (let i = minHour; i <= endHour; i++) {
        datesWithHours.push([date, formatHourToString(i)]);
      }
    } else {
      for (let i = minHour; i <= maxHour; i++) {
        datesWithHours.push([date, formatHourToString(i)]);
      }
    }
    return datesWithHours;
  });

  return hourlyIncrements.flat();
};
