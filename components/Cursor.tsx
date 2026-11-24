"use client";

import { useEffect, useRef } from "react";
import { gsap, isTouch, prefersReducedMotion } from "@/animations/gsap";

const LABELS: Record<string, string> = { play: "Play", view: "View", explore: "Explore", link: "↗" };

/**
 * One dot + one ring. Elements opt in with data-cursor="play | view | explore | link | hover".
 * Disabled on touch devices and with reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion() || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    gsap.set([dot.current, ring.current], { opacity: 0 });

    let current = "";
    const setState = (state: string) => {
      if (state === current) return;
      current = state;
      const label = LABELS[state] ?? "";
      if (text.current) text.current.textContent = label;
      gsap.to(ring.current, {
        width: label ? 84 : state ? 52 : 32,
        height: label ? 84 : state ? 52 : 32,
        backgroundColor: label ? "rgb(var(--accent))" : "rgba(0,0,0,0)",
        borderColor: label ? "rgba(0,0,0,0)" : "rgb(var(--paper) / 0.45)",
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(dot.current, { scale: state ? 0 : 1, duration: 0.3 });
    };

    const move = (e: PointerEvent) => {
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3, overwrite: "auto" });
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      setState(t ? t.dataset.cursor ?? "hover" : "");
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(pointer:fine)]:block">
      <div ref={dot} className="absolute -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
      <div
        ref={ring}
        className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        style={{ borderColor: "rgb(var(--paper) / 0.45)" }}
      >
        <span ref={text} className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink" />
      </div>
    </div>
  );
}
