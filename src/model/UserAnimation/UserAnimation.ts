import { CustomAnimation } from '../CustomAnimation';
import CustomKeyframes from '../CustomKeyframes';

export interface UserAnimation {
  id: string;
  name: string;
  animation: CustomAnimation;
  keyframes: CustomKeyframes;
  targetHtml: string;
  targetCss: string;
}
