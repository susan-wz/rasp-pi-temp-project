export const getTodayFormatted = (): string => {
  // i hate this
  const now = new Date();
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(now);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(now);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(now);
  return `${year}-${month}-${day}`;
};
