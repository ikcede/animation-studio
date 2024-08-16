'use client'

import React from 'react';

import styling from './Timeline.module.css';
import Ticks from './Ticks';
import KeyframeMark from './KeyframeMark';
import TimelineControls from './TimelineControls';
import KeyframeControls from './KeyframeControls';

import { round } from '@/util';

import { KeyframesContext, KeyframesDispatchContext } from '@/providers/KeyframesProvider';
import { AnimationContext, AnimationDispatchContext } from '@/providers/AnimationProvider';
import { KeyframeSelectionContext, KeyframeSelectionDispatchContext } from '@/providers/KeyframeSelectionProvider';

export type KeyframeChangeFunction = 
    (newKeyframes: CSSKeyframesRule) => void;

const Timeline: React.FC = ({}) => {
  const animationName = styling.play;
  const animationClone = styling.play2;

  const animation = React.useContext(AnimationContext);
  const animationDispatch = React.useContext(AnimationDispatchContext);

  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const keyframeSelectionDispatch = 
      React.useContext(KeyframeSelectionDispatchContext);

  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);

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

  const getPercent = React.useCallback(
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
    }, [mainRef]
  );

  const handlePlayheadDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setPlayheadDown(true);
      animationDispatch({
        type: 'pause'
      });
    }, [animation]
  );

  const handleKeyframeDown = React.useCallback(
    (index: number) => {
      if (keyframes.keyframes !== null) {
        let target = keyframes.keyframes[index];
        if (target.keyText !== '0%' && target.keyText !== '100%') {
          setKeyframeDown(index);
        }
      }
    }, []
  );

  const getDownStyle = React.useCallback(
    (): string => {
      return playheadDown || keyframeDown > -1 ?
        styling.down : '';
    }, [playheadDown, keyframeDown]
  );

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (addMode) {
        let percent = round(getPercent(e), 2) * 100;
        if (keyframes.keyframes!.findRule(round(percent) + '%') === null) {
          setTempKeyframe(percent);
        }
      } else if (e.buttons === 1 && playheadDown) {
        let percent = getPercent(e);
        animationDispatch({
          type: 'setTime',
          value: (percent * animation.duration).toString()
        });
      } else if (e.buttons === 1 && keyframeDown > -1) {
        let percent = round(getPercent(e) * 100);
        if (keyframes.keyframes!.findRule(percent + '%') === null) {
          keyframes.keyframes![keyframeDown].keyText = percent + '%';
          keyframesDispatch({
            keyframes: keyframes.clone(),
          });
          keyframeSelectionDispatch({value: percent});
        }
      } else if (playheadDown || keyframeDown > -1) {
        setPlayheadDown(false);
        setKeyframeDown(-1);
      }
    }, [addMode, mainRef, playheadDown, keyframes]
  );

  const onTimelineClick = (event: React.MouseEvent) => {
    let percent = getPercent(event);

    if (addMode) {
      percent = round(getPercent(event), 2) * 100;
      if (keyframes.keyframes!.findRule(percent + '%') === null) {
        keyframes.keyframes!.appendRule(`${percent}% { }`);
      }
      keyframesDispatch({
        keyframes: keyframes.clone(),
      });
      setAddMode(false);
    } else {
      animationDispatch({
        type: 'setTime',
        value: (percent * animation.duration).toString()
      });
    }
  }

  const onPlayClick = () => {
    animationDispatch({
      type: 'play'
    });
  }

  const handlePlayEnd = () => {
    animationDispatch({
      type: 'end'
    });
  }

  const onSkipStart = () => {
    animationDispatch({
      type: 'setTime',
      value: '0'
    });
  }

  const onSkipEnd = () => {
    animationDispatch({
      type: 'setTime',
      value: animation.duration.toString()
    });
  }

  const onPause = () => {
    animationDispatch({
      type: 'pause'
    });
  }

  const selectKeyframe = (percent: number) => {
    keyframeSelectionDispatch({value: percent});
  }

  const showDeleteKeyframe = () => 
    selectedKeyframe > 0 && selectedKeyframe !== 100;

  const deleteSelectedKeyframe = () => {
    keyframes.keyframes!.deleteRule(selectedKeyframe + '%');
    keyframesDispatch({
      keyframes: keyframes.clone(),
    });
    keyframeSelectionDispatch({value: -1});
  }

  const addKeyframeMode = () => {
    setAddMode(!addMode);
  }

  return (
    <div className={styling.wrapper}
         onMouseMove={handleMouseMove}>
      <div className={styling.controls}>
        <TimelineControls 
            playing={animation.playState === 'running'}
            onPlay={onPlayClick}
            onPause={onPause}
            onSkipStart={onSkipStart}
            onSkipEnd={onSkipEnd}
        ></TimelineControls>
        <KeyframeControls
            keyframeSelected={showDeleteKeyframe()}
            addMode={addMode}
            onAddKeyframe={addKeyframeMode}
            onDeleteKeyframe={deleteSelectedKeyframe}
        ></KeyframeControls>
      </div>
      <div className={styling.main + ' ' + getDownStyle()}
           ref={mainRef}
           onClick={onTimelineClick}>
        <div className={styling.spacer}></div>
        <div className={styling.zone}>
          <div className={styling.keyframes}>
            {ruleList.map((percent, index) => (
              <KeyframeMark key={percent}
                            percent={percent}
                            selected={selectedKeyframe == percent}
                            onKeyframeClick={selectKeyframe}
                            onKeyframeDown={() => handleKeyframeDown(index)}
              ></KeyframeMark>
            ))}
            {addMode && (
              <KeyframeMark percent={tempKeyframe}
                            temporary
              ></KeyframeMark>
            )}
          </div>
          <Ticks startValue={0}
              endValue={100}
              unit='%'></Ticks>
        </div>

        <div className={styling.playhead}
             onMouseDown={handlePlayheadDown}
             onAnimationEnd={() => {handlePlayEnd()}}
             style={{
              ...animation.toReactProps(),
              animationName: animation.useClone ? 
                animationClone : animationName,
              animationTimingFunction: 'linear',
             }}>
          <div className={styling['playhead-head']}></div>
          <div className={styling['playhead-tail']}></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;