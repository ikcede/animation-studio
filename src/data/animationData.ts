/** We're gonna start off hard coding this */

import AnimationLib from "@/model/AnimationLib";

const animations = [
  {
    id: 1,
    name: 'Slide in left',
    description: 'Slide in from the left',
    tags: [
      'Slide',
      'Enter'
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
      'Enter'
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
      'Enter'
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
      'Enter'
    ],
    animation: 'animation-name: slide-in-bottom;',
    keyframes: '@keyframes slide-in-bottom {0% { transform: translateY(1500px); } 100% { transform: translateY(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 5,
    name: 'Slide out left',
    description: 'Slide out to the left',
    tags: [
      'Slide',
      'Exit'
    ],
    animation: 'animation-name: slide-out-left;',
    keyframes: '@keyframes slide-out-left {100% { transform: translateX(-1500px); } 0% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 6,
    name: 'Slide out right',
    description: 'Slide out to the right',
    tags: [
      'Slide',
      'Exit'
    ],
    animation: 'animation-name: slide-out-right;',
    keyframes: '@keyframes slide-out-right {100% { transform: translateX(1500px); } 0% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 7,
    name: 'Slide out top',
    description: 'Slide out to the top',
    tags: [
      'Slide',
      'Exit'
    ],
    animation: 'animation-name: slide-out-top;',
    keyframes: '@keyframes slide-out-top {100% { transform: translateY(-1500px); } 0% { transform: translateY(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
  {
    id: 8,
    name: 'Slide out bottom',
    description: 'Slide out to the bottom',
    tags: [
      'Slide',
      'Exit'
    ],
    animation: 'animation-name: slide-out-bottom;',
    keyframes: '@keyframes slide-out-bottom {100% { transform: translateY(1500px); } 0% { transform: translateY(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
  },
];

const data = (new Array<AnimationLib>()).concat([...animations]);
export default data;