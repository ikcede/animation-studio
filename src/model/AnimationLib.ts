export interface AnimationLibDetails {
  id: number;
  name: string;
  description?: string;
  tags?: string[];
  animation?: string;
  keyframes?: string;
  targetHtml?: string;
  targetCss?: string;
}

export default class AnimationLib implements AnimationLibDetails {
  id: number;
  name: string;
  description: string = '';
  tags: string[] = [];
  animation: string = '';
  keyframes: string = '';
  targetHtml: string = '';
  targetCss: string = '';

  constructor(options: AnimationLibDetails) {
    this.id = -1;
    this.name = 'Animation';

    Object.assign(this, options);
  }
}