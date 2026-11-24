"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { modes, type Mode } from "@/data/profile";

interface ModeCtx {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
}

const Ctx = createContext<ModeCtx | null>(null);

export const useMode = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMode must be used inside <ModeProvider>");
  return c;
};

/**
 * The signature interaction: switching mode sweeps a full-screen panel across the viewport,
 * swaps the design tokens underneath it, then wipes away to reveal the re-themed site.
 */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("creative");
  const wipe = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);

  const apply = (m: Mode) => {
    document.documentElement.dataset.mode = m;
    setModeState(m);
  };

  const setMode = useCallback(
    (next: Mode) => {
      if (busy.current || next === document.documentElement.dataset.mode) return;
      if (prefersReducedMotion() || !wipe.current) return apply(next);
      busy.current = true;
      if (label.current) label.current.textContent = `${modes[next].label} mode`;
      gsap
        .timeline({ onComplete: () => void (busy.current = false) })
        .set(wipe.current, { display: "flex", clipPath: "inset(0 100% 0 0)" })
        .to(wipe.current, { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "expo.inOut" })
        .fromTo(label.current, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "expo.out" }, "-=0.25")
        .add(() => apply(next))
        .to(wipe.current, { clipPath: "inset(0 0 0 100%)", duration: 0.6, ease: "expo.inOut" }, "+=0.12")
        .set(wipe.current, { display: "none" });
    },
    [],
  );

  const toggle = useCallback(() => setMode(document.documentElement.dataset.mode === "dev" ? "creative" : "dev"), [setMode]);

  return (
    <Ctx.Provider value={{ mode, setMode, toggle }}>
      {children}
      <div
        ref={wipe}
        aria-hidden="true"
        className="fixed inset-0 z-[80] hidden items-center justify-center bg-accent text-ink"
      >
        <span className="mask">
          <span ref={label} className="display text-[12vw] md:text-[8vw]" />
        </span>
      </div>
    </Ctx.Provider>
  );
}

/** Compact pill toggle used in the nav and the mode section. */
export function ModeToggle({ large = false }: { large?: boolean }) {
  const { mode, toggle } = useMode();
  const isDev = mode === "dev";
  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="explore"
      aria-label={`Switch to ${isDev ? "creative" : "developer"} mode`}
      aria-pressed={isDev}
      className={`group relative grid grid-cols-2 items-center rounded-full border border-line font-mono uppercase tracking-[0.18em] ${
        large ? "p-1.5 text-xs md:text-sm" : "p-1 text-[10px]"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-accent transition-transform duration-700 [transition-timing-function:var(--ease-out)]"
        style={{ transform: isDev ? "translateX(0)" : "translateX(calc(100% + 0px))" }}
      />
      <span className={`relative z-10 rounded-full text-center ${large ? "px-6 py-3" : "px-3 py-1.5"} transition-colors duration-500 ${isDev ? "text-ink" : "text-paper/70"}`}>
        Dev
      </span>
      <span className={`relative z-10 rounded-full text-center ${large ? "px-6 py-3" : "px-3 py-1.5"} transition-colors duration-500 ${!isDev ? "text-ink" : "text-paper/70"}`}>
        Creative
      </span>
    </button>
  );
}
