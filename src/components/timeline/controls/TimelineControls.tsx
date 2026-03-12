'use client';

import { FC, useCallback, MouseEvent } from 'react';
import styling from './TimelineControls.module.css';

import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useTimelineControlsContext } from '@/context/TimelineControlsContext/TimelineControlsContext';

export type TimelineControlFunction = () => void;

export interface TimelineControlsProps {
  playing?: boolean;
}

const TimelineControls: FC<TimelineControlsProps> = ({
  playing = false,
}) => {
  const { play, pause, end, setTime } = useTimelineControlsContext();

  const handlePlayClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      play();
    },
    [play]
  );

  const handlePauseClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      pause();
    },
    [pause]
  );

  const handleSkipStartClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setTime(0);
    },
    [setTime]
  );

  const handleSkipEndClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      end();
    },
    [end]
  );

  return (
    <div className={styling.wrapper}>
      <div className={styling.group}>
        <IconButton
          size="small"
          aria-label="Skip to start"
          onClick={handleSkipStartClick}
        >
          <SkipPreviousIcon></SkipPreviousIcon>
        </IconButton>

        {playing ? (
          <IconButton
            size="small"
            aria-label="Pause"
            onClick={handlePauseClick}
          >
            <PauseIcon></PauseIcon>
          </IconButton>
        ) : (
          <IconButton
            size="small"
            aria-label="Play"
            onClick={handlePlayClick}
          >
            <PlayArrowIcon></PlayArrowIcon>
          </IconButton>
        )}

        <IconButton
          size="small"
          aria-label="Skip to end"
          onClick={handleSkipEndClick}
        >
          <SkipNextIcon></SkipNextIcon>
        </IconButton>
      </div>
      {/*
      <div className='control-group'>
        <IconButton size='small' disabled>
          <RemoveIcon></RemoveIcon>
        </IconButton>
        <div className='control-text'>
          1x
        </div>
        <IconButton size='small' disabled>
          <AddIcon></AddIcon>
        </IconButton>
      </div> */}
    </div>
  );
};

export default TimelineControls;
