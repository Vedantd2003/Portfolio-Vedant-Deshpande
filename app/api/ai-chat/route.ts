import { NextResponse } from "next/server";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/assistant-context";

/**
 * Portfolio assistant backed by Google Gemini (generateContent REST API).
 * The key stays on the server (GEMINI_API_KEY, never NEXT_PUBLIC_*). Visitor messages are not stored or logged.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GEMINI_API_BASE exists only so tests can point at a local stub; production uses Google.
const GEMINI_BASE = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta";
/** Tried in order; a 404 (model retired or unavailable to this key) moves on to the next. */
const MODELS = [process.env.GEMINI_MODEL, "gemini-3.1-flash-lite", "gemini-flash-latest"].filter(
  (m, i, a): m is string => !!m && a.indexOf(m) === i,
);
const TIMEOUT_MS = 20_000;
const MAX_MESSAGE_CHARS = 1000;
const MAX_TOTAL_CHARS = 8000;
const MAX_TURNS = 12;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
      }),
    )
    .min(1)
    .max(40),
});

// ── Rate limit: in-memory, per client IP (the site runs as a single Render instance). ──
const WINDOWS = [
  { ms: 60_000, max: 8 },
  { ms: 24 * 60 * 60_000, max: 80 },
];
const hits = new Map<string, number[]>();
function rateLimited(ip: string): number | null {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOWS[1]!.ms);
  for (const w of WINDOWS) {
    const inWindow = list.filter((t) => now - t < w.ms);
    if (inWindow.length >= w.max) return Math.ceil((inWindow[0]! + w.ms - now) / 1000);
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (!v.some((t) => now - t < WINDOWS[1]!.ms)) hits.delete(k);
    });
  }
  return null;
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

const fail = (status: number, error: string, retryable: boolean, extra?: Record<string, string>) =>
  NextResponse.json({ error, retryable }, { status, headers: extra });

type GeminiContent = { role: "user" | "model"; parts: { text: string }[] };

async function callGemini(apiKey: string, contents: GeminiContent[]) {
  let lastStatus = 0;
  for (const model of MODELS) {
    const res = await fetch(`${GEMINI_BASE}/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: { maxOutputTokens: 450, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (res.status === 404) {
      lastStatus = 404;
      continue;
    }
    if (!res.ok) return { ok: false as const, status: res.status, model };
    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
      promptFeedback?: { blockReason?: string };
    };
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
    if (!text) return { ok: false as const, status: data.promptFeedback?.blockReason ? 451 : 502, model };
    return { ok: true as const, text, model };
  }
  return { ok: false as const, status: lastStatus || 502, model: MODELS.at(-1)! };
}

export async function POST(request: Request) {
  const retryAfter = rateLimited(clientIp(request));
  if (retryAfter !== null) return fail(429, "You're sending messages quickly. Please wait a moment and try again.", true, { "Retry-After": String(retryAfter) });

  let parsed;
  try {
    parsed = bodySchema.safeParse(await request.json());
  } catch {
    return fail(400, "Invalid request.", false);
  }
  if (!parsed.success) return fail(400, `Please send a message between 1 and ${MAX_MESSAGE_CHARS} characters.`, false);

  // Keep the most recent turns within the size budget; Gemini needs the conversation to start with a user turn.
  const turns = parsed.data.messages.slice(-MAX_TURNS);
  while (turns.length && turns[0]!.role !== "user") turns.shift();
  let total = 0;
  const kept: typeof turns = [];
  for (let i = turns.length - 1; i >= 0; i--) {
    total += turns[i]!.content.length;
    if (total > MAX_TOTAL_CHARS) break;
    kept.unshift(turns[i]!);
  }
  while (kept.length && kept[0]!.role !== "user") kept.shift();
  if (!kept.length || kept.at(-1)!.role !== "user") return fail(400, "The last message must be from you.", false);

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error("ai-chat: GEMINI_API_KEY is not set");
    return fail(503, "The AI assistant isn't configured yet. You can email Vedant at vdeshpande674@gmail.com.", false);
  }

  try {
    const contents: GeminiContent[] = kept.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
    const r = await callGemini(apiKey, contents);
    if (r.ok) return NextResponse.json({ reply: r.text.replace(/\*\*/g, "") });

    // Log status codes only — never the key or the visitor's messages.
    console.error(`ai-chat: Gemini request failed (status ${r.status}, model ${r.model})`);
    if (r.status === 429) return fail(429, "The assistant is busy right now. Please try again in a few seconds.", true);
    if (r.status === 451) return fail(422, "I can't help with that one. Try asking about Vedant's projects or skills.", false);
    return fail(503, "The AI assistant is temporarily unavailable. Please try again, or email vdeshpande674@gmail.com.", true);
  } catch (e) {
    const timeout = (e as Error).name === "TimeoutError";
    console.error(`ai-chat: ${timeout ? "Gemini timed out" : "Gemini unreachable"}`);
    return fail(504, "The assistant took too long to answer. Please try again.", true);
  }
}
