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
  // TODO: add the actual resume PDF to public/ before wiring this into a
  // "Download Resume" button — there is currently no public/ directory and
  // this path 404s. Not yet referenced by any component.
  resumeUrl: "/Vedant_Deshpande_ATS_1Page.pdf",
};

export const roles = [
  "Full-Stack AI Developer",
  "MERN Stack Engineer",
  "LLM Integration Specialist",
  "SaaS Builder",
  "3D WebGL Creator",
];

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  /** Optional preview image under public/ */
  image?: string;
  color: string;
  glow: string;
  icon: string;
  highlights: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 8,
    title: "AlphaPulse AI",
    subtitle: "Evidence-Backed AI Investment Research",
    description:
      "AI research platform for US equities: ask a question about a company and it pulls live quotes, Finnhub news and SEC EDGAR filings, then Gemini writes a structured research note. Every claim the model attributes to a source is checked against that source's stored text — anything it can't back up is marked unverified. Includes watchlists, price alerts, a hypothetical Portfolio Lab and an animated dashboard built only from real data.",
    tags: ["Next.js", "TypeScript", "Express", "MongoDB", "Gemini", "Finnhub", "SEC EDGAR"],
    github: "https://github.com/Vedantd2003/AI-dashboard-Main/tree/alphapulse-ai",
    demo: "https://alphapulse-web.onrender.com/",
    image: "/projects/alphapulse-ai.webp",
    color: "from-teal-500 to-cyan-600",
    glow: "rgba(31,158,150,0.4)",
    icon: "📈",
    highlights: [
      "Citations verified against source text",
      "Background research runs with live progress",
      "Provider fallback + live self-test",
    ],
  },
  {
    id: 7,
    title: "KagazBol",
    subtitle: "Talk to any Indian Document",
    description:
      "Photograph any Indian document — electricity bill, prescription, bank notice, government form — and get an instant structured summary card, a 2-line spoken summary, and grounded voice Q&A. Powered by Sarvam AI's OCR, summarization, and codemix speech models, with full support for English, Hindi, and Marathi.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Sarvam AI"],
    github: "https://github.com/Vedantd2003/kagazbol",
    demo: "https://kagazbol.onrender.com",
    color: "from-amber-600 to-orange-600",
    glow: "rgba(245,158,11,0.4)",
    icon: "📄",
    highlights: [
      "OCR for Devanagari + mixed scripts",
      "Voice Q&A grounded in the document",
      "English, Hindi & Marathi support",
    ],
  },
  {
    id: 6,
    title: "NeuralVault",
    subtitle: "Self-Improving RAG Platform",
    description:
      "Full-stack RAG platform where users upload documents (PDF, DOCX, HTML, Markdown) into a personal knowledge base and ask questions with real-time streamed answers. The system self-evaluates every response (RAGAS-style faithfulness, relevance, context precision) and runs nightly self-improvement jobs to flag low-quality answers for review.",
    tags: ["Next.js", "Express", "MongoDB", "Redis", "OpenRouter", "Bull"],
    github: "https://github.com/Vedantd2003/neural-vault",
    demo: "https://neural-vault-frontend.onrender.com",
    color: "from-blue-600 to-violet-600",
    glow: "rgba(59,130,246,0.4)",
    icon: "🧠",
    highlights: [
      "Self-evaluating RAG pipeline",
      "Real-time streamed answers via SSE",
      "Nightly self-improvement jobs",
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
