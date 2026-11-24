"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { ModeToggle, useMode } from "@/components/ModeProvider";
import { modes, type Mode } from "@/data/profile";

/** The two halves of the profile. Choosing a half re-themes the entire site. */
export function ModeSwitch() {
  const { mode, setMode } = useMode();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.fromTo(
      root.current.querySelectorAll(`[data-half="${mode}"] li`),
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.9, delay: 0.45 },
    );
  }, [mode]);

  const half = (m: Mode) => {
    const active = mode === m;
    const isDev = m === "dev";
    return (
      <button
        type="button"
        data-half={m}
        data-cursor="explore"
        onClick={() => setMode(m)}
        aria-pressed={active}
        aria-label={`Switch to ${modes[m].label} mode`}
        className={`group relative flex min-h-[46svh] flex-col justify-between overflow-hidden border-line p-6 text-left transition-[flex-grow,opacity] duration-[900ms] [transition-timing-function:var(--ease-out)] md:min-h-[64svh] md:p-10 ${
          active ? "flex-[1.7] opacity-100" : "flex-1 opacity-45 hover:opacity-75"
        } ${isDev ? "border-b md:border-b-0 md:border-r" : ""}`}
      >
        <div className="flex items-start justify-between">
          <span className="eyebrow">{isDev ? "(A)" : "(B)"} — {active ? "Active" : "Switch"}</span>
          <span className={`h-2.5 w-2.5 rounded-full transition-colors ${active ? "bg-accent" : "bg-paper/20"}`} />
        </div>
        <div>
          <h3 className={`text-[14vw] leading-[0.9] md:text-[6.4vw] ${isDev ? "display font-mono !tracking-[-0.06em]" : "serif-em"} ${active ? "text-accent" : ""}`}>
            {modes[m].label}
          </h3>
          <p className="mt-3 max-w-sm text-paper/70">{modes[m].line}</p>
          <ul className={`mt-6 flex flex-wrap gap-x-4 gap-y-1 overflow-hidden ${isDev ? "font-mono text-sm" : "font-serif text-xl italic"}`}>
            {modes[m].items.map((it) => (
              <li key={it} className="flex items-center gap-4">
                {it}<span className="text-paper/30">/</span>
              </li>
            ))}
          </ul>
        </div>
      </button>
    );
  };

  return (
    <section ref={root} data-section="Two modes" className="relative z-10 border-y border-line bg-ink">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-end md:py-14">
        <div>
          <p className="eyebrow mb-4">(02) Two modes, one practice</p>
          <h2 className="display text-5xl md:text-[5.4vw]">Pick a <span className="serif-em text-accent">lens.</span></h2>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <ModeToggle large />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">The whole site changes with it.</p>
        </div>
      </div>
      <div className="flex flex-col border-t border-line md:flex-row">
        {half("dev")}
        {half("creative")}
      </div>
    </section>
  );
}
