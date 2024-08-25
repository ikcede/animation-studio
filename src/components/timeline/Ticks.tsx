import React from 'react';
import round from '@/util/round';
import styling from './Ticks.module.css';

export interface TicksProps {
  /** Number of major ticks between the two endpoints */
  majorTicks?: number,

  /** Number of ticks between two major ticks */
  minorTicks?: number,

  /** Value of the starting tick */
  startValue?: number,

  /** Value of the final tick */
  endValue?: number,

  /** Label for the units used */
  unit?: string,

  /** Whether or not to display tick labels */
  showLabels?: boolean,

  /** Precision used for the values */
  decimalPrecision?: number,
}

const Ticks: React.FC<TicksProps> = ({
  majorTicks = 3,
  minorTicks = 7,
  startValue = 0,
  endValue = 1,
  unit = 's',
  showLabels = true,
  decimalPrecision = 2,
}) => {

  const ticks = new Array<React.ReactElement>();
  const addMajorTick = (
      ticks: React.ReactElement[],
      value: number,
      isStartOrEnd: boolean = false,
  ) => {
    ticks.push(
      <div key={value}
           className={`${styling.tick} ${styling.major} `
          + (isStartOrEnd ? styling.end : '')}>
        {showLabels && (
          <span className={styling.label}>
            {round(value, decimalPrecision) + unit}
          </span>
        )}
      </div>
    )
  };

  let majorCount = 0;
  let minorCount = 0;

  addMajorTick(ticks, startValue, true);
  while(majorCount < majorTicks || minorCount < minorTicks) {
    if (minorCount >= minorTicks) {
      addMajorTick(
          ticks,
          (majorCount + 1) / (majorTicks + 1)
              * (endValue - startValue) + startValue
      );
      minorCount = 0;
      majorCount++;
    } else {
      ticks.push(
        <div className={`${styling.tick} ${styling.minor}`}
             key={majorCount + ' ' + minorCount}></div>
      );
      minorCount++;
    }
  }
  addMajorTick(ticks, endValue, true);

  return (
    <div className={styling.ticks}>
      {ticks}
    </div>
  );
};

export default Ticks;