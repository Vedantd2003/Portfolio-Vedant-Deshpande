"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";
import { Github, ExternalLink } from "lucide-react";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: tilt.x === 0 ? "transform 0.6s ease" : "transform 0.1s ease",
        }}
        className="group relative glass rounded-2xl p-6 border border-white/[0.08] hover:border-white/20 flex flex-col gap-4 h-full cursor-default"
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.glow} 0%, transparent 60%)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-lg shadow-lg`}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-violet-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 text-xs">{project.subtitle}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={15} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed relative z-10">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 relative z-10">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-slate-400">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${project.color}`}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto relative z-10 pt-2 border-t border-white/[0.06]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="section-padding max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="text-violet-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
          Projects
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Things I&apos;ve{" "}
          <span className="gradient-text">built</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Production-ready SaaS products, AI platforms, and immersive 3D experiences — shipped with real users in mind.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
