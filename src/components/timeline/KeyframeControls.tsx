'use client'

import React from 'react';
import styling from './KeyframeControls.module.css';

import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type KeyframeControlFunction = () => void;

export interface KeyframeControlsProps {
  keyframeSelected?: boolean,
  addMode?: boolean,
  onAddKeyframe?: KeyframeControlFunction,
  onDeleteKeyframe?: KeyframeControlFunction,
}

const KeyframeControls: React.FC<KeyframeControlsProps> = ({
  keyframeSelected = false,
  addMode = false,
  onAddKeyframe = () => {},
  onDeleteKeyframe = () => {},
}) => {

  const handleAddClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onAddKeyframe();
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDeleteKeyframe();
  }

  return (
    <div className={styling.wrapper}>
      {keyframeSelected && (
        <IconButton size='small'
                    aria-label='Delete keyframe'
                    onClick={handleDeleteClick}>
          <DeleteForeverIcon></DeleteForeverIcon>
        </IconButton>
      )}
      <IconButton size='small'
                  aria-label='Add keyframe'
                  className={addMode ? styling.enabled : ''}
                  onClick={handleAddClick}>
        <BookmarkAddIcon></BookmarkAddIcon>
      </IconButton>
    </div>
  );
};

export default KeyframeControls;