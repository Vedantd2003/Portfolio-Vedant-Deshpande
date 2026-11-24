"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { creativeProjects, type Project } from "@/data/projects";
import { MediaFrame } from "./MediaFrame";

type Panel = "info" | "process";
interface ReelCtx { open: (id: string, panel?: Panel) => void }
const Ctx = createContext<ReelCtx>({ open: () => {} });
export const useReel = () => useContext(Ctx);

export function ReelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ index: number; panel: Panel } | null>(null);
  const open = useCallback((id: string, panel: Panel = "info") => {
    const index = creativeProjects.findIndex((p) => p.id === id);
    if (index >= 0) setState({ index, panel });
  }, []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {state && <Viewer key={state.index} startIndex={state.index} panel={state.panel} onClose={() => setState(null)} onGo={(i) => setState({ index: i, panel: "info" })} />}
    </Ctx.Provider>
  );
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Fullscreen 9:16 viewer — the only place a reel loads with sound. */
function Viewer({ startIndex, panel: initialPanel, onClose, onGo }: { startIndex: number; panel: Panel; onClose: () => void; onGo: (i: number) => void }) {
  const p: Project = creativeProjects[startIndex];
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [panel, setPanel] = useState<Panel>(initialPanel);
  const total = creativeProjects.length;
  const go = (d: number) => onGo((startIndex + d + total) % total);

  const close = useCallback(() => {
    if (!root.current || prefersReducedMotion()) return onClose();
    gsap.to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "expo.in", onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    if (root.current && !prefersReducedMotion())
      gsap.fromTo(root.current, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "expo.out" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " " && video.current) { e.preventDefault(); toggle(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prevFocus?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  const ctrl = "flex h-11 w-11 items-center justify-center rounded-full border border-line font-mono text-[11px] uppercase transition-colors hover:border-accent hover:text-accent disabled:opacity-30";

  return (
    <div ref={root} data-lenis-prevent role="dialog" aria-modal="true" aria-label={`${p.title} — reel viewer`} className="fixed inset-0 z-[85] overflow-y-auto bg-ink/95 backdrop-blur-sm">
      <div className="container-x flex min-h-full flex-col gap-8 py-6 md:flex-row md:items-center md:gap-14 md:py-10">
        {/* Player */}
        <div className="relative mx-auto aspect-[9/16] h-[72svh] max-h-[860px] shrink-0 overflow-hidden rounded-[14px] border border-line md:h-[86svh]">
          {p.video ? (
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover"
              src={p.video}
              poster={p.poster || undefined}
              playsInline
              autoPlay
              muted={muted}
              preload="auto"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
              onClick={toggle}
            />
          ) : (
            <MediaFrame title={p.title} poster={p.poster} slotLabel={`Add video → /public/media/${p.id}.mp4`} />
          )}
          {p.video && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-16">
            <div className="mb-3 h-[3px] cursor-pointer rounded bg-white/20" onClick={seek} role="presentation">
              <div className="h-full rounded bg-accent" style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }} />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-white/80">
              <div className="flex gap-2">
                <button type="button" className={ctrl} onClick={toggle} disabled={!p.video} aria-label={playing ? "Pause" : "Play"}>{playing ? "❚❚" : "▶"}</button>
                <button type="button" className={ctrl} onClick={() => setMuted((m) => !m)} disabled={!p.video} aria-label={muted ? "Unmute" : "Mute"}>{muted ? "🔇" : "🔊"}</button>
              </div>
              <span>{fmt(progress)} / {fmt(duration)}</span>
            </div>
          </div>}
        </div>

        {/* Case study */}
        <div className="flex-1 pb-10 md:pb-0">
          <p className="eyebrow mb-4">{String(startIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {p.category}</p>
          <h2 className="display text-4xl md:text-6xl">{p.title}</h2>
          <div className="mt-8 flex gap-6 border-b border-line font-mono text-[11px] uppercase tracking-[0.2em]" role="tablist">
            {(["info", "process"] as const).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={panel === t} onClick={() => setPanel(t)} className={`-mb-px border-b pb-3 ${panel === t ? "border-accent text-paper" : "border-transparent text-muted"}`}>
                {t === "info" ? "Concept" : "View case study"}
              </button>
            ))}
          </div>
          {panel === "info" ? (
            <div className="mt-6 max-w-xl space-y-5">
              <p className="font-serif text-2xl italic leading-snug md:text-3xl">{p.concept}</p>
              <p className="text-paper/70">{p.description}</p>
            </div>
          ) : (
            <ol className="mt-6 max-w-xl space-y-3">
              {p.process?.map((s, i) => (
                <li key={s} className="flex gap-4 border-b border-line pb-3"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><span className="text-paper/85">{s}</span></li>
              ))}
            </ol>
          )}
          <div className="mt-8 flex flex-wrap gap-2">{p.technologies.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          <div className="mt-10 flex gap-2">
            <button type="button" className={ctrl} onClick={() => go(-1)} aria-label="Previous reel">←</button>
            <button type="button" className={ctrl} onClick={() => go(1)} aria-label="Next reel">→</button>
          </div>
        </div>
      </div>
      <button ref={closeBtn} type="button" onClick={close} aria-label="Close viewer" className="fixed right-4 top-4 z-10 rounded-full border border-line bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-accent md:right-8 md:top-8">
        Close ✕
      </button>
    </div>
  );
}
