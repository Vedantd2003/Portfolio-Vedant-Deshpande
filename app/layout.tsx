import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedant Deshpande — Full-Stack AI Developer",
  description:
    "Full-Stack AI Developer building production-ready SaaS platforms with MERN stack, Next.js, and LLM APIs. Available for full-stack and AI developer roles.",
  keywords: [
    "Full-Stack Developer",
    "AI Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "LLM Integration",
    "OpenAI",
    "Gemini AI",
    "SaaS",
    "Vedant Deshpande",
  ],
  authors: [{ name: "Vedant Deshpande", url: "https://github.com/Vedantd2003" }],
  openGraph: {
    title: "Vedant Deshpande — Full-Stack AI Developer",
    description:
      "Designing intelligent experiences, not just interfaces. MERN + LLM + 3D WebGL.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedant Deshpande — Full-Stack AI Developer",
    description: "Designing intelligent experiences, not just interfaces.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#030712] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
