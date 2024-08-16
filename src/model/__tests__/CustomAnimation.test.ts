import { AnimationDetails, CustomAnimation } from '..';

let data = <AnimationDetails>{
  name: 'test',
  duration: 2,
  playState: 'running',
  startTime: 1,
  initialDelay: 0,
  iterationCount: 2,
  timing: 'ease-in',
  fillMode: 'forwards',
  direction: 'forwards',
  useClone: false,
  ended: false,
}

describe(CustomAnimation, () => {
  it('constructs from AnimationDetails', () => {
    let animation = new CustomAnimation(data);

    expect(animation.name).toBe(data.name);
    expect(animation.duration).toBe(data.duration);
    expect(animation.playState).toBe(data.playState);
    expect(animation.iterationCount).toBe(data.iterationCount);
    expect(animation.startTime).toBe(data.startTime);
    expect(animation.initialDelay).toBe(data.initialDelay);
    expect(animation.timing).toBe(data.timing);
    expect(animation.fillMode).toBe(data.fillMode);
    expect(animation.direction).toBe(data.direction);
    expect(animation.useClone).toBe(data.useClone);
    expect(animation.ended).toBe(data.ended);
  });

  it('sets duration by string', () => {
    let animation = new CustomAnimation(data);
    expect(animation.duration).toBe(data.duration);

    animation.setDuration('3s');
    expect(animation.duration).toBe(3);

    animation.setDuration('4.0s');
    expect(animation.duration).toBe(4);

    animation.setDuration('-4.0s');
    expect(animation.duration).toBe(-4);

    animation.setDuration('4.02s');
    expect(animation.duration).toBe(4.02);

    animation.setDuration('100ms');
    expect(animation.duration).toBe(0.1);
  })
});