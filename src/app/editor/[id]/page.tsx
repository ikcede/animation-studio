'use client'

import React from 'react';
import styling from './page.module.css';
import AnimationPreview from "@/components/preview/AnimationPreview";
import Timeline from "@/components/timeline/Timeline";
import Sidebar from '@/components/sidebar/Sidebar';

import { KeyframesContext } from '@/providers/KeyframesProvider';

export default function Page() {
  const keyframes = React.useContext(KeyframesContext);
  const [styleText, setStyleText] = React.useState('');

  React.useEffect(() => {
    if (keyframes.keyframes == null) {
      setStyleText('');
      return;
    }
    let clone = keyframes.clone();
    clone.keyframes!.name = clone.keyframes!.name + '2';
    setStyleText(
      keyframes.keyframes.cssText + '\n' + clone.keyframes!.cssText);
  }, [keyframes]);

  return (
    <div className={styling.App}>
      <style>{styleText}</style>
      <main className={styling.main}>
        <div className={styling.preview}>
          <AnimationPreview></AnimationPreview>
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