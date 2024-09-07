import { CustomAnimation } from '@/model/CustomAnimation';
import React from 'react';
import styling from './AnimationPlayhead.module.css';
import playKeyframes from '@/util/styles/play.module.css';

export interface AnimationPlayheadProps {
  animation: CustomAnimation;
}

const AnimationPlayhead: React.FC<AnimationPlayheadProps> = ({
  animation,
}) => {
  const animationName = playKeyframes.play;
  const animationClone = playKeyframes.play2;

  return (
    <div
      className={styling.playhead}
      style={{
        ...animation.toReactProps(),
        animationName: animation.useClone ? animationClone : animationName,
      }}
    >
      <div className={styling['playhead-head']}></div>
      <div className={styling['playhead-tail']}></div>
    </div>
  );
};

export default AnimationPlayhead;
