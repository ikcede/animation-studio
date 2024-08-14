'use client'

import AnimationLib from "@/model/AnimationLib";
import AnimationProvider from "./AnimationProvider";
import KeyframeSelectionProvider from "./KeyframeSelectionProvider";
import KeyframesProvider from "./KeyframesProvider";
import TargetElementProvider from "./TargetElementProvider";
import React from "react";
import { CustomAnimation } from "@/model/CustomAnimation";
import { data } from "@/data/animationData";

export interface EditorProviderProps extends React.PropsWithChildren {
  animationLib?: number,
  children: React.ReactNode
}

const EditorProvider: React.FC<EditorProviderProps> = (props) => {

  const [html, setHtml] = React.useState(
      '<div class="target">\n  Animation Text\n</div>');
  const [css, setCSS] = React.useState('.target {\n  \n}');

  React.useEffect(() => {
    if (props.animationLib !== undefined) {
      let lib = data[props.animationLib];
  
      if (lib.targetHtml !== '') {
        setHtml(lib.targetHtml);
      }
  
      if (lib.targetCss !== '') {
        setCSS(lib.targetCss);
      }
    }
  }, [props]);

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