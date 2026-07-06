import React from 'react';

/* #dial-wheel's items are built and animated imperatively by
   useLightThemeEffects (it needs to render 3x looping repeats of the
   section list and drive per-frame opacity/blur/scale), so it's left
   empty here just like it was in the original markup. */
export default function BackgroundLayer() {
  return (
    <>
      <canvas id="bg-canvas"></canvas>
      <div id="noise"></div>
      <div id="glow-cursor"></div>
      <div id="section-scroller">
        <div id="dial-wheel"></div>
        <div id="dial-centre-line"></div>
      </div>
    </>
  );
}
