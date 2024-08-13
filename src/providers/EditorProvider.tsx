import AnimationLib from "@/model/AnimationLib";
import AnimationProvider from "./AnimationProvider";
import KeyframeSelectionProvider from "./KeyframeSelectionProvider";
import KeyframesProvider from "./KeyframesProvider";
import TargetElementProvider from "./TargetElementProvider";
import React from "react";

export interface EditorProviderProps extends React.PropsWithChildren {
  animationLib?: AnimationLib,
  children: React.ReactNode
}

const EditorProvider: React.FC<EditorProviderProps> = (props) => {

  

  return (
    <AnimationProvider>
      <KeyframesProvider>
        <KeyframeSelectionProvider>
          <TargetElementProvider>
            {props.children}
          </TargetElementProvider>
        </KeyframeSelectionProvider>
      </KeyframesProvider>
    </AnimationProvider>
  );
};

export default EditorProvider;