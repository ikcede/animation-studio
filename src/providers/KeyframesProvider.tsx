'use client'

import React from 'react';
import { createDefaultKeyframes } from '@/util';

export const KeyframesContext = 
    React.createContext<CSSKeyframesRule>(createDefaultKeyframes());
export const KeyframesDispatchContext = 
    React.createContext<React.Dispatch<KeyframesAction>>(() => {});

type KeyframesAction = {
  keyframes: CSSKeyframesRule
};

const keyframesReducer = (
  state: CSSKeyframesRule,
  action: KeyframesAction
): CSSKeyframesRule => {
  return action.keyframes;
};

const KeyframesProvider = (
  {children}: {children: React.ReactNode}
) => {
  const [keyframes, dispatch] = 
      React.useReducer(keyframesReducer, createDefaultKeyframes());

  return (
    <KeyframesContext.Provider value={keyframes}>
      <KeyframesDispatchContext.Provider value={dispatch}>
        {children}
      </KeyframesDispatchContext.Provider>
    </KeyframesContext.Provider>
  );
};

export default KeyframesProvider;