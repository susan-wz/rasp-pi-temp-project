import { getFormattedTimeNow } from "./getFormattedTimeNow";

export const getLatestHour = (): string => {
  const now = getFormattedTimeNow()
  return now.replace(/..$/, "00");
};
