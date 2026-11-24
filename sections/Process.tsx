"use client";

import { gsap, MQ, useGsap } from "@/animations/gsap";
import { processSteps } from "@/data/profile";

/** Pinned on desktop: a progress line runs across five steps and lights each one in turn. */
export function Process() {
  const root = useGsap<HTMLElement>(({ root, mm }) => {
    const q = gsap.utils.selector(root);
    const steps = q(".step");

    mm.add(MQ.desktop, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=110%", pin: true, scrub: 0.6 } });
      tl.fromTo(q(".p-line"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: steps.length }, 0);
      steps.forEach((s, i) => tl.fromTo(s, { opacity: 0.18 }, { opacity: 1, duration: 0.4 }, i * 0.95));
    });

    mm.add(MQ.mobile, () => {
      steps.forEach((s) => gsap.from(s, { opacity: 0.15, x: -20, duration: 1, scrollTrigger: { trigger: s, start: "top 80%", once: true } }));
    });
  });

  return (
    <section ref={root} data-section="Process" className="relative z-10 flex min-h-[100svh] flex-col justify-center bg-ink py-24">
      <div className="container-x">
        <p className="eyebrow mb-4">(07) Process</p>
        <h2 className="display text-[13vw] md:text-[6vw]">Idea → <span className="serif-em text-accent">shipped.</span></h2>
        <div className="relative mt-16 md:mt-24">
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-line md:block" />
          <div className="p-line absolute left-0 right-0 top-0 hidden h-px origin-left bg-accent md:block" />
          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {processSteps.map((s, i) => (
              <li key={s.title} className="step border-l border-line pl-5 md:border-l-0 md:pl-0 md:pt-8">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-[2.1vw]">{s.title}</h3>
                <p className="mt-3 max-w-xs text-paper/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
