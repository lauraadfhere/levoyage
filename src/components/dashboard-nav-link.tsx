"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath } from "@/components/locale-switcher";
import type { Locale } from "@/components/locale-switcher";
const hotelLabels = { en: "Hotels", fr: "Hôtels", ar: "الفنادق" } as const;
const labels = { en: { map: "Tourist map", explore: "Explore Algeria", circuit: "Tourist circuit", offers: "Offers" }, fr: { map: "Carte touristique", explore: "Explorez l’Algérie", circuit: "Circuit touristique", offers: "Offres" }, ar: { map: "الخريطة السياحية", explore: "استكشف الجزائر", circuit: "الدائرة السياحية", offers: "العروض" } } as const;
export function DashboardNavLink({ href, icon, active }: { href: string; label: string; icon: keyof typeof labels.en | "hotels"; active: boolean }) { const pathname = usePathname(); const current = pathname.split("/")[1] as Locale; const locale: Locale = ["en", "fr", "ar"].includes(current) ? current : "en"; const label = icon === "hotels" ? hotelLabels[locale] : labels[locale][icon]; return <Link className={active ? "active" : ""} href={localizedPath(href, locale)}><span className={`dashboard-nav-icon ${icon}`} aria-hidden="true" />{label}</Link>; }
