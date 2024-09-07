import debounce from 'lodash.debounce';
import { TargetElement } from '@/providers/TargetElementProvider';
import CustomKeyframes from '@/model/CustomKeyframes';

export const loadTargetElement = () => {
  let loadedTargetElement =
    localStorage.getItem('currentTargetElement') || '';
  if (loadedTargetElement.length > 0) {
    return JSON.parse(loadedTargetElement);
  }
  return { html: '', css: '' };
};

export const loadCustomKeyframes = () => {
  let loadedKeyframes = localStorage.getItem('currentKeyframes') || '';
  if (loadedKeyframes.length > 0) {
    return new CustomKeyframes(loadedKeyframes);
  }
  return null;
};

export const saveTargetElement = debounce((el: TargetElement) => {
  localStorage.setItem('currentTargetElement', JSON.stringify(el));
}, 2000);

export const saveKeyframes = debounce((keyframes: string) => {
  localStorage.setItem('currentKeyframes', keyframes);
}, 2000);
