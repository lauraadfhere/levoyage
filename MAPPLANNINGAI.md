# Levoyage: AI Map Planning, Reservations & VR 360 for Algeria

Complete engineering guide. Next.js frontend, NestJS backend, free maps and free NVIDIA AI.

| Field | Value |
|---|---|
| Document | MAPPLANNINGAI.md |
| Version | 1.0 |
| Date | 2026-11-11 |
| Audience | Levoyage developers (frontend, backend, DevOps) and product owners |
| Backend | NestJS (TypeScript), PostgreSQL, Prisma, Redis |
| Frontend | Next.js (App Router), MapLibre GL JS, Photo Sphere Viewer |
| AI | NVIDIA NIM hosted models (OpenAI-compatible API) |

> Verify before launch. Free-tier quotas, model names, payment API details and prices change. Every number marked (verify) must be checked on the provider's site. Code samples are complete enough to adapt, but they have not been run against your repository.

## 1. Vision and scope

### 1.1 What we are building

Levoyage helps people discover and organize trips inside Algeria. This guide adds five connected capabilities to the existing application:

- **AI trip planning.** A user describes a trip in natural language ("7 days from Oran to Ghardaïa, two people, 120 000 DZD") and receives a structured day-by-day itinerary.
- **Map-based visualization.** Every stop, route and hotel is displayed on an interactive map.
- **Estimation.** The system computes distance, driving time and a cost estimate for several transport options, then recommends the best fit.
- **Real-time tracking.** During the trip the user's live position (and optionally a shared position for a driver, guide or family member) is shown on the map with a live ETA.
- **Reservations and VR 360.** Users can book hotels and transport, and inspect hotels and destinations in immersive 360° photos before booking.

### 1.2 Guiding principles

| Principle | Meaning in practice |
|---|---|
| AI proposes, code decides | The language model suggests places and a structure. It never supplies coordinates, prices, availability or distances. Deterministic code and the database supply those. |
| Free first | Every external service has a free tier or is open source. Paid upgrades are optional. |
| Backend owns the keys | All API keys live in NestJS. The browser never sees the NVIDIA, routing or payment secrets. |
| Cache aggressively | Free APIs have strict quotas. Geocoding, routes and weather are cached in Redis/PostgreSQL. |
| Fail soft | If the AI or a map service is down, the app still lets users search hotels, book and view maps. |
| Algeria-aware | Arabic (RTL), French and English; DZD currency; local payment methods; wilaya-based data; limited connectivity in the south. |

### 1.3 Out of scope for version 1

