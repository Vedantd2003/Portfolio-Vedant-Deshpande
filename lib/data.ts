export const personal = {
  name: "Vedant Deshpande",
  role: "Full-Stack AI Developer",
  tagline: "Designing intelligent experiences, not just interfaces.",
  bio: "B.Tech Electronics Engineering graduate (MIT Academy of Engineering, 2025) with hands-on experience building production-ready SaaS platforms. I combine MERN stack mastery with LLM integration to craft products that feel intelligent and look premium.",
  email: "vdeshpande674@gmail.com",
  phone: "7447597900",
  location: "Alandi, Pune",
  linkedin: "https://linkedin.com/in/vedant-deshpande-a19426221",
  github: "https://github.com/Vedantd2003",
  resumeUrl: "/Vedant_Deshpande_ATS_1Page.pdf",
};

export const roles = [
  "Full-Stack AI Developer",
  "MERN Stack Engineer",
  "LLM Integration Specialist",
  "SaaS Builder",
  "3D WebGL Creator",
];

export const projects = [
  {
    id: 1,
    title: "Nebula AI Studio",
    subtitle: "Enterprise AI Content SaaS",
    description:
      "Full-stack MERN SaaS with Gemini AI integration supporting 5+ content types — generation, analysis, and summarization — with JWT-secured 3-tier access control and per-user API usage tracking.",
    tags: ["MERN", "Gemini AI", "JWT", "MongoDB", "Express"],
    github: "https://github.com/Vedantd2003/Nebula-AI",
    demo: null,
    color: "from-violet-600 to-indigo-600",
    glow: "rgba(139,92,246,0.4)",
    icon: "🌌",
    highlights: [
      "5+ AI content types",
      "3-tier JWT access control",
      "Per-user API usage tracking",
    ],
  },
  {
    id: 2,
    title: "BrandGenome AI",
    subtitle: "Branding SaaS Platform",
    description:
      "GPT-4-powered SaaS generating 10+ brand identity attributes with a stunning 3D DNA Helix visualization built with React Three Fiber delivering 60fps WebGL performance.",
    tags: ["MERN", "OpenAI GPT-4", "Three.js", "React Three Fiber"],
    github: "https://github.com/Vedantd2003/brandgenome-ai",
    demo: null,
    color: "from-blue-600 to-cyan-600",
    glow: "rgba(59,130,246,0.4)",
    icon: "🧬",
    highlights: [
      "10+ brand identity attributes",
      "3D DNA Helix visualization",
      "60fps WebGL performance",
    ],
  },
  {
    id: 3,
    title: "AI Resume Copilot",
    subtitle: "Interview & Job Prep Platform",
    description:
      "AI platform for resume analysis, JD keyword matching, and cover letter generation. Reduced manual job-prep effort by ~80% with a 3D virtual interview room and voice synthesis via Vapi AI.",
    tags: ["Next.js", "OpenAI", "Gemini", "Vapi AI", "MongoDB"],
    github: null,
    demo: "https://ai-copilot-resume-analyzer.onrender.com",
    color: "from-emerald-600 to-teal-600",
    glow: "rgba(16,185,129,0.4)",
    icon: "📄",
    highlights: [
      "~80% reduction in job-prep effort",
      "JD keyword matching",
      "Voice synthesis + 3D interview room",
    ],
    featured: true,
  },
  {
    id: 4,
    title: "AIAssis",
    subtitle: "AI Mock Interview Platform",
    description:
      "Voice-first interview simulator built with Next.js and Vapi AI. Features Zod schema validation and async state management achieving 99%+ transcript accuracy.",
    tags: ["Next.js", "Vapi AI", "Zod", "TypeScript"],
    github: "https://github.com/Vedantd2003/AI-Interview-Assistant",
    demo: null,
    color: "from-orange-600 to-red-600",
    glow: "rgba(249,115,22,0.4)",
    icon: "🎙️",
    highlights: [
      "99%+ transcript accuracy",
      "Voice-first UI",
      "Zod schema validation",
    ],
  },
  {
    id: 5,
    title: "3D Apple Vision Page",
    subtitle: "Immersive Product Landing",
    description:
      "Interactive 3D product landing page with scroll-based depth effects at 60fps, GSAP micro-interactions, and Apple-style minimal UI built with Three.js and Locomotive Scroll.",
    tags: ["Three.js", "GSAP", "Locomotive Scroll", "JavaScript"],
    github: null,
    demo: "https://applevision-webvedant.vercel.app",
    color: "from-gray-600 to-slate-600",
    glow: "rgba(100,116,139,0.4)",
    icon: "🥽",
    highlights: [
      "60fps scroll animations",
      "GSAP micro-interactions",
      "Apple-inspired minimal UI",
    ],
  },
];

export const featuredProject = projects.find((p) => p.featured)!;

export const skills = {
  "Frontend & 3D": [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 92 },
    { name: "TypeScript", level: 88 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Three.js", level: 85 },
    { name: "GSAP", level: 80 },
    { name: "Framer Motion", level: 85 },
  ],
  "Backend & Database": [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 90 },
    { name: "MongoDB", level: 88 },
    { name: "Firebase", level: 82 },
    { name: "REST APIs", level: 92 },
    { name: "MVC Architecture", level: 88 },
  ],
  "AI & LLM": [
    { name: "OpenAI GPT-4", level: 90 },
    { name: "Google Gemini", level: 88 },
    { name: "Vapi AI", level: 82 },
    { name: "Prompt Engineering", level: 90 },
    { name: "LLM Integration", level: 88 },
  ],
  "Security & DevOps": [
    { name: "JWT / OAuth 2.0", level: 85 },
    { name: "Docker", level: 78 },
    { name: "Git / CI/CD", level: 88 },
    { name: "Zod", level: 85 },
    { name: "Bcrypt", level: 82 },
  ],
};

export const skillBadges = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Three.js",
  "GSAP",
  "Framer Motion",
  "OpenAI GPT-4",
  "Google Gemini",
  "Vapi AI",
  "Tailwind CSS",
  "JWT",
  "OAuth 2.0",
  "Docker",
  "Firebase",
  "REST APIs",
  "Git",
  "Zod",
  "Prompt Engineering",
];

export const focusAreas = [
  {
    title: "AI & LLM Integration",
    description:
      "Building production-ready applications powered by GPT-4, Gemini, and custom AI pipelines.",
    icon: "🤖",
  },
  {
    title: "3D & Interactive UI",
    description:
      "Crafting immersive WebGL experiences with Three.js and React Three Fiber at 60fps.",
    icon: "🌐",
  },
  {
    title: "SaaS Architecture",
    description:
      "Designing scalable multi-tier platforms with robust auth, billing, and user management.",
    icon: "🚀",
  },
];

export const experience = [
  {
    company: "J.P. Morgan",
    role: "Software Engineering Virtual Experience",
    period: "2026",
    via: "Forage",
    highlights: [
      "Financial data analysis",
      "Backend interface development",
      "Data visualization",
    ],
  },
  {
    company: "Deloitte",
    role: "Software Engineering Virtual Internship",
    period: "2026",
    via: "Forage",
    highlights: [
      "Full SDLC exposure",
      "Coding & debugging tasks",
      "Data analysis workflows",
    ],
  },
];

export const certifications = [
  "UI/UX Design — SimpliLearn",
  "Frontend Domination — Sheriyans Coding School",
  "Delta MERN Stack — Apna College",
];
