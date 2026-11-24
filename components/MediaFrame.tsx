"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/animations/gsap";

interface Props {
  title: string;
  video?: string;
  poster?: string;
  /** autoplay muted while on screen (inline previews) */
  autoPlayInView?: boolean;
  className?: string;
  sizes?: string;
  /** label shown on the placeholder so it's obvious where media goes */
  slotLabel?: string;
}

/**
 * Fills its (positioned, sized) parent.
 * Lazy media slot. Nothing downloads until the frame is near the viewport; the video only
 * gets a src once visible, and pauses when it leaves. With no media it renders a designed
 * placeholder rather than a broken element.
 */
export function MediaFrame({ title, video, poster, autoPlayInView = true, className = "", sizes = "50vw", slotLabel }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        const v = vid.current;
        if (!v || !autoPlayInView || prefersReducedMotion()) return;
        if (e.intersectionRatio > 0.5) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px 0px", threshold: [0, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlayInView]);

  const hasVideo = !!video && !failed;
  return (
    <div ref={wrap} className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {poster ? (
        <Image src={poster} alt={title} fill sizes={sizes} className="media-el object-cover" />
      ) : !hasVideo ? (
        <div className="media-el placeholder-media absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
            <span>{process.env.NODE_ENV === "production" ? "Preview soon" : slotLabel ?? "Media slot"}</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />Rec</span>
          </div>
        </div>
      ) : null}
      {hasVideo && near && (
        <video
          ref={vid}
          className="media-el absolute inset-0 h-full w-full object-cover"
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
