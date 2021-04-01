export default (num: number, precision: number): number => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(num * multiplier) / multiplier;
};
