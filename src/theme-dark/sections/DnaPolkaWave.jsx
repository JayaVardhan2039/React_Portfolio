import React, { useEffect, useRef } from 'react';

/*
  DnaPolkaWave
  ------------
  A decorative canvas layer: a white double-helix of dots (like a
  horizontal DNA wave) plus a faint triangulated dot-mesh behind it,
  matching the reference look.

  Motion model (this is the important bit): nothing here rotates as
  one flat image. Instead each dot's position comes from
      y = sin(xRatio * FREQ + phase)
  and "phase" is a single number that continuously shifts with
  scrolling. Increasing phase slides the whole sine curve sideways,
  which reads as the wave travelling horizontally — exactly like the
  reference gif — rather than the dots spinning in place.
    - scrolling down -> phase increases -> wave travels one way
    - scrolling up   -> phase decreases -> wave travels the other way
    - no scroll input -> phase's velocity decays to exactly 0, so the
      wave comes to a full stop and holds its shape

  Each dot's cos(theta) (its depth) also drives its radius/brightness,
  which is what gives the strand its 3D "coming toward you / turning
  away" look as it travels.

  Listens on the nearest ".theme-dark-root" ancestor, since that's the
  actual scroll container in this app (see DarkTheme.jsx), not window.
*/
export default function DnaPolkaWave({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const scrollEl = canvas.closest('.theme-dark-root');
    const listenTarget = scrollEl || window;
    const getScrollTop = () => (scrollEl ? scrollEl.scrollTop : window.scrollY);

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let networkPoints = [];

    function seededRandom(seed) {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    }

    function buildNetwork() {
      const rand = seededRandom(42);
      const count = Math.max(16, Math.round(width / 70));
      networkPoints = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        r: 1 + rand() * 1.3,
      }));
    }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNetwork();
    }
    resize();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);

    const DOTS_PER_STRAND = 42;
    const FREQ = 2.4;             // wave cycles across the width
    const AMP_RATIO = 0.15;       // vertical amplitude relative to height
    const STRAND_PHASE = Math.PI; // 2nd strand offset -> double-helix look
    const DRIFT_SPEED = 46;       // px/rad the background mesh drifts alongside the wave

    let phase = 0;      // travelling-wave phase — THIS moves the dots horizontally
    let velocity = 0;   // phase change per frame
    let lastScrollTop = getScrollTop();
    let rafId = null;

    function onScroll() {
      const current = getScrollTop();
      const delta = current - lastScrollTop;
      lastScrollTop = current;
      velocity += delta * 0.006;
      const MAX_V = 0.12;
      if (velocity > MAX_V) velocity = MAX_V;
      if (velocity < -MAX_V) velocity = -MAX_V;
    }
    listenTarget.addEventListener('scroll', onScroll, { passive: true });

    function wrapX(x) {
      const span = width + 40;
      return (((x + phase * DRIFT_SPEED) % span) + span) % span - 20;
    }

    function draw() {
      // damping: with no fresh scroll input this pulls velocity to 0,
      // which is what makes the wave hold still when scrolling stops.
      velocity *= 0.92;
      if (Math.abs(velocity) < 0.0003) velocity = 0;
      phase += velocity;

      ctx.clearRect(0, 0, width, height);

      // faint triangulated dot-mesh drifting in the background
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      for (let i = 0; i < networkPoints.length; i++) {
        const p = networkPoints[i];
        const px = wrapX(p.x);
        for (let j = i + 1; j < networkPoints.length; j++) {
          const q = networkPoints[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          if (Math.sqrt(dx * dx + dy * dy) < width * 0.14) {
            ctx.beginPath();
            ctx.moveTo(px, p.y);
            ctx.lineTo(wrapX(q.x), q.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      networkPoints.forEach((p) => {
        ctx.beginPath();
        ctx.arc(wrapX(p.x), p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // the DNA double-helix strands, all white, brightness/size = depth
      for (let strand = 0; strand < 2; strand++) {
        const strandOffset = strand === 0 ? 0 : STRAND_PHASE;
        for (let i = 0; i <= DOTS_PER_STRAND; i++) {
          const xRatio = i / DOTS_PER_STRAND;
          const theta = xRatio * Math.PI * FREQ + phase + strandOffset;
          const x = xRatio * width;
          const y = height / 2 + Math.sin(theta) * (height * AMP_RATIO);
          const depth = Math.cos(theta); // -1..1, simulates the strand turning toward/away from the viewer
          const radius = 1.6 + (depth + 1) * 2.1;
          const alpha = Math.min(1, 0.25 + (depth + 1) * 0.35);

          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // faint rungs connecting the two strands, like a DNA ladder
      ctx.strokeStyle = 'rgba(255,255,255,0.16)';
      for (let i = 0; i <= DOTS_PER_STRAND; i += 2) {
        const xRatio = i / DOTS_PER_STRAND;
        const x = xRatio * width;
        const theta1 = xRatio * Math.PI * FREQ + phase;
        const theta2 = xRatio * Math.PI * FREQ + phase + STRAND_PHASE;
        const y1 = height / 2 + Math.sin(theta1) * (height * AMP_RATIO);
        const y2 = height / 2 + Math.sin(theta2) * (height * AMP_RATIO);
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      listenTarget.removeEventListener('scroll', onScroll);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`manifesto-dna-wave ${className}`.trim()}
      aria-hidden="true"
    />
  );
}