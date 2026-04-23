"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal, focusAreas, experience, certifications } from "@/lib/data";
import { MapPin, Mail, Briefcase, Award } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mb-16 text-center"
      >
        <span className="text-violet-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
          About
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          The developer behind the{" "}
          <span className="gradient-text">work</span>
        </h2>
      </motion.div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left: Bio */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="lg:col-span-3 flex flex-col gap-8"
        >
          <div className="glass rounded-2xl p-8 border border-white/[0.08]">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {personal.bio}
            </p>
            <p className="text-slate-400 leading-relaxed">
              I thrive at the intersection of <span className="text-violet-400 font-medium">AI/LLM engineering</span>,{" "}
              <span className="text-blue-400 font-medium">3D WebGL design</span>, and{" "}
              <span className="text-cyan-400 font-medium">production SaaS architecture</span>.
              Every project I build is a statement: real products, not just demos.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-violet-400" />
                {personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-violet-400" />
                {personal.email}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for hire
              </span>
            </div>
          </div>

          {/* Focus areas */}
          <div className="grid sm:grid-cols-3 gap-4">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                variants={fadeUp}
                custom={2 + i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="glass rounded-xl p-5 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{area.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-violet-300 transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Experience + Certifications */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Experience */}
          <div className="glass rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase size={16} className="text-violet-400" />
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
                Virtual Internships
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {experience.map((exp, i) => (
                <div
                  key={exp.company}
                  className={`pb-4 ${i < experience.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{exp.company}</span>
                    <span className="text-xs text-violet-400 font-mono">{exp.period}</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-2">
                    {exp.role}{" "}
                    <span className="text-slate-600">via {exp.via}</span>
                  </p>
                  <ul className="flex flex-col gap-1">
                    {exp.highlights.map((h) => (
                      <li key={h} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-violet-500 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-5">
              <Award size={16} className="text-violet-400" />
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
                Certifications
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs">
                    ✓
                  </span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="glass rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-violet-400">🎓</span>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
                Education
              </h3>
            </div>
            <p className="font-semibold text-white text-sm">B.Tech — Electronics Engineering</p>
            <p className="text-slate-400 text-xs mt-1">MIT Academy of Engineering, Alandi, Pune</p>
            <p className="text-violet-400 text-xs mt-1 font-mono">Jul 2021 – Jul 2025</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
