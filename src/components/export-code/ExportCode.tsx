import React from 'react';
import styling from './ExportCode.module.css';
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import beautify from 'js-beautify';
import { IconButton } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

export interface ExportCodeProps {
  keyframesCss?: string,
  animationCss?: string,
}

const formatOptions = {
  indent_size: 2
};

const ExportCode: React.FC<ExportCodeProps> = ({
  keyframesCss = '',
  animationCss = '',
}) => {
  const [keyframesCopied, setKeyframesCopied] = React.useState(false);
  const [animationCopied, setAnimationCopied] = React.useState(false);

  const formattedKeyframes = React.useMemo(() => {
    return beautify.css(keyframesCss, formatOptions);
  }, [keyframesCss]);

  const formattedAnimation = React.useMemo(() => {
    return beautify.css(animationCss, formatOptions);
  }, [animationCss]);

  const copyKeyframes = React.useCallback((e: React.MouseEvent) => {
    navigator.clipboard.writeText(formattedKeyframes);
    setKeyframesCopied(true);
    setAnimationCopied(false);
    setTimeout(() => setKeyframesCopied(false), 4000);
  }, [formattedKeyframes, setKeyframesCopied]);

  const copyAnimation = React.useCallback((e: React.MouseEvent) => {
    navigator.clipboard.writeText(formattedAnimation);
    setAnimationCopied(true);
    setKeyframesCopied(false);
    setTimeout(() => setAnimationCopied(false), 4000);
  }, [formattedAnimation, setAnimationCopied]);

  return (
    <div className={styling.wrapper}>
      <div className={styling.controls}>
        <p>
          Keyframes
        </p>
        <div className={styling.copy}>
          {keyframesCopied && <p>Copied!</p>}
          <IconButton onClick={copyKeyframes} aria-label='Copy'>
            <ContentPasteGoIcon />
          </IconButton>
        </div>
      </div>
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
      
      <div className={styling.controls}>
        <p>
          Animation
        </p>
        <div className={styling.copy}>
          {animationCopied && <p>Copied!</p>}
          <IconButton onClick={copyAnimation} aria-label='Copy'>
            <ContentPasteGoIcon />
          </IconButton>
        </div>
      </div>
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