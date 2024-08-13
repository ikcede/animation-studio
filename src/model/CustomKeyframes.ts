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

  clone() {
    if (this.keyframes == null) {
      return new CustomKeyframes(this.keyframeString);
    }
    return new CustomKeyframes(this.keyframes.cssText);
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