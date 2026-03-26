'use client';

import React, { useCallback } from 'react';

import styling from './Timeline.module.css';
import playKeyframes from '@/styles/play.module.css';
import Ticks from './ticks/Ticks';
import KeyframeMark from './KeyframeMark';
import TimelineControls from './controls/TimelineControls';
import KeyframeControls from './controls/KeyframeControls';

import round from '@/util/round/round';

import {
  KeyframeSelectionContext,
  KeyframeSelectionDispatchContext,
} from '@/providers/KeyframeSelectionProvider';
import AnimationFrame from './AnimationFrame/AnimationFrame';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';
import { useTimelineControlsContext } from '@/context/TimelineControlsContext/TimelineControlsContext';

export type KeyframeChangeFunction = (
  newKeyframes: CSSKeyframesRule
) => void;

const Timeline: React.FC = ({}) => {
  const animationName = playKeyframes.play;
  const animationClone = playKeyframes.play2;

  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const keyframeSelectionDispatch = React.useContext(
    KeyframeSelectionDispatchContext
  );

  const { animation, keyframes, setKeyframes } = useTimelineContext();
  const { pause, end, setTime } = useTimelineControlsContext();

  const [playheadDown, setPlayheadDown] = React.useState(false);

  const [addMode, setAddMode] = React.useState(false);
  const [tempKeyframe, setTempKeyframe] = React.useState(0);
  const [keyframeDown, setKeyframeDown] = React.useState(-1);
  const [ruleList, setRuleList] = React.useState<number[]>([]);

  const mainRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (keyframes.keyframes == null) {
      setRuleList([]);
    } else {
      let rules = [];
      for (let i = 0; i < keyframes.keyframes.length; i++) {
        rules.push(parseFloat(keyframes.keyframes[i].keyText));
      }
      setRuleList(rules);
    }
  }, [keyframes]);

  const getPercent = useCallback(
    (e: React.MouseEvent) => {
      const rect = mainRef.current!.getBoundingClientRect();

      let calcX = e.clientX - rect.left;
      let percent = calcX / rect.width;

      if (percent < 0) {
        return 0;
      }
      if (percent > 1) {
        return 1;
      }

      return percent;
    },
    [mainRef]
  );

  const handlePlayheadDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setPlayheadDown(true);
      pause();
    },
    [pause]
  );

  const handleKeyframeDown = useCallback(
    (index: number) => {
      if (keyframes.keyframes !== null) {
        let target = keyframes.keyframes[index];
        if (
          target !== undefined &&
          target.keyText !== '0%' &&
          target.keyText !== '100%'
        ) {
          setKeyframeDown(index);
        }
      }
    },
    [keyframes]
  );

  const getDownStyle = useCallback((): string => {
    return playheadDown || keyframeDown > -1 ? styling.down : '';
  }, [playheadDown, keyframeDown]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (addMode) {
        let percent = round(getPercent(e), 2) * 100;
        if (keyframes.keyframes!.findRule(round(percent) + '%') === null) {
          setTempKeyframe(percent);
        }
      } else if (e.buttons === 1 && playheadDown) {
        let percent = getPercent(e);
        setTime(percent * animation.duration);
      } else if (e.buttons === 1 && keyframeDown > -1) {
        let percent = round(getPercent(e) * 100);
        if (keyframes.keyframes!.findRule(percent + '%') === null) {
          keyframes.keyframes![keyframeDown].keyText = percent + '%';
          setKeyframes(keyframes.clone());
          keyframeSelectionDispatch({ value: percent });
        }
      } else if (playheadDown || keyframeDown > -1) {
        setPlayheadDown(false);
        setKeyframeDown(-1);
      }
    },
    [
      addMode,
      playheadDown,
      keyframes,
      animation.duration,
      keyframeDown,
      getPercent,
      setKeyframes,
      setTime,
      keyframeSelectionDispatch,
    ]
  );

  const onTimelineClick = (event: React.MouseEvent) => {
    let percent = getPercent(event);

    if (addMode) {
      percent = round(getPercent(event), 2) * 100;
      if (keyframes.keyframes!.findRule(percent + '%') === null) {
        keyframes.keyframes!.appendRule(`${percent}% { }`);
      }
      setKeyframes(keyframes.clone());
      setAddMode(false);
    } else {
      setTime(percent * animation.duration);
    }
  };

  const handlePlayEnd = useCallback(() => {
    end();
  }, [end]);

  const selectKeyframe = useCallback((percent: number) => {
    keyframeSelectionDispatch({ value: percent });
  }, [keyframeSelectionDispatch]);

  const showDeleteKeyframe = useCallback(() =>
    selectedKeyframe > 0 && selectedKeyframe !== 100,
    [selectedKeyframe]
  );

  const deleteSelectedKeyframe = useCallback(() => {
    keyframes.keyframes!.deleteRule(selectedKeyframe + '%');
    setKeyframes(keyframes.clone());
    keyframeSelectionDispatch({ value: -1 });
  }, [keyframes, setKeyframes, keyframeSelectionDispatch, selectedKeyframe]);

  const addKeyframeMode = useCallback(() => {
    setAddMode(!addMode);
  }, [addMode, setAddMode]);

  return (
    <div className={styling.wrapper} onMouseMove={handleMouseMove}>
      <div className={styling.controls}>
        <TimelineControls
          playing={animation.playState === 'running'}
        ></TimelineControls>
        <KeyframeControls
          keyframeSelected={showDeleteKeyframe()}
          addMode={addMode}
          onAddKeyframe={addKeyframeMode}
          onDeleteKeyframe={deleteSelectedKeyframe}
        ></KeyframeControls>
      </div>
      <div
        className={styling.main + ' ' + getDownStyle()}
        ref={mainRef}
        onClick={onTimelineClick}
      >
        <div className={styling.spacer}></div>
        <div className={styling.zone}>
          <AnimationFrame
            animation={animation}
            keyframes={keyframes}
            timelineSettings={{
              totalTime: animation.duration,
              playbackRate: 1,
            }}
          ></AnimationFrame>
          <div className={styling.keyframes}>
            {ruleList.map((percent, index) => (
              <KeyframeMark
                key={percent}
                percent={percent}
                selected={selectedKeyframe == percent}
                onKeyframeClick={selectKeyframe}
                onKeyframeDown={() => handleKeyframeDown(index)}
              ></KeyframeMark>
            ))}
            {addMode && (
              <KeyframeMark
                percent={tempKeyframe}
                temporary
              ></KeyframeMark>
            )}
          </div>
          <Ticks
            startValue={0}
            endValue={animation.duration}
            majorTicks={5}
            minorTicks={7}
            unit="s"
          ></Ticks>
        </div>

        <div
          className={styling.playhead}
          onMouseDown={handlePlayheadDown}
          onAnimationEnd={() => {
            handlePlayEnd();
          }}
          style={{
            ...animation.toReactProps(),
            animationName: animation.useClone
              ? animationClone
              : animationName,
            animationTimingFunction: 'linear',
            animationFillMode: 'both',
          }}
        >
          <div className={styling['playhead-head']}></div>
          <div className={styling['playhead-tail']}></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
