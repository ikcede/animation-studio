/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to round.
 * @param decimals - The number of decimal places to round to. Default 0.
 * @returns The rounded number.
 *
 * @example
 * round(3.14159, 2) // returns 3.14
 * round(3.14159) // returns 3
 */
const round = (value: number, decimals: number = 0): number =>
  Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);

export default round;
