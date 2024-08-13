'use client'

export const createKeyframeRule = 
    (ruleString: string): CSSKeyframesRule | null => {
  if (CSSStyleSheet === undefined) {
    return null;
  }
  
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(ruleString);

  return styleSheet.cssRules[0] instanceof CSSKeyframesRule ?
      styleSheet.cssRules[0] : null;
}

export const createDefaultKeyframes = (): CSSKeyframesRule => {
  const rule = createKeyframeRule(`
    @keyframes default-animation {
      0% { font-size: 40px; }
      100% { font-size: 14px; }
    } 
  `);

  return rule!;
}

export const cloneKeyframes = (keyframes: CSSKeyframesRule) => {
  return createKeyframeRule(keyframes.cssText)!;
}