import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#030712",
        "bg-secondary": "#0a0f1e",
        "bg-card": "rgba(255,255,255,0.04)",
        "border-subtle": "rgba(255,255,255,0.08)",
        "violet-primary": "#8b5cf6",
        "blue-primary": "#3b82f6",
        "cyan-accent": "#22d3ee",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139,92,246,0.25) 0%, transparent 60%)",
        "card-glow":
          "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.05) 100%)",
        "gradient-brand":
          "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #22d3ee 100%)",
        "gradient-text":
          "linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "border-flow": "borderFlow 4s linear infinite",
        typewriter: "typewriter 0.5s steps(1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        typewriter: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "glow-violet": "0 0 40px rgba(139, 92, 246, 0.3)",
        "glow-blue": "0 0 40px rgba(59, 130, 246, 0.3)",
        "glow-cyan": "0 0 40px rgba(34, 211, 238, 0.3)",
        "card-hover":
          "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
