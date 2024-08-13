'use client'

import React from 'react';
import TextField from '@mui/material/TextField';
import { TargetElementContext, TargetElementDispatchContext } from '@/providers/TargetElementProvider';

const SidebarTarget: React.FC = () => {

  const targetElement = React.useContext(TargetElementContext);
  const targetElementDispatch = 
      React.useContext(TargetElementDispatchContext);

  const [html, setHtml] = React.useState(targetElement.html);
  const [htmlError, setHtmlError] = React.useState('');
  const [css, setCss] = React.useState(targetElement.css);
  const [cssError, setCssError] = React.useState('');

  /** Checks if the HTML string includes a proper target element */
  const validateHtml = (htmlString: string): boolean => {
    let el = document.createElement('div');
    el.innerHTML = htmlString;
    return el.getElementsByClassName('target').length > 0;
  };

  const changeHtml = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let testHtml = e.target.value;
    setHtml(testHtml);
    if (validateHtml(testHtml)) {
      targetElementDispatch({
        el: {
          html: testHtml,
          css: css
        },
        save: true
      });
      if (htmlError !== '') {
        setHtmlError('');
      }
    } else {
      setHtmlError('HTML must include a .target element');
    }
  }

  const changeCss = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let testCss = e.target.value;
    setCss(testCss);
    
    try {
      let stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(testCss);
      targetElementDispatch({
        el: {
          html: html,
          css: testCss
        },
        save: true,
      });
      if (cssError !== '') {
        setCssError('');
      }
    } catch (error: any) {
      setCssError(error.message);
    }
  }

  return (
    <>
      <p>
        Customize the target element with CSS and HTML
      </p>
      <TextField
          label="CSS"
          multiline
          rows={10}
          fullWidth
          error = {cssError !== ''}
          helperText = {cssError !== '' ? cssError : undefined}
          InputProps={{
            className: 'monospace',
          }}
          value={css}
          onChange={changeCss}
          placeholder={'.target {\n  color: green;\n  font-family: monospace; \n}'}
          sx={{paddingBottom: '24px', marginTop: '16px'}}
        />
      <TextField
          label="HTML"
          multiline
          rows={10}
          fullWidth
          error = {htmlError !== ''}
          helperText = {htmlError !== '' ? htmlError : undefined}
          InputProps={{
            className: 'monospace',
          }}
          value={html}
          onChange={changeHtml}
          placeholder={'<div class="target">Animation Text</div>'}
        />
    </>
  );
};

export default SidebarTarget;