"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
const locales = ["en", "fr", "ar"] as const;
export type Locale = typeof locales[number];
export function localizedPath(pathname: string, locale: Locale) { const segments = pathname.split("/").filter(Boolean); if (locales.includes(segments[0] as Locale)) segments.shift(); return `/${locale}${segments.length ? `/${segments.join("/")}` : ""}`; }
export function LocaleSwitcher({ className = "" }: { className?: string }) { const pathname = usePathname(); const router = useRouter(); const current = pathname.split("/")[1] as Locale; const locale = locales.includes(current) ? current : "en"; return <label className={`language-menu ${className}`}><span className="sr-only">Language</span><Image className="language-world" src="/world.svg" alt="" width={15} height={15} aria-hidden="true" /><select value={locale} onChange={event => router.push(localizedPath(pathname, event.target.value as Locale))} aria-label="Choose language"><option value="en">EN · English</option><option value="fr">FR · Français</option><option value="ar">AR · العربية</option></select></label>; }
