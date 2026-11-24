export interface SkillCluster {
  id: "ai" | "engineering" | "creative";
  label: string;
  items: string[];
}

export const skillClusters: SkillCluster[] = [
  { id: "ai", label: "AI", items: ["OpenAI", "Gemini", "Anthropic", "Sarvam AI", "RAG", "Vector Search", "Prompt Engineering", "Voice AI (Vapi)"] },
  { id: "engineering", label: "Engineering", items: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker"] },
  { id: "creative", label: "Creative", items: ["AI Video", "Generative Visuals", "Motion", "Storytelling", "Social Content", "Three.js", "GSAP"] },
];
