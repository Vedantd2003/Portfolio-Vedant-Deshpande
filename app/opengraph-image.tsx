import { ImageResponse } from "next/og";

export const alt = "Vedant Deshpande — Software that thinks. Stories that move.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#eeeae3", background: "radial-gradient(80% 90% at 85% 80%, rgba(255,77,28,.55), #0c0a09 60%)" }}>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", opacity: 0.7 }}>Vedant Deshpande — Pune, India</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 700, lineHeight: 0.92, letterSpacing: -4, textTransform: "uppercase" }}>
          <span>Software that thinks.</span>
          <span style={{ color: "#ff4d1c", fontStyle: "italic", textTransform: "none", fontWeight: 400 }}>Stories that move.</span>
        </div>
        <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", opacity: 0.8 }}>AI × Full Stack × Creative</div>
      </div>
    ),
    { ...size },
  );
}
