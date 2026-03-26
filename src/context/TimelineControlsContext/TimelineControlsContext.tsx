'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useTimelineContext } from '../TimelineContext/TimelineContext';

type TimelineControlsContextProps = {
  play: () => void;
  pause: () => void;
  end: () => void;
  setTime: (time: number) => void;
  refresh: () => void;
};

type TimelineControlsContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const TimelineControlsContext = createContext<
  TimelineControlsContextProps | undefined
>(undefined);

/**
 * Controls the state of the timeline including whether it is playing, paused, or ended.
 *
 * Must be used within a TimelineContextProvider.
 */
export const TimelineControlsContextProvider = ({
  children,
}: TimelineControlsContextProviderProps) => {
  const { animation, updateAnimation } = useTimelineContext();

  const play = useCallback(() => {
    updateAnimation({
      playState: 'running',
      ended: false,
      useClone: animation.ended ? !animation.useClone : animation.useClone,
      startTime: animation.ended ? 0 : animation.startTime,
    });
  }, [animation, updateAnimation]);

  const pause = useCallback(() => {
    updateAnimation({ playState: 'paused' });
  }, [updateAnimation]);

  const end = useCallback(() => {
    updateAnimation({
      ended: true,
      playState: 'paused',
      startTime: animation.duration,
    });
  }, [animation, updateAnimation]);

  const setTime = useCallback(
    (time: number) => {
      updateAnimation({
        ended: time == animation.duration,
        playState: 'paused',
        startTime: time,
        useClone: !animation.useClone,
      });
    },
    [animation, updateAnimation]
  );

  const refresh = useCallback(() => {
    updateAnimation({ useClone: !animation.useClone });
  }, [animation, updateAnimation]);

  const value = useMemo(() => {
    return {
      play,
      pause,
      end,
      setTime,
      refresh,
    };
  }, [play, pause, end, setTime, refresh]);

  return (
    <TimelineControlsContext.Provider value={value}>
      {children}
    </TimelineControlsContext.Provider>
  );
};

export const useTimelineControlsContext = () => {
  const context = useContext(TimelineControlsContext);

  if (context === undefined) {
    throw new Error(
      'useTimelineControlsContext must be used within a TimelineControlsContextProvider'
    );
  }

  return context;
};
