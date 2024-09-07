'use client';

import React from 'react';
import { CustomKeyframes } from '@/model';

export const KeyframesContext = React.createContext<CustomKeyframes>(
  new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
);
export const KeyframesDispatchContext = React.createContext<
  React.Dispatch<KeyframesAction>
>(() => {});

type KeyframesAction = {
  keyframes: CustomKeyframes;
};

const keyframesReducer = (
  state: CustomKeyframes,
  action: KeyframesAction
): CustomKeyframes => {
  return action.keyframes;
};

export interface KeyframesProviderProps extends React.PropsWithChildren {
  keyframes?: CustomKeyframes;
  children: React.ReactNode;
}

const KeyframesProvider: React.FC<KeyframesProviderProps> = (props) => {
  const [keyframes, dispatch] = React.useReducer(
    keyframesReducer,
    new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
  );

  /**
   * Set up initial keyframes
   */
  React.useEffect(() => {
    if (props.keyframes !== undefined) {
      dispatch({
        keyframes: props.keyframes,
      });
    }
  }, [props]);

  return (
    <KeyframesContext.Provider value={keyframes}>
      <KeyframesDispatchContext.Provider value={dispatch}>
        {props.children}
      </KeyframesDispatchContext.Provider>
    </KeyframesContext.Provider>
  );
};

export default KeyframesProvider;
