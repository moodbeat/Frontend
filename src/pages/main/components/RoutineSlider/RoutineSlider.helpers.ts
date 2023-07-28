export const getPercentage = (containerWidth: number, distanceMoved: number) => {
  return (distanceMoved / containerWidth) * 100;
};

export const limitNumberWithinRange = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(value, min), max);
};

export const nearestN = (N: number, number: number) => Math.ceil(number / N) * N;
