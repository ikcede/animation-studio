
export interface AnimationDetails {
  name?: string,
  duration?: number,
  playState?: string,
  initialDelay?: number,
  startTime?: number,
  iterationCount?: number | 'infinite',
  timing?: string,
  fillMode?: string,
  direction?: string,
  useClone?: boolean,
  ended?: boolean,
}

export class CustomAnimation implements AnimationDetails {
  name: string = 'default-animation';
  duration: number = 1;
  playState: string = 'paused';
  startTime: number = 0;
  initialDelay: number = 0;
  iterationCount: number | 'infinite' = 1;
  timing: string = 'linear';
  fillMode: string = 'forwards';
  direction: string = 'forwards';
  useClone: boolean = false;
  ended: boolean = false;

  constructor(options?: AnimationDetails) {
    Object.assign(this, options ?? {});
  }

  apply(options: AnimationDetails): CustomAnimation {
    Object.assign(this, options);
    return this;
  }

  clone(): CustomAnimation {
    return new CustomAnimation(this);
  }

  buildFromDeclaration(style: CSSStyleDeclaration): CustomAnimation {
    this.name = style.getPropertyValue('animation-name');
    this.setDuration(style.getPropertyValue('animation-duration'));
    this.setStartTime(style.getPropertyValue('animation-delay'));
    this.setInitialDelay(style.getPropertyValue('animation-delay'));
    this.setIterationCount(style.getPropertyValue('animation-iteration-count'));
    this.setPlayState(style.getPropertyValue('animation-play-state'));
    this.setFillMode(style.getPropertyValue('animation-fill-mode'));
    this.setTiming(style.getPropertyValue('animation-timing-function'));
    this.setDirection(style.getPropertyValue('animation-direction'));

    return this;
  }

  buildFromString = (props: string): CustomAnimation => {
    const style = document.createElement('div').style;
    style.cssText = props;
  
    return this.buildFromDeclaration(style);
  }

  _stringToSeconds(stringValue: string): number | null {
    let timeRegex = /(^[-+]?[0-9]*\.?[0-9]*)(s|ms)*$/g;
    let match = timeRegex.exec(stringValue);
    if (match) {
      let num = parseFloat(match[1]);
      if (match[2] == 'ms') {
        num /= 1000;
      }
      if (Number.isNaN(num)) {
        return null;
      }
      return num;
    }
    return null;
  }

  setDuration(stringValue: string): boolean {
    let duration = this._stringToSeconds(stringValue);
    if (duration === null) {
      return false;
    }
    this.duration = duration;
    return true;
  }

  setStartTime(delayString: string): boolean {
    let delay = this._stringToSeconds(delayString);
    if (delay === null) {
      return false;
    }
    this.startTime = - delay;
    return true;
  }

  setInitialDelay(delayString: string): boolean {
    let delay = this._stringToSeconds(delayString);
    if (delay === null) {
      return false;
    }
    this.initialDelay = delay;
    return true;
  }

  setIterationCount(iterationString: string): boolean {
    if (iterationString === 'infinite') {
      this.iterationCount = 'infinite';
      return true;
    } else {
      let count = parseInt(iterationString);
      if (Number.isNaN(count)) {
        return false;
      }
      this.iterationCount = count;
      return true;
    }
  }

  setPlayState(playState: string): boolean {
    if (playState !== 'paused') {
      this.playState = 'running';
    } else {
      this.playState = playState;
    }
    return true;
  }

  setFillMode(fillMode: string): boolean {
    if (fillMode === '') {
      fillMode = 'forwards';
    }
    this.fillMode = fillMode;
    return true;
  }

  setTiming(timing: string): boolean {
    if (timing === '') {
      timing = 'linear';
    }
    this.timing = timing;
    return true;
  }

  setDirection(direction: string): boolean {
    if (direction === '') {
      direction = 'normal';
    }
    this.direction = direction;
    return true;
  }

  _getName(forceName?: string) {
    if (forceName !== undefined) {
      return forceName;
    }
    return this.useClone ? this.name + '2' : this.name;
  }

  toReactProps() : React.CSSProperties {
    return {
      animationName: this._getName(),
      animationDuration: this.duration + 's',
      animationPlayState: this.playState,
      animationDelay: (- this.startTime) + 's',
      animationIterationCount: this.iterationCount,
      animationTimingFunction: this.timing,
      animationFillMode: this.fillMode,
      animationDirection: this.direction,
    }
  }

  toCSSString(options: {name?: string, useStartTime?: boolean}) {
    let cssString = `animation-name: ${this._getName(options.name)};
  animation-duration: ${this.duration}s;
  animation-play-state: ${this.playState};
  animation-iteration-count: ${this.iterationCount};
  animation-timing-function: ${this.timing};
  animation-fill-mode: ${this.fillMode};
  animation-direction: ${this.direction};`;

    if (options.useStartTime) {
      cssString += `\n  animation-delay: ${-this.startTime}s;`;
    } else {
      cssString += `\n  animation-delay: ${this.initialDelay}s;`;
    }
    return cssString;
  }

}