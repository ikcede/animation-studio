import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { AnimationContext } from '../../providers/AnimationProvider';

import styling from './SidebarAnimation.module.css';

const SidebarAnimation: React.FC = () => {
  const animation = React.useContext(AnimationContext);

  return (
    <div className={styling.wrapper}>
      
      <div className='input-row'>
        <label>Name:</label>
        <TextField size='small'
                   defaultValue={animation.name}
        />
      </div>

      <div className='input-row'>
        <label>Duration:</label>
        <OutlinedInput
            className='small'
            size='small'
            defaultValue={animation.duration}
            endAdornment={
              <InputAdornment position="end">s</InputAdornment>}
        />
      </div>

      <div className='input-row'>
        <label>Iterations:</label>
        <TextField size='small'
                   defaultValue={animation.iterationCount}
        />
      </div>

      <div className='input-row'>
        <label>Timing:</label>
        <TextField size='small'
                   defaultValue={animation.timing}
        />
      </div>

    </div>
  );
};

export default SidebarAnimation;