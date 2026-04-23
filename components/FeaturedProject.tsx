"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuredProject } from "@/lib/data";
import { ExternalLink, CheckCircle2, Zap, Brain, Mic } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    desc: "GPT-4 powered deep analysis against any job description with keyword matching.",
  },
  {
    icon: Zap,
    title: "Cover Letter Gen",
    desc: "One-click tailored cover letters generated from your resume + JD context.",
  },
  {
    icon: Mic,
    title: "Voice Interview Room",
    desc: "3D virtual interview room with real-time voice AI via Vapi for mock practice.",
  },
  {
    icon: CheckCircle2,
    title: "JD Keyword Matching",
    desc: "Identifies missing keywords and ATS gaps to maximize application success.",
  },
];

const metrics = [
  { value: "~80%", label: "Reduced job-prep effort" },
  { value: "3", label: "AI models integrated" },
  { value: "3D", label: "Virtual interview room" },
  { value: "Real-time", label: "Voice synthesis" },
];

export default function FeaturedProject() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
            Featured Project
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Flagship{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              work
            </span>
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-emerald-500/20 glass"
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 p-8 md:p-12">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-900/40">
                  {featuredProject.icon}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {featuredProject.title}
                  </h3>
                  <p className="text-slate-400">{featuredProject.subtitle}</p>
                </div>
              </div>
              {featuredProject.demo && (
                <motion.a
                  href={featuredProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-lg shadow-emerald-900/40 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              )}
            </div>

            {/* Content: Problem/Solution + Metrics */}
            <div className="grid lg:grid-cols-2 gap-10 mb-10">
              {/* Problem & Solution */}
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl bg-red-500/5 border border-red-500/15 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
                      The Problem
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Job seekers spend hours manually tailoring resumes, writing cover letters, and preparing for interviews — with no feedback loop and high anxiety. Existing tools are generic and disconnected.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      The Solution
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    An end-to-end AI platform that analyzes your resume against any JD, identifies keyword gaps, generates tailored cover letters, and simulates real interviews with a 3D voice AI room — reducing prep effort by ~80%.
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="glass rounded-2xl p-5 border border-emerald-500/15 flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      {m.value}
                    </span>
                    <span className="text-slate-400 text-xs mt-1.5">{m.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="glass rounded-xl p-4 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-3 group-hover:bg-emerald-500/25 transition-colors">
                    <f.icon size={15} className="text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1.5">{f.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
              <span className="text-slate-500 text-xs uppercase tracking-wider">Built with</span>
              {featuredProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
