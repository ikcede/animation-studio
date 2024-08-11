import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {all as properties} from 'known-css-properties';
import Button from '@mui/material/Button';

import styling from './KeyframeEditor.module.css';
import { KeyframeSelectionContext } from '../../providers/KeyframeSelectionProvider';
import { KeyframesContext, KeyframesDispatchContext } from '../../providers/KeyframesProvider';
import { cloneKeyframes } from '@/util';
import Styles, {Style} from '@/model/Styles';

const KeyframeEditor: React.FC = () => {
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);
  const selectedKeyframe = React.useContext(KeyframeSelectionContext);

  const [styles, setStyles] = React.useState(new Styles());

  /**
   * Gets all known properties minus browser specific ones
   */
  const knownProperties = React.useMemo(() => {
    let filtered = properties.filter(e => e[0] !== '-');
    filtered.sort();
    return filtered;
  }, []);

  /**
   * Update styles in state with a new reference
   */
  const updateStyles = (styleList?: Style[]) => {
    let newStyles = new Styles();
    newStyles.styles = styleList ?? styles.styles;
    setStyles(newStyles);
  }

  const addStyle = () => {
    styles.styles.push({prop: '', val: ''});
    updateStyles();
  }

  const deleteStyle = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    styles.styles.splice(index, 1);
    saveStyles();
  }

  /**
   * Save current styles to keyframes
   */
  const saveStyles = (styleList?: Style[]) => {
    const rule = keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      // Reset rule
      let ruleStyle = rule.style;
      ruleStyle.cssText = '';

      for (let style of (styleList ?? styles.styles)) {
        if (style.prop == '' || style.val == '') {
          continue;
        }

        ruleStyle.setProperty(style.prop, style.val);
      }
    }
    keyframesDispatch({keyframes: cloneKeyframes(keyframes)});
  }

  const setStyleValue = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number
  ) => {
    styles.styles[index].val = e.target.value;
    updateStyles(styles.styles);
  }

  const setStyleProperty = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number
  ) => {
    styles.styles[index].prop = e.target.value;
    updateStyles(styles.styles);
  }

  React.useEffect(() => {
    const rule = keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      setStyles(new Styles(rule.style));
    }
  }, [selectedKeyframe]);

  React.useEffect(() => {
    const rule = keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      styles.updateWithStyle(rule.style);
      updateStyles(styles.styles);
    }
  }, [keyframes]);

  return (
    <div className={styling.editor}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        {styles.styles.map((style, index) => (
          <div className={styling.row} key={index}>
            <Autocomplete
              className={styling.property}
              disablePortal
              disableClearable
              freeSolo
              value={style.prop}
              options={knownProperties}
              renderInput={(params) => 
                <TextField {...params} 
                          placeholder='Property'
                          aria-label='Property'
                          onBlur={(e) => saveStyles()}
                          onChange={(e) => setStyleProperty(e, index)} />}
            />
            <TextField variant='outlined' 
                       className={styling.value}
                       placeholder='Value'
                       aria-label='Value'
                       value={style.val}
                       onBlur={(e) => saveStyles()}
                       onChange={(e) => setStyleValue(e, index)} />
            <IconButton size='small'
                        aria-label='Delete'
                        className='delete-icon'
                        onClick={(e) => deleteStyle(e, index)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
        ))}
        <div className='property-row'>
          <Button size='small'
                  variant='outlined'
                  startIcon={<AddIcon aria-label='Add' />}
                  onClick={addStyle}>
            Style
          </Button>
        </div>
      </Box>
    
    </div>
  );
};

export default KeyframeEditor;