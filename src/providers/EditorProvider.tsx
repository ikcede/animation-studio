'use client';

import React from 'react';

import AnimationLib, {
  buildFromDefaultLib,
  getLibKeyframes,
} from '@/model/AnimationLib';
import AnimationProvider from './AnimationProvider';
import KeyframeSelectionProvider from './KeyframeSelectionProvider';
import KeyframesProvider from './KeyframesProvider';
import TargetElementProvider from './TargetElementProvider';
import EditorSettingsProvider from './EditorSettingsProvider';
import { CustomAnimation } from '@/model/CustomAnimation';
import { CustomKeyframes } from '@/model';

export interface EditorProviderProps extends React.PropsWithChildren {
  animationLib?: AnimationLib;
  variant?: number;
  children: React.ReactNode;
}

const EditorProvider: React.FC<EditorProviderProps> = (props) => {
  const [html, setHtml] = React.useState('<div class="target"></div>');
  const [css, setCSS] = React.useState('.target {\n  \n}');
  const [keyframes, setKeyframes] = React.useState(
    new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
  );
  const [animation, setAnimation] = React.useState(new CustomAnimation());

  React.useEffect(() => {
    if (props.animationLib !== undefined) {
      let lib = buildFromDefaultLib(props.animationLib);

      if (lib.targetHtml !== '') {
        setHtml(lib.targetHtml!);
      }

      if (lib.targetCss !== '') {
        setCSS(lib.targetCss!);
      }

      let keyframesString = getLibKeyframes(lib, props.variant);
      if (keyframesString !== undefined && keyframesString !== '') {
        setKeyframes(new CustomKeyframes(keyframesString));
      }

      if (lib.animation !== '') {
        let newAnimation = new CustomAnimation();
        newAnimation.buildFromString(lib.animation!);
        if (
          props.variant !== undefined &&
          lib.variants &&
          lib.variants[props.variant]
        ) {
          newAnimation.name += '-' + lib.variants[props.variant].name;
        }
        setAnimation(newAnimation);
      }
    }
  }, [props.animationLib, props.variant]);

  return (
    <EditorSettingsProvider>
      <AnimationProvider animation={animation}>
        <KeyframesProvider keyframes={keyframes}>
          <KeyframeSelectionProvider>
            <TargetElementProvider html={html} css={css}>
              {props.children}
            </TargetElementProvider>
          </KeyframeSelectionProvider>
        </KeyframesProvider>
      </AnimationProvider>
    </EditorSettingsProvider>
  );
};

export default EditorProvider;
