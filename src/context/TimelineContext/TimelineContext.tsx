'use client';

import {
  AnimationDetails,
  CustomAnimation,
} from '@/model/CustomAnimation';
import CustomKeyframes from '@/model/CustomKeyframes';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useEditorContext } from '../EditorContext/EditorContext';
import {
  DEFAULT_HTML,
  DEFAULT_CSS,
} from '@/util/constants/defaultAnimation';

type TimelineContextProps = {
  animation: CustomAnimation;
  setAnimation: (animation: CustomAnimation) => void;
  updateAnimation: (
    details: AnimationDetails,
    saveWorkingCopy?: boolean,
    isBreakingChange?: boolean
  ) => void;
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
  isBreakingChange?: boolean;
};

export const TimelineContext = createContext<
  TimelineContextProps | undefined
>(undefined);

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
  const { saveWorkingAnimation, setIsSaved } = useEditorContext();

  // Set default values for the base animation
  const [activeHtml, setActiveHtml] = useState(DEFAULT_HTML);
  const [activeCss, setActiveCss] = useState(DEFAULT_CSS);
  const [activeKeyframes, setActiveKeyframes] = useState(
    new CustomKeyframes(CustomKeyframes.getDefaultKeyframes())
  );
  const [activeAnimation, setActiveAnimation] = useState(
    new CustomAnimation()
  );

  const saveState = useCallback(
    ({
      animation,
      keyframes,
      targetHtml,
      targetCss,
      isBreakingChange,
    }: AnimationStateProps) => {
      saveWorkingAnimation({
        animation: animation ?? activeAnimation,
        keyframes: keyframes ?? activeKeyframes,
        targetHtml: targetHtml ?? activeHtml,
        targetCss: targetCss ?? activeCss,
      });
      if (isBreakingChange) {
        setIsSaved(false);
      }
    },
    [
      activeAnimation,
      activeKeyframes,
      activeHtml,
      activeCss,
      saveWorkingAnimation,
      setIsSaved,
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
      saveState({ animation, isBreakingChange: true });
    },
    [setActiveAnimation, saveState]
  );

  const updateAnimation = useCallback(
    (
      details: AnimationDetails,
      saveWorkingCopy?: boolean,
      isBreakingChange?: boolean
    ) => {
      const newAnimation = activeAnimation.clone().apply(details);
      setActiveAnimation(newAnimation);

      if (details.name !== undefined) {
        let newKeyframes = activeKeyframes.clone();
        newKeyframes.keyframes!.name = details.name;
        setActiveKeyframes(newKeyframes);
      }

      if (saveWorkingCopy) {
        saveState({
          animation: newAnimation,
          keyframes: activeKeyframes,
          isBreakingChange,
        });
      }
    },
    [
      activeAnimation,
      activeKeyframes,
      setActiveKeyframes,
      setActiveAnimation,
      saveState,
      setIsSaved,
    ]
  );

  const setKeyframes = useCallback(
    (keyframes: CustomKeyframes) => {
      setActiveKeyframes(keyframes);
      saveState({ keyframes, isBreakingChange: true });
    },
    [setActiveKeyframes, saveState]
  );

  const setTargetHtml = useCallback(
    (targetHtml: string) => {
      setActiveHtml(targetHtml);
      saveState({ targetHtml, isBreakingChange: true });
    },
    [setActiveHtml, saveState]
  );

  const setTargetCss = useCallback(
    (targetCss: string) => {
      setActiveCss(targetCss);
      saveState({ targetCss, isBreakingChange: true });
    },
    [setActiveCss, saveState]
  );

  const value = useMemo(
    () => ({
      animation: activeAnimation,
      setAnimation,
      updateAnimation,
      keyframes: activeKeyframes,
      setKeyframes,
      targetHtml: activeHtml,
      setTargetHtml,
      targetCss: activeCss,
      setTargetCss,
      saveState,
      loadState,
    }),
    [
      activeAnimation,
      setAnimation,
      updateAnimation,
      activeKeyframes,
      setKeyframes,
      activeHtml,
      setTargetHtml,
      activeCss,
      setTargetCss,
      saveState,
      loadState,
    ]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
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
