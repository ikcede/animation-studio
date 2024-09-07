import React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { all as properties } from 'known-css-properties';
import Button from '@mui/material/Button';

import styling from './KeyframeEditor.module.css';
import { KeyframeSelectionContext } from '@/providers/KeyframeSelectionProvider';
import {
  KeyframesContext,
  KeyframesDispatchContext,
} from '@/providers/KeyframesProvider';
import Styles, { Style } from '@/model/Styles';
import StyleRow from '../style-row/StyleRow';

const KeyframeEditor: React.FC = () => {
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);
  const selectedKeyframe = React.useContext(KeyframeSelectionContext);

  const [styles, setStyles] = React.useState(new Styles());

  /**
   * Gets all known properties minus browser specific ones
   */
  const knownProperties = React.useMemo(() => {
    let filtered = properties.filter((e) => e[0] !== '-');
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
  };

  const addStyle = (autoFocus?: boolean) => {
    styles.styles.push({
      prop: '',
      val: '',
      autoFocus: autoFocus || false,
    });
    updateStyles();
  };

  const deleteStyle = (index: number) => {
    styles.styles.splice(index, 1);
    saveStyles();
  };

  const handleAddClick = React.useCallback(() => {
    addStyle(true);
  }, [addStyle]);

  /**
   * Save current styles to keyframes
   */
  const saveStyles = (styleList?: Style[]) => {
    if (keyframes.keyframes == null) {
      return;
    }
    const rule = keyframes.keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      // Reset rule
      let ruleStyle = rule.style;
      ruleStyle.cssText = '';

      for (let style of styleList ?? styles.styles) {
        if (style.prop == '' || style.val == '') {
          continue;
        }

        ruleStyle.setProperty(style.prop, style.val);
      }
    }
    keyframesDispatch({
      keyframes: keyframes.clone(),
    });
  };

  const setStyleValue = (newValue: string, index: number) => {
    styles.styles[index].val = newValue;
    updateStyles(styles.styles);
    saveStyles();
  };

  const setStyleProperty = (newProperty: string, index: number) => {
    styles.styles[index].prop = newProperty;
    updateStyles(styles.styles);
    saveStyles();
  };

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
        let index = e.target.getAttribute('data-value-index');
        if (index !== null) {
          let indexValue = Number.parseInt(index);
          if (indexValue === styles.styles.length - 1) {
            addStyle(true);
          }
        }
      }
    },
    [styles, addStyle]
  );

  React.useEffect(() => {
    if (keyframes.keyframes == null) {
      return;
    }

    const rule = keyframes.keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      setStyles(new Styles(rule.style));
    }
  }, [selectedKeyframe]);

  React.useEffect(() => {
    if (keyframes.keyframes == null) {
      return;
    }

    const rule = keyframes.keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      styles.updateWithStyle(rule.style);
      updateStyles(styles.styles);
    }
  }, []);

  return (
    <div className={styling.editor}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onKeyDown={onKeyDown}
      >
        {styles.styles.map((style, index) => (
          <StyleRow
            key={index}
            index={index}
            initialProperty={style.prop}
            initialValue={style.val}
            autoFocus={style.autoFocus !== undefined}
            onPropertyChange={setStyleProperty}
            onValueChange={setStyleValue}
            onDelete={deleteStyle}
          />
        ))}
        <div className="property-row">
          <Button
            className="button"
            size="small"
            variant="outlined"
            startIcon={<AddIcon aria-label="Add" />}
            onClick={handleAddClick}
          >
            Style
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default KeyframeEditor;
