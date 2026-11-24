/**
 * Every project on the site lives here. To add a new reel: drop the files in /public/media,
 * add an entry with type "creative", and set `video` + `poster`. No UI changes needed.
 */
export type ProjectType = "creative" | "engineering";

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year?: string;
  featured?: boolean;
  /** Path under /public (compressed MP4/WebM). Empty = elegant placeholder is shown. */
  video?: string;
  /** Poster image under /public, shown before the video loads. */
  poster?: string;
  aspect?: "9:16" | "16:9";
  github?: string;
  live?: string;
  /* creative case study */
  concept?: string;
  process?: string[];
  /* engineering chapter */
  story?: string;
  built?: string[];
  result?: string;
}

export const projects: Project[] = [
  /* ───────────── AI CREATIVE LAB ───────────── */
  {
    id: "ranganatha",
    type: "creative",
    title: "Why Does Ranganatha Face South?",
    category: "Mythology documentary · 2-part reel",
    description: "A two-part vertical documentary on the legend behind the south-facing deity at Srirangam.",
    concept: "Treat a temple legend like a mystery: hook with the question, answer it like a reveal.",
    technologies: ["Code-animated 2D", "AI voice", "Narration script", "Subtitles"],
    process: ["Research & narration script", "AI voice generated from the script", "Scenes animated in code, cut to the voice", "English subtitles and cover frame"],
    aspect: "9:16",
    featured: true,
    video: "",
    poster: "",
  },
  {
    id: "nataraja",
    type: "creative",
    title: "The Night Shiva Became Nataraja",
    category: "3D mythology film · reel",
    description: "A cinematic 3D telling of the cosmic dance, built as a real-time 3D scene and edited to Hindi narration.",
    concept: "Make a myth feel like a film trailer — light, scale and rhythm carry the story.",
    technologies: ["Three.js", "Remotion", "AI voice (Hindi)", "English subtitles"],
    process: ["Hindi narration recorded with AI TTS", "Scenes staged in a real-time 3D engine", "Camera moves and cuts timed to the voice", "Subtitled 9:16 export"],
    aspect: "9:16",
    featured: true,
    video: "",
    poster: "",
  },
  {
    id: "teen-tigada",
    type: "creative",
    title: "Teen Tigada",
    category: "2D anime comedy series · 3 episodes",
    description: "A three-part anime-style comedy short series for Reels and Shorts, with an Indian-flavoured setting.",
    concept: "Three characters, one bad plan per episode. Built for rewatching.",
    technologies: ["Code-animated vector", "Character voices", "Hindi dialogue", "English subtitles"],
    process: ["Episode scripts and character design", "One voice track per character, cut to scene", "Vector animation rigs built in code", "Episodic 9:16 delivery"],
    aspect: "9:16",
    featured: true,
    video: "",
    poster: "",
  },
  {
    id: "sleep-paralysis",
    type: "creative",
    title: "Why Can Sleep Paralysis Feel Completely Real?",
    category: "Cinematic science explainer · reel",
    description: "A science explainer that uses horror-film language to explain what the brain is doing.",
    concept: "Scare first, explain second — the visual grammar of horror, the content of neuroscience.",
    technologies: ["2D animation", "AI voice (Hindi)", "Animated diagrams", "English subtitles"],
    process: ["Script grounded in the science", "Hindi narration via AI TTS", "Animated diagrams and atmosphere", "Subtitled 9:16 export"],
    aspect: "9:16",
    video: "",
    poster: "",
  },
  {
    id: "kiradu",
    type: "creative",
    title: "Kiradu — The City That Turned to Stone",
    category: "History & legend · reel",
    description: "The legend of Kiradu's temples told as a short vertical documentary with English narration.",
    concept: "A ruined city, a curse, and what history actually says.",
    technologies: ["2D animation", "AI voice", "Narration script", "Subtitles"],
    process: ["Script and narration", "AI voice", "Animated scenes and maps", "Subtitled export"],
    aspect: "9:16",
    video: "",
    poster: "",
  },

  /* ───────────── ENGINEERING LAB ───────────── */
  {
    id: "aria",
    type: "engineering",
    title: "ARIA",
    category: "AI Voice Interview Platform · v2",
    description: "An AI interviewer you talk to out loud, staged in an interactive 3D scene.",
    story: "Practising interviews by typing answers into a box doesn't prepare anyone for the real thing. ARIA makes the practice spoken: a voice agent asks, listens and follows up.",
    built: ["Voice conversation with an AI interviewer via the Vapi Voice SDK", "Interview logic powered by OpenAI / Gemini", "3D interview scene in Three.js on a React + Next.js front end", "Node.js back end"],
    result: "A voice-first interview practice experience — v2 of the platform.",
    technologies: ["React", "Next.js", "Node.js", "Three.js", "Vapi Voice SDK", "OpenAI / Gemini"],
    featured: true,
  },
  {
    id: "neuralvault",
    type: "engineering",
    title: "NeuralVault",
    category: "Self-Improving RAG Platform",
    description: "Upload documents into a personal knowledge base and ask questions with streamed answers.",
    story: "RAG systems usually answer and forget. NeuralVault grades its own answers and uses those grades to get better.",
    built: ["Ingestion for PDF, DOCX, HTML and Markdown into a personal knowledge base", "Real-time streamed answers", "Self-evaluation of every response for faithfulness, relevance and context precision", "Nightly jobs that flag low-quality answers for review"],
    result: "Live on Render.",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Redis", "Docker"],
    github: "https://github.com/Vedantd2003/neural-vault",
    live: "https://neural-vault-frontend.onrender.com",
    featured: true,
  },
  {
    id: "kagazbol",
    type: "engineering",
    title: "KagazBol",
    category: "Talk to any Indian document",
    description: "Photograph a bill, prescription or government form and get a summary you can read, hear and question.",
    story: "Indian paperwork is dense, multilingual and often handwritten. KagazBol turns a photo into an answer in English, Hindi or Marathi.",
    built: ["OCR for Devanagari and mixed scripts with Sarvam AI", "Structured summary card plus a 2-line spoken summary (TTS)", "Voice Q&A grounded in the document (STT + LLM)", "English, Hindi and Marathi support"],
    result: "Live on Render.",
    technologies: ["Next.js", "React", "Sarvam AI — STT / TTS / OCR / LLM"],
    github: "https://github.com/Vedantd2003/kagazbol",
    live: "https://kagazbol.onrender.com",
    featured: true,
  },
  {
    id: "resume-copilot",
    type: "engineering",
    title: "AI Resume Copilot",
    category: "Resume & Job-Prep Platform",
    description: "Resume analysis, job-description keyword matching and cover-letter generation.",
    story: "Tailoring a resume to every job description is slow and repetitive. The copilot does the matching and drafting so the applicant can focus on substance.",
    built: ["Resume analysis against a target job description", "JD keyword matching", "Cover letter generation", "REST APIs over Node.js and Python services, data in MongoDB"],
    result: "Live on Render.",
    technologies: ["Node.js", "Python", "REST APIs", "MongoDB"],
    live: "https://ai-copilot-resume-analyzer.onrender.com",
  },
  {
    id: "logo-processor",
    type: "engineering",
    title: "Logo Processor",
    category: "Image Processing Service",
    description: "A containerised API service that processes logo images with computer vision.",
    story: "Logo assets arrive in every shape and quality. This service handles the processing as an API, so it can sit behind any product.",
    built: ["FastAPI service for logo image processing", "Image operations with OpenCV", "Containerised with Docker"],
    technologies: ["Python", "FastAPI", "OpenCV", "Docker"],
  },
  {
    id: "alphapulse",
    type: "engineering",
    title: "AlphaPulse AI",
    category: "Evidence-Backed Investment Research",
    description: "Ask about a US company and get a structured research note where every claim is checked against its source.",
    story: "LLMs write confident research notes with made-up citations. AlphaPulse checks each attributed claim against the stored source text and marks anything unsupported.",
    built: ["Live quotes, Finnhub news and SEC EDGAR filings as sources", "Gemini-written research notes with citation verification", "Watchlists, price alerts and a hypothetical Portfolio Lab"],
    result: "Live on Render.",
    technologies: ["Next.js", "TypeScript", "Express", "MongoDB", "Gemini"],
    github: "https://github.com/Vedantd2003/AI-dashboard-Main/tree/alphapulse-ai",
    live: "https://alphapulse-web.onrender.com/",
    poster: "/projects/alphapulse-ai.webp",
  },
];

export const creativeProjects = projects.filter((p) => p.type === "creative");
export const engineeringProjects = projects.filter((p) => p.type === "engineering");
