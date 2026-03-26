import { SerializedAnimation } from '../SerializedAnimation/SerializedAnimation';

export interface UserAnimationLibrary {
  library: Array<SerializedAnimation>;
}

export const defaultUserAnimationLibrary: UserAnimationLibrary = {
  library: [],
};
