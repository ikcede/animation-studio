export const DEFAULT_HTML = '<div class="target">Animation Text</div>';
export const DEFAULT_CSS = '.target {}';
export const DEFAULT_KEYFRAMES = `
  @keyframes default-animation {
    0% { font-size: 40px; }
    100% { font-size: 14px; }
  } 
`;
export const DEFAULT_ANIMATION = `
  animation-name: default-animation;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
`;
export const DEFAULT_ANIMATION_NAME = 'default-animation';
