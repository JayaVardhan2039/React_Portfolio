import React from 'react';

/* #dial-wheel's items are built and animated imperatively by
   useDarkThemeEffects, exactly like the light theme's BackgroundLayer —
   left empty here just like the original markup. */
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
