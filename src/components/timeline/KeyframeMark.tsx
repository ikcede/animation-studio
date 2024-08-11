'use client'

import React from 'react';
import { round } from '@/util';
import styling from './KeyframeMark.module.css';

export interface KeyframeMarkProps {
  percent?: number,
  precision?: number,
  selected?: boolean,
  temporary?: boolean,
  onKeyframeClick?: KeyframeClickFunction
}

export type KeyframeClickFunction = (percent: number) => void;

const KeyframeMark: React.FC<KeyframeMarkProps> = ({
  percent = 0,
  precision = 0,
  selected = false,
  temporary = false,
  onKeyframeClick = () => {},
}) => {

  const handleClick = (event: React.MouseEvent) => {
    if (!temporary) {
      event.preventDefault();
      event.stopPropagation();
      onKeyframeClick(percent);
    }
  }

  const color = (percent === 0 || percent === 100) ? 
    styling.green : styling.blue;

  return (
    <div style={{'left': percent + '%'}}
         className={
            `${styling.mark} \
            ${color} \
            ${selected ? styling.selected : ''} \
            ${temporary ? styling.temporary : ''}`}
         onClick={handleClick}>
      <div className={styling['mark-head'] + ' ' + color}>
        {round(percent, precision)}
      </div>
    </div>
  );
};

export default KeyframeMark;