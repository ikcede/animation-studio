/** Serialized version of the animation */
export interface SerializedAnimation {
  /** Id of the animation */
  id: string;

  /** The animation name */
  name: string;

  /** CSS string form of an animation */
  animation: string;

  /** CSS string of all the keyframes used */
  keyframes: string;

  /** HTML string for the target */
  targetHtml: string;

  /** CSS string for the target element */
  targetCss: string;
}
