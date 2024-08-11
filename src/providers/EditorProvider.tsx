import AnimationProvider from "./AnimationProvider";
import KeyframeSelectionProvider from "./KeyframeSelectionProvider";
import KeyframesProvider from "./KeyframesProvider";

const EditorProvider = (
  {children}: {children: React.ReactNode}
) => {
  return (
    <AnimationProvider>
      <KeyframesProvider>
        <KeyframeSelectionProvider>
          {children}
        </KeyframeSelectionProvider>
      </KeyframesProvider>
    </AnimationProvider>
  );
};

export default EditorProvider;