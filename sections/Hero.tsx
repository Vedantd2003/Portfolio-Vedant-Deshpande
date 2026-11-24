"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ, prefersReducedMotion, useGsap } from "@/animations/gsap";
import { Magnetic } from "@/components/Magnetic";
import { useMode } from "@/components/ModeProvider";
import { ShaderCanvas } from "@/components/ShaderCanvas";
import { modes, profile } from "@/data/profile";

/** Where the film frame sits before it expands (px insets from each viewport edge). */
function frameInsets(desktop: boolean) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (desktop) {
    const fw = w * 0.44;
    const fh = fw / 2.39;
    return { t: h - h * 0.12 - fh, r: w * 0.05, b: h * 0.12, l: w - w * 0.05 - fw };
  }
  const fw = w * 0.9;
  const fh = fw / 1.5;
  return { t: h * 0.6, r: w * 0.05, b: Math.max(16, h - h * 0.6 - fh), l: w * 0.05 };
}
const clip = (i: { t: number; r: number; b: number; l: number }, round = 6) =>
  `inset(${i.t}px ${i.r}px ${i.b}px ${i.l}px round ${round}px)`;

function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let f = 0;
    const id = window.setInterval(() => {
      f++;
      const s = Math.floor(f / 24);
      if (ref.current)
        ref.current.textContent = `00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(f % 24).padStart(2, "0")}`;
    }, 1000 / 24);
    return () => window.clearInterval(id);
  }, []);
  return <span ref={ref}>00:00:00:00</span>;
}

export function Hero() {
  const { mode } = useMode();

  const root = useGsap<HTMLElement>(({ root, mm }) => {
    const q = gsap.utils.selector(root);
    const frame = q(".hero-frame")[0];

    const intro = (desktop: boolean) => {
      const tl = gsap.timeline({ paused: true });
      tl.from(q(".hero-word"), { yPercent: 115, duration: 1.3, stagger: 0.07 })
        .fromTo(frame, { clipPath: clip({ ...frameInsets(desktop), t: frameInsets(desktop).t + 60, b: frameInsets(desktop).b + 60 }) }, { clipPath: clip(frameInsets(desktop)), duration: 1.4 }, 0.15)
        .from(q(".hero-fade"), { autoAlpha: 0, y: 16, stagger: 0.06, duration: 1 }, 0.4);
      const play = () => tl.play();
      window.addEventListener("intro:start", play, { once: true });
      const fallback = window.setTimeout(play, 1800);
      return () => { window.removeEventListener("intro:start", play); window.clearTimeout(fallback); };
    };

    mm.add(MQ.desktop, () => {
      gsap.set(frame, { clipPath: () => clip(frameInsets(true)) });
      const stop = intro(true);

      gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "+=130%", pin: true, scrub: 0.8, invalidateOnRefresh: true },
      })
        .fromTo(frame, { clipPath: () => clip(frameInsets(true)) }, { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .to(q(".hero-l1"), { yPercent: -70, autoAlpha: 0, ease: "none", duration: 0.6 }, 0)
        .to(q(".hero-l2"), { yPercent: -110, autoAlpha: 0, ease: "none", duration: 0.6 }, 0.04)
        .to(q(".hero-l3"), { yPercent: -150, autoAlpha: 0, ease: "none", duration: 0.6 }, 0.08)
        .to(q(".hero-fade"), { autoAlpha: 0, duration: 0.3 }, 0)
        .from(q(".hero-next .w"), { yPercent: 110, stagger: 0.05, duration: 0.35, ease: "expo.out" }, 0.62)
        .to({}, { duration: 0.25 });

      // Cursor parallax: three type layers + the frame move at different depths.
      const layers = [".hero-l1", ".hero-l2", ".hero-l3", ".hero-frame-inner"].map((s, i) => ({
        x: gsap.quickTo(q(s), "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(q(s), "y", { duration: 1.2, ease: "power3" }),
        depth: [10, 18, 26, -14][i],
      }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => { l.x(nx * l.depth); l.y(ny * l.depth * 0.6); });
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => { stop(); window.removeEventListener("pointermove", move); };
    });

    mm.add(MQ.mobile, () => {
      gsap.set(frame, { clipPath: () => clip(frameInsets(false)) });
      const stop = intro(false);
      gsap.to(q(".hero-type"), { yPercent: -25, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } });
      return stop;
    });

    mm.add(MQ.reduced, () => {
      gsap.set(frame, { clipPath: () => clip(frameInsets(window.innerWidth >= 900)) });
    });
  });

  return (
    <section ref={root} id="top" data-section="Intro" className="relative h-[100svh] min-h-[560px] overflow-hidden">
      {/* Film frame — full-viewport canvas revealed through an animated clip-path */}
      <div className="hero-frame absolute inset-0 z-0" style={{ clipPath: "inset(60% 5% 12% 51% round 6px)" }}>
        <div className="hero-frame-inner absolute -inset-6">
          <ShaderCanvas />
        </div>
        <div className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
          <div className="absolute left-[3%] top-[4%] flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />Rec — Scene 01</div>
          <div className="absolute right-[3%] top-[4%]"><Timecode /></div>
          <div className="absolute bottom-[4%] left-[3%]">2.39 : 1 — 24 fps</div>
          <div className="absolute bottom-[4%] right-[3%]">Code × AI</div>
        </div>
        <div className="hero-next pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="display text-center text-[16vw] text-white md:text-[13vw]" aria-hidden="true">
            <span className="mask"><span className="w">Code</span></span>{" "}
            <span className="mask"><span className="w serif-em text-accent">×</span></span>{" "}
            <span className="mask"><span className="w">AI</span></span>
          </p>
        </div>
      </div>

      {/* Type */}
      <div className="hero-type container-x relative z-10 flex h-full flex-col pb-8 pt-24 md:pb-10 md:pt-32">
        <p className="hero-fade eyebrow">{profile.name} — {profile.headline} · {profile.location}</p>
        <h1 className="display mt-6 text-[17vw] md:mt-8 md:text-[9.4vw]">
          <span className="hero-l1 block"><span className="mask"><span className="hero-word">Software</span></span></span>
          <span className="hero-l2 block"><span className="mask"><span className="hero-word em-dev">that thinks.</span></span></span>
          <span className="hero-l3 block"><span className="mask"><span className="hero-word serif-em em-creative">Stories that move.</span></span></span>
        </h1>

        <div className="mt-auto grid gap-6 md:max-w-[44vw]">
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-paper/75 md:text-base">
            Recent B.Tech graduate. I build full-stack AI products, and I make AI-generated films and reels.
            <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-accent" aria-live="polite">
              {modes[mode].label} mode — {modes[mode].line}
            </span>
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <Magnetic>
              <a href="#lab" data-cursor="explore" className="inline-flex rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Watch the work</a>
            </Magnetic>
            <Magnetic>
              <a href="#engineering" className="inline-flex rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-paper">See the code</a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
