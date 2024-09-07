'use client';

import React from 'react';
import styling from './SidebarKeyframes.module.css';
import KeyframeList from './KeyframeList';
import KeyframeEditorWrapper from './keyframe-editor-wrapper/KeyframeEditorWrapper';

import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ListIcon from '@mui/icons-material/List';

import {
  KeyframeSelectionContext,
  KeyframeSelectionDispatchContext,
} from '@/providers/KeyframeSelectionProvider';

const SidebarKeyframes: React.FC = () => {
  const [editor, setEditor] = React.useState<string>('default');

  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const selectedKeyframeDispatch = React.useContext(
    KeyframeSelectionDispatchContext
  );

  const onBackClick = (e: React.MouseEvent) => {
    selectedKeyframeDispatch({ value: -1 });
  };

  const handleEditorChange = (
    event: React.MouseEvent<HTMLElement>,
    newEditor: string
  ) => {
    if (newEditor !== null) {
      setEditor(newEditor);
    }
  };

  return (
    <div className={styling.wrapper}>
      {selectedKeyframe == -1 ? (
        <div className="list">
          <p>Active Keyframes</p>
          <KeyframeList></KeyframeList>
        </div>
      ) : (
        <div className="editor">
          <div className={styling.controls}>
            <Button
              className="button"
              size="small"
              variant="outlined"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={onBackClick}
            >
              Back
            </Button>
            <ToggleButtonGroup
              value={editor}
              exclusive
              onChange={handleEditorChange}
              aria-label="editor type"
            >
              <ToggleButton
                value="default"
                aria-label="default"
                size="small"
              >
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <p>Editing: {selectedKeyframe}%</p>
          <KeyframeEditorWrapper />
        </div>
      )}
    </div>
  );
};

export default SidebarKeyframes;
