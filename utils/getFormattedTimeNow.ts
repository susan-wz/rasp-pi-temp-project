export const getFormattedTimeNow = (): string => {
  // i hate this
  const now = new Date();
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(now);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(now);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(now);
  let hour = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
  }).format(now);
  let minute = new Intl.DateTimeFormat("en", { minute: "2-digit" })
    .format(now)
    .padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
};
