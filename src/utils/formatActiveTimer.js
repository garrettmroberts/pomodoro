function formatActiveTimer(num) {
  let minutes = Math.floor(num / 60);
  let seconds = num % 60;

  // Formats minutes correctly
  if (minutes.toString().length === 0) {
    minutes = "00";
  } else if (minutes.toString().length === 1) {
    minutes = `0${minutes}`;
  };

  // Formats seconds if needed
  if (seconds.toString().length  === 0) {
    seconds = "00";
  } else if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  };

  return `${minutes}:${seconds}`;
};

export default formatActiveTimer;