"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { gsap, useGsap } from "@/animations/gsap";
import { Magnetic } from "@/components/Magnetic";
import { profile } from "@/data/profile";

// The second shader instance is only fetched/initialised when the contact section mounts.
const ShaderCanvas = dynamic(() => import("@/components/ShaderCanvas").then((m) => m.ShaderCanvas), { ssr: false });

export function Contact() {
  const [copied, setCopied] = useState(false);

  const root = useGsap<HTMLElement>(({ root }) => {
    const q = gsap.utils.selector(root);
    gsap.from(q(".c-line > span"), { yPercent: 110, stagger: 0.08, duration: 1.3, scrollTrigger: { trigger: root, start: "top 60%", once: true } });
    gsap.fromTo(q(".c-bg"), { clipPath: "inset(30% 30% 30% 30% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: 0.6 } });
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the mailto link still works */ }
  };

  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "Résumé", href: profile.resume },
  ];

  return (
    <section ref={root} id="contact" data-section="Contact" className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <div className="c-bg absolute inset-0 opacity-70">
        <ShaderCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-center py-28">
        <p className="eyebrow mb-8 !text-paper/80">(10) Contact — open to full-time roles · immediate joiner</p>
        <h2 className="display text-[13vw] md:text-[9vw]">
          <span className="block"><span className="c-line mask"><span>Let&apos;s build</span></span></span>
          <span className="block"><span className="c-line mask"><span>something</span></span></span>
          <span className="block"><span className="c-line mask"><span className="serif-em text-accent">worth watching.</span></span></span>
        </h2>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <Magnetic strength={0.2}>
            <a href={`mailto:${profile.email}`} data-cursor="link" className="inline-flex items-center gap-4 rounded-full bg-paper px-7 py-5 text-lg font-medium text-ink md:text-2xl">
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
          <button type="button" onClick={copy} className="link-u self-start font-mono text-[11px] uppercase tracking-[0.18em] md:self-center" aria-live="polite">
            {copied ? "Copied ✓" : "Copy email"}
          </button>
          <div className="flex gap-8 md:ml-auto">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="link" className="link-u font-mono text-sm uppercase tracking-[0.18em]">
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="container-x relative flex flex-col gap-4 border-t border-line py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70 md:flex-row md:items-center md:justify-between">
        <span className="text-paper">{profile.name}</span>
        <span>AI × Full Stack × Creative</span>
        <span>{profile.location}</span>
        <span className="flex gap-6">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">GitHub</a>
          <a href={`mailto:${profile.email}`} className="link-u">Email</a>
        </span>
      </footer>
    </section>
  );
}
