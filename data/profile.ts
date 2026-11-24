export const SITE_URL = "https://portfolio-vedant-deshpande.onrender.com";

export const profile = {
  name: "Vedant Deshpande",
  firstName: "Vedant",
  lastName: "Deshpande",
  headline: "AI Developer & AI Visual Storyteller",
  location: "Pune, India",
  email: "vdeshpande674@gmail.com",
  linkedin: "https://www.linkedin.com/in/vedant-deshpande-a19426221/",
  github: "https://github.com/Vedantd2003",
  resume: "/Vedant_Deshpande_Resume.pdf",
  education: {
    degree: "B.Tech, Electronics Engineering",
    school: "MIT Academy of Engineering, Pune",
    year: "2025",
    period: "Jul 2021 – Jul 2025",
    coursework: "CS-equivalent coursework: DSA, OOP, DBMS & SQL, Operating Systems, Computer Networks",
  },
  statement: "I build software that thinks, interfaces that move, and visuals that tell stories.",
} as const;

/** The two halves of the "mode" switch. */
export const modes = {
  dev: {
    label: "Developer",
    line: "Full-stack products with AI at the core.",
    items: ["React", "Next.js", "Node.js", "Python", "FastAPI", "LLM APIs", "RAG", "Voice AI"],
  },
  creative: {
    label: "Creative",
    line: "AI-generated films, reels and motion for social.",
    items: ["AI Video", "Generative Visuals", "Editing", "Storytelling", "Motion", "Social Content"],
  },
} as const;

export type Mode = keyof typeof modes;

export const background = [
  { title: "Electronics Engineering", text: "Signals, systems and hardware thinking from a B.Tech at MIT Academy of Engineering." },
  { title: "Full-Stack Development", text: "10+ shipped projects on GitHub — Next.js, Node.js, Python and FastAPI, deployed and running." },
  { title: "AI / GenAI", text: "OpenAI, Gemini and Anthropic APIs, RAG with vector search, voice agents and Indian-language AI." },
  { title: "Creative Technology", text: "Narrative reels animated in code, with AI voice, motion and edit." },
];

export const experience = [
  { org: "J.P. Morgan", role: "Software Engineering Virtual Experience", via: "Forage" },
  { org: "Deloitte", role: "Software Engineering Virtual Experience", via: "Forage" },
];

export const certifications = [
  "UI/UX Design — SimpliLearn",
  "Frontend Domination — Sheriyans Coding School",
  "Delta MERN Stack — Apna College",
];

export const processSteps = [
  { title: "Brief", text: "Find the one idea worth building or telling. Write the script or the spec." },
  { title: "Prototype", text: "Rough it out fast: a working route, a storyboard, a voice test." },
  { title: "Generate", text: "Bring in the models — LLMs, TTS, vision — and keep only what serves the idea." },
  { title: "Cut & Craft", text: "Edit, animate, tune the motion and the interface until it reads at a glance." },
  { title: "Ship", text: "Deploy the product. Export the reel. Watch how people use it, then iterate." },
];
