"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export default function ScrambleIn({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  // Always start from the same SSR-safe placeholder — prefersReducedMotion
  // is only known client-side (window.matchMedia), so branching the initial
  // render on it here would mismatch the server-rendered HTML during hydration.
  const [display, setDisplay] = useState(() => " ".repeat(text.length));

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      return;
    }

    let revealed = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const startTimeout = setTimeout(() => {
      if (cancelled) return;
      interval = setInterval(() => {
        revealed += 0.5;
        const revealCount = Math.floor(revealed);

        if (revealCount >= text.length) {
          setDisplay(text);
          if (interval) clearInterval(interval);
          return;
        }

        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") out += " ";
          else if (i < revealCount) out += text[i];
          else if (i < revealCount + 3) out += randomChar();
          else out += " ";
        }
        setDisplay(out);
      }, 25);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, prefersReducedMotion]);

  return <span className={className}>{display}</span>;
}
