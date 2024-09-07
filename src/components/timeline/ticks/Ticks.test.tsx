import React from 'react';
import { render, screen } from '@testing-library/react';
import Ticks, { Tick } from './Ticks';
import styling from './Ticks.module.css';

describe('Ticks Component', () => {
  it('renders without crashing', () => {
    render(<Ticks />);
    expect(screen.getByTestId('ticks')).toBeInTheDocument();
  });

  it('renders correct number of ticks with default props', () => {
    render(<Ticks />);

    // (3 + 1) * 7 + 3 + 2 = 33
    let ticks = screen.getAllByTestId('tick');
    expect(ticks).toHaveLength(33);

    // 3 + 2 = 5
    const majorTicks = ticks.filter((tick) =>
      tick.classList.contains(styling.major)
    );
    expect(majorTicks).toHaveLength(5);

    // (3 + 1) * 7 = 28
    const minorTicks = ticks.filter((tick) =>
      tick.classList.contains(styling.minor)
    );
    expect(minorTicks).toHaveLength(28);
  });

  it('respects custom props', () => {
    render(
      <Ticks
        majorTicks={2}
        minorTicks={3}
        startValue={10}
        endValue={20}
        unit="m"
        decimalPrecision={1}
      />
    );

    // (2 + 1) * 3 + 2 + 2 = 13
    const ticks = screen.getAllByTestId('tick');
    expect(ticks).toHaveLength(13);

    // 2 + 2 = 4
    const majorTicks = ticks.filter((tick) =>
      tick.classList.contains(styling.major)
    );
    expect(majorTicks).toHaveLength(4);

    // (2 + 1) * 3 = 9
    const minorTicks = ticks.filter((tick) =>
      tick.classList.contains(styling.minor)
    );
    expect(minorTicks).toHaveLength(9);

    expect(majorTicks[0]).toHaveTextContent('10m');
    expect(majorTicks[3]).toHaveTextContent('20m');
  });

  it('does not show labels when showLabels is false', () => {
    render(<Ticks showLabels={false} />);
    const ticks = screen.getAllByTestId('tick');
    ticks.forEach((tick) => {
      expect(tick).toBeEmptyDOMElement();
    });
  });

  it('marks first and last ticks as endpoints', () => {
    render(<Ticks />);
    const ticks = screen.getAllByTestId('tick');
    expect(ticks[0]).toHaveClass(styling.end);
    expect(ticks[ticks.length - 1]).toHaveClass(styling.end);
  });
});

describe('Tick', () => {
  it('renders', () => {
    render(<Tick />);

    const tick = screen.getByTestId('tick');
    expect(tick).toBeInTheDocument();
    expect(tick).toHaveClass(styling.tick, styling.minor);
    expect(tick).not.toHaveClass(styling.major, styling.end);
  });

  it('applies correct classes for a major tick', () => {
    render(<Tick isMajor />);
    const tick = screen.getByTestId('tick');
    expect(tick).toHaveClass(styling.major);
    expect(tick).not.toHaveClass(styling.minor, styling.end);
  });

  it('applies correct classes for an endpoint tick', () => {
    render(<Tick isEndpoint />);
    const tick = screen.getByTestId('tick');
    expect(tick).toHaveClass(styling.minor, styling.end);
    expect(tick).not.toHaveClass(styling.major);
  });

  it('applies correct classes for a major endpoint tick', () => {
    render(<Tick isMajor isEndpoint />);
    const tick = screen.getByTestId('tick');
    expect(tick).toHaveClass(styling.major, styling.end);
    expect(tick).not.toHaveClass(styling.minor);
  });

  it('renders with a label', () => {
    render(<Tick label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });
});
