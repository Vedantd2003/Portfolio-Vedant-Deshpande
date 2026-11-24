"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap } from "@/animations/gsap";
import { ModeToggle } from "./ModeProvider";

const LINKS = [
  { href: "#lab", label: "Creative Lab" },
  { href: "#reels", label: "Reels" },
  { href: "#engineering", label: "Engineering" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Fixed header: wordmark, section counter, mode toggle, and a scroll progress hairline. */
export function Nav() {
  const bar = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState({ n: "01", name: "Intro" });
  const [total, setTotal] = useState("10");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => gsap.set(bar.current, { scaleX: s.progress }),
    });
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    setTotal(String(sections.length).padStart(2, "0"));
    const triggers = sections.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (s) => s.isActive && setSection({ n: String(i + 1).padStart(2, "0"), name: el.dataset.section! }),
      }),
    );
    return () => { st.kill(); triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[75] bg-gradient-to-b from-ink/90 via-ink/50 to-transparent">
      <div className="container-x flex items-center justify-between gap-4 py-4 md:py-6">
        <a href="#top" className="font-sans text-sm font-semibold uppercase tracking-tight" aria-label="Vedant Deshpande — back to top">
          Vedant <span className="serif-em text-accent"><span className="sm:hidden">D.</span><span className="hidden sm:inline">Deshpande</span></span>
        </a>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted lg:block" aria-live="off">
          <span className="text-paper">{section.n}</span> / {total} — {section.name}
        </p>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-u font-mono text-[11px] uppercase tracking-[0.18em] text-paper/80 hover:text-paper">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/Vedant_Deshpande_Resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor="link" className="link-u hidden font-mono text-[11px] uppercase tracking-[0.18em] text-accent lg:inline-block">Résumé ↗</a>
          <ModeToggle />
          <button type="button" className="font-mono text-[11px] uppercase tracking-[0.18em] md:hidden" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div ref={bar} className="h-px origin-left scale-x-0 bg-accent" />
      {menu && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-x flex flex-col gap-1 bg-ink/95 pb-6 pt-2 backdrop-blur-md md:hidden">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)} className="display flex items-baseline gap-3 py-2 text-4xl">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>{l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
