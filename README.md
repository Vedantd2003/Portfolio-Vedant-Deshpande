# Vedant Deshpande — Portfolio

Personal portfolio site for Vedant Deshpande, a Full-Stack AI Developer (B.Tech Electronics Engineering, MIT Academy of Engineering, 2025).

## The Problem

A static resume doesn't show how I build — interactive, AI-integrated, production-shaped products. This site is itself one of those products: a 3D-animated, AI-assisted portfolio that doubles as a live demo of the stack I work in.

## Demo

[TODO: add live deploy link]

<!-- TODO: add screenshot -->
![Screenshot](./docs/screenshot.png)

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-React_Three_Fiber-black?logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-0055FF)

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **3D/WebGL:** Three.js via `@react-three/fiber` and `@react-three/drei` for the hero scene
- **Animation:** Framer Motion for scroll-triggered section transitions
- **Styling:** Tailwind CSS with `clsx` / `tailwind-merge` utilities
- **Forms:** React Hook Form + Zod validation, Nodemailer for the contact form backend
- **Icons:** Lucide React

## Architecture

- `app/page.tsx` composes the single-page layout: Navigation, Hero, About, Projects, FeaturedProject, Skills, Contact, Footer, and a floating AIChat widget.
- `components/three/HeroScene.tsx` renders the 3D hero visualization with React Three Fiber.
- `components/AIChat.tsx` is an AI-assisted chat widget backed by `app/api/ai-chat/route.ts`.
- `app/api/contact/route.ts` handles the contact form submission via Nodemailer.
- `lib/data.ts` centralizes all content — personal info, skills, focus areas, experience, certifications, and the project showcase — so the UI components stay presentation-only.

## Features

- **3D animated hero** built with Three.js / React Three Fiber
- **AI chat widget** for visitor Q&A about the portfolio (`/api/ai-chat`)
- **Project showcase** highlighting shipped work, including KagazBol, NeuralVault, and other AI/full-stack builds
- **Skills section** broken down by category (Backend & Database, AI & LLM, Security & DevOps, etc.)
- **Contact form** with server-side email delivery via Nodemailer
- **Scroll-triggered animations** throughout via Framer Motion

## Local Setup

```bash
git clone https://github.com/Vedantd2003/Portfolio-Vedant-Deshpande.git
cd Portfolio-Vedant-Deshpande
npm install
cp .env.local.example .env.local   # fill in Nodemailer / AI chat credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What I Learned

1. Integrating Three.js/React Three Fiber into a Next.js App Router project while keeping the hero scene performant alongside scroll animations.
2. Structuring all portfolio content (`lib/data.ts`) as typed data rather than hardcoding it into components, making the site easy to update as new projects ship.
3. Wiring a small AI chat feature and a server-side contact form into a primarily static site using Next.js Route Handlers.
