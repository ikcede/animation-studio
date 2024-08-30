import React from 'react';
import { AnimationContext } from '@/providers/AnimationProvider';
import { KeyframesContext } from '@/providers/KeyframesProvider';
import ExportCode from '@/components/export-code/ExportCode';

const SidebarExport: React.FC = () => {
  const keyframes = React.useContext(KeyframesContext);
  const animation = React.useContext(AnimationContext);

  const animationCss = React.useMemo(() => {
    return `.target {
  ${animation.toCSSShorthand({name: animation.name, useStartTime: false})}
}`;
  }, [animation]);

  const keyframeCss = React.useMemo(() => {
    let sortedKeyframes = keyframes.toSorted();
    return sortedKeyframes.toString();
  }, [keyframes]);

  return (
    <ExportCode keyframesCss={keyframeCss}
                animationCss={animationCss}
    />
  );
};

export default SidebarExport;