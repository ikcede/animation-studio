
export interface AnimationDetails {
  name?: string,
  duration?: number,
  playState?: string,
  startTime?: number,
  iterationCount?: number | 'infinite',
  timing?: string,
  fillMode?: string,
  direction?: string,
  useClone?: boolean,
  ended?: boolean,
}

export class CSSAnimation implements AnimationDetails {
  name: string = 'default-animation';
  duration: number = 1;
  playState: string = 'paused';
  startTime: number = 0;
  iterationCount: number | 'infinite' = 1;
  timing: string = 'linear';
  fillMode: string = 'forwards';
  direction: string = 'forwards';
  useClone: boolean = false;
  ended: boolean = false;

  constructor(options?: AnimationDetails) {
    Object.assign(this, options ?? {});
  }

  apply(options: AnimationDetails): CSSAnimation {
    Object.assign(this, options);
    return this;
  }

  clone(): CSSAnimation {
    return new CSSAnimation(this);
  }

  buildFromDeclaration(style: CSSStyleDeclaration) {
    this.setDuration(style.getPropertyValue('animation-duration'));
    this.setStartTime(style.getPropertyValue('animation-delay'));
    this.setIterationCount(style.getPropertyValue('animation-iteration-count'));
    this.playState = style.getPropertyValue('animation-play-state');
    this.fillMode = style.getPropertyValue('animation-fill-mode');
    this.timing = style.getPropertyValue('animation-timing-function');
    this.direction = style.getPropertyValue('animation-direction');
  }

  buildFromString = (props: string) => {
    const style = document.createElement('div').style;
    style.cssText = props;
  
    this.buildFromDeclaration(style);
  }

  setDuration(stringValue: string): boolean {
    let timeRegex = /(^[-+]?[0-9]*\.?[0-9]*)(s|ms)*$/g;
    let match = timeRegex.exec(stringValue);
    if (match) {
      let duration = parseFloat(match[1]);
      if (match[2] == 'ms') {
        duration /= 1000;
      }
      if (Number.isNaN(duration)) {
        return false;
      }
      this.duration = duration;
      return true;
    }
    return false;
  }

  setStartTime(delayString: string): boolean {
    let timeRegex = /(^[-+]?[0-9]*\.?[0-9]*)(s|ms)*$/g;
    let match = timeRegex.exec(delayString);
    if (match) {
      let delay = parseFloat(match[1]);
      if (match[2] == 'ms') {
        delay /= 1000;
      }
      if (Number.isNaN(delay)) {
        return false;
      }
      this.startTime = -delay;
      return true;
    }
    return false;
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

  toReactProps() : React.CSSProperties {
    return {
      animationName: this.useClone ? 
          this.name + '2' : 
          this.name,
      animationDuration: this.duration + 's',
      animationPlayState: this.playState,
      animationDelay: (- this.startTime) + 's',
      animationIterationCount: this.iterationCount,
      animationTimingFunction: this.timing,
      animationFillMode: this.fillMode,
      animationDirection: this.direction,
    }
  }

}