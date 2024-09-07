# Animation Studio

<p style="text-align: center;">
<img alt="demo" src="public/demo-1.png" width="70%" /> &nbsp;&nbsp; <img alt="mobile-demo" src="public/demo-mobile-1.jpg" width="25%">
</p>

Check out the [live demo](https://css-animation-studio.vercel.app/)!

Animation Studio was originally conceived as a library to store and quickly customize cool text animations. Eventually, scope creep led to the addition of modular keyframe editing, animation tuning, and html customization features, resulting in an entire editing studio for animations.

Since this is a project I built for fun in about a month, I don't intend to fully support it going forward, but I'll be looking to add animations and features here and there.

## TODOS

Next:

- Optimize editor component by moving context out of editor into a wrapper
- Launch beta

Backlog:

- Edit keyframe from keyframe view
- Add new animations to lib
- Clean up longform CSS string outputs
- Clean up preview logic
- Allow for higher precision keyframe values
- Support keyframe codemirror editor
- Timeline:
  - Speed mods
- Mobile touch support -.-
- Saving + Projects
- Keyboard shortcuts
- Support linear() timing functions
- Support composite keyframes and animations

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
