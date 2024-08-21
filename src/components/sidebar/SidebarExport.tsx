import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { AnimationContext } from '../../providers/AnimationProvider';
import { KeyframesContext } from '../../providers/KeyframesProvider';

import styling from './SidebarExport.module.css';

const SidebarExport: React.FC = () => {

  const keyframes = React.useContext(KeyframesContext);
  const animation = React.useContext(AnimationContext);

  const getAnimationCss = (): string => {
    return `.target {
  ${animation.toCSSString({name: animation.name, useStartTime: false})}
}`;
  }

  return (
    <div className={styling.wrapper}>
      <p>
        Keyframes
      </p>
      <CodeMirror
        value={keyframes.keyframes?.cssText ?? ''}
        height='200px'
        width='100%'
        theme='dark'
        extensions={[css()]}
        editable={false}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
      />
      <p>Animation</p>
      <CodeMirror
        value={getAnimationCss()}
        height='225px'
        width='100%'
        theme='dark'
        extensions={[css()]}
        editable={false}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};

export default SidebarExport;