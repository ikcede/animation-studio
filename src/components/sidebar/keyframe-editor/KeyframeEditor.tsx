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

  const [styles, setStyles] = React.useState(new Array<Style>());

  /**
   * Save current styles to keyframes
   */
  const saveStyles = React.useCallback(() => {
    if (keyframes.keyframes == null) {
      return;
    }
    const rule = keyframes.keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      rule.style.cssText = Styles.toCSSString(styles);
    }
    keyframesDispatch({
      keyframes: keyframes.clone(),
    });
  }, [keyframes, selectedKeyframe, styles, keyframesDispatch]);

  /** Adds an empty [Style] to the end of the style list */
  const addStyle = React.useCallback(
    (autoFocus?: boolean) => {
      setStyles((oldStyles) => {
        return [
          ...oldStyles,
          Object.assign(Styles.emptyStyle(), { autoFocus: autoFocus }),
        ];
      });
    },
    [setStyles]
  );

  /** Delete a style and write the change to context */
  const deleteStyle = React.useCallback(
    (index: number) => {
      setStyles((oldStyles) => {
        oldStyles.splice(index, 1);
        return [...oldStyles];
      });
      saveStyles();
    },
    [setStyles, saveStyles]
  );

  const setStyleValue = (newValue: string, index: number) => {
    setStyles((styles) => {
      styles[index].value = newValue;
      return [...styles];
    });
    saveStyles();
  };

  const setStyleProperty = (newProperty: string, index: number) => {
    setStyles((styles) => {
      styles[index].property = newProperty;
      return [...styles];
    });
    saveStyles();
  };

  /** Memo'd click handler for the add button */
  const handleAddClick = React.useCallback(() => {
    addStyle(false);
  }, [addStyle]);

  /** Handler for using Enter key to go to the next line */
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
        let index = e.target.getAttribute('data-value-index');
        if (index !== null) {
          let indexValue = Number.parseInt(index);

          // Find the next element to visit
          let el = document.querySelector(
            '[data-autocomplete-index="' + (indexValue + 1) + '"] input'
          );

          if (el instanceof HTMLInputElement) {
            el.focus();
          } else {
            // Creates a new row and focuses on the property
            addStyle(true);
          }
        }
      }
    },
    [addStyle]
  );

  React.useEffect(() => {
    if (keyframes.keyframes == null) {
      return;
    }

    const rule = keyframes.keyframes.findRule(selectedKeyframe + '%');
    if (rule !== null) {
      setStyles(Styles.buildFromDeclaration(rule.style));
    }
  }, [selectedKeyframe]);

  return (
    <div className={styling.editor}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onKeyDown={onKeyDown}
      >
        {styles.map((style, index) => (
          <StyleRow
            key={index}
            index={index}
            initialProperty={style.property}
            initialValue={style.value}
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
