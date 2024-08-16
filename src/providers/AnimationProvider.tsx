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
  newAnimation?: CustomAnimation,
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
    case 'update': {
      return action.newAnimation || animation;
    }
    default: {
      return animation;
    }
  }
};

export interface AnimationProviderProps 
    extends React.PropsWithChildren {
  animation?: CustomAnimation,
  children: React.ReactNode
}

const AnimationProvider: React.FC<AnimationProviderProps> = (
  props
) => {
  const [animation, dispatch] = 
      React.useReducer(animationReducer, new CustomAnimation());

  /**
   * Set up initial animation
   */
    React.useEffect(() => {
      if (props.animation !== undefined) {
        dispatch({
          type: 'update',
          newAnimation: props.animation,
        });
      }
    }, [props]);

  return (
    <AnimationContext.Provider value={animation}>
      <AnimationDispatchContext.Provider value={dispatch}>
        {props.children}
      </AnimationDispatchContext.Provider>
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;