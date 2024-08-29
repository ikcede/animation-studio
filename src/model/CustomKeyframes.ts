export default class CustomKeyframes {
  keyframes: CSSKeyframesRule | null;
  keyframeString: string;

  constructor(keyframeString: string) {
    this.keyframeString = keyframeString;

    if (typeof CSSStyleSheet === 'undefined') {
      this.keyframes = null;
    } else {
      let styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(keyframeString);
      this.keyframes = styleSheet.cssRules[0] instanceof CSSKeyframesRule ?
        styleSheet.cssRules[0] : null;
    }
  }

  clone(): CustomKeyframes {
    return new CustomKeyframes(this.toString());
  }

  toString(): string {
    if (this.keyframes == null) {
      return this.keyframeString;
    }
    return this.keyframes.cssText;
  }

  toStringWithClone(): string {
    let clone = this.clone();
    if (clone.keyframes !== null) {
      clone.keyframes.name += '2';
      return this.toString() + '\n' + clone.toString();
    }
    return this.toString() + '\n/* Clone failed */';
  }

  static getDefaultKeyframes = (): string => {
    return `
      @keyframes default-animation {
        0% { font-size: 40px; }
        100% { font-size: 14px; }
      } 
    `;
  }
}