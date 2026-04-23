"use client";

import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socials = [
  { icon: Github, href: personal.github, label: "GitHub" },
  { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030712]">
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                VD
              </div>
              <span className="font-bold text-white">
                {personal.name}
                <span className="gradient-text">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs text-center md:text-left">
              Designing intelligent experiences, not just interfaces.
            </p>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-200 text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg glass border border-white/[0.08] text-slate-500 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={11} className="text-rose-500 mx-1" fill="currentColor" /> using Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
