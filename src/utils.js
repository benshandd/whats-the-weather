export const msToKmPerHour = (x) => x * 3.6;

export const getFormattedDate = (dateStr, format = "default") => {
  const date = new Date(dateStr);
  if (format === "default") {
    const options = { weekday: "long", day: "2-digit", month: "short" };
    const dayAndWeekday = date.toLocaleDateString("en-US", options);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return `${dayAndWeekday} - ${month}`;
  }
  return date.toLocaleDateString();
};

export const get12HourTime = (dateStr) => {
  const date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};
