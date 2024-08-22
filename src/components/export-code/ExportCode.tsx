import React from 'react';
import styling from './ExportCode.module.css';
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";

export interface ExportCodeProps {
  keyframesCss?: string,
  animationCss?: string,
}

const ExportCode: React.FC<ExportCodeProps> = ({
  keyframesCss = '',
  animationCss = '',
}) => {
  return (
    <div className={styling.wrapper}>
      <p>
        Keyframes
      </p>
      <CodeMirror
        value={keyframesCss}
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
        value={animationCss}
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
  )
}

export default ExportCode