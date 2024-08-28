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

interface TickProps {
  isMajor?: boolean,
  isEndpoint?: boolean,
  label?: string,
}

const Tick: React.FC<TickProps> = ({
  isMajor = false,
  isEndpoint = false,
  label,
}) => {
  return (
    <div className={
      styling.tick + ' ' + 
      (isMajor ? styling.major : styling.minor) + ' ' + 
      (isEndpoint ? styling.end : '')
    }>
      {label !== undefined && (
        <span className={styling.label}>
          {label}
        </span>
      )}
    </div>
  );
};

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

  const buildTicks = (): React.ReactElement[] => {
    let newTicks = new Array<React.ReactElement>();
    let totalTicks = (majorTicks + 1) * minorTicks + majorTicks + 2;

    let tickNum = 0;
    while (tickNum < totalTicks) {
      if (_isMajor(tickNum)) {
        let value = tickNum / (totalTicks - 1) * 
            (endValue - startValue) + startValue;
        let valueLabel = round(value, decimalPrecision) + unit;

        newTicks.push(
          <Tick key={tickNum + ' ' + totalTicks}
                isMajor
                isEndpoint={_isEndpoint(tickNum, totalTicks)}
                label={showLabels ? valueLabel : undefined} />
        );
      } else {
        newTicks.push(
          <Tick key={tickNum + ' ' + totalTicks} />
        );
      }
      tickNum++;
    }
    return newTicks;
  };

  /** Helper to check if a tick is a major or minor tick */
  const _isMajor = (tickNum: number) => {
    return tickNum % (minorTicks + 1) == 0;
  }

  /** Helper to check if the tick is the first or last */
  const _isEndpoint = (tickNum: number, totalTicks: number) => {
    return tickNum == 0 || tickNum == totalTicks - 1;
  }

  /** Rebuild ticks any time one of the props changes */
  React.useEffect(() => {
    setTicks(buildTicks());
  }, [
    majorTicks,
    minorTicks,
    startValue,
    endValue,
    unit,
    showLabels,
    decimalPrecision
  ]);

  return (
    <div className={styling.ticks}>
      {ticks}
    </div>
  );
};

export default Ticks;