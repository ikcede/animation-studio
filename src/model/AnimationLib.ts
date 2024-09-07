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
  variants?: {
    name: string;
    keyframes: string;
  }[];
}

export const buildFromDefaultLib = (lib?: AnimationLib): AnimationLib => {
  return Object.assign(
    {
      id: -1,
      name: 'default-animation',
      description: '',
      tags: [],
      animation: '',
      keyframes: '',
      targetHtml: '<div class="target">Animation Text</div>',
      targetCss: '.target {}',
    },
    lib ?? {}
  );
};

export const getLibKeyframes = (lib: AnimationLib, variant?: number) => {
  if (
    variant === undefined ||
    lib.variants === undefined ||
    lib.variants[variant] === undefined
  ) {
    return lib.keyframes;
  } else {
    return lib.variants[variant].keyframes;
  }
};
