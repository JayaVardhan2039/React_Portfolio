/* =====================================================================
   DARK THEME — CONTENT
   Mirrors src/theme-light/content.js. Kept as its own independent file
   (rather than importing from the light theme) so editing one theme's
   copy never risks affecting the other — same as when both themes were
   separate static HTML files.
   ===================================================================== */

export const DIAL_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'manifesto', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'work-intro', label: 'Projects' },
  { id: 'achieve-cert', label: 'Achievements' },
  { id: 'edu-skills', label: 'Education' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const MANIFESTO = {
  lead: "I              ",
  beleive:"believe",
  lead2:"           every challenge        is an opportunity to",
  right:"learn,     grow,          and        create a",
  highlight: 'story',
  tail: ' worth telling',
  meta: [
    { label: 'My focus', value: 'Design + Code' },
    { label: 'based in', value: 'Vizag' },
    { label: 'Open', value: 'To work' },
  ],
};

export const EXPERIENCE_ITEMS = [
  {
    when: '2025 — Now',
    title: 'Senior Product Designer / Dev',
    company: 'Nightshade Studio · Remote',
    desc: 'Leading design + frontend for client products end to end — from the first wireframe to the shipped, animated interface.',
    alt: false,
  },
  {
    when: '2023 — 2025',
    title: 'Frontend Engineer',
    company: 'Aurora Labs · Bengaluru',
    desc: 'Built and maintained the core design system used across four production apps, cutting new-feature build time by a third.',
    alt: true,
  },
  {
    when: '2021 — 2023',
    title: 'UI/UX Designer',
    company: 'Freelance',
    desc: 'Designed brand identities and product interfaces for early-stage startups, several of which went on to raise seed funding.',
    alt: false,
  },
];

/* Dark theme renders each project's visual as an inline gradient (using
   this theme's own CSS variables) rather than a class like the light
   theme's .pv-1..pv-4 — kept here, one string per project, so it's
   still all in one editable place. */
export const PROJECTS = [
  {
    num: '01',
    visualStyle: 'radial-gradient(circle at 30% 30%, var(--violet), transparent 70%), conic-gradient(from 90deg, var(--cyan), var(--violet), var(--magenta), var(--cyan))',
    tag: 'Product design',
    title: 'Aurora — Finance App Redesign',
    desc: 'A ground-up redesign of a personal finance app, turning a spreadsheet-grade tool into something people actually want to open every morning.',
    stack: ['Figma', 'Framer', 'Design Systems'],
  },
  {
    num: '02',
    visualStyle: 'radial-gradient(circle at 60% 40%, var(--cyan), transparent 70%), conic-gradient(from 200deg, var(--lime), var(--cyan), var(--violet))',
    tag: 'Web development',
    title: 'Pulse — Realtime Dashboard',
    desc: 'A WebSocket-driven analytics dashboard built for speed under pressure — sub-100ms updates across thousands of concurrent data points.',
    stack: ['React', 'Node.js', 'WebSockets'],
  },
  {
    num: '03',
    visualStyle: 'radial-gradient(circle at 40% 60%, var(--magenta), transparent 70%), conic-gradient(from 30deg, var(--violet), var(--magenta), var(--cyan))',
    tag: 'Branding',
    title: 'Nocturne — Identity System',
    desc: 'A full visual identity for a late-night audio brand — wordmark, motion logo, and a generative pattern system built to never repeat twice.',
    stack: ['Illustration', 'Motion', 'Brand Strategy'],
  },
  {
    num: '04',
    visualStyle: 'radial-gradient(circle at 50% 50%, var(--lime), transparent 70%), conic-gradient(from 120deg, var(--cyan), var(--lime), var(--violet))',
    tag: 'Creative coding',
    title: 'Drift — Generative Art Engine',
    desc: 'A browser-based generative art tool letting users sculpt particle fields in real time, exported as shareable looping animations.',
    stack: ['Three.js', 'GLSL', 'Canvas API'],
  },
];

export const RIBBON_WORDS = ['UI/UX DESIGN', 'FRONTEND DEV', 'BRANDING', 'MOTION'];

export const ACHIEVEMENTS = [
  { title: 'Awwwards — Site of the Day', subtitle: 'Aurora finance app redesign, 2025' },
  { title: 'Top 10 Finalist', subtitle: 'Generative Art Hackathon, 2024' },
  { title: 'Featured Creator', subtitle: 'CSS Design Awards showcase, 2023' },
];

export const CERTIFICATIONS = [
  { title: 'Advanced React & Frontend Architecture', subtitle: 'Frontend Masters, 2024' },
  { title: 'Google UX Design Certificate', subtitle: 'Coursera, 2022' },
  { title: 'Motion Design for the Web', subtitle: 'School of Motion, 2023' },
];

export const EDUCATION = {
  years: '2018 — 2022',
  degree: 'B.Tech, Computer Science',
  school: 'Andhra Pradesh, India',
};

export const SKILLS = [
  'Figma', 'Framer', 'React', 'JavaScript', 'GSAP', 'Three.js',
  'Node.js', 'WebGL / GLSL', 'Design Systems', 'Motion Design',
  'Brand Identity', 'Illustration',
];

export const ABOUT_PARAGRAPHS = [
  "I work at the intersection of design and code — close enough to the pixels to obsess over a 2px shadow, and close enough to the engine to know what it costs to render it.",
  'My process starts with a feeling, not a feature list. Every project here began as a single image in my head before it became a file.',
];

export const ABOUT_STATS = [
  { value: '20+', label: 'Projects shipped' },
  { value: '4+', label: 'Years building' },
  { value: '∞', label: 'Cups of coffee' },
];

export const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
];
