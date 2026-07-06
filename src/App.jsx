import React, { useRef, useState } from 'react';
import LightTheme from './theme-light/LightTheme.jsx';
import DarkTheme from './theme-dark/DarkTheme.jsx';

/* =====================================================================
   EDIT YOUR TEXT CONTENT HERE — ONE PLACE, BOTH THEMES
   Both theme components (src/theme-light/ and src/theme-dark/) receive
   this object as their `site` prop. Change a value below and it updates
   on both themes automatically.
   ===================================================================== */
const SITE_CONTENT = {
  name: 'JAYA VARDHAN',            // big hero name
  roleDesigner: 'Visual Designer', // handwritten tag before the &
  roleDeveloper: ' Web Developer', // typewriter tag after the &
  subCrafting: 'crafting',         // hero subline cursive word
  subCoding: 'coding',             // hero subline typewriter word
  aboutName: 'Jaya Vardhan',       // name in the About section
  email: 'hello@jayavardhan.dev',  // contact email (also used as link)
  footerName: '© 2026 Jaya Vardhan', // footer line
};

const HINT_DARK_MODE = '☀️ Let there be light';
const HINT_LIGHT_MODE = '🌙 Let there be night';

export default function App() {
  // Both themes are real, always-mounted React components now (neither
  // is an iframe any more) — each exposes { scrollToSection(id), element }
  // via useImperativeHandle in LightTheme.jsx / DarkTheme.jsx.
  const lightThemeRef = useRef(null);
  const darkThemeRef = useRef(null);
  const currentSectionRef = useRef('hero');

  const [hintShown, setHintShown] = useState(false);
  const [hintText, setHintText] = useState(HINT_DARK_MODE); // dark is default

  function handleHeroReady() {
    setHintShown(true);
  }
  function handleSectionChange(sectionId) {
    currentSectionRef.current = sectionId;
  }

  function handleToggle(e) {
    const goingDark = e.target.checked;
    setHintText(goingDark ? HINT_DARK_MODE : HINT_LIGHT_MODE);

    const lightEl = lightThemeRef.current && lightThemeRef.current.element;
    const darkEl = darkThemeRef.current && darkThemeRef.current.element;
    const fromEl = goingDark ? lightEl : darkEl; // was visible
    const toEl = goingDark ? darkEl : lightEl;   // becoming visible
    const toRef = goingDark ? darkThemeRef.current : lightThemeRef.current;

    // ask the incoming theme to jump to the same section while it's
    // still hidden, then reveal it a beat later so there's no visible jump
    if (toRef) toRef.scrollToSection(currentSectionRef.current);

    setTimeout(() => {
      toEl.classList.add('is-visible');
      toEl.classList.remove('is-hidden');
      fromEl.classList.add('is-hidden');
      fromEl.classList.remove('is-visible');
    }, 30);
  }

  return (
    <>
      <div className="toggle-wrap" title="Toggle day / night portfolio">
        <span className={`toggle-hint${hintShown ? ' is-shown' : ''}`}>{hintText}</span>

        {/* From Uiverse.io by RiccardoRapelli */}
        <label className="switch">
          <input id="input" type="checkbox" defaultChecked onChange={handleToggle} />
          <div className="slider round">
            <div className="sun-moon">
              <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
            </div>
            <div className="stars">
              <svg id="star-1" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-2" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-3" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-4" className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
            </div>
          </div>
        </label>
      </div>

      {/* Both themes are mounted once and stay in the DOM — toggling
          only swaps visibility (imperatively, via ref.element.classList),
          so nothing re-renders, reloads, or loses its scroll position. */}
      <LightTheme
        ref={lightThemeRef}
        site={SITE_CONTENT}
        className="theme-frame is-hidden"
        onHeroReady={handleHeroReady}
        onSectionChange={handleSectionChange}
      />
      <DarkTheme
        ref={darkThemeRef}
        site={SITE_CONTENT}
        className="theme-frame is-visible"
        onHeroReady={handleHeroReady}
        onSectionChange={handleSectionChange}
      />
    </>
  );
}
