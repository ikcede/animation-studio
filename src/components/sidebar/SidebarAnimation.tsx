'use client'

import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { BezierEditor, CubicBezier } from 'ts-bezier-easing-editor';

import styling from './SidebarAnimation.module.css';
import { AnimationContext, AnimationDispatchContext } from '@/providers/AnimationProvider';
import { KeyframesContext, KeyframesDispatchContext } from '@/providers/KeyframesProvider';

const SidebarAnimation: React.FC = () => {
  const animation = React.useContext(AnimationContext);
  const animationDispatch = React.useContext(AnimationDispatchContext);
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);

  const [name, setName] = React.useState(animation.name);
  const [duration, setDuration] = React.useState('1');
  const [iteration, setIteration] = React.useState('1');

  /** This is complex enough to be it's own component */
  const [timing, setTiming] = React.useState(animation.timing);

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

  /*
  const changeTiming = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newTiming = e.target.value;
    setTiming(newTiming);

    if (newTiming === 'linear') {
      animationDispatch({
        type: 'update',
        newAnimation: animation.clone().apply({timing: newTiming})
      });
    }
  }

  const bezierEdit = (bezier?: CubicBezier) => {
    if (bezier === undefined) {
      return;
    }
    if (bezier.isLinear()) {
      setTiming('linear');
    } else {
      setTiming(`cubic-bezier(${bezier.x1}, ${bezier.y1}, ${bezier.x2}, ${bezier.y2})`);
    }
    animationDispatch({
      type: 'update',
      newAnimation: animation.clone().apply({timing: timing})
    });
  }*/

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

      {/* Don't add this until we figure out how to calc playhead
      <div className='input-row'>
        <label>Timing:</label>
        <TextField size='small'
                   value={timing}
                   onChange={changeTiming}
        />
      </div>

      <BezierEditor width={250} 
                    height={250}
                    onChange={bezierEdit}
                    readOnly={true}
      ></BezierEditor>*/}

    </div>
  );
};

export default SidebarAnimation;