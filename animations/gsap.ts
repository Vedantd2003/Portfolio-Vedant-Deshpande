"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/** Breakpoint/motion contexts shared by every section's gsap.matchMedia(). */
export const MQ = {
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Scoped GSAP setup: everything created inside `setup` is reverted on unmount,
 * so sections never leak ScrollTriggers.
 */
export function useGsap<T extends HTMLElement>(
  setup: (self: { root: T; mm: gsap.MatchMedia }) => void | (() => void),
  deps: DependencyList = [],
): RefObject<T> {
  const ref = useRef<T>(null);
  useIsoLayoutEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ root, mm });
    }, root);
    return () => {
      cleanup?.();
      mm.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Standard masked-line reveal used across sections. */
export function revealLines(targets: gsap.TweenTarget, trigger: Element, opts: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    yPercent: 110,
    duration: 1.2,
    stagger: 0.08,
    scrollTrigger: { trigger, start: "top 80%", once: true },
    ...opts,
  });
}
