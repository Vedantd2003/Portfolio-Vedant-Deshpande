"use client";

import { gsap, MQ, useGsap } from "@/animations/gsap";
import { MediaFrame } from "@/components/MediaFrame";
import { useReel } from "@/components/ReelViewer";
import { creativeProjects } from "@/data/projects";

const featured = creativeProjects.filter((p) => p.featured);

/**
 * Desktop: a pinned horizontal "film strip" of case-study cards, with media drifting inside
 * each frame as the strip moves. Mobile: the same cards stacked vertically.
 */
export function CreativeLab() {
  const { open } = useReel();

  const root = useGsap<HTMLElement>(({ root, mm }) => {
    const q = gsap.utils.selector(root);
    const track = q(".lab-track")[0];

    mm.add(MQ.desktop, () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const strip = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      q(".lab-card").forEach((card) => {
        gsap.fromTo(card.querySelector(".media-el"), { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: card, containerAnimation: strip, start: "left right", end: "right left", scrub: true } });
        gsap.from(card.querySelectorAll(".lab-title .w"), { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: card, containerAnimation: strip, start: "left 75%" } });
      });
    });

    mm.add(MQ.mobile, () => {
      q(".lab-card").forEach((card) => {
        gsap.from(card.querySelector(".lab-media"), { clipPath: "inset(100% 0 0 0)", duration: 1.3, scrollTrigger: { trigger: card, start: "top 85%", once: true } });
        gsap.from(card.querySelectorAll(".lab-title .w"), { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: card, start: "top 70%", once: true } });
      });
    });
  });

  return (
    <section ref={root} id="lab" data-section="Creative Lab" className="relative z-10 overflow-hidden bg-ink">
      <div className="lab-track flex flex-col gap-24 py-24 md:h-[100svh] md:w-max md:flex-row md:items-center md:gap-[8vw] md:py-0 md:pl-[5vw] md:pr-[10vw]">
        {/* Intro panel */}
        <header className="container-x md:w-[38vw] md:px-0">
          <p className="eyebrow mb-6">(04) AI Creative Lab</p>
          <h2 className="display text-[16vw] md:text-[7.5vw]">
            Short films,<br /><span className="serif-em text-accent">made with</span><br />code + AI.
          </h2>
          <p className="mt-8 max-w-sm text-paper/70">
            Narrative reels on mythology, history and science — scripted, voiced with AI, animated in code and cut for the vertical feed.
          </p>
          <p className="mt-6 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:block">Scroll →</p>
        </header>

        {featured.map((p, i) => (
          <article key={p.id} className="lab-card group container-x grid gap-6 md:flex md:w-auto md:items-end md:gap-10 md:px-0">
            <button
              type="button"
              onClick={() => open(p.id)}
              data-cursor="play"
              aria-label={`Watch ${p.title}`}
              className="lab-media relative block aspect-[4/5] w-full overflow-hidden rounded-[10px] md:aspect-[9/16] md:h-[68svh] md:w-[38.25svh]"
            >
              <MediaFrame
                title={p.title}
                video={p.video}
                poster={p.poster}
                className="[&_.media-el]:scale-[1.18] [&_.media-el]:transition-transform [&_.media-el]:duration-[1.2s] [&_.media-el]:[transition-timing-function:var(--ease-out)] group-hover:[&_.media-el]:scale-[1.08]"
                slotLabel={`/public/media/${p.id}.mp4`}
                sizes="(min-width: 900px) 40vh, 90vw"
              />
              <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                {String(i + 1).padStart(2, "0")} — {p.aspect}
              </span>
            </button>

            <div className="md:w-[30vw] md:pb-2">
              <p className="eyebrow mb-4">{p.category}</p>
              <h3 className="lab-title display text-5xl transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-2 md:text-[4.2vw]">
                {p.title.split(" ").map((w, k) => (
                  <span key={k}><span className="mask"><span className="w">{w}</span></span> </span>
                ))}
              </h3>
              <p className="mt-6 max-w-md font-serif text-xl italic leading-snug text-paper/85 md:text-2xl">{p.concept}</p>
              <ul className="mt-6 flex flex-wrap gap-2 transition-opacity duration-500 md:opacity-60 md:group-hover:opacity-100" aria-label="AI and tools used">
                {p.technologies.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
              <div className="mt-8 flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
                <button type="button" onClick={() => open(p.id)} data-cursor="play" className="link-u text-accent">[ Watch ]</button>
                <button type="button" onClick={() => open(p.id, "process")} data-cursor="view" className="link-u">[ View process ]</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
