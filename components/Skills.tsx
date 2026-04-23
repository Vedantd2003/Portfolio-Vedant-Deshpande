"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, skillBadges } from "@/lib/data";

const categoryColors: Record<string, { bg: string; border: string; text: string; bar: string }> = {
  "Frontend & 3D": {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-300",
    bar: "from-violet-500 to-indigo-500",
  },
  "Backend & Database": {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-300",
    bar: "from-blue-500 to-cyan-500",
  },
  "AI & LLM": {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-300",
    bar: "from-emerald-500 to-teal-500",
  },
  "Security & DevOps": {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-300",
    bar: "from-orange-500 to-red-500",
  },
};

function SkillBar({
  name,
  level,
  barClass,
  delay,
  inView,
}: {
  name: string;
  level: number;
  barClass: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barClass}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="section-padding max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="text-violet-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
          Skills
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My tech{" "}
          <span className="gradient-text">arsenal</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          A curated stack for building AI-powered, 3D-immersive, production-grade applications.
        </p>
      </motion.div>

      {/* Skill categories */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {Object.entries(skills).map(([category, skillList], catIndex) => {
          const colors = categoryColors[category];
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/[0.08] hover:border-white/15 transition-all duration-300"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border} mb-5`}>
                <span className={`text-xs font-semibold ${colors.text}`}>{category}</span>
              </div>
              <div className="flex flex-col gap-4">
                {skillList.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    barClass={colors.bar}
                    delay={catIndex * 0.1 + i * 0.05}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating badge cloud */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center"
      >
        <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest">Full stack</p>
        <div className="flex flex-wrap justify-center gap-3">
          {skillBadges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.025 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-4 py-2 rounded-xl glass border border-white/[0.08] hover:border-violet-500/40 hover:bg-violet-500/10 text-slate-300 hover:text-violet-300 text-sm font-medium cursor-default transition-all duration-300"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
