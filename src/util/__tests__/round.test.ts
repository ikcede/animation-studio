import { round } from '..';

describe("round", () => {
  it('rounds with decimal 0 by default', () => {
    expect(round(1)).toEqual(1);
    expect(round(9)).toEqual(9);

    expect(round(1.1)).toEqual(1);
    expect(round(1.9)).toEqual(2);
  });

  it('rounds to the correct decimal place', () => {
    expect(round(1.11, 1)).toEqual(1.1);
    expect(round(1.19, 1)).toEqual(1.2);
    expect(round(1.215, 1)).toEqual(1.2);
  });

  it('works with negative decimal values', () => {
    expect(round(1.11, -1)).toEqual(0);
    expect(round(119, -1)).toEqual(120);
    expect(round(1211, -1)).toEqual(1210);
  });
});