import { useEffect } from 'react';
import { loadGsap } from '../../lib/loadGsap.js';
import { DIAL_SECTIONS } from '../content.js';

/* =====================================================================
   This hook is a fairly direct port of the <script> at the bottom of
   the original public/theme-light.html onto a React-managed root
   element instead of a whole standalone document:

     - document.getElementById(...)   -> root.querySelector(...)
     - window.scrollY / innerHeight   -> root.scrollTop / clientHeight
     - window.parent.postMessage(...) -> onHeroReady() / onSectionChange()
     - ScrollTrigger's default window  -> ScrollTrigger's `scroller: root`

   It intentionally still builds a few bits of DOM imperatively (the
   shattered hero letters, the handwriting/typewriter tags, the cursor
   message box, the slot-wheel dial items) exactly like the original
   script did — these are pure animation scratch nodes, not content, so
   there's nothing lost by not modelling them as React state.
   ===================================================================== */
export function useLightThemeEffects(rootRef, { site, onHeroReady, onSectionChange }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Guard against React StrictMode's dev-only double-invoke of effects.
    // StrictMode runs: mount -> cleanup -> mount again, synchronously,
    // before any promise below has a chance to resolve. The dataset flag
    // stops the *second* mount from starting a duplicate init. Note this
    // means the synthetic cleanup in between must NOT cancel the first
    // mount's pending work (that used to happen here, and it meant the
    // GSAP setup below never ran at all) — this component is meant to
    // live for the app's whole lifetime, so there's nothing that
    // actually needs tearing down in between.
    if (root.dataset.jvInited === 'true') return;
    root.dataset.jvInited = 'true';

    const cleanupFns = [];

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (!gsap || !ScrollTrigger) return;
      initAll(root, gsap, ScrollTrigger, { site, onHeroReady, onSectionChange }, cleanupFns);
    });

    return () => {
      // Intentionally a no-op in normal use — see note above. Kept as a
      // named function (rather than omitted) purely for clarity.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function initAll(root, gsap, ScrollTrigger, { site, onHeroReady, onSectionChange }, cleanupFns) {
  const q = (sel) => root.querySelector(sel);
  const qa = (sel) => root.querySelectorAll(sel);

  /* ====================================================
     NAME: chaos -> order
     ==================================================== */
  const NAME = site.name || 'JAYA VARDHAN';
  const nameEl = q('#hero-name');
  [...NAME].forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'letter' + (ch === ' ' ? ' space' : '');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    nameEl.appendChild(span);
    if (ch === ' ') {
      const br = document.createElement('span');
      br.className = 'line-break';
      nameEl.appendChild(br);
    }
  });

  const letters = nameEl.querySelectorAll('.letter');
  gsap.set(letters, {
    x: () => gsap.utils.random(-600, 600),
    y: () => gsap.utils.random(-400, 400),
    rotation: () => gsap.utils.random(-180, 180),
    opacity: 0, filter: 'blur(8px)',
  });

  const heroDot = q('#hero-tags .dot');
  gsap.set(heroDot, { opacity: 0 });

  gsap.set(q('#hero-tags'), {
    xPercent: -50,
    scale: 2.6,
    y: '28vh',
    transformOrigin: '50% 50%',
    zIndex: 6,
  });

  /* ---- shared handwriting / typewriter helpers ---- */
  function runHandwritingInto(el, word, onComplete) {
    [...word].forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'hw-letter' + (ch === ' ' ? ' space' : '');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    });
    gsap.to(el.querySelectorAll('.hw-letter'), {
      opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)',
      duration: 0.5, ease: 'power2.out', stagger: 0.085,
      onComplete,
    });
  }
  function runHandwriting(onComplete) {
    runHandwritingInto(q('#tag-designer'), site.roleDesigner || 'Visual Designer', onComplete);
  }
  function runTypewriterInto(textEl, word, speed, onComplete) {
    let i = 0;
    (function type() {
      if (i <= word.length) {
        textEl.textContent = word.slice(0, i++);
        setTimeout(type, speed || 72);
      } else if (onComplete) onComplete();
    })();
  }
  function runTypewriter(onComplete) {
    runTypewriterInto(q('#tag-developer .tw-text'), site.roleDeveloper || ' Web Developer', undefined, onComplete);
  }
  function runSubCrafting() {
    runHandwritingInto(q('#sub-crafting'), site.subCrafting || 'crafting');
  }
  function runSubCoding() {
    runTypewriterInto(q('#sub-coding .tw-text'), site.subCoding || 'coding');
  }

  function startLetterFloat() {
    letters.forEach((l, i) => {
      gsap.to(l, { y: '+=6', duration: 2 + (i % 5) * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.02 });
    });
  }

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to(q('#hero-tags'), { opacity: 1, duration: 0.6, ease: 'power2.out' })
    .call(() => {
      let completed = 0;
      const revealDot = () => {
        completed += 1;
        if (completed === 2) gsap.to(heroDot, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      };
      runHandwriting(revealDot);
      runTypewriter(revealDot);
    })
    .to({}, { duration: 1.9 })
    .to(q('#hero-tags'), { scale: 1, y: 0, duration: 0.9, ease: 'expo.inOut' }, '+=0.1')
    .to(letters, {
      x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)',
      duration: 1.4, ease: 'expo.out',
      stagger: { each: 0.045, from: 'random' },
    }, '-=0.35')
    .call(startLetterFloat)
    .to(q('#hero-sub'), { opacity: 1, duration: 0.8 }, '-=0.2')
    .call(() => { runSubCoding(); runSubCrafting(); })
    .to(qa('.scroll-cue'), { opacity: 1, duration: 0.8 }, '-=0.5')
    .call(() => { initCursorBox(); })
    .call(() => { if (onHeroReady) onHeroReady(); });

  /* ====================================================
     HERO CURSOR MESSAGE BOX
     ==================================================== */
  const heroEl = q('#hero');
  const cursorBox = q('#cursor-box');
  const cbTextEl = q('#cb-text');

  let cbX = 0, cbY = 0;
  let cbTX = window.innerWidth / 2, cbTY = window.innerHeight / 2;
  let cbSequenceStarted = false;
  let cbMouseInHero = false;
  let cbFollowRunning = false;
  let cbVisible = false;
  let cbRaf = null;

  function runCursorFollow() {
    if (!cbFollowRunning) return;
    cbX += (cbTX - cbX) * 0.13;
    cbY += (cbTY - cbY) * 0.13;

    const bw = cursorBox.offsetWidth || 10;
    const bh = cursorBox.offsetHeight || 10;
    const hw = heroEl.offsetWidth;
    const hh = heroEl.offsetHeight;
    const pad = 14;

    const cx = Math.min(Math.max(cbX, bw / 2 + pad), hw - bw / 2 - pad);
    const cy = Math.min(Math.max(cbY, bh / 2 + pad), hh - bh / 2 - pad);

    cursorBox.style.left = cx + 'px';
    cursorBox.style.top = cy + 'px';
    cursorBox.style.transform = 'translate(-50%, -50%)';

    cbRaf = requestAnimationFrame(runCursorFollow);
  }
  function pauseCursorFollow() { cbFollowRunning = false; }
  function resumeCursorFollow() {
    if (!cbFollowRunning) { cbFollowRunning = true; cbRaf = requestAnimationFrame(runCursorFollow); }
  }

  function onHeroMouseMove(e) {
    const rect = heroEl.getBoundingClientRect();
    cbTX = e.clientX - rect.left;
    cbTY = e.clientY - rect.top;
    cbMouseInHero = true;
    resumeCursorFollow();
    if (cbSequenceStarted && !cbVisible) showCursorBox();
  }
  function onHeroMouseEnter() {
    cbMouseInHero = true;
    resumeCursorFollow();
    if (cbSequenceStarted && !cbVisible) showCursorBox();
  }
  function onHeroMouseLeave() {
    cbMouseInHero = false;
    hideCursorBox();
    pauseCursorFollow();
  }
  function onDocMouseLeave() {
    cbMouseInHero = false;
    hideCursorBox();
    pauseCursorFollow();
  }
  function onWindowBlur() {
    cbMouseInHero = false;
    hideCursorBox();
    pauseCursorFollow();
  }

  heroEl.addEventListener('mousemove', onHeroMouseMove);
  heroEl.addEventListener('mouseenter', onHeroMouseEnter);
  heroEl.addEventListener('mouseleave', onHeroMouseLeave);
  document.addEventListener('mouseleave', onDocMouseLeave);
  window.addEventListener('blur', onWindowBlur);
  cleanupFns.push(() => {
    heroEl.removeEventListener('mousemove', onHeroMouseMove);
    heroEl.removeEventListener('mouseenter', onHeroMouseEnter);
    heroEl.removeEventListener('mouseleave', onHeroMouseLeave);
    document.removeEventListener('mouseleave', onDocMouseLeave);
    window.removeEventListener('blur', onWindowBlur);
    if (cbRaf) cancelAnimationFrame(cbRaf);
  });

  function showCursorBox() { cbVisible = true; cursorBox.classList.add('visible'); }
  function hideCursorBox() { cbVisible = false; cursorBox.classList.remove('visible'); }

  function typeMsg(msg, onDone) {
    cbTextEl.innerHTML = '';
    const caret = Object.assign(document.createElement('span'), { className: 'cb-caret' });
    let i = 0;
    (function step() {
      cbTextEl.textContent = msg.slice(0, i);
      cbTextEl.appendChild(caret);
      if (i++ <= msg.length) setTimeout(step, 38);
      else if (onDone) onDone();
    })();
  }
  function eraseMsg(msg, onDone) {
    let i = msg.length;
    const caret = Object.assign(document.createElement('span'), { className: 'cb-caret' });
    (function step() {
      cbTextEl.textContent = msg.slice(0, i);
      cbTextEl.appendChild(caret);
      if (i-- >= 0) setTimeout(step, 22);
      else if (onDone) onDone();
    })();
  }

  function initCursorBox() {
    cbSequenceStarted = true;
    setTimeout(() => {
      cursorBox.classList.add('as-box');
      const msg1 = 'Hi! its good to see you';
      const msg2 = 'Curious?! lets explore';
      typeMsg(msg1, () => {
        setTimeout(() => {
          eraseMsg(msg1, () => {
            setTimeout(() => { typeMsg(msg2); }, 180);
          });
        }, 1500);
      });
    }, 400);
    if (cbMouseInHero) showCursorBox();
  }

  /* ====================================================
     2-D SLOT-WHEEL — section indicator
     ==================================================== */
  const ITEM_H = 40;
  const N = DIAL_SECTIONS.length;
  const SCROLL_H = N * ITEM_H;
  const REPEATS = 3;

  const dialEl = q('#section-scroller');
  const dialWheel = q('#dial-wheel');

  for (let r = 0; r < REPEATS; r++) {
    DIAL_SECTIONS.forEach((sec) => {
      const div = document.createElement('div');
      div.className = 'dial-item';
      div.innerHTML = `<span class="di-pip"></span>${sec.label}`;
      dialWheel.appendChild(div);
    });
  }
  const allItems = dialWheel.querySelectorAll('.dial-item');

  let scrollY = 0;
  let scrollTarget = SCROLL_H;
  const WIN_H = 320;
  const CENTRE = WIN_H / 2;
  let dialRaf = null;

  function renderDial() {
    scrollY += (scrollTarget - scrollY) * 0.08;

    if (scrollY >= SCROLL_H * 2) { scrollY -= SCROLL_H; scrollTarget -= SCROLL_H; }
    if (scrollY < SCROLL_H) { scrollY += SCROLL_H; scrollTarget += SCROLL_H; }

    const stripY = CENTRE - ITEM_H / 2 - scrollY;
    dialWheel.style.transform = `translateY(${stripY}px)`;

    allItems.forEach((item, i) => {
      const itemMid = i * ITEM_H + ITEM_H / 2;
      const itemScreen = itemMid + stripY;
      const dist = Math.abs(itemScreen - CENTRE);
      const maxDist = CENTRE;

      const t = Math.min(dist / maxDist, 1);
      const opacity = 1 - t * 0.85;
      const blur = t * 3.5;
      const scale = 1 - t * 0.18;

      item.style.opacity = opacity;
      item.style.filter = blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : 'none';
      item.style.transform = `scaleX(${scale.toFixed(3)})`;
      item.style.transformOrigin = 'right center';

      const isActive = dist < ITEM_H * 0.6;
      item.style.color = isActive ? '#DD5B33' : `rgba(43,36,32,${(0.4 - t * 0.28).toFixed(2)})`;
      const pip = item.querySelector('.di-pip');
      if (pip) pip.style.opacity = isActive ? '1' : '0';
    });

    dialRaf = requestAnimationFrame(renderDial);
  }
  renderDial();
  cleanupFns.push(() => { if (dialRaf) cancelAnimationFrame(dialRaf); });

  function dialGoTo(idx) {
    const baseOffset = SCROLL_H + idx * ITEM_H;
    let delta = baseOffset - (scrollTarget % (SCROLL_H * REPEATS));
    if (delta > SCROLL_H) delta -= SCROLL_H * REPEATS;
    if (delta < -SCROLL_H) delta += SCROLL_H * REPEATS;
    scrollTarget += delta;
  }

  ScrollTrigger.create({
    trigger: heroEl, scroller: root, start: 'bottom 88%',
    onEnter: () => dialEl.classList.add('visible'),
    onLeaveBack: () => dialEl.classList.remove('visible'),
  });

  DIAL_SECTIONS.forEach((sec, idx) => {
    const target = q(`#${sec.id}`);
    if (!target) return;
    ScrollTrigger.create({
      trigger: target, scroller: root, start: 'top 55%', end: 'bottom 55%',
      onEnter: () => dialGoTo(idx),
      onEnterBack: () => dialGoTo(idx),
    });
  });

  /* ====================================================
     SCROLL REVEALS
     ==================================================== */
  qa('.reveal').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, scroller: root, start: 'top 85%' },
    });
  });

  /* ====================================================
     PROJECT VISUALS — parallax + blob morph
     ==================================================== */
  qa('.project').forEach((proj, i) => {
    const visual = proj.querySelector('.project-visual');
    const num = proj.querySelector('.project-num');
    gsap.fromTo(visual,
      { scale: 0.6, opacity: 0, rotate: i % 2 === 0 ? -30 : 30 },
      {
        scale: 1, opacity: 0.95, rotate: i % 2 === 0 ? -8 : 8, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: proj, scroller: root, start: 'top 75%' },
      });
    gsap.to(visual, {
      y: -80, ease: 'none',
      scrollTrigger: { trigger: proj, scroller: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
    gsap.to(num, {
      y: 60, ease: 'none',
      scrollTrigger: { trigger: proj, scroller: root, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    });
    gsap.to(visual, {
      duration: 6, repeat: -1, ease: 'sine.inOut', yoyo: true,
      borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
    });
  });

  /* ====================================================
     BACKGROUND CANVAS — drifting paper confetti
     ==================================================== */
  const bgCanvas = q('#bg-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  let W, H;
  function resizeBG() { W = bgCanvas.width = window.innerWidth; H = bgCanvas.height = window.innerHeight; }
  resizeBG();
  window.addEventListener('resize', resizeBG);
  cleanupFns.push(() => window.removeEventListener('resize', resizeBG));

  const COLORS = ['#DD5B33', '#1E7A69', '#DE9F2E', '#7B57A6', '#C6567A'];
  const particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    w: Math.random() * 5 + 3, h: Math.random() * 3 + 2,
    c: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
    rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.01,
    a: Math.random() * 0.3 + 0.12,
  }));
  let bgRaf = null;
  function drawBG() {
    bgCtx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      p.rot += p.vr;
      bgCtx.save();
      bgCtx.translate(p.x, p.y);
      bgCtx.rotate(p.rot);
      bgCtx.fillStyle = p.c; bgCtx.globalAlpha = p.a;
      bgCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      bgCtx.restore();
    });
    bgCtx.globalAlpha = 1;
    bgRaf = requestAnimationFrame(drawBG);
  }
  drawBG();
  cleanupFns.push(() => { if (bgRaf) cancelAnimationFrame(bgRaf); });

  /* ====================================================
     GLOW CURSOR + ORB PARALLAX (outside hero only)
     ==================================================== */
  const glowCursor = q('#glow-cursor');
  const heroDoodles = qa('.hero-doodle');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, gx = mx, gy = my;
  function onWindowMouseMove(e) {
    mx = e.clientX; my = e.clientY;
    const ox = (e.clientX / window.innerWidth - 0.5) * 24;
    const oy = (e.clientY / window.innerHeight - 0.5) * 24;
    heroDoodles.forEach((d) => {
      const depth = parseFloat(d.dataset.depth) || 0.5;
      gsap.to(d.querySelector('svg'), { x: ox * depth, y: oy * depth, duration: 1.2, ease: 'power2.out' });
    });
  }
  window.addEventListener('mousemove', onWindowMouseMove);
  cleanupFns.push(() => window.removeEventListener('mousemove', onWindowMouseMove));

  let glowRaf = null;
  function followGlow() {
    gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
    glowCursor.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`;
    glowRaf = requestAnimationFrame(followGlow);
  }
  followGlow();
  cleanupFns.push(() => { if (glowRaf) cancelAnimationFrame(glowRaf); });
  if ('ontouchstart' in window) glowCursor.style.display = 'none';

  /* ====================================================
     REPORT CURRENT SECTION (drives the dark/light toggle sync)
     ==================================================== */
  const sectionEls = DIAL_SECTIONS.map((s) => q(`#${s.id}`)).filter(Boolean);
  function currentSection() {
    const y = root.scrollTop + root.clientHeight * 0.35;
    let current = sectionEls[0];
    for (let i = 0; i < sectionEls.length; i++) {
      if (sectionEls[i].offsetTop <= y) current = sectionEls[i];
    }
    return current ? current.id : 'hero';
  }
  let lastSent = null;
  function reportSection() {
    const id = currentSection();
    if (id !== lastSent) {
      lastSent = id;
      if (onSectionChange) onSectionChange(id);
    }
  }
  root.addEventListener('scroll', reportSection, { passive: true });
  cleanupFns.push(() => root.removeEventListener('scroll', reportSection));
  requestAnimationFrame(reportSection);

  // Give ScrollTrigger a final measurement pass once everything above
  // has attached (fonts/layout can still be settling at this point).
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
