import React from 'react';
import styling from './ExportCode.module.css';
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import beautify from 'js-beautify';

export interface ExportCodeProps {
  keyframesCss?: string,
  animationCss?: string,
}

const ExportCode: React.FC<ExportCodeProps> = ({
  keyframesCss = '',
  animationCss = '',
}) => {
  const formatOptions = {
    indent_size: 2
  };

  let formattedKeyframes = React.useMemo(() => {
    return beautify.css(keyframesCss, formatOptions);
  }, [keyframesCss]);

  let formattedAnimation = React.useMemo(() => {
    return beautify.css(animationCss, formatOptions);
  }, [animationCss]);

  return (
    <div className={styling.wrapper}>
      <p>
        Keyframes
      </p>
      <CodeMirror
        value={formattedKeyframes}
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
        value={formattedAnimation}
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