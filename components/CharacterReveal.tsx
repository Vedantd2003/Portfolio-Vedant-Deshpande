"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

function RevealChar({
  char,
  progress,
  range,
  reduced,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}) {
  // Output range (not JSX structure) is the only thing gated on
  // prefersReducedMotion — keeping the tree identical on server and client
  // avoids a hydration mismatch, since prefersReducedMotion is only known
  // once the browser evaluates matchMedia.
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function CharacterReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Gate behind a mount flag: prefersReducedMotion is only knowable client-side
  // (matchMedia), so it must default identically (false) on the very first
  // render for both server and client, then update after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduced = mounted && !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => {
            const start = charIndex / text.length;
            const end = (charIndex + 1) / text.length;
            charIndex++;
            return (
              <RevealChar
                key={ci}
                char={char}
                progress={scrollYProgress}
                range={[start, end]}
                reduced={reduced}
              />
            );
          })}
          {wi !== words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
