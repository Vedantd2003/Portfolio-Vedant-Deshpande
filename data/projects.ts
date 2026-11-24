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
    id: "tilottama",
    type: "creative",
    title: "Tilottama",
    category: "RangKatha · Madhubani mythology reel",
    description: "A legend from the Mahabharata, painted as a living Madhubani story: two asura brothers no army could defeat, and the woman the gods created to end them.",
    concept: "Shaped from a grain of every beautiful thing in the world — she never raised a weapon.",
    technologies: ["Madhubani-inspired 2D animation", "Animated in code", "AI voice (Hindi)", "English subtitles"],
    process: ["Story adapted from the Mahabharata (Sunda and Upasunda)", "Hindi narration generated with AI TTS", "Mithila folk-art scenes animated in code", "Subtitled 9:16 export with cover and captions"],
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
    category: "2D anime comedy series · episodic",
    description: "An anime-style comedy short series for Reels and Shorts, with recurring characters and an Indian-flavoured setting.",
    concept: "Recurring characters, one bad plan per episode. Built for rewatching.",
    technologies: ["Code-animated vector", "Character voice tracks", "Hindi dialogue", "English subtitles"],
    process: ["Series bible, episode scripts and character design", "One voice track per character, cut and placed scene by scene", "Vector animation rigs built in code", "Episodic 9:16 delivery"],
    aspect: "9:16",
    featured: true,
    video: "",
    poster: "",
  },
  {
    id: "gargi",
    type: "creative",
    title: "Gargi — The Woman Who Kept Asking",
    category: "Upanishad storytelling · reel",
    description: "From the Brihadaranyaka Upanishad: in King Janaka's assembly, Gargi questions the sage Yajnavalkya — and keeps asking until the deepest answer appears.",
    concept: "Told to stop asking, she came back with two sharper questions — like a warrior placing two arrows on a bow.",
    technologies: ["2D character animation", "Remotion", "AI voice (Hindi)", "English subtitles"],
    process: ["Script written from the source text (Brihadaranyaka Upanishad 3.6, 3.8)", "Hindi narration and matching English subtitles", "Court, characters and kinetic type animated in code", "1:46 vertical reel, mixed to -14 LUFS"],
    aspect: "9:16",
    video: "",
    poster: "",
  },
  {
    id: "kathakali",
    type: "creative",
    title: "Kathakali — Why Green?",
    category: "Indian dance series · reel",
    description: "Why Kathakali performers paint their faces green — decoding the face types, the eye training and the chutti, frame by frame.",
    concept: "This is not makeup. It is a code.",
    technologies: ["2D animation", "Remotion", "AI voice (Hindi)", "Chenda-driven sound design"],
    process: ["Research on vesham types (Pacha, Kathi, Thadi, Kari) and the chutti", "Hindi narration with English subtitles", "Face transformations and eye close-ups animated in code", "1:56 vertical reel with a drum-driven score"],
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
    story: "Practising interviews by typing answers into a box doesn't prepare anyone for the real thing. ARIA makes the practice spoken: a voice agent asks, listens and follows up — and the interface reacts live to what the AI says.",
    built: ["Built solo, end to end — responsive React / Next.js UI that reacts live to AI-generated output", "Real-time voice interaction with the Vapi Voice SDK", "Raw OpenAI / Gemini output turned into structured, reliable interview feedback", "3D interview scene in Three.js, Node.js back end"],
    result: "Sub-200ms voice response times. Live on Render.",
    technologies: ["React", "Next.js", "Node.js", "Three.js", "Vapi Voice SDK", "OpenAI / Gemini"],
    live: "https://ariainterview-v2.onrender.com",
    featured: true,
  },
  {
    id: "neuralvault",
    type: "engineering",
    title: "NeuralVault",
    category: "Full-Stack AI Platform with Dashboards",
    description: "Upload documents into a personal knowledge base and ask questions with streamed answers.",
    story: "RAG systems usually answer and forget. NeuralVault grades its own answers and uses those grades to get better.",
    built: ["REST API services with a background data-processing queue (Bull)", "Redis caching for embeddings and live updates streamed to the React UI", "Recharts analytics dashboard tracking faithfulness, relevance and context precision", "JWT / bcrypt auth, deployed with Docker"],
    result: "A RAG platform that measures its own answer quality. Live on Render.",
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
    built: ["Voice-first, multilingual (Hindi / Marathi / English) assistant on Sarvam AI's STT, TTS, OCR and LLM models", "Responsive React UI and REST API back end", "Spoken or scanned input turned into structured document actions", "Structured summary card plus voice Q&A grounded in the document"],
    result: "Shipped end to end in 48 hours. Live on Render.",
    technologies: ["Next.js", "React", "Sarvam AI — STT / TTS / OCR / LLM", "REST APIs"],
    github: "https://github.com/Vedantd2003/kagazbol",
    live: "https://kagazbol.onrender.com",
    featured: true,
  },
  {
    id: "resume-copilot",
    type: "engineering",
    title: "AI Resume Copilot",
    category: "Production Backend",
    description: "Resume analysis, job-description keyword matching and cover-letter generation.",
    story: "Tailoring a resume to every job description is slow and repetitive. The copilot does the matching and drafting — and I maintain the production backend that keeps it running.",
    built: ["Maintain the REST API backend in Node.js and Python, data in MongoDB", "Fixed 15+ live issues across frontend, API and data layers", "Added input validation across the API", "Resume analysis, JD keyword matching and cover-letter generation"],
    result: "99%+ uptime; invalid-input failures cut to under 1%.",
    technologies: ["Node.js", "Python", "REST APIs", "MongoDB"],
    live: "https://ai-copilot-resume-analyzer.onrender.com",
  },
  {
    id: "logo-processor",
    type: "engineering",
    title: "Logo Processor",
    category: "FastAPI Microservice",
    description: "A containerised REST microservice for automated image processing, with email delivery of the results.",
    story: "Logo assets arrive in every shape and quality. This service automates the processing behind a clean API, so it can sit behind any product.",
    built: ["Containerised REST microservice with FastAPI and OpenCV for automated image processing", "Input validation and error handling", "Email-delivery workflow via SMTP"],
    result: "A production-shaped microservice: validated input in, processed assets delivered.",
    technologies: ["Python", "FastAPI", "OpenCV", "Docker", "SMTP"],
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
  {
    id: "apple-vision",
    type: "engineering",
    title: "Vision Landing",
    category: "Immersive 3D Product Page",
    description: "An Apple-style product landing page with scroll-driven 3D depth.",
    story: "A study in product presentation: what does a launch page feel like when scrolling is the camera move?",
    built: ["Interactive 3D product scene in Three.js", "Scroll-based depth effects at 60fps", "GSAP micro-interactions with Locomotive Scroll", "Apple-inspired minimal UI"],
    result: "Live on Vercel.",
    technologies: ["Three.js", "GSAP", "Locomotive Scroll", "JavaScript"],
    live: "https://applevision-webvedant.vercel.app",
  },
];

export const creativeProjects = projects.filter((p) => p.type === "creative");
export const engineeringProjects = projects.filter((p) => p.type === "engineering");
