"use client";

import { useEffect, useRef } from "react";
import { isTouch, prefersReducedMotion } from "@/animations/gsap";

/**
 * A single full-quad fragment shader (no Three.js): domain-warped light that drifts like
 * projector haze and leans toward the pointer. Renders at reduced resolution, pauses when
 * off-screen or the tab is hidden, and draws one still frame with reduced motion.
 */
const FRAG = `
precision mediump float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform vec3 u_accent;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*n(p); p*=2.02; a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res; vec2 p = uv; p.x *= u_res.x / u_res.y;
  float t = u_time * .045;
  vec2 m = u_mouse; m.x *= u_res.x / u_res.y;
  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + 4.1));
  vec2 r = vec2(fbm(p*1.3 + 3.*q + vec2(1.7, 9.2) + t*1.3), fbm(p*1.3 + 3.*q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 2.6*r);
  float glow = smoothstep(.9, .0, distance(p, m)) * .55;
  vec3 col = mix(vec3(.035,.03,.028), u_accent * .9, smoothstep(.35, 1., f + glow*.6));
  col += u_accent * pow(f, 6.) * 1.4;
  col += vec3(1.,.93,.85) * pow(max(0., 1. - length(uv - vec2(.82,.78))*1.6), 3.) * .18;
  col *= smoothstep(1.25, .35, length(uv - .5) * 1.35);
  col += (h(gl_FragCoord.xy + fract(u_time)) - .5) * .05;
  gl_FragColor = vec4(col, 1.);
}`;
const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;

function readAccent(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().split(/\s+/).map(Number);
  return raw.length === 3 && raw.every((v) => !Number.isNaN(v)) ? [raw[0] / 255, raw[1] / 255, raw[2] / 255] : [1, 0.3, 0.1];
}

export function ShaderCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uAccent = gl.getUniformLocation(prog, "u_accent");

    const scale = isTouch() ? 0.35 : 0.5; // shader is soft by nature — render small, upscale
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * scale));
      canvas.height = Math.max(1, Math.round(r.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let accent = readAccent();
    const mo = new MutationObserver(() => {
      // accent changes under the mode-wipe panel; re-read after the CSS var flips
      requestAnimationFrame(() => (accent = readAccent()));
      if (still) draw(8);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });

    const still = prefersReducedMotion();
    let visible = true;
    let raf = 0;
    const start = performance.now();
    const draw = (time: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3f(uAccent, accent[0], accent[1], accent[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      draw((performance.now() - start) / 1000);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden && visible && !raf && !still) raf = requestAnimationFrame(loop); };
    document.addEventListener("visibilitychange", onVis);
    if (still) draw(8);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
