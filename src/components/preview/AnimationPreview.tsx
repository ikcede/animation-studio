import { FC, useEffect, useMemo, useRef, useState } from 'react';
import styling from './AnimationPreview.module.css';
import { CustomAnimation } from '@/model/CustomAnimation';
import CustomKeyframes from '@/model/CustomKeyframes';

export interface AnimationPreviewProps {
  animation: CustomAnimation;
  keyframesCss?: string;
  allKeyframes?: string[];
  isItemPreview?: boolean;
  itemPreviewId?: number;
  targetHtml?: string;
  targetCss?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

const AnimationPreview: FC<AnimationPreviewProps> = ({
  animation,
  allKeyframes = [],
  isItemPreview = false,
  itemPreviewId = 0,
  targetHtml,
  targetCss,
  backgroundColor,
  width = 200,
  height = 200,
}) => {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let node = wrapper.current;
    if (
      node !== null &&
      targetHtml !== undefined &&
      targetHtml.length > 0
    ) {
      node.innerHTML = targetHtml;
    }
  }, [targetHtml]);

  const animationCss = useMemo(
    () =>
      animation
        .clone()
        .apply({
          name: animation.name + '-preview-' + itemPreviewId,
        })
        .toCSSString({
          useStartTime: !isItemPreview,
        }),
    [animation, isItemPreview, itemPreviewId]
  );

  const keyframesCss = useMemo(() => {
    const previewKeyframes = allKeyframes.map((keyframes) => {
      const tempKeyframes = new CustomKeyframes(keyframes);
      if (tempKeyframes.keyframes !== null) {
        tempKeyframes.keyframes.name += '-preview-' + itemPreviewId;
      }
      return isItemPreview
        ? tempKeyframes.toString()
        : tempKeyframes.toStringWithClone();
    });
    return previewKeyframes.join('\n');
  }, [allKeyframes, isItemPreview, itemPreviewId]);

  return (
    <div
      className={
        (isItemPreview ? styling['wrapper-item'] : styling.wrapper) +
        ' preview-' +
        itemPreviewId
      }
      style={{
        backgroundColor: backgroundColor || undefined,
        width: width + 'px',
        height: height + 'px',
      }}
    >
      <style>{keyframesCss}</style>

      {isItemPreview && (
        <>
          <style>{`.preview-${itemPreviewId} {\n${targetCss}\n}`}</style>
          <style>
            {`.preview-${itemPreviewId}:hover .target {
              ${animationCss}
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
        style={{
          zoom: isItemPreview ? '30%' : undefined,
          cursor: isItemPreview ? 'pointer' : undefined,
        }}
      >
        <div className="target"></div>
      </div>
    </div>
  );
};

export default AnimationPreview;
