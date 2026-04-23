"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personal, roles } from "@/lib/data";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

function TypewriterText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1500);
      return () => clearTimeout(t);
    }

    const word = words[index];

    if (!deleting && displayed === word) {
      setPaused(true);
      setDeleting(true);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const speed = deleting ? 40 : 70;
    const t = setTimeout(() => {
      setDisplayed(
        deleting ? displayed.slice(0, -1) : word.slice(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, paused, index, words]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
}

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712]">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-[600px] h-[600px] bg-violet-600/15 top-[-200px] left-[-200px]" />
        <div className="orb w-[500px] h-[500px] bg-blue-600/10 bottom-[-100px] right-[-100px]" />
        <div className="orb w-[300px] h-[300px] bg-cyan-500/8 top-[30%] right-[20%]" />
      </div>

      {/* Hero grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left: Text content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/30 text-violet-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to full-time opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white">Hi, I&apos;m</span>
              <br />
              <span className="gradient-text">
                {personal.name.split(" ")[0]}{" "}
                <span className="text-white">{personal.name.split(" ")[1]}</span>
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="text-xl md:text-2xl font-semibold text-slate-300 min-h-[2rem]">
            <TypewriterText words={roles} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg leading-relaxed max-w-lg"
          >
            {personal.tagline}
            <br />
            <span className="text-slate-500 text-base">
              Building production-ready AI SaaS · Alandi, Pune
            </span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary px-8 py-3 text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects ↓
            </motion.button>
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost px-8 py-3 text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
            <span className="text-slate-600 text-sm">Find me on</span>
            <div className="flex gap-3">
              {[
                { icon: Github, href: personal.github, label: "GitHub" },
                { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl glass border border-white/10 text-slate-400 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
        >
          {/* Glow ring behind 3D */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-violet-600/20 blur-3xl animate-pulse-glow" />
          </div>
          <HeroScene />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-violet-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
