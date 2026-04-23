"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personal } from "@/lib/data";
import { Send, CheckCircle, AlertCircle, Mail, Github, Linkedin, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "sending" | "success" | "error";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: "text-violet-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Vedantd2003",
    href: personal.github,
    color: "text-blue-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/vedant-deshpande",
    href: personal.linkedin,
    color: "text-cyan-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: personal.location,
    href: null,
    color: "text-emerald-400",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-violet-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3 block">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s build something{" "}
            <span className="gradient-text">great</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Open to full-time roles, freelance projects, and meaningful collaborations. I respond within 24–48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* CTA card */}
            <div className="relative glass rounded-2xl p-8 border border-violet-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-blue-600/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Available for opportunities
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I&apos;m actively seeking full-stack and AI developer roles where I can build intelligent, scalable products. Let&apos;s chat!
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="glass rounded-2xl p-6 border border-white/[0.08] flex flex-col gap-4">
              {contactLinks.map((link) => (
                <div key={link.label} className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center ${link.color}`}>
                    <link.icon size={15} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">{link.label}</p>
                    {link.href ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="text-slate-300 text-sm hover:text-violet-300 transition-colors font-medium"
                      >
                        {link.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm font-medium">{link.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 border border-white/[0.08] relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle size={56} className="text-emerald-400 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Message sent! 🎉
                    </h3>
                    <p className="text-slate-400 text-sm">
                      I&apos;ll get back to you within 24–48 hours. Check your inbox for a confirmation.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 relative z-10"
                    noValidate
                  >
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Send me a message
                    </h3>

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Smith"
                        className={`px-4 py-3 rounded-xl bg-white/[0.05] border text-slate-200 placeholder-slate-600 text-sm outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-violet-500/60 ${
                          errors.name
                            ? "border-red-500/60 bg-red-500/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <AlertCircle size={11} />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@company.com"
                        className={`px-4 py-3 rounded-xl bg-white/[0.05] border text-slate-200 placeholder-slate-600 text-sm outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-violet-500/60 ${
                          errors.email
                            ? "border-red-500/60 bg-red-500/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <AlertCircle size={11} />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell me about the role, project, or collaboration you have in mind..."
                        className={`px-4 py-3 rounded-xl bg-white/[0.05] border text-slate-200 placeholder-slate-600 text-sm outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-violet-500/60 resize-none ${
                          errors.message
                            ? "border-red-500/60 bg-red-500/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <AlertCircle size={11} />
                          {errors.message.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Error state */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm"
                      >
                        <AlertCircle size={15} className="flex-shrink-0" />
                        {errorMsg}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || status === "sending"}
                      className="btn-primary py-3.5 justify-center font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === "sending" ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={16} />
                          Send Message
                        </span>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
