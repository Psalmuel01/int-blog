export const shortenAccount = (account) =>
  `${account.substring(0, 6)}...${account.substring(38)}`;

export const shortenContent = (content) => `${content.substring(0, 150)}...`;

export const formatDate = (time) => {
  const date = new Date(time * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1 to get the correct month
  const day = date.getDate();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthName = monthNames[month - 1];

  const dayOfWeek = dayNames[date.getDay()];

  const formattedDate = `${dayOfWeek}, ${monthName} ${day}, ${year}`;

  return formattedDate;
};
