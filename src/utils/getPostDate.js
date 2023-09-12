export const getPostDate = (timestamp, shortVer = false) => {
  const time = timestamp * 1000;
  const date = new Date(time);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const currentDatetimestamp = Date.now();
  const seconds = currentDatetimestamp / 1000 - timestamp;
  const hours = Math.trunc(seconds / 3600);
  const days = Math.trunc(seconds / 86400);
  const years = new Date().getFullYear() - year;
  const months = new Date().getMonth() + 1 - month;

  if (shortVer) {
    if (years) return `${years} y`;
    if (months) return `${months} m`;
    if (days >= 2) return `${days} d`;
    if (days > 0) return `${days} d`;
    return `${hours} h`;
  } else {
    const unit = years || months || days > 1 ? 's' : '';
    if (years) return `${years} year${unit} ago`;
    if (months) return `${months} month${unit} ago`;
    if (days >= 2) return `${days} days ago`;
    if (days > 0) return `${days} day ago`;
    return `${hours} hour${unit} ago`;
  }
};
