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
  const [ticks, setTicks] = React.useState(new Array<React.ReactElement>());

  const addMajorTick = (
      ticks: React.ReactElement[],
      keyValue: number,
      value: number,
      isStartOrEnd: boolean = false,
  ) => {
    ticks.push(
      <div key={keyValue}
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

  React.useEffect(() => {
    let newTicks = new Array<React.ReactElement>();

    let majorCount = 0;
    let minorCount = 0;

    addMajorTick(newTicks, majorCount, startValue, true);
    while(majorCount < majorTicks || minorCount < minorTicks) {
      if (minorCount >= minorTicks) {
        addMajorTick(
            newTicks,
            majorCount + 1,
            (majorCount + 1) / (majorTicks + 1)
                * (endValue - startValue) + startValue
        );
        minorCount = 0;
        majorCount++;
      } else {
        newTicks.push(
          <div className={`${styling.tick} ${styling.minor}`}
              key={majorCount + ' ' + minorCount}></div>
        );
        minorCount++;
      }
    }
    addMajorTick(newTicks, majorCount + 1, endValue, true);

    setTicks(newTicks);
  }, [majorTicks, minorTicks, startValue, endValue, unit, showLabels, decimalPrecision]);

  return (
    <div className={styling.ticks}>
      {ticks}
    </div>
  );
};

export default Ticks;