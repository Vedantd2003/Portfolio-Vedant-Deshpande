"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STRENGTH = 3;
const ACTIVATION_PADDING = 150;

export default function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const withinX = Math.abs(distX) < rect.width / 2 + ACTIVATION_PADDING;
    const withinY = Math.abs(distY) < rect.height / 2 + ACTIVATION_PADDING;

    if (withinX && withinY) {
      setPos({ x: distX / STRENGTH, y: distY / STRENGTH });
    } else {
      setPos({ x: 0, y: 0 });
    }
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={
        pos.x === 0 && pos.y === 0
          ? { type: "tween", duration: 0.6, ease: "easeIn" }
          : { type: "tween", duration: 0.3, ease: "easeOut" }
      }
      style={{ willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
