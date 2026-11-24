"use client";

import { useState } from "react";
import { gsap, useGsap } from "@/animations/gsap";
import { skillClusters, type SkillCluster } from "@/data/skills";

const W = 1200;
const H = 720;
const CENTER = { x: 600, y: 330 };
const HUBS: Record<SkillCluster["id"], { x: number; y: number }> = {
  ai: { x: 255, y: 200 },
  engineering: { x: 945, y: 200 },
  creative: { x: 600, y: 590 },
};

function layout(c: SkillCluster) {
  const hub = HUBS[c.id];
  const r = c.id === "creative" ? 165 : 200;
  // fan nodes away from the centre so lines never cross the core
  const away = Math.atan2(hub.y - CENTER.y, hub.x - CENTER.x);
  const spread = c.id === "creative" ? Math.PI * 1.15 : Math.PI * 1.45;
  return c.items.map((label, i) => {
    const a = away - spread / 2 + (spread * i) / Math.max(1, c.items.length - 1);
    return { label, x: hub.x + Math.cos(a) * r, y: hub.y + Math.sin(a) * r * 0.62 };
  });
}

/** The stack as a living graph (desktop) or as a tree (mobile). */
export function Ecosystem() {
  const [focus, setFocus] = useState<SkillCluster["id"] | null>(null);

  const root = useGsap<HTMLElement>(({ root }) => {
    gsap.from(root.querySelectorAll(".eco-node"), {
      opacity: 0, scale: 0.6, transformOrigin: "center", stagger: 0.025, duration: 0.9,
      scrollTrigger: { trigger: root, start: "top 65%", once: true },
    });
    gsap.from(root.querySelectorAll(".eco-link"), {
      strokeDashoffset: 400, duration: 1.6, stagger: 0.01, ease: "power2.out",
      scrollTrigger: { trigger: root, start: "top 65%", once: true },
    });
  });

  return (
    <section ref={root} data-section="Stack" className="relative z-10 bg-ink py-24 md:py-36">
      <div className="container-x">
        <p className="eyebrow mb-4">(08) Stack</p>
        <h2 className="display text-[13vw] md:text-[6vw]">One <span className="serif-em text-accent">ecosystem.</span></h2>
        <p className="mt-6 max-w-md text-paper/70">Three clusters that feed each other. Hover a cluster to isolate it.</p>

        {/* Desktop graph */}
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-10 hidden w-full md:block" role="img" aria-label="Skills graph: AI, Engineering and Creative clusters">
          <style>{`.eco-flow{stroke-dasharray:4 8;animation:eco 2.4s linear infinite}@keyframes eco{to{stroke-dashoffset:-24}}@media (prefers-reduced-motion:reduce){.eco-flow{animation:none}}`}</style>
          {skillClusters.map((c) => {
            const hub = HUBS[c.id];
            const dim = focus && focus !== c.id;
            return (
              <g key={c.id} onMouseEnter={() => setFocus(c.id)} onMouseLeave={() => setFocus(null)} data-cursor="explore" style={{ opacity: dim ? 0.15 : 1, transition: "opacity .5s" }}>
                <line className="eco-flow" x1={CENTER.x} y1={CENTER.y} x2={hub.x} y2={hub.y} stroke="rgb(var(--accent))" strokeWidth={1.2} />
                {layout(c).map((n) => (
                  <g key={n.label} className="eco-node">
                    <line className="eco-link" x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="rgb(var(--paper) / .18)" strokeDasharray="400" />
                    <circle cx={n.x} cy={n.y} r={4} fill="rgb(var(--paper))" />
                    <text x={n.x} y={n.y - 12} textAnchor="middle" fill="rgb(var(--paper) / .8)" style={{ font: "500 13px var(--font-mono)" }}>{n.label}</text>
                  </g>
                ))}
                <g className="eco-node">
                  <circle cx={hub.x} cy={hub.y} r={46} fill="rgb(var(--ink))" stroke="rgb(var(--accent))" />
                  <text x={hub.x} y={hub.y + 6} textAnchor="middle" fill="rgb(var(--paper))" style={{ font: "600 16px var(--font-sans)", letterSpacing: ".08em", textTransform: "uppercase" }}>{c.label}</text>
                </g>
              </g>
            );
          })}
          <g className="eco-node">
            <circle cx={CENTER.x} cy={CENTER.y} r={34} fill="rgb(var(--accent))" />
            <text x={CENTER.x} y={CENTER.y + 7} textAnchor="middle" fill="rgb(var(--ink))" style={{ font: "italic 22px var(--font-serif)" }}>VD</text>
          </g>
        </svg>

        {/* Mobile tree */}
        <div className="mt-12 grid gap-10 font-mono text-sm md:hidden">
          {skillClusters.map((c) => (
            <div key={c.id}>
              <p className="text-accent">{c.label.toUpperCase()}</p>
              <ul className="mt-2 text-paper/80">
                {c.items.map((it, i) => <li key={it}><span className="text-paper/30">{i === c.items.length - 1 ? "└── " : "├── "}</span>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
