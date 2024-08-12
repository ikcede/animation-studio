'use client'

import React from 'react';
import styling from './SidebarKeyframes.module.css';
import KeyframeList from './KeyframeList';
import KeyframeEditor from './KeyframeEditor';

import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ListIcon from '@mui/icons-material/List';

import { KeyframeSelectionContext, KeyframeSelectionDispatchContext } from '../../providers/KeyframeSelectionProvider';

const SidebarKeyframes: React.FC = () => {
  const [editor, setEditor] = React.useState<string>('default');

  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const selectedKeyframeDispatch = 
    React.useContext(KeyframeSelectionDispatchContext);

  const onBackClick = (e: React.MouseEvent) => {
    selectedKeyframeDispatch({value: -1});
  }

  const handleEditorChange = (
    event: React.MouseEvent<HTMLElement>,
    newEditor: string,
  ) => {
    setEditor(newEditor);
  };

  return (
    <div className={styling.wrapper}>
      {selectedKeyframe == -1 ? (
        <>
          <p>
            Active Keyframes
          </p>
          <KeyframeList></KeyframeList>
        </>
      ) : (
        <>
          <div className={styling.controls}>
            <Button className='button'
                    size='small'
                    variant='outlined'
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={onBackClick}>
              Back
            </Button>
            <ToggleButtonGroup
              value={editor}
              exclusive
              onChange={handleEditorChange}
              aria-label="editor type"
            >
              <ToggleButton 
                  value='default'
                  aria-label='default'
                  size='small'>
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <p>
            Editing: {selectedKeyframe}%
          </p>
          <KeyframeEditor></KeyframeEditor>
        </>
      )}
    </div>
  );
};

export default SidebarKeyframes;