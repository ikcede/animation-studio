import React from 'react';
import styling from './StyleRow.module.css';
import { Autocomplete, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PureCSSProperties, AllCSSProperties } from '@/util/CSSProperties';

export interface StyleRowProps {
  index?: number;
  initialProperty?: string;
  initialValue?: string;
  autoFocus?: boolean;
  onPropertyChange?: (property: string, index: number) => void;
  onValueChange?: (value: string, index: number) => void;
  onDelete?: (index: number) => void;
}

const StyleRow: React.FC<StyleRowProps> = ({
  index = 0,
  initialProperty = '',
  initialValue = '',
  autoFocus,
  onPropertyChange = () => {},
  onValueChange = () => {},
  onDelete = () => {},
}) => {
  const [property, setProperty] = React.useState(initialProperty);
  const [value, setValue] = React.useState(initialValue);
  const [propertyError, setPropertyError] = React.useState('');
  const [valueError, setValueError] = React.useState('');

  /** Listen for initial state updates */
  React.useEffect(() => {
    setProperty(initialProperty);
    setValue(initialValue);
  }, [initialProperty, initialValue]);

  /** Call parent delete when X pressed */
  const handleDelete = React.useCallback(
    (e: React.MouseEvent) => {
      onDelete(index);
    },
    [index, onDelete]
  );

  /** Process changes to the property autocomplete */
  const handlePropertySelect = React.useCallback(
    (e: React.SyntheticEvent<Element, Event>, value: string) => {
      setProperty(value);
      setPropertyError('');
      onPropertyChange(value, index);
    },
    [index, onPropertyChange]
  );

  /** Process changes to the property input */
  const handlePropertyChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProperty(e.target.value);
      setPropertyError('');
      onPropertyChange(e.target.value, index);
    },
    [index, onPropertyChange]
  );

  /** Process changes to the property's value */
  const handleValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onValueChange(e.target.value, index);
      setValueError('');
    },
    [index, onValueChange]
  );

  /** Validate both the property and the value */
  const validate = React.useCallback(() => {
    setPropertyError('');
    setValueError('');

    let testValue = value.trim();
    let testProperty = property.trim();

    // If the property is wrong, ignore the value
    if (testProperty.length > 0 && !AllCSSProperties.has(testProperty)) {
      setPropertyError('Invalid property.');
      return;
    }

    if (testProperty.length > 0 && testValue.length > 0) {
      let tempDiv = document.createElement('div');
      tempDiv.style.setProperty(testProperty, testValue);
      if (tempDiv.style.length == 0) {
        setValueError('Invalid value.');
      }
    }
  }, [value, property, setPropertyError, setValueError]);

  /** Checks for errors on blur */
  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      validate();
    },
    [validate]
  );

  return (
    <div className={styling.wrapper}>
      <div className={styling.row}>
        <Autocomplete
          className={styling.property}
          disablePortal
          disableClearable
          freeSolo
          value={property}
          options={PureCSSProperties}
          data-autocomplete-index={index}
          onChange={handlePropertySelect}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Property"
              autoComplete="off"
              autoFocus={autoFocus ? true : undefined}
              error={propertyError !== ''}
              onChange={handlePropertyChange}
              onBlur={handleBlur}
            />
          )}
        />
        <TextField
          variant="outlined"
          className={styling.value}
          placeholder="Value"
          autoComplete="off"
          value={value}
          error={valueError !== ''}
          onChange={handleValueChange}
          onBlur={handleBlur}
          inputProps={{
            'aria-label': 'Value',
            'data-value-index': index,
          }}
        />
        <IconButton
          size="small"
          aria-label="Delete"
          className="delete-icon"
          onClick={handleDelete}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </div>
      {(valueError || propertyError) && (
        <div className={styling.error}>
          <div className={styling['property-error']}>{propertyError}</div>
          <div className={styling['value-error']}>{valueError}</div>
        </div>
      )}
    </div>
  );
};

export default StyleRow;
