import { CustomAnimation } from '@/model/CustomAnimation';
import CustomKeyframes from '@/model/CustomKeyframes';
import { SerializedAnimation } from '@/model/SerializedAnimation/SerializedAnimation';

export type SerializeAnimationProps = {
  id: string;
  animation: CustomAnimation;
  keyframes: CustomKeyframes;
  targetHtml: string;
  targetCss: string;
};

export const serializeAnimation = ({
  id,
  animation,
  keyframes,
  targetHtml,
  targetCss,
}: SerializeAnimationProps): SerializedAnimation => {
  const animationString = animation.toCSSShorthand({
    name: animation.name,
  });
  const keyframesString = keyframes.toString();

  return {
    id,
    name: animation.name,
    animation: animationString,
    keyframes: keyframesString,
    targetHtml,
    targetCss,
  };
};
