/** We're gonna start off hard coding this */

import AnimationLib from '@/model/AnimationLib';

const animations = [
  {
    id: 1,
    name: 'Slide in',
    description: 'Slide in entrance animation',
    tags: ['Enter'],
    animation: 'animation-name: slide-in; animation-duration: 0.5s;',
    keyframes:
      '@keyframes slide-in {0% { transform: translateX(-1500px); } 100% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: red;}',
    variants: [
      {
        name: 'left',
        keyframes:
          '@keyframes slide-in-left {0% { transform: translateX(-1500px); } 100% { transform: translateX(0px); }}',
      },
      {
        name: 'right',
        keyframes:
          '@keyframes slide-in-right {0% { transform: translateX(1500px); } 100% { transform: translateX(0px); }}',
      },
      {
        name: 'top',
        keyframes:
          '@keyframes slide-in-top {0% { transform: translateY(-1500px); } 100% { transform: translateY(0px); }}',
      },
      {
        name: 'bottom',
        keyframes:
          '@keyframes slide-in-bottom {0% { transform: translateY(1500px); } 100% { transform: translateY(0px); }}',
      },
    ],
  },
  {
    id: 2,
    name: 'Slide out',
    description: 'Slide out exit animation',
    tags: ['Exit'],
    animation: 'animation-name: slide-out; animation-duration: 0.5s;',
    keyframes:
      '@keyframes slide-out {100% { transform: translateX(-1500px); } 0% { transform: translateX(0px); }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: red;}',
    variants: [
      {
        name: 'left',
        keyframes:
          '@keyframes slide-out-left {100% { transform: translateX(-1000px); } 0% { transform: translateX(0px); }}',
      },
      {
        name: 'right',
        keyframes:
          '@keyframes slide-out-right {100% { transform: translateX(1000px); } 0% { transform: translateX(0px); }}',
      },
      {
        name: 'top',
        keyframes:
          '@keyframes slide-out-top {100% { transform: translateY(-1000px); } 0% { transform: translateY(0px); }}',
      },
      {
        name: 'bottom',
        keyframes:
          '@keyframes slide-out-bottom {100% { transform: translateY(1000px); } 0% { transform: translateY(0px); }}',
      },
    ],
  },
  {
    id: 3,
    name: 'Fade in',
    description: 'Fade in entrance animation',
    tags: ['Enter'],
    animation: 'animation-name: fade-in;',
    keyframes:
      '@keyframes fade-in {0% { opacity: 0; } 100% { opacity: 1; }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: red;}',
  },
  {
    id: 4,
    name: 'Fade out',
    description: 'Fade out entrance animation',
    tags: ['Exit'],
    animation: 'animation-name: fade-out;',
    keyframes:
      '@keyframes fade-out {0% { opacity: 1; } 100% { opacity: 0; }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: red;}',
  },
  {
    id: 5,
    name: 'Scale in',
    description: 'Scale in entrance animation',
    tags: ['Enter'],
    animation: 'animation-name: scale-in; animation-duration: 0.5s;',
    keyframes:
      '@keyframes scale-in {0% { transform: scale(0); } 100% { transform: scale(1); }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: rgb(0, 127, 227);}',
    variants: [
      {
        name: 'center',
        keyframes:
          '@keyframes scale-in-center {0% { transform: scale(0); } 100% { transform: scale(1); }}',
      },
      {
        name: 'left',
        keyframes:
          '@keyframes scale-in-left {0% { transform: scale(0); transform-origin: 0% 50%; } 100% { transform: scale(1); transform-origin: 0% 50%; }}',
      },
      {
        name: 'right',
        keyframes:
          '@keyframes scale-in-right {0% { transform: scale(0); transform-origin: 100% 50%; } 100% { transform: scale(1); transform-origin: 100% 50%; }}',
      },
      {
        name: 'top',
        keyframes:
          '@keyframes scale-in-top {0% { transform: scale(0); transform-origin: 50% 0%; } 100% { transform: scale(1); transform-origin: 50% 0%; }}',
      },
      {
        name: 'bottom',
        keyframes:
          '@keyframes scale-in-bottom {0% { transform: scale(0); transform-origin: 50% 100%; } 100% { transform: scale(1); transform-origin: 50% 100%; }}',
      },
    ],
  },
  {
    id: 6,
    name: 'Scale out',
    description: 'Scale out exit animation',
    tags: ['Exit'],
    animation: 'animation-name: scale-out; animation-duration: 0.5s;',
    keyframes:
      '@keyframes scale-out {0% { transform: scale(1); } 100% { transform: scale(0); }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: rgb(0, 127, 227);}',
    variants: [
      {
        name: 'center',
        keyframes:
          '@keyframes scale-out-center {0% { transform: scale(1); } 100% { transform: scale(0); }}',
      },
      {
        name: 'left',
        keyframes:
          '@keyframes scale-out-left {0% { transform: scale(1); transform-origin: 0% 50%; } 100% { transform: scale(0); transform-origin: 0% 50%; }}',
      },
      {
        name: 'right',
        keyframes:
          '@keyframes scale-out-right {0% { transform: scale(1); transform-origin: 100% 50%; } 100% { transform: scale(0); transform-origin: 100% 50%; }}',
      },
      {
        name: 'top',
        keyframes:
          '@keyframes scale-out-top {0% { transform: scale(1); transform-origin: 50% 0%; } 100% { transform: scale(0); transform-origin: 50% 0%; }}',
      },
      {
        name: 'bottom',
        keyframes:
          '@keyframes scale-out-bottom {0% { transform: scale(1); transform-origin: 50% 100%; } 100% { transform: scale(0); transform-origin: 50% 100%; }}',
      },
    ],
  },
  {
    id: 7,
    name: 'Spin in',
    description: 'Spin in entrance animation',
    tags: ['Enter'],
    animation: 'animation-name: spin-in; animation-duration: 0.5s;',
    keyframes:
      '@keyframes spin-in {0% { transform: rotate(360deg); opacity: 0; } 100% { transform: rotate(0deg); opacity: 1; }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: rgb(0, 127, 227);}',
    variants: [
      {
        name: 'center',
        keyframes:
          '@keyframes spin-in-center {0% { transform: rotate(360deg); opacity: 0; } 100% { transform: rotate(0deg); opacity: 1; }}',
      },
      {
        name: 'horizontal',
        keyframes:
          '@keyframes spin-in-horizontal {0% { transform: rotateX(360deg); opacity: 0; } 100% { transform: rotateX(0deg); opacity: 1; }}',
      },
      {
        name: 'vertical',
        keyframes:
          '@keyframes spin-in-vertical {0% { transform: rotateY(360deg); opacity: 0; } 100% { transform: rotateY(0deg); opacity: 1; }}',
      },
    ],
  },
  {
    id: 8,
    name: 'Spin out',
    description: 'Spin out entrance animation',
    tags: ['Exit'],
    animation: 'animation-name: spin-out; animation-duration: 0.5s;',
    keyframes:
      '@keyframes spin-out {0% { transform: rotate(0deg); opacity: 1; } 100% { transform: rotate(360deg); opacity: 0; }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: rgb(0, 127, 227);}',
    variants: [
      {
        name: 'center',
        keyframes:
          '@keyframes spin-out-center {0% { transform: rotate(0deg); opacity: 1; } 100% { transform: rotate(360deg); opacity: 0; }}',
      },
      {
        name: 'horizontal',
        keyframes:
          '@keyframes spin-out-horizontal {0% { transform: rotateX(0deg); opacity: 1; } 100% { transform: rotateX(360deg); opacity: 0; }}',
      },
      {
        name: 'vertical',
        keyframes:
          '@keyframes spin-out-vertical {0% { transform: rotateY(0deg); opacity: 1; } 100% { transform: rotateY(360deg); opacity: 0; }}',
      },
    ],
  },
  {
    id: 9,
    name: 'Slit in',
    description: 'Slit in entrance animation',
    tags: ['Enter'],
    animation: 'animation-name: slit-in; animation-duration: 0.5s;',
    keyframes:
      '@keyframes slit-in {0% { transform: translateZ(-800px) rotateX(90deg); opacity: 0; } 54% { transform: translateZ(-160px) rotateX(87deg); opacity: 1; } 100% { transform: translateZ(0) rotateX(0); }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: rgb(44, 148, 24);}',
    variants: [
      {
        name: 'horizontal',
        keyframes:
          '@keyframes slit-in-horizontal {0% { transform: translateZ(-800px) rotateX(90deg); opacity: 0; } 54% { transform: translateZ(-160px) rotateX(87deg); opacity: 1; } 100% { transform: translateZ(0) rotateX(0); }}',
      },
      {
        name: 'vertical',
        keyframes:
          '@keyframes slit-in-vertical {0% { transform: translateZ(-800px) rotateY(90deg); opacity: 0; } 54% { transform: translateZ(-160px) rotateY(87deg); opacity: 1; } 100% { transform: translateZ(0) rotateY(0); }}',
      },
    ],
  },
  {
    id: 10,
    name: 'Slit out',
    description: 'Slit out entrance animation',
    tags: ['Exit'],
    animation: 'animation-name: slit-out; animation-duration: 0.5s;',
    keyframes:
      '@keyframes slit-out {100% { transform: translateZ(-800px) rotateX(90deg); opacity: 0; } 54% { transform: translateZ(-160px) rotateX(87deg); opacity: 1; } 0% { transform: translateZ(0) rotateX(0); opacity: 1; }}',
    targetHtml: '<div class="target"></div>',
    targetCss:
      '.target {width: 100px; height: 100px; display: flex; background: rgb(44, 148, 24);}',
    variants: [
      {
        name: 'horizontal',
        keyframes:
          '@keyframes slit-out-horizontal {100% { transform: translateZ(-800px) rotateX(90deg); opacity: 0; } 54% { transform: translateZ(-160px) rotateX(87deg); opacity: 1; } 0% { transform: translateZ(0) rotateX(0); opacity: 1; }}',
      },
      {
        name: 'vertical',
        keyframes:
          '@keyframes slit-out-vertical {100% { transform: translateZ(-800px) rotateY(90deg); opacity: 0; } 54% { transform: translateZ(-160px) rotateY(87deg); opacity: 1; } 0% { transform: translateZ(0) rotateY(0); opacity: 1; }}',
      },
    ],
  },
  {
    id: 11,
    name: 'Tracking in',
    description: 'Tracking in entrance animation',
    tags: ['Enter', 'Text'],
    animation: 'animation-name: tracking-in; animation-duration: 0.5s;',
    keyframes:
      '@keyframes tracking-in {0% { opacity: 0; letter-spacing: -0.5rem; } 100% { opacity: 1; }}',
    targetHtml: '<div class="target">Animation Text</div>',
    targetCss: '.target {font-size: 32px; color: #eee; display: flex;}',
    variants: [
      {
        name: 'expand',
        keyframes:
          '@keyframes tracking-in-expand {0% { opacity: 0; letter-spacing: -0.5rem; } 100% { opacity: 1; }}',
      },
      {
        name: 'contract',
        keyframes:
          '@keyframes tracking-in-contract {0% { opacity: 0; letter-spacing: 1rem; } 100% { opacity: 1; letter-spacing: normal; }}',
      },
      {
        name: 'contract-wide',
        keyframes:
          '@keyframes tracking-in-contract-wide {0% { opacity: 0; letter-spacing: 1rem; transform: translateZ(400px); } 100% { opacity: 1; letter-spacing: normal; transform: translateZ(0);}}',
      },
    ],
  },
  {
    id: 13,
    name: 'Text Color Shift',
    description: 'Text color shifting animation',
    tags: ['Text'],
    animation: 'animation: text-color-shift 2s linear alternate infinite;',
    keyframes:
      '@keyframes text-color-shift {0% {} 100% { background-position: 100% center; }}',
    targetHtml: '<div class="target">Animation Text</div>',
    targetCss:
      '.target {font-size: 32px; display: flex; color: transparent; background: linear-gradient(to right, rgb(230, 75, 61) 20%, rgb(0, 127, 227) 50%, rgb(44, 148, 24) 80%); background-size: 200% auto; background-clip: text;}',
  },
];

const data = new Array<AnimationLib>().concat([...animations]);
export default data;
