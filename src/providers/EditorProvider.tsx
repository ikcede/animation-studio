'use client';

import {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

import AnimationDto, {
  buildFromDefaultLib,
  getLibKeyframes,
} from '@/model/AnimationDto';
import KeyframeSelectionProvider from './KeyframeSelectionProvider';
import { CustomAnimation } from '@/model/CustomAnimation';
import CustomKeyframes from '@/model/CustomKeyframes';
import { useEditorContext } from '@/context/EditorContext/EditorContext';
import { buildAnimation } from '@/util/buildAnimation/buildAnimation';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';

export interface EditorProviderProps extends PropsWithChildren {
  animationLib?: AnimationDto;
  variant?: number;
  children: ReactNode;
}

const EditorProvider: FC<EditorProviderProps> = (props) => {
  const { userAnimations } = useEditorContext();
  const { loadState } = useTimelineContext();

  const loadAnimationLib = useCallback(
    (animationLib: AnimationDto, variant?: number) => {
      const lib = buildFromDefaultLib(animationLib);

      const keyframesString = getLibKeyframes(lib, variant);
      let newKeyframes = new CustomKeyframes(
        CustomKeyframes.getDefaultKeyframes()
      );
      if (keyframesString !== undefined && keyframesString !== '') {
        newKeyframes = new CustomKeyframes(keyframesString);
      }

      let newAnimation = new CustomAnimation();
      if (lib.animation !== '') {
        newAnimation.buildFromString(lib.animation!);
        if (
          variant !== undefined &&
          lib.variants &&
          lib.variants[variant]
        ) {
          newAnimation.name += '-' + lib.variants[variant].name;
        }
      }

      loadState({
        targetHtml: lib.targetHtml,
        targetCss: lib.targetCss,
        keyframes: newKeyframes,
        animation: newAnimation,
      });
    },
    []
  );

  // Set up the page on reload
  useEffect(() => {
    // Use the animation library from props if provided
    if (props.animationLib !== undefined) {
      loadAnimationLib(props.animationLib, props.variant);
      return;
    }

    // Check for a working copy
    if (userAnimations.workingCopy !== undefined) {
      console.log('loading working copy:', userAnimations.workingCopy);
      const savedAnimation = buildAnimation(userAnimations.workingCopy);
      loadState({
        animation: savedAnimation.animation,
        keyframes: savedAnimation.keyframes,
        targetHtml: savedAnimation.targetHtml,
        targetCss: savedAnimation.targetCss,
      });
    }
  }, [props.animationLib, props.variant]);

  return (
    <KeyframeSelectionProvider>{props.children}</KeyframeSelectionProvider>
  );
};

export default EditorProvider;
