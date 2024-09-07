import React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import styling from './KeyframeEditor.module.css';
import Styles, { Style } from '@/model/Styles';
import StyleRow from '../style-row/StyleRow';

interface KeyframeEditorProps {
  keyframes: CSSKeyframeRule | null;
  onKeyframeChange?: (cssText: string) => void;
}

const KeyframeEditor: React.FC<KeyframeEditorProps> = ({
  keyframes,
  onKeyframeChange = () => {},
}) => {
  const [styles, setStyles] = React.useState(
    Styles.buildFromDeclaration(keyframes?.style) ?? new Array<Style>()
  );

  /**
   * Save current styles to keyframes
   */
  const saveStyles = React.useCallback(() => {
    onKeyframeChange(Styles.toCSSString(styles));
  }, [styles, onKeyframeChange]);

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

  /** Listen for changes to keyframes if needed */
  React.useEffect(() => {
    setStyles(
      Styles.buildFromDeclaration(keyframes?.style) ?? new Array<Style>()
    );
  }, [keyframes]);

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
            autoFocus={style.autoFocus ? true : undefined}
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
