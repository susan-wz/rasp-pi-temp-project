// now must be formatted like 2022-09-10 15:30
export const getLatestHour = (now: string): string => {
  return now.replace(/..$/, "00");
};
