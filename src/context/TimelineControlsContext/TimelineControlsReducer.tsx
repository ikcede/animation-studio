import { CustomAnimation } from "@/model/CustomAnimation";

export type TimelineControlsReducerAction = {
  type: string;
  value?: string;
  newAnimation?: CustomAnimation;
};

export const timelineControlsReducer = (
  animation: CustomAnimation,
  action: TimelineControlsReducerAction
): CustomAnimation => {
  switch (action.type) {
    case 'play': {
      return animation.clone().apply({
        playState: 'running',
        ended: false,
        useClone: animation.ended
          ? !animation.useClone
          : animation.useClone,
        startTime: animation.ended ? 0 : animation.startTime,
      });
    }
    case 'pause': {
      return animation.clone().apply({
        playState: 'paused',
      });
    }
    case 'end': {
      return animation.clone().apply({
        ended: true,
        playState: 'paused',
      });
    }
    case 'setTime': {
      let time = parseFloat(action.value || '0');
      return animation.clone().apply({
        ended: time == animation.duration,
        playState: 'paused',
        startTime: time,
        useClone: !animation.useClone,
      });
    }
    case 'refresh': {
      return animation.clone().apply({
        useClone: !animation.useClone,
      });
    }
    case 'update': {
      return action.newAnimation || animation;
    }
    default: {
      return animation;
    }
  }
};