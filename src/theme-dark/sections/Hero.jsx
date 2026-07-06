import React from 'react';

/* Just like the light theme's Hero: the text inside #hero-name,
   #tag-designer, #tag-developer, #sub-crafting, #sub-coding and
   #cb-text is filled in imperatively by useDarkThemeEffects (it drives
   the GSAP "chaos -> order" letter animation, the handwriting stagger,
   and the typewriter reveal) — so those elements are intentionally
   left empty here, exactly like the original static markup before its
   script ran. */
export default function Hero() {
  return (
    <section id="hero">
      <div className="orb" id="orb1" style={{ width: '480px', height: '480px', background: 'var(--violet)', top: '10%', left: '8%' }}></div>
      <div className="orb" id="orb2" style={{ width: '380px', height: '380px', background: 'var(--cyan)', bottom: '6%', right: '10%' }}></div>
      <div className="orb" id="orb3" style={{ width: '300px', height: '300px', background: 'var(--magenta)', top: '50%', left: '60%' }}></div>

      <div id="cursor-box"><span className="cb-text" id="cb-text"></span></div>

      <div id="hero-tags">
        <span id="tag-designer"></span><span className="dot">&amp;</span>
        <span id="tag-developer"><span className="tw-text"></span><span className="tw-caret"></span></span>
      </div>

      <h1 id="hero-name"></h1>

      <div id="hero-sub">
        <span id="sub-coding"><span className="tw-text"></span><span className="tw-caret"></span></span> and{' '}
        <span id="sub-crafting"></span> things that feel{' '}
        <span style={{ color: 'black', backgroundColor: 'var(--cyan)', padding: '0 4px', borderRadius: '4px' }}>
          alive!
        </span>
      </div>

      <div className="scroll-cue"><div className="line"></div><span>scroll</span></div>
    </section>
  );
}
