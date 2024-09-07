import React from 'react';
import round from '@/util/round';
import styling from './Ticks.module.css';

/**
 * Props for the [Ticks] component.
 */
export interface TicksProps {
  /** Number of major ticks between the two endpoints */
  majorTicks?: number;

  /** Number of ticks between two major ticks */
  minorTicks?: number;

  /** Value of the starting tick, default 0 */
  startValue?: number;

  /** Value of the final tick, default 1 */
  endValue?: number;

  /** Label for the units used, default 's' for seconds */
  unit?: string;

  /** Whether or not to display tick labels, default true */
  showLabels?: boolean;

  /** Number of decimal places for tick labels, default 2 */
  decimalPrecision?: number;
}

/**
 * Props for the [Tick] component.
 */
export interface TickProps {
  /** Whether the tick is a major tick. Defaults to false. */
  isMajor?: boolean;

  /** Whether the tick is an endpoint. Defaults to false. */
  isEndpoint?: boolean;

  /** Label for the tick. */
  label?: string;
}

/**
 * Renders an individual tick on the timeline
 *
 * @param props - [TickProps]
 * @returns {JSX.Element}
 */
export const Tick: React.FC<TickProps> = ({
  isMajor = false,
  isEndpoint = false,
  label,
}) => {
  return (
    <div
      className={
        styling.tick +
        ' ' +
        (isMajor ? styling.major : styling.minor) +
        ' ' +
        (isEndpoint ? styling.end : '')
      }
      data-testid="tick"
    >
      {label !== undefined && (
        <span className={styling.label}>{label}</span>
      )}
    </div>
  );
};

/**
 * Ticks component for rendering a series of ticks with labels.
 *
 * @param props - [TickProps]
 * @returns {JSX.Element}
 */
const Ticks: React.FC<TicksProps> = ({
  majorTicks = 3,
  minorTicks = 7,
  startValue = 0,
  endValue = 1,
  unit = 's',
  showLabels = true,
  decimalPrecision = 2,
}) => {
  const [ticks, setTicks] = React.useState(
    new Array<React.ReactElement>()
  );

  /** Helper to check if a tick is a major or minor tick */
  const _isMajor = React.useCallback(
    (tickNum: number) => {
      return tickNum % (minorTicks + 1) == 0;
    },
    [minorTicks]
  );

  /** Helper to check if the tick is the first or last */
  const _isEndpoint = React.useCallback(
    (tickNum: number, totalTicks: number) => {
      return tickNum == 0 || tickNum == totalTicks - 1;
    },
    []
  );

  /** Builds an array of <Ticks> */
  const buildTicks = React.useCallback((): React.ReactElement[] => {
    let newTicks = new Array<React.ReactElement>();
    let totalTicks = (majorTicks + 1) * minorTicks + majorTicks + 2;

    let tickNum = 0;
    while (tickNum < totalTicks) {
      if (_isMajor(tickNum)) {
        let value =
          (tickNum / (totalTicks - 1)) * (endValue - startValue) +
          startValue;
        let valueLabel = round(value, decimalPrecision) + unit;

        newTicks.push(
          <Tick
            key={tickNum + ' ' + totalTicks}
            isMajor
            isEndpoint={_isEndpoint(tickNum, totalTicks)}
            label={showLabels ? valueLabel : undefined}
          />
        );
      } else {
        newTicks.push(<Tick key={tickNum + ' ' + totalTicks} />);
      }
      tickNum++;
    }
    return newTicks;
  }, [
    majorTicks,
    minorTicks,
    startValue,
    endValue,
    unit,
    showLabels,
    decimalPrecision,
    _isMajor,
    _isEndpoint,
  ]);

  /** Rebuild ticks any time one of the props changes */
  React.useEffect(() => {
    setTicks(buildTicks());
  }, [buildTicks]);

  return (
    <div className={styling.ticks} data-testid="ticks">
      {ticks}
    </div>
  );
};

export default React.memo(Ticks);
