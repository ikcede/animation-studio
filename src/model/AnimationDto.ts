import {
  DEFAULT_CSS,
  DEFAULT_ANIMATION_NAME,
  DEFAULT_HTML,
  DEFAULT_KEYFRAMES,
} from '@/util/constants/defaultAnimation';

/**
 * Object for the full animation library data model
 *
 * This needs to be a typed object to be returned
 * directly from NextJS
 */
export default interface AnimationDto {
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

export const buildFromDefaultLib = (lib?: AnimationDto): AnimationDto => {
  return Object.assign(
    {
      id: -1,
      name: DEFAULT_ANIMATION_NAME,
      description: '',
      tags: [],
      animation: '',
      keyframes: DEFAULT_KEYFRAMES,
      targetHtml: DEFAULT_HTML,
      targetCss: DEFAULT_CSS,
    },
    lib ?? {}
  );
};

export const getLibKeyframes = (lib: AnimationDto, variant?: number) => {
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
