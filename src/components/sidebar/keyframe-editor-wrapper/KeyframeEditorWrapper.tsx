import { KeyframeSelectionContext } from '@/providers/KeyframeSelectionProvider';
import {
  KeyframesContext,
  KeyframesDispatchContext,
} from '@/providers/KeyframesProvider';
import React from 'react';
import KeyframeEditor from '../keyframe-editor/KeyframeEditor';

const KeyframeEditorWrapper: React.FC = () => {
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);
  const selectedKeyframe = React.useContext(KeyframeSelectionContext);

  const [activeKeyframe, setActiveKeyframe] =
    React.useState<CSSKeyframeRule | null>(null);

  /**
   * Save current styles to keyframes
   */
  const saveStyles = React.useCallback(
    (cssText: string) => {
      if (keyframes.keyframes == null) {
        return;
      }
      const rule = keyframes.keyframes.findRule(selectedKeyframe + '%');
      if (rule !== null) {
        rule.style.cssText = cssText;
      }
      keyframesDispatch({
        keyframes: keyframes.clone(),
      });
    },
    [keyframes, selectedKeyframe, keyframesDispatch]
  );

  /** Only send updated values on selected keyframe change */
  React.useEffect(() => {
    setActiveKeyframe(
      keyframes.keyframes?.findRule(selectedKeyframe + '%') ?? null
    );
  }, [selectedKeyframe]);

  return (
    <>
      <KeyframeEditor
        keyframes={activeKeyframe}
        onKeyframeChange={saveStyles}
      />
    </>
  );
};

export default KeyframeEditorWrapper;
