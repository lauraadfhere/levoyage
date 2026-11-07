-- Poilian Algeria Travel Platform: Cloudflare D1 / SQLite schema
-- Apply through: yarn schema:apply
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, display_name TEXT, role TEXT NOT NULL DEFAULT 'traveler' CHECK(role IN ('traveler','partner','admin')), locale TEXT NOT NULL DEFAULT 'en' CHECK(locale IN ('en','fr','ar')), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY, owner_user_id TEXT NOT NULL REFERENCES users(id), name TEXT NOT NULL, kind TEXT NOT NULL CHECK(kind IN ('hotel','tour_operator','restaurant','activity_provider','agency')), verification_status TEXT NOT NULL DEFAULT 'pending' CHECK(verification_status IN ('pending','verified','rejected')), phone TEXT, email TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, country_code TEXT NOT NULL DEFAULT 'DZ', wilaya TEXT, city TEXT NOT NULL, parent_id TEXT REFERENCES destinations(id), status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published')), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS destination_translations (
  destination_id TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE, locale TEXT NOT NULL CHECK(locale IN ('en','fr','ar')), name TEXT NOT NULL, summary TEXT, body TEXT, PRIMARY KEY(destination_id, locale)
);
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL REFERENCES businesses(id), destination_id TEXT NOT NULL REFERENCES destinations(id), slug TEXT NOT NULL UNIQUE, type TEXT NOT NULL CHECK(type IN ('hotel','resort','apartment','guesthouse','villa','hostel','residence','camp')), name TEXT NOT NULL, address TEXT, latitude REAL, longitude REAL, rating REAL, review_count INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','suspended')), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY, property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE, name TEXT NOT NULL, capacity INTEGER NOT NULL, bed_description TEXT, amenities_json TEXT NOT NULL DEFAULT '[]', quantity INTEGER NOT NULL DEFAULT 1, active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS rate_plans (
  id TEXT PRIMARY KEY, room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE, name TEXT NOT NULL, currency TEXT NOT NULL DEFAULT 'DZD', nightly_price_minor INTEGER NOT NULL, meal_plan TEXT, cancellation_policy TEXT, refundable INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS availability (
  id TEXT PRIMARY KEY, room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE, date TEXT NOT NULL, available_units INTEGER NOT NULL, price_override_minor INTEGER, UNIQUE(room_id, date)
);
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL REFERENCES businesses(id), destination_id TEXT NOT NULL REFERENCES destinations(id), slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, type TEXT NOT NULL, duration_minutes INTEGER, price_minor INTEGER, currency TEXT NOT NULL DEFAULT 'DZD', capacity INTEGER, status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','suspended'))
);
CREATE TABLE IF NOT EXISTS restaurants (
  id TEXT PRIMARY KEY, business_id TEXT REFERENCES businesses(id), destination_id TEXT NOT NULL REFERENCES destinations(id), slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, cuisine TEXT, price_level INTEGER, address TEXT, status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','suspended'))
);
CREATE TABLE IF NOT EXISTS tours_360 (
  id TEXT PRIMARY KEY, owner_type TEXT NOT NULL CHECK(owner_type IN ('property','destination','restaurant','experience','attraction')), owner_id TEXT NOT NULL, title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','submitted','published','rejected')), created_by_user_id TEXT NOT NULL REFERENCES users(id), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY, owner_type TEXT NOT NULL, owner_id TEXT NOT NULL, bucket TEXT NOT NULL, object_key TEXT NOT NULL UNIQUE, content_type TEXT NOT NULL, byte_size INTEGER NOT NULL, checksum TEXT, visibility TEXT NOT NULL DEFAULT 'private' CHECK(visibility IN ('private','approved_public')), alt_text TEXT, created_by_user_id TEXT NOT NULL REFERENCES users(id), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS scenes_360 (
  id TEXT PRIMARY KEY, tour_id TEXT NOT NULL REFERENCES tours_360(id) ON DELETE CASCADE, media_asset_id TEXT NOT NULL REFERENCES media_assets(id), title TEXT NOT NULL, description TEXT, sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS scene_hotspots (
  id TEXT PRIMARY KEY, scene_id TEXT NOT NULL REFERENCES scenes_360(id) ON DELETE CASCADE, target_scene_id TEXT REFERENCES scenes_360(id), pitch REAL NOT NULL, yaw REAL NOT NULL, label TEXT, kind TEXT NOT NULL DEFAULT 'scene' CHECK(kind IN ('scene','info','booking'))
);
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), property_id TEXT REFERENCES properties(id), experience_id TEXT REFERENCES experiences(id), status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed','cancelled','completed')), check_in TEXT, check_out TEXT, guests INTEGER NOT NULL, total_minor INTEGER NOT NULL, currency TEXT NOT NULL DEFAULT 'DZD', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, CHECK(property_id IS NOT NULL OR experience_id IS NOT NULL)
);
CREATE TABLE IF NOT EXISTS booking_rooms (
  id TEXT PRIMARY KEY, booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE, room_id TEXT NOT NULL REFERENCES rooms(id), rate_plan_id TEXT REFERENCES rate_plans(id), quantity INTEGER NOT NULL, nightly_price_minor INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY, booking_id TEXT NOT NULL REFERENCES bookings(id), provider TEXT NOT NULL, provider_reference TEXT, status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','authorized','paid','failed','refunded')), amount_minor INTEGER NOT NULL, currency TEXT NOT NULL DEFAULT 'DZD', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), entity_type TEXT NOT NULL CHECK(entity_type IN ('property','experience','restaurant','destination')), entity_id TEXT NOT NULL, booking_id TEXT REFERENCES bookings(id), rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5), body TEXT, status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','published','rejected')), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS saved_items (user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user_id, entity_type, entity_id));
CREATE TABLE IF NOT EXISTS trips (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, title TEXT NOT NULL, destination_id TEXT REFERENCES destinations(id), start_date TEXT, end_date TEXT, planner_input TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS trip_items (id TEXT PRIMARY KEY, trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, day_number INTEGER, notes TEXT);
CREATE INDEX IF NOT EXISTS idx_properties_destination ON properties(destination_id, status);
CREATE INDEX IF NOT EXISTS idx_experiences_destination ON experiences(destination_id, status);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_media_owner ON media_assets(owner_type, owner_id);
CREATE INDEX IF NOT EXISTS idx_reviews_entity ON reviews(entity_type, entity_id, status);
