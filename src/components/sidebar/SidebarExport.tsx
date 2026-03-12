import { FC, useMemo } from 'react';
import ExportCode from '@/components/export-code/ExportCode';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';

const SidebarExport: FC = () => {
  const { animation, keyframes } = useTimelineContext();

  const animationCss = useMemo(() => {
    return `.target {
  ${animation.toCSSShorthand({ name: animation.name, useStartTime: false })}
}`;
  }, [animation]);

  const keyframeCss = useMemo(() => {
    let sortedKeyframes = keyframes.toSorted();
    return sortedKeyframes.toString();
  }, [keyframes]);

  return (
    <ExportCode keyframesCss={keyframeCss} animationCss={animationCss} />
  );
};

export default SidebarExport;
