'use client'

import React from 'react';
import { createDefaultKeyframes, createKeyframeRule } from '@/util';
import debounce from 'lodash.debounce';

export const KeyframesContext = 
    React.createContext<CSSKeyframesRule>(createDefaultKeyframes());
export const KeyframesDispatchContext = 
    React.createContext<React.Dispatch<KeyframesAction>>(() => {});

type KeyframesAction = {
  keyframes: CSSKeyframesRule,
  save?: boolean
};

const save = debounce((keyframes: string) => {
  localStorage.setItem('currentKeyframes', keyframes);
}, 2000);

const keyframesReducer = (
  state: CSSKeyframesRule,
  action: KeyframesAction
): CSSKeyframesRule => {
  if (action.save) {
    save(action.keyframes.cssText);
  }
  return action.keyframes;
};

const KeyframesProvider = (
  {children}: {children: React.ReactNode}
) => {
  const [keyframes, dispatch] = 
      React.useReducer(keyframesReducer, createDefaultKeyframes());

  React.useEffect(() => {
    let loadedKeyframes = localStorage.getItem('currentKeyframes') || '';
    if (loadedKeyframes.length > 0) {
      let newKeyframes = createKeyframeRule(loadedKeyframes) || keyframes;
      dispatch({
        keyframes: newKeyframes,
        save: false,
      });
    }
  }, []);

  return (
    <KeyframesContext.Provider value={keyframes}>
      <KeyframesDispatchContext.Provider value={dispatch}>
        {children}
      </KeyframesDispatchContext.Provider>
    </KeyframesContext.Provider>
  );
};

export default KeyframesProvider;