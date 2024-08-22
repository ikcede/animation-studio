'use client'

import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { css as cssLang} from "@codemirror/lang-css";
import { html as htmlLang } from "@codemirror/lang-html";
import beautify from 'js-beautify';

import styling from './SidebarTarget.module.css';
import { TargetElementContext, TargetElementDispatchContext } from '@/providers/TargetElementProvider';

const SidebarTarget: React.FC = () => {
  const formatOptions = {
    indent_size: 2
  };

  const targetElement = React.useContext(TargetElementContext);
  const targetElementDispatch = 
      React.useContext(TargetElementDispatchContext);

  const [html, setHtml] = React.useState(
      beautify.html(targetElement.html, formatOptions));
  const [htmlError, setHtmlError] = React.useState('');
  const [css, setCss] = React.useState(
      beautify.css(targetElement.css, formatOptions));
  const [cssError, setCssError] = React.useState('');

  /** Checks if the HTML string includes a proper target element */
  const validateHtml = (htmlString: string): boolean => {
    let el = document.createElement('div');
    el.innerHTML = htmlString;
    return el.getElementsByClassName('target').length > 0;
  };

  const changeHtml = (
    val: string
  ) => {
    setHtml(val);
    if (validateHtml(val)) {
      targetElementDispatch({
        el: {
          html: val,
          css: css
        }
      });
      if (htmlError !== '') {
        setHtmlError('');
      }
    } else {
      setHtmlError('HTML must include a .target element');
    }
  }

  const changeCss = (
    val: string
  ) => {
    setCss(val);
    
    try {
      let stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(val);
      targetElementDispatch({
        el: {
          html: html,
          css: val
        }
      });
      if (cssError !== '') {
        setCssError('');
      }
    } catch (error: any) {
      setCssError(error.message);
    }
  }

  return (
    <div className={styling.wrapper}>
      Customize the target element
      <p>
        CSS
      </p>
      <CodeMirror
        className={cssError !== '' ? styling.error : ''}
        value={css}
        height='250px'
        width='100%'
        theme='dark'
        extensions={[cssLang()]}
        placeholder={'.target {\n  color: green;\n  font-family: monospace; \n}'}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        onChange={changeCss}
      />
      <span className={styling['error-text']}>
        {cssError !== '' ? cssError : ''}
      </span>
      <p>
        HTML
      </p>
      <CodeMirror
        className={htmlError !== '' ? styling.error : ''}
        value={html}
        height='250px'
        width='100%'
        theme='dark'
        extensions={[htmlLang()]}
        placeholder={'<div class="target">\n  Animation Text\n</div>'}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        onChange={changeHtml}
      />
      <span className={styling['error-text']}>
        {htmlError !== '' ? htmlError : ''}
      </span>
    </div>
  );
};

export default SidebarTarget;