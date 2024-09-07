# Animation Studio

<p style="text-align: center;">
<img alt="demo" src="public/demo-1.png" width="70%" /> &nbsp;&nbsp; <img alt="mobile-demo" src="public/demo-mobile-1.jpg" width="25%">
</p>

Check out the [live demo](https://css-animation-studio.vercel.app/)!

Animation Studio was originally conceived as a library to store and quickly customize cool text animations. Eventually, scope creep led to the addition of modular keyframe editing, animation tuning, and html customization features, resulting in an entire editing studio for animations.

Since this is a project I built for fun in about a month, I don't intend to fully support it going forward, but I'll be looking to add animations and features here and there.

## TODOS

Next:

- Launch beta

Backlog:

- Keyframes:

  - Edit keyframe from keyframe view
  - Support keyframe codemirror editor
  - Allow for higher precision keyframe values

- Library:

  - Add new animations to lib
  - Search to filter animations

- Animations:

  - Clean up longform CSS string outputs
  - Support linear() timing functions
  - Support composite keyframes and animations

- Timeline:

  - Speed mods
  - Mobile drag keyframes support

- General:
  - Saving + Projects
  - Keyboard shortcuts

## Getting Started

To run the dev server:

```bash
npm run dev
```

Before deploying:

```bash
npm test
npm run build
```
