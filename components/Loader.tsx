"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";

/**
 * ~1.2s intro. Rendered on the server so there's no flash; a CSS fallback
 * removes it even if JavaScript never runs.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const done = () => {
      el.style.display = "none";
      window.dispatchEvent(new Event("intro:done"));
    };
    if (prefersReducedMotion()) return done();
    const tl = gsap.timeline({ onComplete: done });
    tl.from(el.querySelectorAll(".ld-line > span"), { yPercent: 110, duration: 0.6, stagger: 0.06, ease: "expo.out" })
      .from(el.querySelector(".ld-bar"), { scaleX: 0, duration: 0.5, ease: "power2.inOut" }, 0.1)
      .to(el.querySelectorAll(".ld-line > span"), { yPercent: -110, duration: 0.45, stagger: 0.03, ease: "expo.in" }, 0.75)
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "expo.inOut" }, 0.95)
      .add(() => window.dispatchEvent(new Event("intro:start")), 1.0);
    return () => void tl.kill();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 text-paper md:p-10 [animation:loaderOut_0s_3s_forwards]"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <style>{`@keyframes loaderOut{to{visibility:hidden}}`}</style>
      <div className="ld-line mask font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        <span>Portfolio — Pune, India</span>
      </div>
      <div>
        <div className="display text-[18vw] md:text-[11vw]"><span className="ld-line mask"><span>Vedant</span></span></div>
        <div className="display text-[18vw] md:text-[11vw]"><span className="ld-line mask"><span className="serif-em text-accent">Deshpande</span></span></div>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="ld-line mask font-mono text-[11px] uppercase tracking-[0.22em]"><span>01 — AI Developer × AI Visual Storyteller</span></div>
        <div className="ld-bar h-px w-1/3 origin-left bg-accent" />
      </div>
    </div>
  );
}
