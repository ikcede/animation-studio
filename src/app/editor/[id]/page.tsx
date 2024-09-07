'use client';

import React from 'react';
import styling from './page.module.css';
import AppBar from '@/components/app-bar/AppBar';
import AnimationPreview from '@/components/preview/AnimationPreview';
import Timeline from '@/components/timeline/Timeline';
import Sidebar from '@/components/sidebar/Sidebar';

import { KeyframesContext } from '@/providers/KeyframesProvider';
import { AnimationContext } from '@/providers/AnimationProvider';
import { TargetElementContext } from '@/providers/TargetElementProvider';
import { EditorSettingsContext } from '@/providers/EditorSettingsProvider';

export default function Page() {
  const animation = React.useContext(AnimationContext);
  const keyframes = React.useContext(KeyframesContext);
  const targetElement = React.useContext(TargetElementContext);
  const settings = React.useContext(EditorSettingsContext);
  const [allKeyframes, setAllKeyframes] = React.useState('');

  React.useEffect(() => {
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
            targetHtml={targetElement.html}
            targetCss={targetElement.css}
            backgroundColor={settings.backgroundColor}
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
