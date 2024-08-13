'use client'

import AnimationLib from "@/model/AnimationLib";
import AnimationProvider from "./AnimationProvider";
import KeyframeSelectionProvider from "./KeyframeSelectionProvider";
import KeyframesProvider from "./KeyframesProvider";
import TargetElementProvider from "./TargetElementProvider";
import React from "react";
import { CustomAnimation } from "@/model/CustomAnimation";

export interface EditorProviderProps extends React.PropsWithChildren {
  animationLib?: AnimationLib,
  children: React.ReactNode
}

const EditorProvider: React.FC<EditorProviderProps> = (props) => {

  const [html, setHtml] = React.useState(
      '<div class="target">\n  Animation Text\n</div>');
  const [css, setCSS] = React.useState('.target {\n  \n}');

  if (props.animationLib !== undefined) {
    setHtml(props.animationLib.targetHtml);
    setCSS(props.animationLib.targetCss);
  }

  return (
    <AnimationProvider>
      <KeyframesProvider>
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