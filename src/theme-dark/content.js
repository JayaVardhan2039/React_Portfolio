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
  tail: ' worth telling.',
  meta: [
    { label: 'My focus', value: 'Design + Code' },
    { label: 'based in', value: 'Vizag' },
    { label: 'Open', value: 'To work' },
  ],
};

export const EXPERIENCE_ITEMS = [
  {
    when: 'September  2025 — June 2026',
    title: 'Associate Software Engineer',
    company: 'Infinite Computer Solutions · Visakhapatnam, India',
    desc: 'Worked in the healthcare domain supporting modules for identity and access operations, handling access provisioning through SailPoint for user onboarding, updates, and compliance, and coordinating with cross-functional teams to resolve issues and keep system performance consistent.',
    alt: false,
  },
  {
    when: 'June 2025 — August 2025',
    title: 'Developer Trainee',
    company: 'Infinite Computer Solutions · Visakhapatnam, India',
    desc: 'Completed structured training in C#, MySQL, and the .NET framework, building a solid foundation in backend development and database-driven systems.',
    alt: true,
  },
  {
    when: 'Summer 2024',
    title: 'Open Source Contributor',
    company: 'GirlScript Summer of Code (GSSoC)',
    desc: 'Contributed to open-source projects as part of GSSoC, collaborating with a distributed community of contributors and maintainers on real-world codebases.',
    alt: false,
  },
  {
    when: 'Summer 2023',
    title: 'Software Development Intern',
    company: 'MKTechnologies',
    desc: 'Conceptualized and built a scalable e-commerce platform using the MERN stack, integrating secure authentication APIs and reducing page load times by 60% through optimized data fetching.',
    alt: true,
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
    tag: 'Web development',
    title: 'Mr.Parker-SaaS Vehicle Parking Management System',
    desc: 'A vehicle parking management system enabling remote reservations and returns with live geolocation tracking (2km accuracy) via the Google Maps API and GeoJSON data structures, with secure session handling through JWT token blacklisting that cut unauthorized access by 95% compared to localStorage approaches. Integrated real-time vehicle tracking with existing fleet management software, reducing manual data entry by 40 hours a month.',
    stack: ['MERN Stack', 'Geolocation API', 'JWT', 'WebSockets'],
    images: ['mrparker1', 'mrparker2', 'mrparker3', 'mrparker4', 'mrparker5', 'mrparker6'],
    href: 'https://github.com/JayaVardhan2039/Mr.Parker',
  },
  {
    num: '02',
    visualStyle: 'radial-gradient(circle at 60% 40%, var(--cyan), transparent 70%), conic-gradient(from 200deg, var(--lime), var(--cyan), var(--violet))',
    tag: 'Machine learning',
    title: 'XAI Intrusion Detection System',
    desc: 'An ML-based security system detecting 23 network attack types — including DDoS, port scanning, and SQL injection — using a PCA-optimized Random Forest classifier achieving 99.47% accuracy, which won a hackathon. Integrated XAI techniques (LIME/SHAP) for attack pattern visualization, improving model interpretability by 40% through feature importance analysis, and deployed a local Ollama-powered chatbot for natural language threat queries with automated attack pattern explanations.',
    stack: ['Python', 'Scikit-learn', 'Flask', 'SHAP / LIME'],
    images: ['intrusion1', 'intrusion2', 'intrusion3', 'intrusion4'],
    href: 'https://github.com/JayaVardhan2039/Intrusion-Detection-System',
  },
  {
    num: '03',
    visualStyle: 'radial-gradient(circle at 40% 60%, var(--magenta), transparent 70%), conic-gradient(from 30deg, var(--violet), var(--magenta), var(--cyan))',
    tag: 'Web development',
    title: 'Dev Finds',
    desc: 'A full-stack platform for programming students to share multimedia work experiences, boosting engagement by 70% through real-time interactions — likes, comments, chat — using Socket.io, with JWT and Google OAuth authentication and session management via cookies and local storage.',
    stack: ['React', 'Node.js', 'Express.js', 'Socket.io'],
    images: ['devfinds'],
    href: 'https://github.com/JayaVardhan2039/DevFinds',
  },
];

export const RIBBON_WORDS = ['UI/UX DESIGN', 'FRONTEND DEV', 'BRANDING', 'ARCHITECTURE'];

export const ACHIEVEMENTS = [
  { title: 'VIIT CODER 2022', subtitle: 'Runner-up' },
  { title: 'SusHacks 2025', subtitle: 'Nation-wide inter-college hackathon by Google Developer Group and AlgoZenith · Won ₹4,000' },
  { title: 'Solving for India', subtitle: 'Hackathon by GeeksforGeeks · Won ₹800 worth of vouchers' },
  { title: 'GATE 2024 & 2025', subtitle: 'Qualified in two papers (DA and CS) · AIR 7031' },
];

export const CERTIFICATIONS = [
  {title: 'Oracle Cloud Infrastructure Certified Architect Associate', subtitle: 'Oracle'},
  { title: 'Problem Solving-Intermediate', subtitle: 'HackerRank' },
  { title: 'JavaScript and Python and Data Analytics', subtitle: 'Cisco' },
  { title: 'CCNA:Cybersecurity', subtitle: 'Cisco' },
  { title: 'The Complete Web Development Bootcamp', subtitle: 'Udemy' },
  { title: 'NoSQL', subtitle: 'edX' },
];

export const EDUCATION = [
  {
    years: 'Nov. 2021 — 2025',
    degree: 'Bachelor of Technology in Computer Science',
    school: "Vignan's Institute Of Information and Technology, Visakhapatnam, Andhra Pradesh",
    detail: 'Cum. GPA: 9.04',
  },
  {
    years: '2019 — 2021',
    degree: 'PCM',
    school: 'Narayana Jr. College, Old Gajuwaka, Andhra Pradesh',
    detail: 'Percentage: 95.8%',
  },
  {
    years: '2012 — 2019',
    degree: 'CBSE',
    school: 'D.A.V Centenary Public School, Ukkunagaram, Andhra Pradesh',
    detail: 'Percentile: 92.4%',
  },
];

export const SKILLS = [
  // Programming Languages
  'C++',
  'Python',
  'C#',
  'SQL',

  // Libraries / Frameworks
  '.NET Framework',
  'HTML',
  'CSS',
  'JavaScript',
  'Bootstrap',
  'React JS',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'API Development',

  // Developer Tools
  'VS Code',
  'Visual Studio',
  'Figma',
  'Git',

  // Databases
  'MySQL',
  'MongoDB',

  // Miscellaneous
  'DSA',
  'LaTeX',
  'Machine Learning',
  'Data Analysis',
  'Statistical Modelling',
  'Identity Workflows',
  'SailPoint',
  'Access Provisioning'
];

export const ABOUT_PARAGRAPHS = [
  "I like figuring out how things work, both how they look and how they're built. I'm still early in this, so I spend a lot of time learning by actually building things, not just reading about them.",
  "I don't have a big process. I try something, it breaks, I fix it, and slowly it turns into something I'm proud of.",
];

export const ABOUT_STATS = [
  { value: '1+', label: 'Years learning & building' },
  { value: '12+', label: 'Things I\'ve built & contributed' },
  { value: '∞', label: 'Smiles along the wayy' },
];

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/jayavardhan.jv/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaya-vardhan-govvada/' },
  { label: 'GitHub', href: 'https://github.com/JayaVardhan2039' },
];
