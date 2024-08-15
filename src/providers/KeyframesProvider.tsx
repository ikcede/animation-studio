'use client'

import React from 'react';
import { CustomKeyframes } from '@/model';

export const KeyframesContext = 
    React.createContext<CustomKeyframes>(
        new CustomKeyframes(CustomKeyframes.getDefaultKeyframes()));
export const KeyframesDispatchContext = 
    React.createContext<React.Dispatch<KeyframesAction>>(() => {});

type KeyframesAction = {
  keyframes: CustomKeyframes,
};

const keyframesReducer = (
  state: CustomKeyframes,
  action: KeyframesAction
): CustomKeyframes => {
  return action.keyframes;
};

const KeyframesProvider = (
  {children}: {children: React.ReactNode}
) => {
  const [keyframes, dispatch] = React.useReducer(
      keyframesReducer, 
      new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
  );

  return (
    <KeyframesContext.Provider value={keyframes}>
      <KeyframesDispatchContext.Provider value={dispatch}>
        {children}
      </KeyframesDispatchContext.Provider>
    </KeyframesContext.Provider>
  );
};

export default KeyframesProvider;