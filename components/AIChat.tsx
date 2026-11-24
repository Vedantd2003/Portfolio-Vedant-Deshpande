"use client";

import { useEffect, useRef, useState } from "react";

interface Message { role: "user" | "assistant"; content: string }

const STARTERS = ["What has Vedant built?", "Tell me about ARIA", "What AI skills does he have?", "Is he open to roles?"];
const WELCOME = "Ask me about Vedant's projects, AI work or availability. I answer only from what's on this site.";
const MAX_CHARS = 1000;

/** Portfolio assistant — talks to /api/ai-chat (Gemini, key kept server-side). */
export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight }); }, [messages, loading, error]);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);

  const request = async (history: Message[]) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) return setError(data.error || "Something went wrong. Please try again.");
      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const send = (text: string) => {
    const t = text.trim().slice(0, MAX_CHARS);
    if (!t || loading) return;
    const next = [...messages, { role: "user" as const, content: t }];
    setMessages(next);
    setInput("");
    void request(next);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ai-chat"
        aria-label={open ? "Close portfolio assistant" : "Ask the portfolio assistant"}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full border border-line bg-ink/80 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur-md transition-colors hover:border-accent md:bottom-8 md:right-8"
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
        {open ? "Close" : <><span className="sm:hidden">AI</span><span className="hidden sm:inline">Ask my AI</span></>}
      </button>

      {open && (
        <div
          id="ai-chat"
          role="dialog"
          aria-label="Portfolio assistant"
          data-lenis-prevent
          className="fixed bottom-20 right-3 z-[70] flex h-[min(560px,72svh)] w-[calc(100vw-24px)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-line bg-ink/95 shadow-2xl backdrop-blur-xl md:bottom-24 md:right-8"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="eyebrow !text-paper">Vedant&apos;s assistant</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Gemini</span>
          </div>
          <div ref={list} className="flex-1 space-y-3 overflow-y-auto px-5 py-4 text-sm" aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={m.role === "user" ? "ml-8 rounded-xl bg-accent px-3 py-2 text-ink" : "mr-8 text-paper/85"}>
                {m.content}
              </p>
            ))}
            {loading && <p className="font-mono text-xs text-muted">Thinking…</p>}
            {error && (
              <p className="text-xs text-accent">
                {error}{" "}
                <button type="button" className="underline" onClick={() => request(messages)}>Retry</button>
              </p>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {STARTERS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="chip hover:border-accent hover:text-accent">{s}</button>
                ))}
              </div>
            )}
          </div>
          <form className="flex gap-2 border-t border-line p-3" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label htmlFor="ai-chat-input" className="sr-only">Your question</label>
            <input
              id="ai-chat-input"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_CHARS}
              placeholder="Ask anything about Vedant's work…"
              className="flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <button type="submit" disabled={loading || !input.trim()} className="rounded-full bg-accent px-4 font-mono text-[11px] uppercase tracking-wider text-ink disabled:opacity-40">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
