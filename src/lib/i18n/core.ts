export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Locale prefix used by the current URL, defaulting to English. */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : "en";
}

/** Path segments without the locale prefix. */
export function stripLocale(pathname: string): string[] {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return segments;
}

/** Prefix a path for a locale, keeping any nested segments. */
export function localizedPath(pathname: string, locale: Locale): string {
  const segments = stripLocale(pathname);
  return `/${locale}${segments.length ? `/${segments.join("/")}` : ""}`;
}

/** Prefix a path only for non-default locales, so English keeps clean URLs. */
export function pathFor(pathname: string, locale: Locale): string {
  return locale === "en" ? pathname : localizedPath(pathname, locale);
}

/** Pages that also exist under `/<locale>/...`. */
const localizedSections = new Set([
  "",
  "explore",
  "explore-360",
  "destinations",
  "stays",
  "experiences",
  "guide",
  "planner",
  "partner",
  "bookings",
  "about",
  "contact",
  "privacy",
  "terms",
  "search",
  "properties",
  "dashboard",
  "login",
  "signup",
  "profile",
  "admin",
  "tripyai",
]);

/**
 * Target for the language switcher: keeps the current page when that page has a
 * localized route, otherwise falls back to the locale home instead of a 404.
 */
export function localeSwitchPath(pathname: string, locale: Locale): string {
  const segments = stripLocale(pathname);
  if (!segments.length) return `/${locale}`;
  if (localizedSections.has(segments.join("/"))) return `/${locale}/${segments.join("/")}`;
  if (segments.length > 1 && localizedSections.has(segments[0])) return `/${locale}/${segments[0]}`;
  return `/${locale}`;
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
