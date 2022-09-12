const addDays = (date: Date, days: number): Date => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatHourToString = (hour: number): string => {
  return `${hour.toString().padStart(2, "0")}:00`;
};

export const getLabelsArray = (): string[] => {
  const daysBeforeAfter = 3;
  let dates: string[] = [];
  const now = new Date();
  const startDate = addDays(now, -daysBeforeAfter);
  const endDate = addDays(now, daysBeforeAfter);
  for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
    dates.push(i.toISOString().split("T")[0]);
  }

  const hourlyIncrements = dates.map((date) => {
    const datesWithHours = [];
    for (let i = 0; i <= 23; i++) {
      datesWithHours.push(`${date} ${formatHourToString(i)}`);
    }
    return datesWithHours;
  });
  return hourlyIncrements.flat();
};
