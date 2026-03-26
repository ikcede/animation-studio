'use client';

import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import {
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import styling from './SidebarAnimation.module.css';
import AnimationTiming from './widgets/AnimationTiming';
import AnimationDirection from './widgets/AnimationDirection';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';

const SidebarAnimation: React.FC = () => {
  const { animation, setAnimation, updateAnimation } =
    useTimelineContext();

  const [name, setName] = useState<string>(animation.name);
  const [duration, setDuration] = useState<string>(
    animation.duration.toString()
  );
  const [iteration, setIteration] = useState<string>(
    animation.iterationCount.toString()
  );
  const [fillMode, setFillMode] = useState<string>(animation.fillMode);

  const changeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newName = e.target.value;
    setName(newName);

    if (newName.length > 0) {
      setAnimation(animation.clone().apply({ name: newName }));
    }
  };

  const changeDuration = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newDuration = e.target.value;
    setDuration(newDuration);

    const durationValue = parseFloat(newDuration);
    if (!Number.isNaN(durationValue)) {
      updateAnimation({ duration: durationValue }, true, true);
    }
  };

  const changeIteration = (
    event: React.MouseEvent<HTMLElement>,
    newIteration: string
  ) => {
    if (newIteration !== null) {
      setIteration(newIteration);

      updateAnimation(
        {
          iterationCount:
            newIteration === 'infinite'
              ? 'infinite'
              : parseInt(newIteration),
        },
        true,
        true
      );
    }
  };

  const changeTiming = (newTiming: string) => {
    updateAnimation({ timing: newTiming }, true, true);
  };

  const changeDirection = (newDirection: string) => {
    updateAnimation({ direction: newDirection }, true, true);
  };

  const changeFillMode = (
    event: React.MouseEvent<HTMLElement>,
    newFillMode: string
  ) => {
    if (newFillMode !== null) {
      setFillMode(newFillMode);
      updateAnimation({ fillMode: newFillMode }, true, true);
    }
  };

  return (
    <div className={styling.wrapper}>
      <div className="input-row">
        <label>Name:</label>
        <TextField size="small" value={name} onChange={changeName} />
      </div>

      <div className="input-row">
        <label>Duration:</label>
        <OutlinedInput
          className="small"
          size="small"
          value={duration}
          onChange={changeDuration}
          endAdornment={<InputAdornment position="end">s</InputAdornment>}
        />
      </div>

      <div className="input-row">
        <label>Iterations:</label>
        <ToggleButtonGroup
          value={iteration}
          exclusive
          onChange={changeIteration}
          aria-label="Iteration types"
        >
          <ToggleButton value="1" aria-label="1" size="small">
            <SkipNextIcon />
          </ToggleButton>
          <ToggleButton
            value="infinite"
            aria-label="infinite"
            size="small"
          >
            <AllInclusiveIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <AnimationDirection
        animation={animation}
        onDirectionChange={changeDirection}
      />

      <AnimationTiming
        animation={animation}
        onTimingChange={changeTiming}
      />

      <div className="input-row">
        <label>Fill Mode:</label>
        <ToggleButtonGroup
          value={fillMode}
          exclusive
          onChange={changeFillMode}
          aria-label="Fill mode types"
        >
          <ToggleButton value="none" aria-label="none" size="small">
            <DoNotDisturbIcon />
          </ToggleButton>
          <ToggleButton
            value="forwards"
            aria-label="forwards"
            size="small"
          >
            <EastIcon />
          </ToggleButton>
          <ToggleButton
            value="backwards"
            aria-label="backwards"
            size="small"
          >
            <WestIcon />
          </ToggleButton>
          <ToggleButton value="both" aria-label="both" size="small">
            <SyncAltIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default SidebarAnimation;
