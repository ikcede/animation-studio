'use client'

import React from 'react';
import debounce from 'lodash.debounce';
import { CustomKeyframes } from '@/model';

export const KeyframesContext = 
    React.createContext<CustomKeyframes>(
        new CustomKeyframes(CustomKeyframes.getDefaultKeyframes()));
export const KeyframesDispatchContext = 
    React.createContext<React.Dispatch<KeyframesAction>>(() => {});

type KeyframesAction = {
  keyframes: CustomKeyframes,
  save?: boolean
};

const save = debounce((keyframes: string) => {
  localStorage.setItem('currentKeyframes', keyframes);
}, 2000);

const keyframesReducer = (
  state: CustomKeyframes,
  action: KeyframesAction
): CustomKeyframes => {
  if (action.save) {
    let keyframes = action.keyframes;
    if (keyframes.keyframes !== null) {
      save(keyframes.keyframes.cssText);
    }
  }
  return action.keyframes;
};

const KeyframesProvider = (
  {children}: {children: React.ReactNode}
) => {
  const [keyframes, dispatch] = React.useReducer(
      keyframesReducer, 
      new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
  );

  React.useEffect(() => {
    let loadedKeyframes = localStorage.getItem('currentKeyframes') || '';
    if (loadedKeyframes.length > 0) {
      let newKeyframes = new CustomKeyframes(loadedKeyframes);
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