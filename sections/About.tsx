"use client";

import { gsap, MQ, useGsap } from "@/animations/gsap";
import { SplitText } from "@/components/SplitText";
import { background, certifications, experience, profile } from "@/data/profile";

export function About() {
  const root = useGsap<HTMLElement>(({ root, mm }) => {
    const q = gsap.utils.selector(root);
    mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
      gsap.fromTo(q(".a-statement .w"), { opacity: 0.1 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: q(".a-statement")[0], start: "top 80%", end: "bottom 50%", scrub: true } });
      gsap.from(q(".bg-col"), { y: 40, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: q(".bg-grid")[0], start: "top 80%", once: true } });
    });
  });

  return (
    <section ref={root} id="about" data-section="About" className="relative z-10 bg-ink py-24 md:py-40">
      <div className="container-x">
        <p className="eyebrow mb-10">(07) About</p>
        <h2 className="sr-only">About Vedant</h2>
        <SplitText as="p" className="a-statement display max-w-[15ch] text-[11vw] md:text-[6.4vw]" text={profile.statement} />

        <div className="bg-grid mt-20 grid border-t border-line md:mt-32 md:grid-cols-4">
          {background.map((b, i) => (
            <div key={b.title} className="bg-col relative border-b border-line py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0">
              <span className="font-mono text-xs text-accent">{i === 0 ? "" : "+ "}{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-3 text-paper/70">{b.text}</p>
            </div>
          ))}
        </div>

        <dl className="mt-16 grid gap-10 text-sm md:mt-24 md:grid-cols-3">
          <div>
            <dt className="eyebrow mb-3">Education</dt>
            <dd>{profile.education.degree}<br /><span className="text-paper/60">{profile.education.school} — {profile.education.year}</span></dd>
          </div>
          <div>
            <dt className="eyebrow mb-3">Virtual experience</dt>
            {experience.map((e) => <dd key={e.org}>{e.org} <span className="text-paper/60">— {e.role} ({e.via})</span></dd>)}
          </div>
          <div>
            <dt className="eyebrow mb-3">Certifications</dt>
            {certifications.map((c) => <dd key={c} className="text-paper/80">{c}</dd>)}
          </div>
        </dl>
      </div>
    </section>
  );
}