- Turn-by-turn voice navigation (use the device's navigation app via a deep link).
- Live flight and train inventories from airline or railway systems (use manual or partner-fed data in v1).
- Offline vector map packs (planned in the roadmap).
- Dynamic pricing driven by machine learning.

### 1.4 User stories

| ID | As a… | I want… | So that… |
|---|---|---|---|
| US-1 | traveler | to type a trip idea in my language | I get a plan without filling long forms |
| US-2 | traveler | to see the plan on a map with distances | I understand how far everything is |
| US-3 | traveler | to compare car, bus, train and taxi costs | I choose what fits my budget |
| US-4 | traveler | to book a hotel for the nights of my plan | I do not leave the app |
| US-5 | traveler | to look around a hotel in 360° | I trust what I am paying for |
| US-6 | traveler | to see my live position and ETA | I know when I will arrive |
| US-7 | family member | to follow a traveler's shared position | I know they are safe |
| US-8 | hotel partner | to manage rooms, prices and 360° photos | my listing stays accurate |
| US-9 | admin | to adjust transport rates and fuel prices | estimates remain realistic |

## 2. Core concepts

Skip this chapter if you already know these ideas.

### 2.1 Map concepts

- **Tiles.** A map is cut into small square pieces addressed as z/x/y (zoom, column, row). The browser requests only the tiles it needs.
- **Raster vs. vector tiles.** Raster tiles are pre-drawn images. Vector tiles contain geometry and attributes that the browser draws with a style. MapLibre GL JS renders vector tiles.
- **Map style.** A JSON document describing which layers to draw and how. Providers publish ready-made styles; you pass a style URL to MapLibre.
- **GeoJSON.** Standard geometry JSON (Point, LineString, Polygon). Coordinates are `[longitude, latitude]`. Mixing the order is the most common map bug.
- **Geocoding.** Text to coordinates. Reverse geocoding is coordinates to address.
- **Routing.** Best road path between points. The result has geometry (a LineString), distance in meters and duration in seconds. A distance matrix returns many-to-many distances in one call.
- **POI.** Point of interest: hotel, restaurant, fuel station, museum. OpenStreetMap tags them (for example `tourism=hotel`).
- **Bounding box (bbox).** `[minLng, minLat, maxLng, maxLat]`, used to limit queries and fit the view.
- **Haversine distance.** Straight-line distance between two coordinates. A cheap first filter before a routing call.

### 2.2 AI concepts

- **LLM.** A model that predicts text. It can sound confident while being wrong (hallucination).
- **NVIDIA NIM.** NVIDIA's hosted inference service. Open models are reachable through an OpenAI-compatible HTTP API with a free developer key.
- **System vs. user prompt.** The system prompt defines role and rules; the user prompt carries the request.
- **Structured output.** The model returns JSON matching a schema. We validate it in code and retry on failure.
- **Grounding.** Feeding the model verified facts from our database or maps so it organizes real data instead of inventing it.
- **Temperature.** Randomness. For planning we use 0.2 to 0.5.
- **RAG (light).** The backend selects candidate hotels and attractions from PostgreSQL and passes only those to the model.

### 2.3 Backend concepts

- **Module / provider / controller (NestJS).** Modules group features. Providers hold logic and are injected. Controllers expose HTTP routes. Gateways expose WebSocket events.
- **DTO.** A class describing a request body, validated with class-validator.
- **Idempotency.** Repeating a request produces the same result without duplicates. Essential for payment webhooks and booking creation.
- **Transaction and isolation.** Operations that succeed or fail together. Serializable isolation stops two users booking the last room at once.
- **Cache-aside.** Check the cache; on a miss, call the source, store the result, return it.
- **WebSocket room.** A named channel such as `trip:123`. Clients receive only that trip's updates.

### 2.4 Reservation concepts

- **Inventory.** What can be sold: rooms per night, seats per departure.
- **Hold (soft lock).** A PENDING booking reserves inventory for a short time (for example 15 minutes) while the user pays.
- **State machine.** PENDING to CONFIRMED to PAID to COMPLETED, or CANCELLED / EXPIRED. Only valid transitions are allowed.

### 2.5 VR 360 concepts

- **Equirectangular panorama.** A 2:1 image (for example 8192×4096) mapping the full sphere onto a rectangle. This is what 360° cameras export.
- **Viewer.** A script that wraps the panorama onto the inside of a sphere so the user can drag to look around.
- **Hotspot.** A clickable point inside a panorama, for example "go to the next room".
- **Virtual tour.** Several panoramas linked by hotspots.
- **WebXR.** Browser API for headsets. Photo Sphere Viewer is enough for phone and desktop use in v1.

## 3. System architecture

### 3.1 High-level view

```
Browser / Mobile
  Next.js (App Router)
    PlannerPage      prompt form, itinerary, estimates
    TripMap          MapLibre GL JS (tiles from OpenFreeMap)
    HotelPages       search, details, booking
    Tour360          Photo Sphere Viewer
    LiveTracking     Geolocation + Socket.IO client
        |  HTTPS REST/JSON            |  WSS Socket.IO
        v                             v
NestJS backend
  AuthModule  UsersModule  PlannerModule  AiModule
  GeoModule  RoutingModule  EstimateModule  PoiModule
  WeatherModule  HotelsModule  BookingsModule  PaymentsModule
  TransportModule  MediaModule (360)  TrackingGateway  AdminModule
        |            |             |              |
   PostgreSQL     Redis      Object storage   External APIs
   (Prisma)       (cache,    (360 images,     NVIDIA NIM, ORS, Nominatim,
                   queues,    photos)         Overpass, Open-Meteo, Chargily
                   ws adapter)
```

### 3.2 Responsibilities by layer

| Layer | Responsibilities | Must not |
|---|---|---|
| Next.js | Rendering, forms, map drawing, 360 viewer, calling the API | Hold secrets, compute prices, trust its own availability checks |
| NestJS | Orchestration, validation, business rules, external API calls, persistence, payments, realtime relay | Render UI |
| PostgreSQL | Source of truth for hotels, rooms, transport, bookings, trips, rates | Store large binary images |
| Redis | Cache, rate-limit counters, Socket.IO adapter, job queue | Be the only copy of important data |
| Object storage | Images (hotel photos, 360 panoramas) | Contain private user data |
| External APIs | Language, geocoding, routing, POI, weather | Be called directly from the browser (except map tiles) |

### 3.3 Request flow: plan a trip

1. The browser sends `POST /api/v1/planner/plan` with prompt, days, budget, travelers and language.
2. PlannerService asks AiModule for a structured itinerary (stops grouped by day).
3. For each stop, GeoModule returns coordinates (cache first, then Nominatim).
4. RoutingModule computes legs between consecutive stops (distance, duration, geometry).
5. PoiModule and HotelsModule propose hotels for each overnight city from our own database.
6. EstimateModule calculates totals for each transport mode and ranks them.
7. PlannerService stores the trip and returns one JSON document the frontend can draw.
8. Optionally, AiModule writes a short human summary from the final numbers.

### 3.4 Request flow: book a hotel

1. Search `GET /hotels?city=...&checkIn=...&checkOut=...&guests=...` returns hotels with room types and total price.
2. The user opens a hotel page and views the 360° tour.
3. `POST /bookings` creates a PENDING booking inside a serializable transaction (inventory check and insert).
4. `POST /payments/checkout` creates a payment session with the provider and returns a redirect URL.
5. The provider calls `POST /payments/webhook`. The backend verifies the signature, marks the booking PAID/CONFIRMED and sends a confirmation.
6. A scheduled job expires unpaid PENDING bookings after the hold time.

### 3.5 Request flow: live tracking

1. The client opens a Socket.IO connection with a JWT.
2. It joins `trip:{id}`, allowed only for the owner or invited followers.
3. The traveler's device emits position events every few seconds.
4. The gateway validates and throttles them, optionally stores the last position, and broadcasts to the room.
5. Every 30 to 60 seconds the server recomputes the ETA to the next stop and emits `eta`.

### 3.6 Why a modular monolith

For a team this size, one NestJS application with clear modules is the best trade-off. Modules talk through injected services, not HTTP. If a module such as TrackingGateway later needs independent scaling, it can be extracted because the boundaries already exist.

## 4. Free services, limits and usage policies

Quotas are indicative and change. Always read the current terms.

### 4.1 Map rendering and tiles

| Option | Cost | Key | Notes |
|---|---|---|---|
| MapLibre GL JS | Free, open source (BSD) | No | The renderer. Recommended. |
| Leaflet | Free, open source | No | Simpler, raster-focused. Good fallback. |
| OpenFreeMap | Free | No | Hosted vector tiles and styles built from OpenStreetMap. Good default. |
| MapTiler Cloud | Free tier, monthly quota (verify) | Yes | Nice styles and satellite. Needs a key and attribution. |
| OpenStreetMap standard tiles | Free | No | Strict usage policy. Prototypes only. |

Recommended: MapLibre with the OpenFreeMap style URL. Self-hosting tiles (for example Protomaps `.pmtiles` for Algeria) is a later optimization.

### 4.2 Geocoding

| Option | Notes |
|---|---|
| Nominatim (OpenStreetMap) | Free. The public instance allows about 1 request per second, requires a descriptive User-Agent, and forbids bulk geocoding and autocomplete abuse. Cache every result. |
| Photon | Open-source geocoder suited to search-as-you-type. Public instance has fair-use limits. |
| Self-hosted Nominatim or Photon | Possible with the Algeria extract if volume grows. |

### 4.3 Routing

| Option | Notes |
|---|---|
| OpenRouteService (ORS) | Free API key with daily and per-minute quotas (verify). Offers directions, isochrones and matrix. |
| OSRM | Open source. The public demo server is for light testing only. Self-host with the Geofabrik Algeria extract for production. |
| Straight-line fallback | Haversine distance times a road factor (about 1.3) when routing is unavailable. Mark such results as "approximate". |

### 4.4 Points of interest and weather

| Service | Use | Notes |
|---|---|---|
| Overpass API | Query OSM for hotels, restaurants, fuel, attractions | Public servers throttle heavy queries. Cache by area. |
| Open-Meteo | Forecast per coordinate | Free for non-commercial use without a key. Commercial use needs a plan (verify terms). |
| Mapillary | Optional street-level imagery | Free API token. |

### 4.5 AI (NVIDIA NIM)

- Create a free account and API key at build.nvidia.com.
- Base URL: `https://integrate.api.nvidia.com/v1` (OpenAI-compatible: `/chat/completions`, `/models`).
- The free hosted tier is for prototyping and is rate-limited (verify current limits). For production load, plan a paid NVIDIA offering, self-hosted NIM containers, or a queue with backoff.
- Candidate models (confirm exact IDs in the catalog):

| Model ID (example) | Strength | Use in Levoyage |
|---|---|---|
| `meta/llama-3.1-70b-instruct` | Strong reasoning, multilingual | Itinerary generation |
| `meta/llama-3.1-8b-instruct` | Fast, light | Summaries, intent detection, short translations |
| `nvidia/llama-3.1-nemotron-70b-instruct` | Strong instruction following | Alternative planner |
| `mistralai/mixtral-8x22b-instruct-v0.1` | Good French | Fallback model |

Design for portability: the model ID is an environment variable, and the AI client sits behind an interface, so changing model or provider needs no business-code changes.

### 4.6 Data and infrastructure free tiers

| Need | Free option |
|---|---|
| PostgreSQL | Supabase, Neon, or self-hosted Docker |
| Redis | Upstash free tier, or Docker |
| Object storage | Cloudflare R2, Supabase Storage, Cloudinary free plan |
| Hosting | Render, Railway or Fly.io free or low-cost tiers; VPS with Docker |
| Email | Resend or Brevo free tier |
| Payments (Algeria) | Chargily Pay (Edahabia/CIB), or SATIM through a bank or partner |

### 4.7 Summary of the recommended free stack

```
Map renderer   MapLibre GL JS
Tiles/style    OpenFreeMap
Geocoding      Nominatim (+ cache)
Routing        OpenRouteService (+ Haversine fallback)
POI            Overpass API (+ own hotel database)
Weather        Open-Meteo
AI             NVIDIA NIM (Llama 3.1 70B / 8B)
360 viewer     Photo Sphere Viewer
Backend        NestJS + Prisma + PostgreSQL + Redis
Realtime       Socket.IO (NestJS gateway)
Payments       Chargily Pay + pay-at-hotel
```

## 5. Backend setup: adapted to the existing Levoyage backend

The spec in chapter 5 describes a separate NestJS service. The project already has a backend, so **do not add NestJS in v1**. Use the existing stack:

| Spec assumption | Existing project |
|---|---|
| NestJS modules and controllers | Next.js route handlers in `src/app/api/**/route.ts` |
| PostgreSQL + Prisma | Cloudflare D1 (SQLite) via `src/lib/d1.ts`; schema in `db/schema.sql` |
| Redis cache | Cache with Cloudflare KV or in-memory cache per request, or the D1 cache tables below |
| Object storage (S3/R2) | Cloudflare R2 via `src/lib/r2.ts` and `src/app/api/media/` |
| Session/JWT auth | Existing `src/lib/session.ts` and `src/lib/parse-auth.ts` |
| Zod validation | Use the validation already used in the route handlers |
| Money in integer DZD | Keep it. The schema uses `*_minor INTEGER` columns |

New Levoyage capabilities should be route handlers under `src/app/api/` (for example `planner/`, `routing/`, `hotels/`, `bookings/`, `tracking/`) and helper modules under `src/lib/`.

### 5.1 Environment variables (new keys only)

Add these to `.env` and `.env.example` (no real values in the example file). Keep secrets server-side:

```env
# AI (NVIDIA NIM, OpenAI-compatible)
NVIDIA_API_KEY=
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL_PLANNER=meta/llama-3.1-70b-instruct
NVIDIA_MODEL_FAST=meta/llama-3.1-8b-instruct
AI_TIMEOUT_MS=45000

# Maps
ORS_API_KEY=
NOMINATIM_USER_AGENT=Levoyage/1.0 (contact@levoyage.example)
OVERPASS_URL=https://overpass-api.de/api/interpreter
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast

# Booking
BOOKING_HOLD_MINUTES=15
```

Frontend public variable (safe to expose):

```env
NEXT_PUBLIC_MAP_STYLE=https://tiles.openfreemap.org/styles/liberty
```

Validate required server variables at the first call of each helper, and throw a clear error when one is missing, instead of failing later during a user's request.

### 5.2 Shared helpers

`src/lib/geo/haversine.ts`:

```ts
export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
```

Cache-aside helper for D1-backed caches (a table row keyed by the query):

```ts
export async function getOrSet<T>(
  load: () => Promise<T>,
  read: () => Promise<T | null>,
  write: (value: T) => Promise<void>,
): Promise<T> {
  const hit = await read();
  if (hit !== null) return hit;
  const value = await load();
  await write(value);
  return value;
}
```

### 5.3 API conventions

- Prefix: `/api/...` (the existing routes already follow this; keep it consistent).
- JSON in and out, `camelCase` fields in responses, ISO 8601 dates in UTC.
- Money is an integer in DZD. Never use floats for money.
- Errors use the same shape as the existing routes. Check `src/app/api/bookings/route.ts` before writing a new one.
- Protected routes must check the session through the existing helpers. Scope every query by the signed-in user's id.

## 6. Database design: adapted to D1

The existing schema already covers most entities. Map the spec onto it:

| Spec entity | Existing table | Status |
|---|---|---|
| User | `users` | Exists (`role`: traveler, partner, admin) |
| Trip | `trips` | Exists. Add `itinerary_json` and `estimate_json` TEXT columns |
| TripStop | `trip_items` | Exists with `entity_type`/`entity_id`. Add `lat`, `lng` for map use |
| Hotel | `properties` | Exists. Has `latitude` and `longitude` |
| Room | `rooms` | Exists |
| RoomPriceRule | `rate_plans` | Partly. Add weekday/date multipliers when needed |
| Booking / BookingRoom | `bookings` / `booking_rooms` | Exists. Add `idempotency_key` UNIQUE and `expires_at` |
| Payment | `payments` | Exists |
| Panorama / hotspots | `media_assets`, `scenes_360`, `scene_hotspots` | Exists |
| TransportOption | none | Add when transport booking is built |
| Rate (admin cost parameters) | none | Add |
| GeoCache | none | Add |
| RouteCache | none | Add |
| TrackingSession | none | Add when live tracking is built |

### 6.1 Proposed new tables (SQLite syntax)

Add these as a new migration. Do not edit existing `CREATE TABLE` statements in place:

```sql
CREATE TABLE IF NOT EXISTS rates (
  key TEXT PRIMARY KEY,
  value REAL NOT NULL,
  note TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS geo_cache (
  query TEXT PRIMARY KEY,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  label TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'nominatim',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS route_cache (
  cache_key TEXT PRIMARY KEY,
  distance_km REAL NOT NULL,
  duration_min REAL NOT NULL,
  geometry_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tracking_sessions (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  owner_user_id TEXT NOT NULL REFERENCES users(id),
  share_code TEXT NOT NULL UNIQUE,
  active INTEGER NOT NULL DEFAULT 1,
  last_lat REAL,
  last_lng REAL,
  last_at TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Seed the `rates` table with the values from chapter 6.5 of the original spec (`car.perKmDZD`, `bus.perKmDZD`, `train.perKmDZD`, `taxi.perKmDZD`, `taxi.fixedDZD`, `flight.perKmDZD`, `flight.fixedDZD`, `meals.perDayDZD`, `hotel.fallbackPerNightDZD`, `road.factor`).

### 6.2 Notes for D1

- D1 has no PostGIS. For nearby hotels, filter by a bounding box on `latitude`/`longitude`, then sort by Haversine distance in code. Add an index on `(latitude, longitude)` for `properties` when you need it.
- Keep booking reservation checks in one batch or transaction. D1 supports `db.batch([...])` for atomic writes.
- Money stays in `*_minor INTEGER` columns, following the existing schema.

## Open items before building

1. The spec's Chargily and payment details (chapter 17 onward) are not written yet, and the payment line in the source text was garbled.
2. Chapters 7 to 16 (AI, geo, routing, estimation, planner, tracking, weather/POI, reservations, payments, transport, admin, VR 360, Next.js integration, i18n, security, testing, deployment, observability, licensing) still need to be adapted to this stack.
3. The migration in 6.1 has not been applied. Run it only after review.

<!-- APPEND_NEXT: remaining sections 7-16 + appendices, adapted to the existing stack -->
