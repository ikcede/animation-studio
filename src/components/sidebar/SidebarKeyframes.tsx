import React from 'react';
import styling from './SidebarKeyframes.module.css';
import KeyframeList from './KeyframeList';
import KeyframeEditor from './KeyframeEditor';

import { KeyframesContext, KeyframesDispatchContext } from '../../providers/KeyframesProvider';
import { KeyframeSelectionContext, KeyframeSelectionDispatchContext } from '../../providers/KeyframeSelectionProvider';

const SidebarKeyframes: React.FC = () => {

  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);

  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const selectedKeyframeDispatch = 
    React.useContext(KeyframeSelectionDispatchContext);

  return (
    <div className={styling.wrapper}>
      <p>
        Active Keyframes
      </p>
      <KeyframeList></KeyframeList>

      {selectedKeyframe > -1 && (
        <>
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