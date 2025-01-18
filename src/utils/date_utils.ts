export const getFormattedDate = () => {
  const today = new Date();
  return today.toISOString().slice(0, 10).replace(/-/g, "");
};

export const getFormattedTime = (includeMinutes = false) => {
  const today = new Date();
  const hours = today.getHours().toString().padStart(2, "0");
  return `${hours}${includeMinutes ? "30" : "00"}`;
};
