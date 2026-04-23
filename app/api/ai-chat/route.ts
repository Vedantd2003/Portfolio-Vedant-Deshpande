import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Vedant Deshpande's portfolio AI assistant. Answer questions about Vedant's work, projects, and skills in a friendly, concise manner. Keep responses under 3 sentences.

About Vedant:
- Full-Stack AI Developer and B.Tech Electronics Engineering graduate from MIT Academy of Engineering, Alandi, Pune (2025)
- Specializes in MERN stack, Next.js, LLM integration (OpenAI GPT-4, Google Gemini), and 3D WebGL (Three.js, React Three Fiber)
- Email: vdeshpande674@gmail.com | Location: Alandi, Pune

Key Projects:
1. Nebula AI Studio - Enterprise AI Content SaaS with Gemini AI, 5+ content types, JWT auth
2. BrandGenome AI - GPT-4 SaaS with 3D DNA Helix visualization at 60fps WebGL
3. AI Resume Copilot - Resume analysis, JD matching, cover letter generation with voice AI (Vapi), reduced job-prep effort ~80%
4. AIAssis - Voice-first AI mock interview platform with 99%+ transcript accuracy
5. 3D Apple Vision Landing Page - Scroll-based 60fps 3D experience with GSAP

Skills: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, Firebase, Three.js, GSAP, Framer Motion, OpenAI API, Gemini AI, Vapi AI, JWT, OAuth 2.0, Docker, Git, Zod, Prompt Engineering

Internships: J.P. Morgan (Forage, 2026), Deloitte (Forage, 2026)
Certifications: UI/UX Design (SimpliLearn), Frontend Domination (Sheriyans), Delta MERN Stack (Apna College)

If asked about hiring or collaboration, encourage the visitor to use the contact form or email Vedant directly. Stay focused on Vedant's work — redirect off-topic questions back to the portfolio.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured. Please contact Vedant directly." },
        { status: 503 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Vedant Deshpande Portfolio",
      },
      body: JSON.stringify({
        model: "anthropic/claude-haiku-4-5",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-8),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please try again in a moment." },
          { status: 429 }
        );
      }
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      {
        error:
          "AI temporarily unavailable. Feel free to email vdeshpande674@gmail.com directly!",
      },
      { status: 500 }
    );
  }
}
