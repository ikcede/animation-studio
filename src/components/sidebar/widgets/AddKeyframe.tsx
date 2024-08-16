import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import styling from './AddKeyframe.module.css';
import TextField from '@mui/material/TextField';

type AddKeyframeFunction = (value: number) => void;

export interface AddKeyframeProps {
  onAddKeyframe: AddKeyframeFunction,
  error?: string,
}

const AddKeyframe: React.FC<AddKeyframeProps> = ({
  onAddKeyframe = () => {},
  error = ''
}) => {
  const [value, setValue] = React.useState('');
  const [valueError, setValueError] = React.useState(error);

  React.useEffect(() => {
    setValueError(error);
  }, [error]);

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
    if (valueError !== '') {
      setValueError('');
    }
  }

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key == 'Enter') {
      createKeyframe();
    }
  }

  const createKeyframe = () => {
    if (value !== '') {
      let updatedValue = parseFloat(value);
      if (Number.isNaN(updatedValue)) {
        setValueError('Enter a valid number');
      } else {
        setValueError('');
        onAddKeyframe(updatedValue);
        setValue('');
      }
    }
  }

  return (
    <div className={`${styling.widget} input-row`}>
      <TextField 
          variant='outlined'
          value={value}
          onChange={changeValue}
          onKeyUp={onKeyUp}
          error={valueError !== ''}
          helperText={valueError === '' ? undefined : valueError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>)
          }}
      ></TextField>
      <Button className='button'
              startIcon={<AddIcon aria-label='Add'/>}
              size='small'
              variant='outlined'
              onClick={() => createKeyframe()}
              sx={{marginLeft: '16px'}}>
        Keyframe
      </Button>
    </div>
  );
};

export default AddKeyframe;