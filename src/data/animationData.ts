/** We're gonna start off hard coding this */

import AnimationLib from "@/model/AnimationLib";

export const data = [
  new AnimationLib({
    id: 1,
    name: 'Slide in left',
    description: 'Slide in from the left',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-left;',
    keyframes: '0% { transform: translateX(-1500px); } 100% { transform: translateX(0px); }',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  }),
  new AnimationLib({
    id: 2,
    name: 'Slide in right',
    description: 'Slide in from the right',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-right;',
    keyframes: '0% { transform: translateX(1500px); } 100% { transform: translateX(0px); }',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  }),
  new AnimationLib({
    id: 3,
    name: 'Slide in top',
    description: 'Slide in from the top',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-top;',
    keyframes: '0% { transform: translateY(-1500px); } 100% { transform: translateY(0px); }',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  }),
  new AnimationLib({
    id: 4,
    name: 'Slide in bottom',
    description: 'Slide in from the bottom',
    tags: [
      'Slide',
      'Library'
    ],
    animation: 'animation-name: slide-bottom;',
    keyframes: '0% { transform: translateY(1500px); } 100% { transform: translateY(0px); }',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  }),
  
];