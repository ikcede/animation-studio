/** 
 * This needs to be a typed object to be returned
 * directly from NextJS
 */

export default interface AnimationLib {
  id: number;
  name: string;
  description?: string;
  tags?: string[];
  animation?: string;
  keyframes?: string;
  targetHtml?: string;
  targetCss?: string;
}

export const buildFromDefaultLib = 
    (lib?: AnimationLib): AnimationLib => {
  return Object.assign({
    id: -1,
    name: 'default-animation',
    description: '',
    tags: [],
    animation: '',
    keyframes: '',
    targetHtml: '',
    targetCss: ''
  }, lib ?? {});
}