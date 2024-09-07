import round from '../round';

describe('round', () => {
  it('rounds to nearest integer when no decimal places specified', () => {
    expect(round(3.14159)).toBe(3);
    expect(round(2.7)).toBe(3);
    expect(round(2.2)).toBe(2);
  });

  it('rounds to specified number of decimal places', () => {
    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(3.14159, 3)).toBe(3.142);
    expect(round(3.14159, 4)).toBe(3.1416);
  });

  it('handles negative numbers', () => {
    expect(round(-3.14159, 2)).toBe(-3.14);
    expect(round(-2.7)).toBe(-3);
    expect(round(-2.2)).toBe(-2);
  });

  it('handles zero', () => {
    expect(round(0)).toBe(0);
    expect(round(0, 2)).toBe(0);
  });

  it('handles large numbers', () => {
    expect(round(1234567.89, 1)).toBe(1234567.9);
    expect(round(9876543.21)).toBe(9876543);
  });

  it('handles small decimal numbers', () => {
    expect(round(0.00123, 5)).toBe(0.00123);
    expect(round(0.00123, 2)).toBe(0);
  });

  it('handles edge cases', () => {
    expect(round(5.5)).toBe(6); // Rounds up for .5
    expect(round(-5.5)).toBe(-5); // Rounds towards positive for negatives
  });

  it('returns the same type (number) even with excessive decimal places', () => {
    const result = round(1.23, 10);
    expect(typeof result).toBe('number');
    expect(result).toBe(1.23);
  });
});
