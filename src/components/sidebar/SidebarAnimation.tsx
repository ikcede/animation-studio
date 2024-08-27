'use client'

import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import styling from './SidebarAnimation.module.css';
import { AnimationContext, AnimationDispatchContext } from '@/providers/AnimationProvider';
import { KeyframesContext, KeyframesDispatchContext } from '@/providers/KeyframesProvider';
import AnimationTiming from './widgets/AnimationTiming';
import AnimationDirection from './widgets/AnimationDirection';

const SidebarAnimation: React.FC = () => {
  const animation = React.useContext(AnimationContext);
  const animationDispatch = React.useContext(AnimationDispatchContext);
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);

  const [name, setName] = React.useState(animation.name);
  const [duration, setDuration] = React.useState('1');
  const [iteration, setIteration] = React.useState('1');

  const changeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newName = e.target.value;
    setName(newName);

    if (newName.length > 0) {
      animationDispatch({
        type: 'update',
        newAnimation: animation.clone().apply({name: newName})
      });

      // Also update keyframes because these point to the animation name
      let newKeyframes = keyframes.clone();
      newKeyframes.keyframes!.name = newName;
      keyframesDispatch({
        keyframes: newKeyframes
      })
    }
  }

  const changeDuration = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newDuration = e.target.value;
    setDuration(newDuration);

    animation.setDuration(newDuration);
    animationDispatch({
      type: 'update',
      newAnimation: animation.clone()
    });
  }

  const changeIteration = (
    event: React.MouseEvent<HTMLElement>,
    newIteration: string,
  ) => {
    if (newIteration !== null) {
      setIteration(newIteration);

      animation.setIterationCount(newIteration);
      animationDispatch({
        type: 'update',
        newAnimation: animation.clone()
      });
    }
  };

  const changeTiming = (
    newTiming: string
  ) => {
    animationDispatch({
      type: 'update',
      newAnimation: animation.clone().apply({timing: newTiming})
    });
  }

  const changeDirection = (newDirection: string) => {
    animationDispatch({
      type: 'update',
      newAnimation: animation.clone().apply({direction: newDirection})
    });
  }

  return (
    <div className={styling.wrapper}>
      
      <div className='input-row'>
        <label>Name:</label>
        <TextField size='small'
                   value={name}
                   onChange={changeName}
        />
      </div>

      <div className='input-row'>
        <label>Duration:</label>
        <OutlinedInput
            className='small'
            size='small'
            value={duration}
            onChange={changeDuration}
            endAdornment={
              <InputAdornment position="end">s</InputAdornment>}
        />
      </div>

      <div className='input-row'>
        <label>Iterations:</label>
        <ToggleButtonGroup
          value={iteration}
          exclusive
          onChange={changeIteration}
          aria-label="Iteration types"
        >
          <ToggleButton 
              value='1'
              aria-label='1'
              size='small'>
            <SkipNextIcon />
          </ToggleButton>
          <ToggleButton 
              value='infinite'
              aria-label='infinite'
              size='small'>
            <AllInclusiveIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <AnimationDirection animation={animation}
                          onDirectionChange={changeDirection}/> 

      <AnimationTiming animation={animation}
                       onTimingChange={changeTiming} />
    </div>
  );
};

export default SidebarAnimation;