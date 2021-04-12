export default (num: number): string => {
  if (num >= 10) {
    return num.toString();
  } else {
    return `0${num}`;
  }
};
