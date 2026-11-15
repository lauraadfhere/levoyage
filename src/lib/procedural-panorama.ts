/**
 * Illustrated equirectangular (2:1) panoramas generated per terrain type.
 * These are honest placeholders: they give every wilaya a real, seamless 360°
 * scene to look around in until a verified photographic capture is uploaded
 * through the Partner Studio. They are never presented as photography.
 */

export type TerrainKind = "coast" | "desert" | "mountain" | "highland" | "city" | "heritage" | "oasis";

const COAST = new Set([2, 6, 13, 16, 18, 21, 23, 27, 31, 35, 36, 42, 46]);
const SAHARA = new Set([1, 8, 11, 30, 33, 37, 39, 47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]);
const MOUNTAIN = new Set([5, 9, 10, 12, 15, 25, 34, 40, 41, 43, 44]);
const OASIS = new Set([7, 61]);
const CITY = new Set([19, 26, 14, 22, 29, 38, 48, 24]);

export function terrainForWilayaCode(code: string | number): TerrainKind {
  const n = typeof code === "number" ? code : parseInt(code, 10);
  if (COAST.has(n)) return "coast";
  if (SAHARA.has(n)) return "desert";
  if (OASIS.has(n)) return "oasis";
  if (MOUNTAIN.has(n)) return "mountain";
  if (CITY.has(n)) return "city";
  return "highland";
}

