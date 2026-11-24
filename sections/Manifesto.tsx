"use client";

import { gsap, MQ, ScrollTrigger, useGsap } from "@/animations/gsap";
import { SplitText } from "@/components/SplitText";

const ROW = ["Code", "AI", "Motion", "Story"];

function Row({ serif = false }: { serif?: boolean }) {
  const items = [...ROW, ...ROW, ...ROW];
  return (
    <div className={`flex whitespace-nowrap ${serif ? "serif-em text-accent" : ""}`} aria-hidden="true">
      {items.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[2vw]">{w}</span>
          <span className="font-serif text-[0.5em] italic text-paper/40">×</span>
        </span>
      ))}
    </div>
  );
}

/** Kinetic type: two rows drift against each other with scroll and skew with scroll velocity. */
export function Manifesto() {
  const root = useGsap<HTMLElement>(({ root, mm }) => {
    const q = gsap.utils.selector(root);
    mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
      gsap.fromTo(q(".row-a"), { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 } });
      gsap.fromTo(q(".row-b"), { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 } });

      const skew = gsap.quickTo(q(".rows"), "skewX", { duration: 0.6, ease: "power3" });
      ScrollTrigger.create({
        trigger: root,
        onUpdate: (s) => skew(gsap.utils.clamp(-8, 8, s.getVelocity() / -300)),
      });

      gsap.fromTo(q(".m-statement .w"), { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: q(".m-statement")[0], start: "top 85%", end: "bottom 55%", scrub: true } });
    });
  });

  return (
    <section ref={root} data-section="Manifesto" className="relative z-10 overflow-hidden bg-ink py-24 md:py-40">
      <h2 className="sr-only">Code, AI, motion and story</h2>
      <div className="rows display text-[22vw] md:text-[13vw]">
        <div className="row-a"><Row /></div>
        <div className="row-b -mt-[2vw]"><Row serif /></div>
      </div>
      <div className="container-x mt-20 grid gap-8 md:mt-32 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">(01) Positioning</p>
        <SplitText
          as="p"
          className="m-statement text-3xl font-medium leading-[1.12] tracking-tight md:col-span-9 md:text-[3.6vw]"
          text="Most portfolios pick a side. This one doesn't. I write the code that runs the product — and I direct the AI that makes the picture."
        />
      </div>
    </section>
  );
}
