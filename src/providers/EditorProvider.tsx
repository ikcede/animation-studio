'use client'

import React from "react";

import AnimationLib, { buildFromDefaultLib } from "@/model/AnimationLib";
import AnimationProvider from "./AnimationProvider";
import KeyframeSelectionProvider from "./KeyframeSelectionProvider";
import KeyframesProvider from "./KeyframesProvider";
import TargetElementProvider from "./TargetElementProvider";
import { CustomAnimation } from "@/model/CustomAnimation";
import { CustomKeyframes } from "@/model";

export interface EditorProviderProps extends React.PropsWithChildren {
  animationLib?: AnimationLib,
  children: React.ReactNode
}

const EditorProvider: React.FC<EditorProviderProps> = (props) => {

  const [html, setHtml] = React.useState('<div class="target"></div>');
  const [css, setCSS] = React.useState('.target {\n  \n}');
  const [keyframes, setKeyframes] = React.useState(
      new CustomKeyframes(CustomKeyframes.getDefaultKeyframes()));
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

      if (lib.keyframes !== '') {
        setKeyframes(new CustomKeyframes(lib.keyframes!));
      }

      if (lib.animation !== '') {
        setAnimation(
            (new CustomAnimation()).buildFromString(lib.animation!));
      }
    }
  }, [props]);

  return (
    <AnimationProvider animation={animation}>
      <KeyframesProvider keyframes={keyframes}>
        <KeyframeSelectionProvider>
          <TargetElementProvider
              html={html}
              css={css}>
            {props.children}
          </TargetElementProvider>
        </KeyframeSelectionProvider>
      </KeyframesProvider>
    </AnimationProvider>
  );
};

export default EditorProvider;