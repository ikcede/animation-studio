import React from 'react';
import styling from './AnimationPreview.module.css';
import { AnimationContext } from '@/providers/AnimationProvider';
import { TargetElementContext } from '@/providers/TargetElementProvider';

const AnimationPreview: React.FC = () => {
  const animation = React.useContext(AnimationContext);
  const targetElement = React.useContext(TargetElementContext);

  const wrapper = React.useRef<HTMLDivElement>(null);
  const [styleText, setStyleText] = React.useState(targetElement.css);
  const [animationCss, setAnimationCss] = 
      React.useState(animation.toCSSString(true));

  React.useEffect(() => {
    let node = wrapper.current;
    if (node !== null && targetElement.html.length > 0) {
      node.innerHTML = targetElement.html;
    }

    setStyleText(targetElement.css);
  }, [targetElement]);

  React.useEffect(() => {
    setAnimationCss(animation.toCSSString(true));
  }, [animation]);

  return (
    <div className={styling.wrapper}>
      <style>{styleText}</style>
      <style>{animationCss}</style>
      <div className={styling['target-wrapper']} ref={wrapper}>
        <div className='target'></div>
      </div>
    </div>
  );
};

export default AnimationPreview;