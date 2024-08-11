export default class AnimationLib {
  id: number;
  name: string;
  description: string = '';
  tags: string[] = [];
  animation: string = '';
  keyframes: string = '';
  target: string = '';

  constructor(name: string) {
    this.id = -1;
    this.name = name;
  }
}