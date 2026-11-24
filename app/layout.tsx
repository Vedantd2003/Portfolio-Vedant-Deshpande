import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL, profile } from "@/data/profile";
import "./globals.css";

// Self-hosted (OFL-licensed) fonts: no build-time network fetch, no layout shift.
const sans = localFont({ src: "./fonts/inter-tight-latin-wght-normal.woff2", weight: "100 900", variable: "--font-sans", display: "swap" });
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", style: "italic" },
  ],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});
const mono = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", variable: "--font-mono", display: "swap" });

const title = `${profile.name} — AI Developer, Full-Stack Developer & AI Video Creator`;
const description =
  "Portfolio of Vedant Deshpande: full-stack + AI developer (React, Next.js, Node.js, Python) who also creates AI-generated video, reels and generative visuals. Creative technologist based in Pune.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ["AI Developer", "Full Stack Developer", "AI Video", "Generative AI", "Creative Developer", "AI Creative Technologist", "React", "Next.js", profile.name],
  authors: [{ name: profile.name, url: profile.github }],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: SITE_URL, siteName: profile.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0c0a09", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: "AI Developer & Creative Technologist",
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  alumniOf: profile.education.school,
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-mode="creative" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only z-[200] rounded bg-accent px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
