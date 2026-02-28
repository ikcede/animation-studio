import { SerializedAnimation } from '../SerializedAnimation/SerializedAnimation';

export interface UserAnimationLibrary {
  workingCopy: SerializedAnimation | undefined;
  library: Array<SerializedAnimation>;
}

export const defaultUserAnimationLibrary: UserAnimationLibrary = {
  workingCopy: undefined,
  library: [],
};
