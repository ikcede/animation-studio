import React from 'react';
import styling from './AnimationPreview.module.css';
import { AnimationContext } from '../../providers/AnimationProvider';

const AnimationPreview: React.FC = () => {
  const animation = React.useContext(AnimationContext);

  return (
    <div className={styling.wrapper}>
      <div className={styling['target-wrapper']}>
        <div className={styling.target}
            style={{
              ...animation.toReactProps(),
              animationName: animation.useClone ? 
                  animation.name + '2' : 
                  animation.name
            }}>
          Animation Text
        </div>
      </div>
    </div>
  );
};

export default AnimationPreview;