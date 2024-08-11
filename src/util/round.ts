/**
 * Round a value to a certain number of decimal places 
 */
const round = (
  value: number,
  decimals: number = 0
): number => 
  Math.round(value * Math.pow(10, decimals)) 
      / Math.pow(10, decimals);

export default round;