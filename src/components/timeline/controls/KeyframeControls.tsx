'use client';

import React from 'react';
import styling from './KeyframeControls.module.css';

import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type KeyframeControlFunction = () => void;

/**
 * Props for the [KeyframeControls] component.
 */
interface KeyframeControlsProps {
  /** Whether a keyframe is currently selected. Defaults to false. */
  keyframeSelected?: boolean;
  /** Whether the add keyframe mode is active. Defaults to false. */
  addMode?: boolean;
  /** Callback function to add a keyframe. */
  onAddKeyframe?: () => void;
  /** Callback function to delete a keyframe. */
  onDeleteKeyframe?: () => void;
}

/**
 * Component for managing keyframes in an animation timeline.
 *
 * @param props - [KeyframeControlsProps]
 * @returns {JSX.Element}
 */
const KeyframeControls: React.FC<KeyframeControlsProps> = ({
  keyframeSelected = false,
  addMode = false,
  onAddKeyframe = () => {},
  onDeleteKeyframe = () => {},
}) => {
  /**
   * Handles the click event for adding a keyframe.
   */
  const handleAddClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onAddKeyframe();
  };

  /**
   * Handles the click event for deleting a keyframe.
   */
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDeleteKeyframe();
  };

  return (
    <div className={styling.wrapper}>
      {keyframeSelected && (
        <IconButton
          size="small"
          aria-label="Delete keyframe"
          onClick={handleDeleteClick}
        >
          <DeleteForeverIcon></DeleteForeverIcon>
        </IconButton>
      )}
      <IconButton
        size="small"
        aria-label="Add keyframe"
        className={addMode ? styling.enabled : ''}
        onClick={handleAddClick}
      >
        <BookmarkAddIcon></BookmarkAddIcon>
      </IconButton>
    </div>
  );
};

export default KeyframeControls;
