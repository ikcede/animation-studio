import React from 'react';
import styling from './Preview.module.css';
import AnimationLib, { getLibKeyframes } from '@/model/AnimationLib';
import { CustomAnimation } from '@/model/CustomAnimation';

export interface PreviewProps {
  lib: AnimationLib,
  selectedVariant?: number,
}

const Preview: React.FC<PreviewProps> = ({
  lib,
  selectedVariant,
}) => {
  const [animation, setAnimation] = React.useState(new CustomAnimation());

  React.useEffect(() => {
    let selectedAnimation = new CustomAnimation()
        .buildFromString(lib.animation || '');

    if (selectedVariant !== undefined && 
        lib.variants !== undefined &&
        lib.variants[selectedVariant] !== undefined) {
      selectedAnimation.name += '-' + lib.variants[selectedVariant].name;
    }

    setAnimation(selectedAnimation);
  }, [lib, selectedVariant]);

  const getKeyframes = React.useCallback(() => {
    return getLibKeyframes(lib, selectedVariant);
  }, [selectedVariant, lib.keyframes, lib.variants]);

  return (
    <div className={`${styling.wrapper}`}>
      <style>
        {`.target-${lib.id} {
          width: 50px; height: 50px; display: flex; background: red;
        }
        
        .${styling.preview}:hover .target-${lib.id} {
          animation: ${animation.name};
          animation-iteration-count: 1;
          animation-play-state: running;
          animation-duration: 0.5s;
          animation-fill-mode: both;
        }
        
        ${getKeyframes()}`}
      </style>
      <div className={styling.preview}>
        <div className={`target-${lib.id}`}></div>
      </div>
    </div>
  );
};

export default Preview;