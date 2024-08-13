'use client'

import React from 'react';
import { CustomAnimation } from '@/model';

export const AnimationContext = 
  React.createContext(new CustomAnimation());
export const AnimationDispatchContext = 
  React.createContext<React.Dispatch<AnimationReducerAction>>(() => {});

type AnimationReducerAction = {
  type: string,
  value?: string,
};

const animationReducer = (
  animation: CustomAnimation,
  action: AnimationReducerAction
): CustomAnimation => {
  switch (action.type) {
    case 'play': {
      return animation.clone().apply({
        playState: 'running',
        ended: false,
        useClone: animation.ended ? 
          !animation.useClone :
          animation.useClone,
        startTime: animation.ended ? 
          0 : animation.startTime,
      });
    }
    case 'pause': {
      return animation.clone().apply({
        playState: 'paused'
      });
    }
    case 'end': {
      return animation.clone().apply({
        ended: true,
        playState: 'paused',
      });
    }
    case 'setTime': {
      let time = parseFloat(action.value || '0');
      return animation.clone().apply({
        ended: time == animation.duration,
        playState: 'paused',
        startTime: time,
        useClone: !animation.useClone,
      });
    }
    case 'refresh': {
      return animation.clone().apply({
        useClone: !animation.useClone,
      });
    }
    default: {
      return animation;
    }
  }
};

const AnimationProvider = (
  {children}: {children: React.ReactNode}
) => {
  const [animation, dispatch] = 
      React.useReducer(animationReducer, new CustomAnimation());

  return (
    <AnimationContext.Provider value={animation}>
      <AnimationDispatchContext.Provider value={dispatch}>
        {children}
      </AnimationDispatchContext.Provider>
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;