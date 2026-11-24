"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/animations/gsap";
import { MediaFrame } from "@/components/MediaFrame";
import { useReel } from "@/components/ReelViewer";
import { creativeProjects } from "@/data/projects";

/** Vertical-video strip, Reel-style. Inline previews autoplay muted only while on screen. */
export function Showreel() {
  const { open } = useReel();
  const strip = useRef<HTMLUListElement>(null);

  const root = useGsap<HTMLElement>(({ root }) => {
    gsap.from(root.querySelectorAll(".reel-tile"), {
      y: 80, opacity: 0, stagger: 0.08, duration: 1.2,
      scrollTrigger: { trigger: root, start: "top 70%", once: true },
    });
  });

  const scrollBy = (dir: number) => {
    const el = strip.current;
    if (!el) return;
    const tile = el.querySelector("li");
    el.scrollBy({ left: dir * ((tile?.clientWidth ?? 300) + 16), behavior: "smooth" });
  };

  return (
    <section ref={root} id="reels" data-section="Reels" className="relative z-10 bg-ink py-24 md:py-36">
      <div className="container-x mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-4">(05) Showreel</p>
          <h2 className="display text-[13vw] md:text-[6vw]">Made for <span className="serif-em text-accent">the feed.</span></h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous reels" className="h-12 w-12 rounded-full border border-line hover:border-accent">←</button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next reels" className="h-12 w-12 rounded-full border border-line hover:border-accent">→</button>
        </div>
      </div>

      <ul ref={strip} className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 md:scroll-px-10 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
        {creativeProjects.map((p, i) => (
          <li key={p.id} className="reel-tile w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-[21vw] md:min-w-[260px]">
            <button type="button" onClick={() => open(p.id)} data-cursor="play" className="group block w-full text-left" aria-label={`Play ${p.title}`}>
              <div className="relative aspect-[9/16] overflow-hidden rounded-[14px] border border-line">
                <MediaFrame title={p.title} video={p.video} poster={p.poster} className="[&_.media-el]:transition-transform [&_.media-el]:duration-700 group-hover:[&_.media-el]:scale-105" slotLabel={`Reel ${String(i + 1).padStart(2, "0")}`} sizes="(min-width: 900px) 21vw, 68vw" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-sm backdrop-blur-md transition-transform duration-500 group-hover:scale-110">▶</span>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{p.category}</p>
              <h3 className="mt-1 text-lg font-medium leading-tight">{p.title}</h3>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
