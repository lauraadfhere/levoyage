"use client";

import { useEffect, useRef, useState } from "react";
import { drawPanorama, parseProceduralUrl } from "@/lib/procedural-panorama";

const VERT = "attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.,1.);}";
const FRAG = `precision highp float;
varying vec2 v;uniform sampler2D t;uniform float yaw,pitch,fov,aspect;
const float PI=3.14159265;
void main(){
  float th=tan(fov*.5);
  vec3 d=normalize(vec3(v.x*aspect*th,v.y*th,1.));
  float cp=cos(pitch),sp=sin(pitch);
  float y1=d.y*cp+d.z*sp,z1=-d.y*sp+d.z*cp;
  float cy=cos(yaw),sy=sin(yaw);
  float x2=d.x*cy+z1*sy,z2=-d.x*sy+z1*cy;
  float u=atan(x2,z2)/(2.*PI)+.5;
  float w=.5-asin(clamp(y1,-1.,1.))/PI;
  gl_FragColor=texture2D(t,vec2(u,w));
}`;

type Props = {
  source: string;
  label: string;
  hint: string;
  loadingText: string;
  onReady?: () => void;
  /** Exposes imperative controls to the parent toolbar. */
  controlsRef?: React.MutableRefObject<SphereControls | null>;
  onWebglFail?: () => void;
};

export type SphereControls = {
  reset: () => void;
  zoom: (delta: number) => void;
  setLook: (yaw: number, pitch: number) => void;
  setStereo: (on: boolean) => void;
  toggleAuto: () => boolean;
  snapshot: () => string | null;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function SphereStage({ source, label, hint, loadingText, controlsRef, onWebglFail }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ yaw: 0, pitch: 0, fov: 1.25, auto: true, stereo: false });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: true });
    if (!gl) {
      onWebglFail?.();
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    state.current.auto = !reduced;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      onWebglFail?.();
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uYaw = gl.getUniformLocation(prog, "yaw");
    const uPitch = gl.getUniformLocation(prog, "pitch");
    const uFov = gl.getUniformLocation(prog, "fov");
    const uAspect = gl.getUniformLocation(prog, "aspect");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let frame = 0;
    let loaded = false;
    let cancelled = false;

    const clampPitch = () => {
      state.current.pitch = Math.max(-1.45, Math.min(1.45, state.current.pitch));
    };

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (w && h && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (loaded) {
        if (state.current.auto) state.current.yaw += 0.0015;
        clampPitch();
        gl.uniform1f(uYaw, state.current.yaw);
        gl.uniform1f(uPitch, state.current.pitch);
        gl.uniform1f(uFov, state.current.fov);
        if (state.current.stereo) {
          // Side-by-side eyes for Cardboard-style headsets.
          const half = Math.floor(canvas.width / 2);
          gl.enable(gl.SCISSOR_TEST);
          gl.uniform1f(uAspect, half / Math.max(1, canvas.height));
          for (const x of [0, half]) {
            gl.viewport(x, 0, half, canvas.height);
            gl.scissor(x, 0, half, canvas.height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          }
          gl.disable(gl.SCISSOR_TEST);
        } else {
          gl.uniform1f(uAspect, canvas.width / Math.max(1, canvas.height));
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
      }
      frame = requestAnimationFrame(render);
    };

    const upload = (src: TexImageSource) => {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      loaded = true;
      if (!cancelled) {
        setReady(true);
        setError("");
      }
    };

    const proc = parseProceduralUrl(source);
    if (proc) {
      const off = document.createElement("canvas");
      drawPanorama(off, proc.kind, proc.seed);
      upload(off);
    } else {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => upload(img);
      img.onerror = () => {
        if (!cancelled) setError("This panorama could not be loaded. Try another scene.");
      };
      img.src = source;
    }
    frame = requestAnimationFrame(render);

    if (controlsRef) {
      controlsRef.current = {
        reset: () => {
          state.current.yaw = 0;
          state.current.pitch = 0;
          state.current.fov = 1.25;
        },
        zoom: (d) => {
          state.current.fov = Math.max(0.45, Math.min(1.9, state.current.fov + d));
        },
        toggleAuto: () => {
          state.current.auto = !state.current.auto;
          return state.current.auto;
        },
        snapshot: () => {
          try {
            return canvas.toDataURL("image/jpeg", 0.92);
          } catch {
            return null;
          }
        },
        setStereo: (on) => {
          state.current.stereo = on;
          if (on) state.current.fov = 1.5;
        },
        setLook: (yaw, pitch) => {
          state.current.auto = false;
          state.current.yaw = yaw;
          state.current.pitch = pitch;
        },
      };
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const pinch = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; fov: number } | null>(null);

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    state.current.auto = false;
    pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current.size === 2) {
      const [a, b] = [...pinch.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), fov: state.current.fov };
      drag.current = null;
    } else {
      drag.current = { x: e.clientX, y: e.clientY, yaw: state.current.yaw, pitch: state.current.pitch };
    }
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (pinch.current.has(e.pointerId)) pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pinch.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      state.current.fov = Math.max(0.45, Math.min(1.9, pinchStart.current.fov * (pinchStart.current.dist / Math.max(1, dist))));
      return;
    }
    if (!drag.current) return;
    const k = state.current.fov / (e.currentTarget.clientHeight || 400);
    state.current.yaw = drag.current.yaw - (e.clientX - drag.current.x) * k;
    state.current.pitch = drag.current.pitch + (e.clientY - drag.current.y) * k;
  }
  function up(e: React.PointerEvent<HTMLCanvasElement>) {
    pinch.current.delete(e.pointerId);
    pinchStart.current = null;
    drag.current = null;
  }
  function wheel(e: React.WheelEvent<HTMLCanvasElement>) {
    state.current.fov = Math.max(0.45, Math.min(1.9, state.current.fov + (e.deltaY > 0 ? 0.08 : -0.08)));
  }
  function key(e: React.KeyboardEvent<HTMLCanvasElement>) {
    const s = state.current;
    s.auto = false;
    const step = 0.08;
    if (e.key === "ArrowLeft") s.yaw -= step;
    else if (e.key === "ArrowRight") s.yaw += step;
    else if (e.key === "ArrowUp") s.pitch += step;
    else if (e.key === "ArrowDown") s.pitch -= step;
    else if (e.key === "+" || e.key === "=") s.fov = Math.max(0.45, s.fov - 0.1);
    else if (e.key === "-") s.fov = Math.min(1.9, s.fov + 0.1);
    else return;
    e.preventDefault();
  }

  return (
    <div className="panorama-stage">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={`${label}. Arrow keys look around, plus and minus zoom.`}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onWheel={wheel}
        onKeyDown={key}
      />
      {!ready && !error ? <p className="panorama-status">{loadingText}</p> : null}
      {error ? <p className="panorama-status">{error}</p> : null}
      <p className="panorama-hint">{hint}</p>
    </div>
  );
}
