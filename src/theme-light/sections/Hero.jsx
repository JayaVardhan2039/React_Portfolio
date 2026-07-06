import React from 'react';

/* All of the text content inside #hero-name, #tag-designer, #tag-developer,
   #sub-crafting, #sub-coding and #cb-text is filled in imperatively by
   useLightThemeEffects (it drives the GSAP "chaos -> order" letter
   animation, the handwriting stagger, and the typewriter reveal) — so
   those elements are intentionally left empty here, exactly like the
   original static markup before its script ran. */
export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-doodle hd-scribble" data-depth="0.5">
        <svg viewBox="0 0 120 120">
          <path
            d="M60 15 C90 15 105 40 100 65 C95 92 65 105 40 98 C15 91 8 62 20 40 C28 25 45 15 60 15"
            fill="none" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round" opacity="0.8"
          />
        </svg>
      </div>
      <div className="hero-doodle hd-thread" data-depth="0.35">
        <svg viewBox="0 0 160 40">
          <path
            d="M2 20 Q20 2 38 20 T74 20 T110 20 T146 20" fill="none" stroke="var(--teal)"
            strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" opacity="0.75"
          />
        </svg>
      </div>
      <div className="hero-doodle hd-sparkle" data-depth="0.7">
        <svg viewBox="0 0 60 60">
          <g stroke="var(--mustard)" strokeWidth="4" strokeLinecap="round" opacity="0.85">
            <line x1="30" y1="6" x2="30" y2="54" /><line x1="6" y1="30" x2="54" y2="30" />
            <line x1="14" y1="14" x2="46" y2="46" /><line x1="46" y1="14" x2="14" y2="46" />
          </g>
        </svg>
      </div>
      <div className="hero-doodle hd-scrap" data-depth="0.4">
        <svg viewBox="0 0 100 60">
          <polygon
            points="4,8 22,2 40,10 58,3 76,9 96,4 94,30 98,54 78,50 60,57 40,52 20,58 2,50 6,28"
            fill="var(--violet)" opacity="0.55"
          />
        </svg>
      </div>
      <div className="hero-doodle hd-clip" data-depth="0.6">
        <svg viewBox="0 0 40 80">
          <path
            d="M28 14 C28 7 22 2 15 2 C8 2 2 7 2 14 L2 55 C2 65 10 73 20 73 C30 73 38 65 38 55 L38 20"
            fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
          />
        </svg>
      </div>
      <div className="hero-doodle hd-stamp" data-depth="0.3">
        <svg viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="38" fill="none" stroke="var(--coral)" strokeWidth="3" strokeDasharray="4 6" opacity="0.6" />
        </svg>
      </div>
      <div className="hero-doodle hd-x1" data-depth="0.8">
        <svg viewBox="0 0 30 30">
          <g stroke="var(--pink)" strokeWidth="3" strokeLinecap="round" opacity="0.75">
            <line x1="4" y1="4" x2="26" y2="26" /><line x1="26" y1="4" x2="4" y2="26" />
          </g>
        </svg>
      </div>
      <div className="hero-doodle hd-x2" data-depth="0.5">
        <svg viewBox="0 0 30 30">
          <g stroke="var(--pink)" strokeWidth="3" strokeLinecap="round" opacity="0.7">
            <line x1="4" y1="4" x2="26" y2="26" /><line x1="26" y1="4" x2="4" y2="26" />
          </g>
        </svg>
      </div>

      <div id="cursor-box"><span className="cb-text" id="cb-text"></span></div>

      <div id="hero-tags">
        <span id="tag-designer"></span><span className="dot">&amp;</span>
        <span id="tag-developer"><span className="tw-text"></span><span className="tw-caret"></span></span>
      </div>

      <h1 id="hero-name"></h1>

      <div id="hero-sub">
        <span id="sub-coding"><span className="tw-text"></span><span className="tw-caret"></span></span> and{' '}
        <span id="sub-crafting"></span> things that feel{' '}
        <span
          style={{
            color: 'var(--ink)', backgroundColor: 'var(--mustard)', padding: '0 6px',
            borderRadius: '2px', display: 'inline-block', transform: 'rotate(-1.5deg)',
          }}
        >
          alive!
        </span>
      </div>

      <div className="scroll-cue"><div className="line"></div><span>scroll</span></div>
    </section>
  );
}
