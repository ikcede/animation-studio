'use client';

import { useEffect, useState, FC, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css as cssLang } from '@codemirror/lang-css';
import { html as htmlLang } from '@codemirror/lang-html';
import beautify from 'js-beautify';

import styling from './SidebarTarget.module.css';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';

const SidebarTarget: FC = () => {
  const formatOptions = {
    indent_size: 2,
  };

  const { targetHtml, targetCss, setTargetHtml, setTargetCss } =
    useTimelineContext();

  const [html, setHtml] = useState(
    beautify.html(targetHtml, formatOptions)
  );
  const [htmlError, setHtmlError] = useState('');
  const [css, setCss] = useState(beautify.css(targetCss, formatOptions));
  const [cssError, setCssError] = useState('');

  /** Update the HTML and CSS when the target HTML and CSS changes */
  useEffect(() => {
    setHtml(beautify.html(targetHtml, formatOptions));
    setHtmlError('');
    setCss(beautify.css(targetCss, formatOptions));
    setCssError('');
  }, [targetHtml, targetCss]);

  /** Checks if the HTML string includes a proper target element */
  const validateHtml = (htmlString: string): boolean => {
    let el = document.createElement('div');
    el.innerHTML = htmlString;
    return el.getElementsByClassName('target').length > 0;
  };

  const changeHtml = useCallback(
    (val: string) => {
      setHtml(val);
      if (validateHtml(val)) {
        setTargetHtml(val);
        if (htmlError !== '') {
          setHtmlError('');
        }
      } else {
        setHtmlError('HTML must include a .target element');
      }
    },
    [setTargetHtml, setHtmlError, htmlError]
  );

  const changeCss = useCallback(
    (val: string) => {
      setCss(val);

      try {
        let stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(val);
        setTargetCss(val);
        if (cssError !== '') {
          setCssError('');
        }
      } catch (error: any) {
        setCssError(error.message);
      }
    },
    [setTargetCss, setCssError, cssError]
  );

  return (
    <div className={styling.wrapper}>
      Customize the target element
      <p>CSS</p>
      <CodeMirror
        className={cssError !== '' ? styling.error : ''}
        value={css}
        height="250px"
        width="100%"
        theme="dark"
        extensions={[cssLang()]}
        placeholder={
          '.target {\n  color: green;\n  font-family: monospace; \n}'
        }
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        onChange={changeCss}
      />
      <span className={styling['error-text']}>
        {cssError !== '' ? cssError : ''}
      </span>
      <p>HTML</p>
      <CodeMirror
        className={htmlError !== '' ? styling.error : ''}
        value={html}
        height="250px"
        width="100%"
        theme="dark"
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
