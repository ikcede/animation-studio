'use client';

import { CustomAnimation } from '@/model/CustomAnimation';
import CustomKeyframes from '@/model/CustomKeyframes';
import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useEditorContext } from '../EditorContext/EditorContext';
import {
  DEFAULT_HTML,
  DEFAULT_CSS,
} from '@/util/constants/defaultAnimation';
import {
  timelineControlsReducer,
  TimelineControlsReducerAction,
} from './TimelineControlReducer';

type TimelineContextProps = {
  animation: CustomAnimation;
  setAnimation: (animation: CustomAnimation) => void;
  keyframes: CustomKeyframes;
  setKeyframes: (keyframes: CustomKeyframes) => void;
  targetHtml: string;
  setTargetHtml: (targetHtml: string) => void;
  targetCss: string;
  setTargetCss: (targetCss: string) => void;
  saveState: (props: AnimationStateProps) => void;
  loadState: (props: AnimationStateProps) => void;
};

type TimelineContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type AnimationStateProps = {
  animation?: CustomAnimation;
  keyframes?: CustomKeyframes;
  targetHtml?: string;
  targetCss?: string;
};

export const TimelineContext = createContext<
  TimelineContextProps | undefined
>(undefined);
export const TimelineControlsDispatchContext = createContext<
  Dispatch<TimelineControlsReducerAction>
>(() => {});

/**
 * Core context provider for a Timeline.
 *
 * Handles the save state of the timeline.
 *
 * TODO: Eventually change this to support multiple animations
 */
export const TimelineContextProvider = ({
  children,
}: TimelineContextProviderProps) => {
  const { saveWorkingAnimation } = useEditorContext();

  // Set defatult values for the base animation
  const [activeHtml, setActiveHtml] = useState(DEFAULT_HTML);
  const [activeCss, setActiveCss] = useState(DEFAULT_CSS);
  const [activeKeyframes, setActiveKeyframes] = useState(
    new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
  );
  const [activeAnimation, setActiveAnimation] = useState(
    new CustomAnimation()
  );

  // Set up the timeline controls reducer
  const [previewAnimation, timelineControlsDispatch] = useReducer(
    timelineControlsReducer,
    new CustomAnimation()
  );

  const saveState = useCallback(
    ({
      animation,
      keyframes,
      targetHtml,
      targetCss,
    }: AnimationStateProps) => {
      saveWorkingAnimation({
        animation: animation ?? activeAnimation,
        keyframes: keyframes ?? activeKeyframes,
        targetHtml: targetHtml ?? activeHtml,
        targetCss: targetCss ?? activeCss,
      });
    },
    [
      activeAnimation,
      activeKeyframes,
      activeHtml,
      activeCss,
      saveWorkingAnimation,
    ]
  );

  /** Loads the animation state from props without calling save */
  const loadState = useCallback(
    ({
      animation,
      keyframes,
      targetHtml,
      targetCss,
    }: AnimationStateProps) => {
      if (animation !== undefined) {
        setActiveAnimation(animation);
      }
      if (keyframes !== undefined) {
        setActiveKeyframes(keyframes);
      }
      if (targetHtml !== undefined) {
        setActiveHtml(targetHtml);
      }
      if (targetCss !== undefined) {
        setActiveCss(targetCss);
      }
    },
    [setActiveAnimation, setActiveKeyframes, setActiveHtml, setActiveCss]
  );

  const setAnimation = useCallback(
    (animation: CustomAnimation) => {
      setActiveAnimation(animation);
      saveState({ animation });
      timelineControlsDispatch({
        type: 'update',
        newAnimation: animation,
      });
    },
    [setActiveAnimation, saveState, timelineControlsDispatch]
  );

  const setKeyframes = useCallback(
    (keyframes: CustomKeyframes) => {
      setActiveKeyframes(keyframes);
      saveState({ keyframes });
    },
    [setActiveKeyframes, saveState]
  );

  const setTargetHtml = useCallback(
    (targetHtml: string) => {
      setActiveHtml(targetHtml);
      saveState({ targetHtml });
    },
    [setActiveHtml, saveState]
  );

  const setTargetCss = useCallback(
    (targetCss: string) => {
      setActiveCss(targetCss);
      saveState({ targetCss });
    },
    [setActiveCss, saveState]
  );

  const value = useMemo(
    () => ({
      animation: activeAnimation,
      setAnimation,
      keyframes: activeKeyframes,
      setKeyframes,
      targetHtml: activeHtml,
      setTargetHtml,
      targetCss: activeCss,
      setTargetCss,
      saveState,
      loadState,
      previewAnimation,
    }),
    [
      activeAnimation,
      setAnimation,
      activeKeyframes,
      setKeyframes,
      activeHtml,
      setTargetHtml,
      activeCss,
      setTargetCss,
      saveState,
      loadState,
      previewAnimation,
    ]
  );

  return (
    <TimelineContext.Provider value={value}>
      <TimelineControlsDispatchContext.Provider
        value={timelineControlsDispatch}
      >
        {children}
      </TimelineControlsDispatchContext.Provider>
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);

  if (context === undefined) {
    throw new Error(
      'usage of useTimelineContext not wrapped in `TimelineContextProvider`.'
    );
  }

  return context;
};

export const useTimelineControlsDispatch = () => {
  const context = useContext(TimelineControlsDispatchContext);

  if (context === undefined) {
    throw new Error(
      'usage of useTimelineControlsDispatch not wrapped in `TimelineContextProvider`.'
    );
  }

  return context;
};