export function terrainForPlace(name: string, fallback: TerrainKind): TerrainKind {
  const n = name.toLocaleLowerCase();
  if (/beach|plage|corniche|cap |cape|coast|port|marina|island|bay/.test(n)) return "coast";
  if (/oasis|palm|palmeraie|spring|source/.test(n)) return "oasis";
  if (/dune|sahara|erg|tassili|hoggar|assekrem|tadrart|desert|ksar|ksour|m'zab|mzab/.test(n)) return "desert";
  if (/mount|djebel|jebel|mont |gorge|canyon|waterfall|cascade|chr[eé]a|tikjda|park|forest|lake|lac /.test(n)) return "mountain";
  if (/roman|ruin|timgad|tipasa|tipaza|djemila|hippo|museum|mausoleum|citadel|fort|casbah|kasbah|palace|mosque/.test(n)) return "heritage";
  return fallback;
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Ctx = CanvasRenderingContext2D;
type Rand = () => number;

/** Periodic ridge height so the panorama wraps seamlessly at the left/right edge. */
function makeRidge(W: number, rand: Rand, amp: number, octaves: number) {
  const waves = Array.from({ length: octaves }, (_, i) => ({
    f: 2 + i * 2 + Math.floor(rand() * 3),
    a: amp / (1 + i * 1.1),
    p: rand() * Math.PI * 2,
  }));
  return (x: number) => waves.reduce((sum, w) => sum + w.a * Math.sin((2 * Math.PI * w.f * x) / W + w.p), 0);
}

function fillRidge(ctx: Ctx, W: number, H: number, base: number, fn: (x: number) => number, top: string, bottom: string) {
  const g = ctx.createLinearGradient(0, base - 160, 0, H);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 4) ctx.lineTo(x, base + fn(x));
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();
}

function wrapDraw(W: number, x: number, width: number, draw: (x: number) => void) {
  draw(x);
  if (x - width < 0) draw(x + W);
  if (x + width > W) draw(x - W);
}

function sky(ctx: Ctx, W: number, H: number, rand: Rand, top: string, mid: string, horizon: string, sunColor: string) {
  const g = ctx.createLinearGradient(0, 0, 0, H * 0.5);
  g.addColorStop(0, top);
  g.addColorStop(0.55, mid);
  g.addColorStop(1, horizon);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H * 0.52);
  const sx = rand() * W;
  const sy = H * (0.3 + rand() * 0.1);
  wrapDraw(W, sx, 300, (x) => {
    const glow = ctx.createRadialGradient(x, sy, 4, x, sy, 280);
    glow.addColorStop(0, sunColor);
    glow.addColorStop(0.12, `${sunColor}`);
    glow.addColorStop(1, "rgba(255,240,200,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - 300, sy - 300, 600, 600);
  });
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  for (let i = 0; i < 14; i += 1) {
    const cx = rand() * W;
    const cy = H * (0.08 + rand() * 0.22);
    const rw = 50 + rand() * 120;
    wrapDraw(W, cx, rw * 2, (x) => {
      for (let k = 0; k < 4; k += 1) {
        ctx.beginPath();
        ctx.ellipse(x + (k - 1.5) * rw * 0.35, cy + (k % 2) * 6, rw * 0.5, 9 + rand() * 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  return sx;
}

function ground(ctx: Ctx, W: number, H: number, from: number, top: string, bottom: string) {
  const g = ctx.createLinearGradient(0, from, 0, H);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, from, W, H - from);
}

function palm(ctx: Ctx, x: number, y: number, s: number, rand: Rand) {
  ctx.strokeStyle = "#5b3b1c";
  ctx.lineWidth = 5 * s;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 8 * s, y - 45 * s, x + 3 * s, y - 90 * s);
  ctx.stroke();
  ctx.strokeStyle = "#1f6b3a";
  ctx.lineWidth = 4 * s;
  for (let i = 0; i < 9; i += 1) {
    const a = (i / 9) * Math.PI * 2 + rand() * 0.2;
    ctx.beginPath();
    ctx.moveTo(x + 3 * s, y - 90 * s);
    ctx.quadraticCurveTo(x + Math.cos(a) * 30 * s, y - 112 * s + Math.sin(a) * 10 * s, x + Math.cos(a) * 55 * s, y - 84 * s + Math.sin(a) * 26 * s);
    ctx.stroke();
  }
}

function building(ctx: Ctx, x: number, base: number, w: number, h: number, color: string, rand: Rand) {
  ctx.fillStyle = color;
  ctx.fillRect(x, base - h, w, h);
  ctx.fillStyle = "rgba(20,40,70,0.35)";
  for (let wy = base - h + 10; wy < base - 12; wy += 16) {
    for (let wx = x + 6; wx < x + w - 8; wx += 12) {
      if (rand() > 0.35) ctx.fillRect(wx, wy, 5, 8);
    }
  }
}

function dome(ctx: Ctx, x: number, base: number, w: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x + w / 2, base, w / 2, w / 2.4, 0, Math.PI, 0);
  ctx.fill();
}

function minaret(ctx: Ctx, x: number, base: number, h: number) {
  ctx.fillStyle = "#f4efe3";
  ctx.fillRect(x, base - h, 14, h);
  ctx.fillRect(x - 4, base - h, 22, 8);
  ctx.beginPath();
  ctx.moveTo(x, base - h);
  ctx.lineTo(x + 7, base - h - 26);
  ctx.lineTo(x + 14, base - h);
  ctx.fill();
}

function column(ctx: Ctx, x: number, base: number, h: number) {
  ctx.fillStyle = "#d9c9a3";
  ctx.fillRect(x, base - h, 12, h);
  ctx.fillRect(x - 3, base - h, 18, 6);
  ctx.fillRect(x - 3, base - 5, 18, 5);
}

function pine(ctx: Ctx, x: number, base: number, s: number) {
  ctx.fillStyle = "#1c4a2c";
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x, base - 60 * s - i * 26 * s);
    ctx.lineTo(x - (22 - i * 4) * s, base - i * 26 * s);
    ctx.lineTo(x + (22 - i * 4) * s, base - i * 26 * s);
    ctx.fill();
  }
}

export function drawPanorama(canvas: HTMLCanvasElement, kind: TerrainKind, seedText: string) {
  const W = 2048;
  const H = 1024;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rand = rng(hash(`${kind}:${seedText}`));
  const horizon = H * 0.5;

  const palettes: Record<TerrainKind, [string, string, string, string]> = {
    coast: ["#2a6fb0", "#79b7e4", "#d7ecf7", "rgba(255,244,210,0.95)"],
    desert: ["#3b82c4", "#e7c88f", "#f6dca8", "rgba(255,238,190,0.95)"],
    oasis: ["#3a7cc0", "#e5c98e", "#f4dcac", "rgba(255,238,190,0.95)"],
    mountain: ["#2f6cae", "#8fbbe0", "#dbe9f2", "rgba(255,248,222,0.9)"],
    highland: ["#3a74b4", "#a8c8de", "#efe6cf", "rgba(255,243,208,0.9)"],
    city: ["#2d68a8", "#8ab6dc", "#f2e9d6", "rgba(255,244,214,0.9)"],
    heritage: ["#33699f", "#9cc0dc", "#f1e5c8", "rgba(255,242,206,0.9)"],
  };
  const [top, mid, hz, sun] = palettes[kind];
  sky(ctx, W, H, rand, top, mid, hz, sun);

  if (kind === "coast") {
    fillRidge(ctx, W, H, horizon - 16, makeRidge(W, rand, 22, 3), "#6f93a8", "#8bb0be");
    const sea = ctx.createLinearGradient(0, horizon, 0, H * 0.7);
    sea.addColorStop(0, "#5ab6d2");
    sea.addColorStop(1, "#117fa6");
    ctx.fillStyle = sea;
    ctx.fillRect(0, horizon, W, H * 0.2);
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 260; i += 1) {
      const y = horizon + 6 + rand() * H * 0.18;
      const x = rand() * W;
      const l = 10 + (y - horizon) * 0.5 * rand();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + l, y);
      ctx.stroke();
    }
    const shore = makeRidge(W, rand, 14, 2);
    fillRidge(ctx, W, H, H * 0.68, shore, "#f1dfb4", "#cdb27a");
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.moveTo(0, H * 0.68);
    for (let x = 0; x <= W; x += 4) ctx.lineTo(x, H * 0.68 + shore(x) - 4);
    for (let x = W; x >= 0; x -= 4) ctx.lineTo(x, H * 0.68 + shore(x) + 3);
    ctx.fill();
    for (let i = 0; i < 6; i += 1) wrapDraw(W, rand() * W, 80, (x) => palm(ctx, x, H * 0.82 + rand() * 40, 0.9 + rand() * 0.6, rand));
  } else if (kind === "desert" || kind === "oasis") {
    fillRidge(ctx, W, H, horizon - 8, makeRidge(W, rand, 26, 4), "#d9ac6a", "#caa061");
    fillRidge(ctx, W, H, horizon + 40, makeRidge(W, rand, 46, 4), "#e8bd76", "#d4a35e");
    fillRidge(ctx, W, H, horizon + 120, makeRidge(W, rand, 60, 3), "#f0c987", "#c88f4a");
    fillRidge(ctx, W, H, horizon + 230, makeRidge(W, rand, 40, 3), "#e0a65f", "#9d6b32");
    if (kind === "oasis") {
      const pond = ctx.createLinearGradient(0, H * 0.7, 0, H * 0.8);
      pond.addColorStop(0, "#5fb7c9");
      pond.addColorStop(1, "#2d8aa3");
      ctx.fillStyle = pond;
      const px = rand() * W;
      wrapDraw(W, px, 260, (x) => {
        ctx.beginPath();
        ctx.ellipse(x, H * 0.76, 230, 34, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      for (let i = 0; i < 14; i += 1) wrapDraw(W, px + (rand() - 0.5) * 520, 80, (x) => palm(ctx, x, H * 0.74 + rand() * 50, 0.8 + rand() * 0.7, rand));
    } else {
      for (let i = 0; i < 3; i += 1) {
        const mx = rand() * W;
        wrapDraw(W, mx, 160, (x) => {
          ctx.fillStyle = "#9a5b34";
          ctx.beginPath();
          ctx.moveTo(x - 120, horizon + 10);
          ctx.lineTo(x - 70, horizon - 60 - rand() * 40);
          ctx.lineTo(x + 70, horizon - 60 - rand() * 40);
          ctx.lineTo(x + 120, horizon + 10);
          ctx.fill();
        });
      }
    }
  } else if (kind === "mountain") {
    const cols: Array<[string, string]> = [["#8ea6bd", "#7e97ad"], ["#5f8a78", "#4d7766"], ["#3e6d4f", "#2f5a3f"], ["#2b5a38", "#1d4429"]];
    cols.forEach(([a, b], i) => {
      fillRidge(ctx, W, H, horizon - 70 + i * 60, makeRidge(W, rand, 70 - i * 10, 5), a, b);
    });
    for (let i = 0; i < 60; i += 1) pine(ctx, rand() * W, H * (0.66 + rand() * 0.22), 0.7 + rand() * 0.9);
  } else if (kind === "highland") {
    fillRidge(ctx, W, H, horizon - 4, makeRidge(W, rand, 20, 3), "#b7b08a", "#a79f78");
    fillRidge(ctx, W, H, horizon + 50, makeRidge(W, rand, 30, 3), "#c4b57d", "#a39460");
    fillRidge(ctx, W, H, horizon + 140, makeRidge(W, rand, 40, 3), "#a9a063", "#7f7a45");
    ctx.fillStyle = "#6f6a3b";
    for (let i = 0; i < 160; i += 1) {
      const x = rand() * W;
      const y = H * (0.62 + rand() * 0.3);
      ctx.beginPath();
      ctx.ellipse(x, y, 10 + rand() * 14, 5 + rand() * 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    fillRidge(ctx, W, H, horizon - 4, makeRidge(W, rand, 24, 3), "#97b3c0", "#84a1b0");
    const base = H * 0.66;
    let x = 0;
    const palette = ["#f7f2e6", "#efe6d2", "#fbf8f0", "#e8dcc2"];
    while (x < W) {
      const w = 30 + rand() * 60;
      const h = kind === "heritage" ? 30 + rand() * 50 : 40 + rand() * 150;
      building(ctx, x, base, w, h, palette[Math.floor(rand() * palette.length)], rand);
      x += w + rand() * 6;
    }
    for (let i = 0; i < 4; i += 1) {
      const mx = rand() * (W - 100);
      dome(ctx, mx, base - 60, 70, "#2f7fb8");
      minaret(ctx, mx + 90, base, 150 + rand() * 40);
    }
    ground(ctx, W, H, base, "#b8a98a", "#6d6150");
    if (kind === "heritage") {
      for (let i = 0; i < 28; i += 1) wrapDraw(W, 100 + i * 64 + rand() * 20, 20, (cx) => column(ctx, cx, H * 0.8, 70 + rand() * 40));
    }
  }

  const vignette = ctx.createLinearGradient(0, H * 0.9, 0, H);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(10,18,30,0.65)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, H * 0.9, W, H * 0.1);
}

export const PROCEDURAL_PREFIX = "procedural:";

export function proceduralUrl(kind: TerrainKind, seed: string) {
  return `${PROCEDURAL_PREFIX}${kind}:${seed}`;
}

export function parseProceduralUrl(url: string): { kind: TerrainKind; seed: string } | null {
  if (!url.startsWith(PROCEDURAL_PREFIX)) return null;
  const [, kind, ...rest] = url.split(":");
  return { kind: kind as TerrainKind, seed: rest.join(":") };
}
