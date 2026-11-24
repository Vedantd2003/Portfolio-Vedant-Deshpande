# Vedant Deshpande — Portfolio

**Software that thinks. Stories that move.**

The personal portfolio of Vedant Deshpande, a full-stack + AI developer who also makes AI-generated films and reels. The site makes one point: I build the product, and I make the content too.

**Live:** https://portfolio-vedant-deshpande.onrender.com/

## Features

- **Cinematic hero.** A letterboxed film frame (a raw WebGL shader that reacts to the cursor) expands to fill the screen as you scroll, then hands off to the next section.
- **Developer ↔ Creative mode.** A full-screen wipe swaps the site's design tokens: accent colour, grain, engineering grid and shader palette. Every section re-themes.
- **AI Creative Lab.** A pinned, horizontally scrolling strip of short-film case studies, with media drifting inside each frame.
- **Reel viewer.** Vertical 9:16 presentation with play/pause, mute, a seekable progress bar, keyboard controls (Space, ←/→, Esc), a concept panel and a process case study.
- **Engineering Lab.** Each project is an editorial chapter: story, what I built, stack, result, and links.
- **Skills ecosystem.** An animated graph on desktop and a tree view on mobile.
- **Portfolio assistant.** A Gemini-backed chat that answers only from the site's own data.
- **Custom cursor.** Context labels (Play, View, Explore, ↗), magnetic buttons, masked type reveals and a short loader (about 1.2 s).

## Tech Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis · raw WebGL (no Three.js) · Zod

## Animation System

- `animations/gsap.ts` contains `useGsap()`, which wraps every section in a `gsap.context` plus `gsap.matchMedia`. All ScrollTriggers are reverted on unmount, and each section declares separate **desktop**, **mobile** and **reduced-motion** behaviour.
- Lenis smooth scrolling runs only on desktop, synced to the GSAP ticker. Touch devices keep native scrolling.
- Only transforms, opacity and `clip-path` are animated, so motion stays on the GPU.
- `prefers-reduced-motion` turns off pinning, parallax, the cursor, Lenis and the shader loop (the shader draws one still frame). The site stays fully usable.
- The shader renders at 35–50% resolution and pauses when it's off-screen or the tab is hidden.

## Content & Media

All content lives in typed data files:

- `data/projects.ts` holds every project. `type: "creative" | "engineering"` decides where it appears.
- `data/profile.ts` holds bio, links, modes and process.
- `data/skills.ts` holds the ecosystem clusters.

**Adding a reel:** put a compressed MP4 (H.264, ~720×1280, under 8 MB) and a WebP poster in `public/media/`, then set `video: "/media/<id>.mp4"` and `poster: "/media/<id>.webp"` on the entry. Videos load only when they're near the viewport, play muted while on screen, and get sound only in the viewer. Entries without media show a designed placeholder.

## Local Development

```bash
npm install
cp .env.local.example .env.local   # add GEMINI_API_KEY for the chat assistant
npm run dev                        # http://localhost:3000
```

## Deployment (Render)

This repo runs as a Render **Web Service**, and `render.yaml` documents the setup.

| Setting | Value |
| --- | --- |
| Build command | `npm install && npm run build` |
| Start command | `npm start` |
| Env vars | `GEMINI_API_KEY` (required for chat), `GEMINI_MODEL` (optional) |

Every push to `main` redeploys automatically. Fonts are self-hosted in `app/fonts`, so the build makes no external network calls.

## Project Structure

```
app/          layout, page, SEO routes (sitemap, robots, OG image, icon), /api/ai-chat
sections/     Hero, Manifesto, ModeSwitch, CreativeLab, Showreel, EngineeringLab, Process, About, Ecosystem, Contact
components/   ModeProvider, ReelViewer, MediaFrame, ShaderCanvas, Cursor, Loader, Nav, Magnetic, SplitText, AIChat, SmoothScroll
animations/   GSAP setup, useGsap hook, motion helpers
data/         profile, projects, skills
lib/          assistant knowledge builder
public/       media slots and project images
```
