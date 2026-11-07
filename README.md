# LeVoyage.dz

Algeria travel discovery and partner marketplace built with Next.js App Router. The current AI scope is the safe MVP slice of the attached blueprint: TRRIPYAI uses NVIDIA NIM for grounded destination/property discovery when configured, while deterministic catalog matching remains available as fallback.

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` (ignored by Git) with the backend values this deployment needs. The NVIDIA settings below are the only new ones required for TRRIPYAI.

## TRRIPYAI / NVIDIA NIM

The API key is used only by the server route (`src/app/api/tripyai/route.ts`); never prefix it with `NEXT_PUBLIC_` or put it in browser code. Configure these server-side values in `.env.local` for local Next.js development:

- `NVIDIA_NIM_API_KEY` — NVIDIA hosted inference key, supplied privately by the operator.
- `NVIDIA_NIM_BASE_URL` — optional; defaults to `https://integrate.api.nvidia.com/v1` and must use HTTPS.
- `NVIDIA_NIM_MODEL` — optional; defaults to `nvidia/nemotron-3.5-lightning-30b-a3b`.

For a Wrangler local Worker preview, put runtime-only values in the ignored `.dev.vars` file. For a deployed Worker, configure `NVIDIA_NIM_API_KEY` with Wrangler’s secret store (`npx wrangler secret put NVIDIA_NIM_API_KEY`) or the hosting platform’s secret manager; do not commit or paste secret values into source files, chat, or logs.

The route rejects cross-origin calls, caps message and history size, and applies a best-effort per-client rate limit (20 questions per minute) to protect inference credits. Rate limiting is per Worker isolate, so add a durable limit at the edge before production.

If the key is absent or NVIDIA inference fails, TRRIPYAI falls back to deterministic destination matching. AI answers are grounded in the public tourism catalog and records marked `published`; provider-submitted details are described as listing claims. This MVP does not check live inventory, availability, prices, ticket schedules, or policies and cannot confirm bookings or take payments. NVIDIA’s hosted trial terms and quotas must be reviewed before production use.

## Cloudflare Workers (Next.js)

The project uses OpenNext for Cloudflare. Build and preview locally with:

```bash
npm run workers:build
npm run workers:preview
```

The local Wrangler configuration is `freebuff.wrangler.jsonc`. These commands build and run a local preview only; they do not deploy. Next.js and `eslint-config-next` are pinned to the minimum versions supported by the configured OpenNext adapter.

## Checks

```bash
npm run build
npx tsc --noEmit
```
