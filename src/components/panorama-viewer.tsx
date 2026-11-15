"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";
import { SphereStage, type SphereControls } from "@/components/panorama-sphere";
import { drawPanorama, parseProceduralUrl } from "@/lib/procedural-panorama";

type Props = {
  title: string;
  description?: string;
  imageUrl: string;
  /** equirect = true 360° sphere (WebGL). flat = wide photo preview. */
  projection?: "flat" | "equirect";
  /** True when the scene is an illustration, not a verified photographic capture. */
  illustrative?: boolean;
};

export function PanoramaViewer({ title, description, imageUrl: sourceUrl, projection, illustrative }: Props) {
  const t = createTranslator(localeFromPath(usePathname()));
  const wantsSphere = (projection ?? (parseProceduralUrl(sourceUrl) ? "equirect" : "flat")) === "equirect";
  const [webglFailed, setWebglFailed] = useState(false);
  const [stereo, setStereo] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const useSphere = wantsSphere && !webglFailed;
  const controls = useRef<SphereControls | null>(null);
  const proc = parseProceduralUrl(sourceUrl);
  const fallbackUrl = useMemo(() => {
    if (useSphere || !proc || typeof document === "undefined") return "";
    const off = document.createElement("canvas");
    drawPanorama(off, proc.kind, proc.seed);
    return off.toDataURL("image/jpeg", 0.8);
  }, [useSphere, proc?.kind, proc?.seed]); // eslint-disable-line react-hooks/exhaustive-deps

  const imageUrl = useSphere ? "" : proc ? fallbackUrl : sourceUrl;  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [vrHint, setVrHint] = useState("");

  useEffect(() => {
    let frame = 0;
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    imageRef.current = image;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.fillStyle = "#0b1f3a";
      ctx.fillRect(0, 0, width, height);
      if (!image.complete || !image.naturalWidth) return;

      const fov = 0.55;
      const sourceWidth = image.naturalWidth * fov;
      const sourceHeight = image.naturalHeight * Math.min(0.72, (height / width) * fov * 1.15);
      const maxX = Math.max(0, image.naturalWidth - sourceWidth);
      const maxY = Math.max(0, image.naturalHeight - sourceHeight);
      const sx = ((yawRef.current % 1) + 1) % 1 * maxX;
      const sy = Math.min(maxY, Math.max(0, (0.5 + pitchRef.current) * maxY));
      ctx.drawImage(image, sx, sy, sourceWidth, sourceHeight, 0, 0, width, height);
    };

    const loop = () => {
      draw();
      frame = window.requestAnimationFrame(loop);
    };

    image.onload = () => {
      setReady(true);
      setError("");
      loop();
    };
    image.onerror = () => {
      setError("This panorama could not be loaded. Try another scene.");
      setReady(false);
    };
    image.src = imageUrl;

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [imageUrl]);

  function pointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, yaw: yawRef.current, pitch: pitchRef.current };
  }

  function pointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    yawRef.current = dragRef.current.yaw - dx / 900;
    pitchRef.current = Math.max(-0.45, Math.min(0.45, dragRef.current.pitch + dy / 700));
  }

  function pointerUp(event: React.PointerEvent<HTMLCanvasElement>) {
    dragRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  }

  async function enterVr() {
    const shell = shellRef.current;
    if (!shell) return;
    try {
      if (document.fullscreenElement !== shell) await shell.requestFullscreen();
      const orientation = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      if (typeof orientation.requestPermission === "function") {
        const permission = await orientation.requestPermission();
        if (permission !== "granted") {
          setVrHint(t("pano.motion"));
          return;
        }
      }
      const onOrient = (event: DeviceOrientationEvent) => {
        if (event.alpha == null || event.beta == null) return;
        yawRef.current = event.alpha / 360;
        pitchRef.current = Math.max(-0.45, Math.min(0.45, (event.beta - 45) / 90));
        controls.current?.setLook((-event.alpha * Math.PI) / 180, ((event.beta - 90) * Math.PI) / 180);
      };
      window.addEventListener("deviceorientation", onOrient);
      setVrHint(t("pano.vrOn"));
      const cleanup = () => {
        window.removeEventListener("deviceorientation", onOrient);
        setVrHint("");
        document.removeEventListener("fullscreenchange", onFull);
      };
      const onFull = () => {
        if (!document.fullscreenElement) cleanup();
      };
      document.addEventListener("fullscreenchange", onFull);
    } catch {
      setVrHint("Fullscreen / VR is not available on this device. Drag to explore instead.");
    }
  }

  function resetView() {
    yawRef.current = 0;
    pitchRef.current = 0;
    controls.current?.reset();
  }

  async function exitVr() {
    setStereo(false);
    controls.current?.setStereo(false);
    if (document.fullscreenElement) await document.exitFullscreen();
    setVrHint("");
  }

  return (
    <section className="panorama-viewer" ref={shellRef} aria-label={`360 view of ${title}`}>
      <div className="panorama-toolbar">
        <div>
          <p className="panorama-kicker">
            {useSphere ? "360° · VR READY" : "WIDE PREVIEW · VR READY"}
            {illustrative ? " · ILLUSTRATED PREVIEW — photographic capture pending" : ""}
          </p>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        <div className="panorama-actions">
          {useSphere ? (
            <>
              <button type="button" aria-label="Zoom in" onClick={() => controls.current?.zoom(-0.15)}>+</button>
              <button type="button" aria-label="Zoom out" onClick={() => controls.current?.zoom(0.15)}>−</button>
              <button type="button" aria-pressed={autoRotate} onClick={() => setAutoRotate(controls.current?.toggleAuto() ?? false)}>
                {autoRotate ? "Pause rotate" : "Auto-rotate"}
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = controls.current?.snapshot();
                  if (!url) return;
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-360.jpg`;
                  a.click();
                }}
              >
                Save picture
              </button>
              <button
                type="button"
                aria-pressed={stereo}
                onClick={async () => {
                  const next = !stereo;
                  setStereo(next);
                  controls.current?.setStereo(next);
                  if (next) {
                    await enterVr();
                    try {
                      await (screen.orientation as unknown as { lock?: (o: string) => Promise<void> }).lock?.("landscape");
                    } catch {
                      /* orientation lock unsupported */
                    }
                  }
                }}
              >
                {stereo ? "Mono view" : "Headset (split)"}
              </button>
            </>
          ) : null}
          <button type="button" onClick={resetView}>Reset</button>
          <button type="button" className="panorama-vr" onClick={enterVr}>{t("pano.enter")}</button>
          <button type="button" onClick={exitVr}>{t("pano.exit")}</button>
        </div>
      </div>
      {useSphere ? (
        <SphereStage
          source={sourceUrl}
          label={`360 view of ${title}`}
          hint={t("pano.hint")}
          loadingText={t("pano.loading")}
          controlsRef={controls}
          onWebglFail={() => setWebglFailed(true)}
        />
      ) : (
        <div className="panorama-stage">
          <canvas
            ref={canvasRef}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
            onPointerCancel={pointerUp}
          />
          {!ready && !error ? <p className="panorama-status">{t("pano.loading")}</p> : null}
          {error ? <p className="panorama-status">{error}</p> : null}
          <p className="panorama-hint">{t("pano.hint")}</p>
        </div>
      )}
      {vrHint ? <p className="panorama-vr-hint">{vrHint}</p> : null}
    </section>
  );
}
