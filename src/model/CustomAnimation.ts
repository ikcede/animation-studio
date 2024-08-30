
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

/** 
 * Default values for the CSS animation property
 * 
 * Exported animation code is compared against these values to
 * shorten output.
 */
const defaultValues = {
  duration: 0,
  timing: 'ease',
  delay: 0,
  iterationCount: 1,
  direction: 'normal',
  fillMode: 'none',
};

export class CustomAnimation implements AnimationDetails {
  name: string = 'default-animation';
  duration: number = 1;
  playState: string = 'paused';
  startTime: number = defaultValues.delay;
  initialDelay: number = defaultValues.delay;
  iterationCount: number | 'infinite' = defaultValues.iterationCount;
  timing: string = 'linear';
  fillMode: string = defaultValues.fillMode;
  direction: string = defaultValues.direction;
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

  setVariant(variantName: string): boolean {
    this.name += '-' + variantName;
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

  toCSSString(options?: {
      name?: string, 
      useStartTime?: boolean
  }): string {
    let cssString = `animation-name: ${this._getName(options?.name)};
  animation-duration: ${this.duration}s;
  animation-play-state: ${this.playState};
  animation-iteration-count: ${this.iterationCount};
  animation-timing-function: ${this.timing};
  animation-fill-mode: ${this.fillMode};
  animation-direction: ${this.direction};`;

    if (options?.useStartTime) {
      cssString += `\n  animation-delay: ${-this.startTime}s;`;
    } else {
      cssString += `\n  animation-delay: ${this.initialDelay}s;`;
    }
    return cssString;
  }

  toCSSShorthand(options?: {
      name?: string,
      useStartTime?: boolean
  }): string {
    let delay = options?.useStartTime ? -this.startTime : this.initialDelay;
    let cssString = `animation: ${this._getName(options?.name)}`;
    
    if (this.duration !== defaultValues.duration) {
      cssString += ' ' + this.duration + 's';
    }

    if (this.timing !== defaultValues.timing) {
      cssString += ' ' + this.timing;
    }

    if (delay !== defaultValues.delay) {
      cssString += ' ' + delay + 's';
    }

    if (this.iterationCount !== defaultValues.iterationCount) {
      cssString += ' ' + this.iterationCount;
    }

    if (this.direction !== defaultValues.direction) {
      cssString += ' ' + this.direction;
    }

    if (this.fillMode !== defaultValues.fillMode) {
      cssString += ' ' + this.fillMode;
    }

    return cssString + ';';
  }

}