import { KeyframeSelectionContext } from '@/providers/KeyframeSelectionProvider';
import React from 'react';
import KeyframeEditor from '../keyframe-editor/KeyframeEditor';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';

const KeyframeEditorWrapper: React.FC = () => {
  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const { keyframes, setKeyframes } = useTimelineContext();

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
      setKeyframes(keyframes.clone());
    },
    [keyframes, selectedKeyframe, setKeyframes]
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
