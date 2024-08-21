/** We're gonna start off hard coding this */

import AnimationLib from "@/model/AnimationLib";

const animations = [
  {
    id: 1,
    name: 'Slide in',
    description: 'Slide in entrance animation',
    tags: [
      'Enter'
    ],
    animation: 'animation-name: slide-in;',
    keyframes: '@keyframes slide-in {0% { transform: translateX(-1500px); } 100% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
    variants: [
      {
        name: 'left',
        keyframes: '@keyframes slide-in-left {0% { transform: translateX(-1500px); } 100% { transform: translateX(0px); }}',
      },
      {
        name: 'right',
        keyframes: '@keyframes slide-in-right {0% { transform: translateX(1500px); } 100% { transform: translateX(0px); }}',
      },
      {
        name: 'top',
        keyframes: '@keyframes slide-in-top {0% { transform: translateY(-1500px); } 100% { transform: translateY(0px); }}',
      },
      {
        name: 'bottom',
        keyframes: '@keyframes slide-in-bottom {0% { transform: translateY(1500px); } 100% { transform: translateY(0px); }}',
      },
    ]
  },
  {
    id: 2,
    name: 'Slide out',
    description: 'Slide out exit animation',
    tags: [
      'Exit'
    ],
    animation: 'animation-name: slide-out;',
    keyframes: '@keyframes slide-out {100% { transform: translateX(-1500px); } 0% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss: '.target {width: 100px; height: 100px; display: flex; background: red}',
    variants: [
      {
        name: 'left',
        keyframes: '@keyframes slide-out-left {100% { transform: translateX(-1000px); } 0% { transform: translateX(0px); }}',
      },
      {
        name: 'right',
        keyframes: '@keyframes slide-out-right {100% { transform: translateX(1000px); } 0% { transform: translateX(0px); }}',
      },
      {
        name: 'top',
        keyframes: '@keyframes slide-out-top {100% { transform: translateY(-1000px); } 0% { transform: translateY(0px); }}',
      },
      {
        name: 'bottom',
        keyframes: '@keyframes slide-out-bottom {100% { transform: translateY(1000px); } 0% { transform: translateY(0px); }}',
      },
    ]
  },
  
];

const data = (new Array<AnimationLib>()).concat([...animations]);
export default data;