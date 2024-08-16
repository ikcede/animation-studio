/** We're gonna start off hard coding this */

import AnimationLib from "@/model/AnimationLib";

const animations = [
  {
    id: 1,
    name: 'Slide in left',
    description: 'Slide in from the left',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-in-left;',
    keyframes: '@keyframes slide-in-left {0% { transform: translateX(-1500px); } 100% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 2,
    name: 'Slide in right',
    description: 'Slide in from the right',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-in-right;',
    keyframes: '@keyframes slide-in-right {0% { transform: translateX(1500px); } 100% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 3,
    name: 'Slide in top',
    description: 'Slide in from the top',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-in-top;',
    keyframes: '@keyframes slide-in-top {0% { transform: translateY(-1500px); } 100% { transform: translateY(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 4,
    name: 'Slide in bottom',
    description: 'Slide in from the bottom',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-in-bottom;',
    keyframes: '@keyframes slide-in-bottom {0% { transform: translateY(1500px); } 100% { transform: translateY(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },

];

const data = (new Array<AnimationLib>()).concat([...animations]);
export default data;