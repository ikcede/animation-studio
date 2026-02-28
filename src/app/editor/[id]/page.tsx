'use client';

import { useEffect, useState, useContext } from 'react';
import styling from './page.module.css';
import AppBar from '@/components/app-bar/AppBar';
import AnimationPreview from '@/components/preview/AnimationPreview';
import Timeline from '@/components/timeline/Timeline';
import Sidebar from '@/components/sidebar/Sidebar';

import { AnimationContext } from '@/providers/AnimationProvider';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';
import { useEditorContext } from '@/context/EditorContext/EditorContext';

export default function Page() {
  const animation = useContext(AnimationContext);
  const { keyframes, targetHtml, targetCss } = useTimelineContext();
  const { editorState } = useEditorContext();
  const [allKeyframes, setAllKeyframes] = useState('');

  useEffect(() => {
    setAllKeyframes(keyframes.toStringWithClone());
  }, [keyframes]);

  return (
    <div className={styling.App}>
      <div className={styling.header}>
        <AppBar animationName={animation.name}></AppBar>
      </div>
      <main className={styling.main}>
        <div className={styling.preview}>
          <AnimationPreview
            isItemPreview={false}
            animation={animation}
            allKeyframes={[allKeyframes]}
            targetHtml={targetHtml}
            targetCss={targetCss}
            backgroundColor={editorState?.settings?.backgroundColor}
          />
        </div>
        <div>
          <Timeline></Timeline>
        </div>
      </main>
      <div className={styling['sidebar-container']}>
        <div className={styling.sidebar}>
          <Sidebar></Sidebar>
        </div>
      </div>
    </div>
  );
}
