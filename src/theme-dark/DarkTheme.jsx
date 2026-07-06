import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import './darkTheme.css';
import { useDarkThemeEffects } from './hooks/useDarkThemeEffects.js';

import BackgroundLayer from './sections/BackgroundLayer.jsx';
import Hero from './sections/Hero.jsx';
import Manifesto from './sections/Manifesto.jsx';
import Experience from './sections/Experience.jsx';
import Work from './sections/Work.jsx';
import SkillsRibbon from './sections/SkillsRibbon.jsx';
import AchieveCert from './sections/AchieveCert.jsx';
import EduSkills from './sections/EduSkills.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

/* The dark portfolio, rebuilt as React components from the original
   public/theme-dark.html — a direct mirror of src/theme-light/LightTheme.jsx.
   It renders as a full-viewport, independently-scrollable layer, so
   App.jsx can show/hide it exactly the way it showed/hid the iframe.

   Ref API (used by App.jsx when the toggle switches themes):
     scrollToSection(id) — jump this theme's own scroll position to a
     section, without any visible animation, so the section you were
     reading stays lined up when you flip back and forth. */
const DarkTheme = forwardRef(function DarkTheme({ site, className = '', onHeroReady, onSectionChange }, ref) {
  const rootRef = useRef(null);

  useDarkThemeEffects(rootRef, { site, onHeroReady, onSectionChange });

  useImperativeHandle(ref, () => ({
    scrollToSection(id) {
      const root = rootRef.current;
      const target = root && root.querySelector(`#${id}`);
      if (root && target) root.scrollTop = target.offsetTop;
    },
    // lets App.jsx toggle is-visible/is-hidden on the same element it
    // used to toggle directly on the <iframe>
    get element() { return rootRef.current; },
  }), []);

  return (
    <div ref={rootRef} id="theme-dark" className={`theme-dark-root ${className}`.trim()}>
      <BackgroundLayer />

      <Hero />
      <Manifesto />
      <Experience />
      <Work />
      <SkillsRibbon />
      <AchieveCert />
      <EduSkills />
      <About site={site} />
      <Contact site={site} />
      <Footer site={site} />
    </div>
  );
});

export default DarkTheme;
