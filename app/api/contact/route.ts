import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function isEmailConfigured() {
  const user = process.env.EMAIL_USER ?? "";
  const pass = process.env.EMAIL_PASS ?? "";
  return (
    user.length > 0 &&
    pass.length > 0 &&
    !user.includes("your-gmail") &&
    !pass.includes("your-16")
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // ── No email credentials: log and return success gracefully ──────────
    if (!isEmailConfigured()) {
      console.log(
        `\n📬 [Portfolio Contact] New message (email not configured):\n` +
          `  From:    ${name} <${email}>\n` +
          `  Message: ${message}\n`
      );
      return NextResponse.json({
        success: true,
        message: "Message received! I'll get back to you soon.",
      });
    }

    // ── Send via Nodemailer ───────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const ownerHtml = `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#030712;color:#f1f5f9;border-radius:16px;overflow:hidden;border:1px solid rgba(139,92,246,0.3);">
        <div style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:white;">📬 New Portfolio Message</h1>
        </div>
        <div style="padding:32px;">
          <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.08);">
            <p style="margin:0 0 8px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</p>
            <p style="margin:0;font-size:18px;font-weight:600;">${name}</p>
            <p style="margin:4px 0 0 0;color:#8b5cf6;">${email}</p>
          </div>
          <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;border:1px solid rgba(255,255,255,0.08);">
            <p style="margin:0 0 12px 0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
            <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
          <div style="margin-top:24px;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#3b82f6);color:white;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;">Reply to ${name}</a>
          </div>
        </div>
      </div>`;

    const autoReplyHtml = `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#030712;color:#f1f5f9;border-radius:16px;overflow:hidden;border:1px solid rgba(139,92,246,0.3);">
        <div style="background:linear-gradient(135deg,#8b5cf6,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:white;">Thanks for reaching out! 🚀</h1>
        </div>
        <div style="padding:32px;">
          <p style="font-size:16px;line-height:1.7;margin:0 0 20px 0;">Hi <strong>${name}</strong>,</p>
          <p style="line-height:1.7;color:#cbd5e1;">I received your message and will get back to you within 24–48 hours.</p>
          <div style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0;font-style:italic;color:#a78bfa;">"Designing intelligent experiences, not just interfaces."</p>
            <p style="margin:8px 0 0 0;font-size:13px;color:#64748b;">— Vedant Deshpande</p>
          </div>
          <p style="line-height:1.7;color:#94a3b8;font-size:14px;">Check out my work on <a href="https://github.com/Vedantd2003" style="color:#8b5cf6;">GitHub</a> or connect on <a href="https://linkedin.com/in/vedant-deshpande-a19426221" style="color:#8b5cf6;">LinkedIn</a>.</p>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "vdeshpande674@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      html: ownerHtml,
    });

    await transporter.sendMail({
      from: `"Vedant Deshpande" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Got your message! I'll reply soon 👋",
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error: unknown) {
    console.error("Email send error:", error);
    const msg =
      error instanceof Error && error.message.includes("Invalid login")
        ? "Gmail auth failed — check your App Password in .env.local"
        : "Failed to send. Please email vdeshpande674@gmail.com directly.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
