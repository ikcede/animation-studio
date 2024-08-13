'use client'

import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { BezierEditor, CubicBezier } from 'ts-bezier-easing-editor';
import styling from './SidebarAnimation.module.css';

import { AnimationContext, AnimationDispatchContext } from '@/providers/AnimationProvider';
import { KeyframesContext, KeyframesDispatchContext } from '@/providers/KeyframesProvider';
import { cloneKeyframes } from '@/util';

const SidebarAnimation: React.FC = () => {
  const animation = React.useContext(AnimationContext);
  const animationDispatch = React.useContext(AnimationDispatchContext);
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);

  const [name, setName] = React.useState(animation.name);

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
      let newKeyframes = cloneKeyframes(keyframes);
      newKeyframes.name = newName;
      keyframesDispatch({
        keyframes: newKeyframes
      })
    }
  }

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