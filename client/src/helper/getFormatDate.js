export default function getFormattedDate(date) {
  const createdAtDate = new Date(date);

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour24: true,
  };

  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = dateTimeFormat.format(createdAtDate);
  return formattedDate;
}
