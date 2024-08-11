'use client'

import React from 'react';
import styling from './page.module.css';
import AnimationPreview from "@/components/preview/AnimationPreview";
import Timeline from "@/components/timeline/Timeline";
import Sidebar from '@/components/sidebar/Sidebar';

import { KeyframesContext } from '@/providers/KeyframesProvider';
import { cloneKeyframes } from '@/util';

export default function Page() {
  const keyframes = React.useContext(KeyframesContext);

  const getStyleText = React.useCallback(() => {
    let clone = cloneKeyframes(keyframes);
    clone.name = clone.name + '2';
    return keyframes.cssText + '\n' + clone.cssText;
  }, [keyframes]);

  return (
    <div className={styling.App}>
      <style>{getStyleText()}</style>
      <main className={styling.main}>
        <div className={styling.preview}>
          <AnimationPreview></AnimationPreview>
        </div>
        <div>
          <Timeline></Timeline>
        </div>
      </main>
      <div className={styling.sidebar}>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}