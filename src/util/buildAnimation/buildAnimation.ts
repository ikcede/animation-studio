/** Build a UserAnimation from a SerializedAnimation */
import { CustomAnimation } from '@/model/CustomAnimation';
import CustomKeyframes from '@/model/CustomKeyframes';
import { SerializedAnimation } from '@/model/SerializedAnimation/SerializedAnimation';
import { UserAnimation } from '@/model/UserAnimation/UserAnimation';

export const buildAnimation = (
  serializedAnimation: SerializedAnimation
): UserAnimation => {
  return {
    id: serializedAnimation.id,
    name: serializedAnimation.name,
    animation: new CustomAnimation().buildFromString(
      serializedAnimation.animation
    ),
    keyframes: new CustomKeyframes(serializedAnimation.keyframes),
    targetHtml: serializedAnimation.targetHtml,
    targetCss: serializedAnimation.targetCss,
  };
};
