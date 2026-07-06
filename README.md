# Jaya Vardhan — Portfolio (React)

This is the fully-React version of the toggleable portfolio. **Both
themes are now real React component trees** — there are no more
iframes and no more static HTML files in `public/` (that folder no
longer exists).

- `src/App.jsx` is the toggle page: the day/night switch, the crafty
  hint text, dark-mode-as-default, and the logic that keeps both
  themes scrolled to the same section when you flip the switch.
- `src/index.css` holds the toggle switch styling and the fixed/fade
  CSS shared by both themes.
- `src/theme-light/` — the "Light Craft" theme (was `theme-light.html`).
- `src/theme-dark/` — the dark theme (was `theme-dark.html`).
- `src/lib/loadGsap.js` — a tiny shared utility both themes use to load
  GSAP + ScrollTrigger from the CDN once.

The two theme folders are **direct mirrors of each other** — same file
names, same component structure, same animation-engine architecture —
just with each theme's own colors, copy, and a few cosmetic differences
(the light theme parallaxes hand-drawn doodles and confetti-shaped
particles; the dark theme parallaxes three glow orbs and circular
particles), exactly matching what the two original static pages did.

## Each theme's folder

```
src/theme-<name>/
├─ <Name>Theme.jsx             root component: mounts every section,
│                              runs the effects hook, exposes
│                              scrollToSection(id) for the toggle
├─ <name>Theme.css             all of the theme's CSS (ported as-is,
│                              scoped under .theme-<name>-root)
├─ content.js                  all editable copy: experience, projects,
│                              achievements, certifications, education,
│                              skills, ribbon words, socials, etc.
├─ hooks/
│  └─ use<Name>ThemeEffects.js the animation engine: hero letter
│                              "chaos → order", handwriting + typewriter
│                              tags, the hero cursor message box, the
│                              slot-wheel section dial, scroll reveals,
│                              project parallax, the background canvas,
│                              and the glow-cursor parallax
└─ sections/
   ├─ BackgroundLayer.jsx      paper grain/noise, glow cursor, canvas, dial
   ├─ Hero.jsx
   ├─ Manifesto.jsx
   ├─ Experience.jsx
   ├─ Work.jsx                 "Selected Work" + the 4 project cards
   ├─ SkillsRibbon.jsx          the scrolling marquee (pure CSS)
   ├─ AchieveCert.jsx
   ├─ EduSkills.jsx
   ├─ About.jsx
   ├─ Contact.jsx
   └─ Footer.jsx
```

Each theme's `content.js` is its own independent file (not shared
between themes), on purpose — exactly like when they were two separate
static HTML files, editing one theme's copy never risks touching the
other's.

### How the animations were ported

The original files did a lot of direct DOM work (building the hero
letters, the handwriting/typewriter tags, the dial's slot items) rather
than describing them as static markup. Each `use<Name>ThemeEffects.js`
keeps that same imperative approach — it's the most faithful way to
carry over timing-sensitive GSAP sequences — but everything now runs
against a React-owned container instead of a whole separate document:

| Original (iframe/document) | Now (React component) |
|---|---|
| `document.getElementById(...)` | `root.querySelector(...)` |
| `window.scrollY` / `innerHeight` | the container's own `scrollTop` / `clientHeight` |
| `window.parent.postMessage(...)` | `onHeroReady()` / `onSectionChange()` props |
| ScrollTrigger's default window scroller | `scroller: root` on every ScrollTrigger |

Each theme renders as a full-viewport, independently scrollable layer
(`.theme-light-root` / `.theme-dark-root`) — the same footprint the old
`<iframe>`s had — so `App.jsx` shows/hides them exactly the way it
showed/hid the iframes, and the toggle's "land on the same section"
behavior works via an imperative `scrollToSection(id)` instead of
`postMessage`.

**A correctness note on the CSS:** the two original files reused a lot
of the same class/id names (`.project`, `.reveal`, `#hero-name`, etc.)
because they were always meant to be two totally separate documents.
Now that both themes are real components sharing one document, every
selector in both CSS files is scoped under that theme's own root class
(`.theme-light-root ...` / `.theme-dark-root ...`) so the two
stylesheets can never bleed into each other — including each theme's
own color variables, which used to sit on the global `:root` and are
now scoped the same way.

**A correctness note on React StrictMode:** `main.jsx` wraps the app in
`<React.StrictMode>`, which intentionally fires every effect twice in
development (mount → cleanup → mount) to catch bugs. Both animation
hooks guard against this with a one-time-init flag on the container
element, and their cleanup functions are deliberately no-ops in normal
use — earlier drafts didn't do this and it silently prevented the
GSAP setup from ever running in dev mode. If you ever add more
`useEffect`s to these files, keep that pattern in mind.

GSAP + ScrollTrigger are loaded from the same CDN build the static
pages used (see `src/lib/loadGsap.js`) rather than added as an npm
dependency, so nothing else about your install/build steps changes.

## What to install

You need **Node.js 18 or newer** (which includes `npm`).

- Check if you already have it: open a terminal and run `node -v`.
- If not installed, download it from https://nodejs.org (choose the
  LTS version) and install it like any normal application.

You don't need to install React, Vite, GSAP, etc. globally — the npm
packages are listed as project dependencies, and GSAP itself loads
from a CDN at runtime, just like the original static pages did.

## How to run it

1. Open a terminal in this project folder (the one with `package.json`).
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`) in your
   browser.

That's it — you'll get live-reload while you edit anything under `src/`.

## Editing your text

- **Shared between both themes** (name, roles, email, footer line):
  open `src/App.jsx` and look at the `SITE_CONTENT` object near the top.
- **Light theme only**: `src/theme-light/content.js`.
- **Dark theme only**: `src/theme-dark/content.js`.

Every list in those files is a plain array of objects, so
adding/removing/reordering an entry is just editing that array.

## Building for production

```
npm run build
```

This produces a `dist/` folder with a static, deployable version of the
whole site. You can preview that build locally with:

```
npm run preview
```
