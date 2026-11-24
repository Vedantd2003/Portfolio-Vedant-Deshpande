"use client";

import Image from "next/image";
import { gsap, MQ, useGsap } from "@/animations/gsap";
import { engineeringProjects, type Project } from "@/data/projects";

/** Typographic "spec plate" used when a project has no screenshot yet. */
function SpecPlate({ p }: { p: Project }) {
  return (
    <div className="placeholder-media absolute inset-0 overflow-hidden">
      <span className="display absolute -bottom-[0.18em] -left-[0.04em] text-[34vw] leading-none text-paper/[0.06] md:text-[17vw]" aria-hidden="true">
        {p.title}
      </span>
      <pre className="absolute left-6 top-6 font-mono text-[11px] leading-6 text-paper/70 md:left-8 md:top-8 md:text-xs">
        {`$ ${p.id} --stack\n`}
        {p.technologies.map((t) => `  › ${t}`).join("\n")}
      </pre>
      <span className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent md:bottom-8 md:right-8">● running</span>
    </div>
  );
}

function Chapter({ p, index }: { p: Project; index: number }) {
  return (
    <article className="eng-chapter grid gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-8 md:py-28">
      <header className="md:sticky md:top-28 md:col-span-5 md:self-start">
        <p className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="eng-title display mt-3 text-[15vw] md:text-[6.2vw]">
          <span className="mask"><span className="w">{p.title}</span></span>
        </h3>
        <p className="eyebrow mt-4">{p.category}</p>
        {(p.live || p.github) && (
          <div className="mt-8 flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" data-cursor="link" className="link-u text-accent">Live ↗</a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" data-cursor="link" className="link-u">GitHub ↗</a>}
          </div>
        )}
      </header>

      <div className="md:col-span-7">
        <div className="eng-visual relative aspect-[16/10] overflow-hidden rounded-[10px] border border-line" data-cursor={p.live ? "view" : undefined}>
          <div className="eng-visual-inner absolute inset-0">
            {p.poster ? <Image src={p.poster} alt={`${p.title} screenshot`} fill sizes="(min-width: 900px) 55vw, 90vw" className="object-cover" /> : <SpecPlate p={p} />}
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="font-serif text-2xl italic leading-snug md:text-[1.9rem]">{p.story}</p>
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">What I built</p>
              <ul className="space-y-2 text-[15px] text-paper/80">
                {p.built?.map((b) => <li key={b} className="flex gap-3"><span className="text-accent">—</span>{b}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Technology</p>
              <ul className="flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
            </div>
            {p.result && (
              <div>
                <p className="eyebrow mb-2">Result</p>
                <p className="text-paper/80">{p.result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Editorial chapters instead of a card grid. Visuals open with a scrubbed clip reveal. */
export function EngineeringLab() {
  const root = useGsap<HTMLElement>(({ root, mm }) => {
    const q = gsap.utils.selector(root);
    gsap.from(q(".eng-head .w"), { yPercent: 110, stagger: 0.06, scrollTrigger: { trigger: root, start: "top 75%", once: true } });

    mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
      q(".eng-chapter").forEach((ch) => {
        gsap.fromTo(ch.querySelector(".eng-visual"), { clipPath: "inset(18% 12% 18% 12% round 10px)" }, { clipPath: "inset(0% 0% 0% 0% round 10px)", ease: "none", scrollTrigger: { trigger: ch, start: "top 90%", end: "top 30%", scrub: 0.6 } });
        gsap.fromTo(ch.querySelector(".eng-visual-inner"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ch, start: "top 90%", end: "top 30%", scrub: 0.6 } });
        gsap.from(ch.querySelectorAll(".eng-title .w"), { yPercent: 110, duration: 1.2, scrollTrigger: { trigger: ch, start: "top 75%", once: true } });
      });
    });
  });

  return (
    <section ref={root} id="engineering" data-section="Engineering" className="relative z-10 bg-ink pt-24 md:pt-40">
      <div className="container-x">
        <div className="eng-head mb-16 grid gap-6 md:mb-24 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">(06) Engineering Lab</p>
          <h2 className="display text-[15vw] md:col-span-9 md:text-[8vw]">
            <span className="mask"><span className="w">Built</span></span> <span className="mask"><span className="w">with</span></span><br />
            <span className="mask"><span className="w serif-em em-creative">code</span></span> <span className="mask"><span className="w em-dev">+ AI.</span></span>
          </h2>
        </div>
        {engineeringProjects.map((p, i) => <Chapter key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}
