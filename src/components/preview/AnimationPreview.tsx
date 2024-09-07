import React from 'react';
import styling from './AnimationPreview.module.css';
import { CustomAnimation } from '@/model';

export interface AnimationPreviewProps {
  animation: CustomAnimation;
  keyframesCss?: string;
  allKeyframes?: string[];
  isItemPreview?: boolean;
  itemPreviewId?: number;
  targetHtml?: string;
  targetCss?: string;
  backgroundColor?: string;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  animation,
  allKeyframes = [],
  isItemPreview = false,
  itemPreviewId = 0,
  targetHtml,
  targetCss,
  backgroundColor,
}) => {
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [animationCss, setAnimationCss] = React.useState(
    animation.toCSSString({ useStartTime: true })
  );

  React.useEffect(() => {
    let node = wrapper.current;
    if (
      node !== null &&
      targetHtml !== undefined &&
      targetHtml.length > 0
    ) {
      node.innerHTML = targetHtml;
    }
  }, [targetHtml]);

  React.useEffect(() => {
    setAnimationCss(animation.toCSSString({ useStartTime: true }));
  }, [animation]);

  return (
    <div
      className={
        (isItemPreview ? styling['wrapper-item'] : styling.wrapper) +
        ' preview-' +
        itemPreviewId
      }
      style={{ backgroundColor: backgroundColor || undefined }}
    >
      {allKeyframes.map((keyframesCssText, index) => (
        <style key={index}>{keyframesCssText}</style>
      ))}

      {isItemPreview && (
        <>
          <style>{`.preview-${itemPreviewId} {\n${targetCss}\n}`}</style>
          <style>
            {`.preview-${itemPreviewId}:hover .target {
              ${animation.toCSSString()}
              animation-iteration-count: 1;
              animation-play-state: running;
              animation-fill-mode: both;
              animation-delay: 0.2s;
            }`}
          </style>
        </>
      )}

      {!isItemPreview && (
        <>
          <style>{targetCss}</style>
          <style>{`.target {\n${animationCss}\n}`}</style>
        </>
      )}

      <div
        className={styling['target-wrapper']}
        ref={wrapper}
        style={{ zoom: isItemPreview ? '50%' : undefined }}
      >
        <div className="target"></div>
      </div>
    </div>
  );
};

export default AnimationPreview;
