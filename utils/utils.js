function formatDate(createdAt) {
  const date = new Date(createdAt);
  const dateString = date.toDateString();
  const timeString = date.toLocaleTimeString();
  return `${dateString} ${timeString}`;
}

module.exports = formatDate;