function formatTimerLength(num) {
  if (num.toString().length === 1) {
    return `0${num}`;
  } else {
    return num;
  }
};

export default formatTimerLength;
