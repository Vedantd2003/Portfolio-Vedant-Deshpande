"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, RotateCcw, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_MESSAGES = [
  "What projects has Vedant built?",
  "Tell me about AlphaPulse AI",
  "What AI/LLM skills does Vedant have?",
  "Is Vedant open to job opportunities?",
];

const MAX_CHARS = 1000;

const WELCOME =
  "Hey there! 👋 I'm Vedant's AI assistant. Ask me anything about his work, skills, projects, or availability for roles!";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ text: string; retryable: boolean } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: WELCOME }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, error]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /** Sends the conversation (without the local welcome line) and appends the reply. */
  const request = async (history: Message[]) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.filter((m, i) => !(i === 0 && m.content === WELCOME)) }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string; retryable?: boolean };
      if (!res.ok || !data.reply) {
        setError({ text: data.error || "Something went wrong. Please try again.", retryable: data.retryable ?? res.status >= 500 });
        return;
      }
      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch {
      setError({ text: "Couldn't reach the assistant. Check your connection and try again.", retryable: true });
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

  const retry = () => {
    if (!loading && messages.at(-1)?.role === "user") void request(messages);
  };

  const reset = () => {
    if (loading) return;
    setError(null);
    setInput("");
    setMessages([{ role: "assistant", content: WELCOME }]);
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center text-white"
        whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(139,92,246,0.7)" }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: open ? 180 : 0 }}
        aria-label={open ? "Close AI chat" : "Chat with AI about Vedant"}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={20} /> : <MessageCircle size={20} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Unread dot */}
      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[72px] right-6 z-50 w-3 h-3 bg-green-400 rounded-full border-2 border-[#030712] animate-pulse"
        />
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-labelledby="ai-chat-title"
            // !fixed: the .liquid-glass rule sets position: relative, which otherwise pins the panel to the page bottom
            className="!fixed bottom-24 right-3 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl liquid-glass glass-strong shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
            style={{ maxHeight: "min(500px, 70vh)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600/90 to-blue-600/90 backdrop-blur-xl px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p id="ai-chat-title" className="text-white font-semibold text-sm">Ask about Vedant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-white/70 text-xs">AI assistant · Answers from his portfolio</p>
                </div>
              </div>
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={reset}
                  disabled={loading}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-40 transition-colors"
                  aria-label="Start a new conversation"
                  title="New conversation"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth" aria-live="polite">
              {/* Starter chips (only when just welcome) */}
              {messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 pb-1"
                >
                  {STARTER_MESSAGES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-lg glass border border-white/10 hover:border-violet-500/40 text-slate-300 hover:text-violet-300 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-white ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-violet-600 to-blue-600"
                        : "bg-slate-700"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={13} />
                    ) : (
                      <User size={13} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-violet-600/80 to-blue-600/80 text-white rounded-tr-sm"
                        : "bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Error with retry */}
              {error && !loading && (
                <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-200">
                  <p>{error.text}</p>
                  {error.retryable && messages.at(-1)?.role === "user" && (
                    <button
                      type="button"
                      onClick={retry}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/20 transition-colors"
                    >
                      <RefreshCw size={12} aria-hidden /> Try again
                    </button>
                  )}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/[0.08] flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                  maxLength={MAX_CHARS}
                  aria-label="Message the portfolio assistant"
                  onKeyDown={handleKey}
                  rows={1}
                  placeholder="Ask anything about Vedant…"
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-600 text-sm outline-none resize-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all max-h-24 overflow-y-auto"
                  style={{ scrollbarWidth: "none" }}
                />
                <motion.button
                  type="button"
                  aria-label="Send message"
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </motion.button>
              </div>
              <p className="text-slate-600 text-[10px] text-center mt-2">
                Powered by Google Gemini · Enter to send, Shift+Enter for a new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
