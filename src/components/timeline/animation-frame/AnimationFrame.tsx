import React from 'react';
import styling from './AnimationFrame.module.css'
import { CustomAnimation, CustomKeyframes } from '@/model';
import AnimationPlayhead from './AnimationPlayhead';

export interface AnimationFrameProps {
  timelineSettings: {
    totalTime: number,
    playbackRate: number,
  },
  animation: CustomAnimation,
  keyframes: CustomKeyframes,
  addMode?: boolean,
}

const AnimationFrame: React.FC<AnimationFrameProps> = ({
  timelineSettings,
  animation,
  keyframes,
  addMode = false,
}) => {

  const getWidth = React.useCallback((): string => {
    return (animation.duration / timelineSettings.totalTime * 100) + '%';
  }, [animation.duration, timelineSettings.totalTime]);

  return (
    <div className={styling.frame}
         style={{
          width: getWidth(),
          left: animation.initialDelay,
         }}>
      <div className={styling.name}>
        {animation.name}
      </div>

      {animation.timing !== 'linear' && 
        <AnimationPlayhead animation={animation} />
      }
    </div>
  )
}

export default AnimationFrame