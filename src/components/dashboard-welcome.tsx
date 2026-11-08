"use client";
import { useEffect, useState } from "react";
import { createTranslator } from "@/lib/i18n";
const copy = { en: ["MY TRAVEL", "Welcome back", "Choose how you want to discover Algeria today."], fr: ["MES VOYAGES", "Bon retour", "Choisissez comment vous souhaitez découvrir l’Algérie aujourd’hui."], ar: ["رحلاتي", "مرحبًا بعودتك", "اختر كيف تريد اكتشاف الجزائر اليوم."] } as const;
export function DashboardWelcome({ locale = "en" }: { locale?: keyof typeof copy }) { const [name, setName] = useState(createTranslator(locale)("dashboard.guest")); useEffect(() => { fetch("/api/auth/profile").then(async response => { if (response.ok) { const account = await response.json() as { fullName?: string }; if (account.fullName) setName(account.fullName); } }).catch(() => undefined); }, []); const t = copy[locale]; return <section className="traveler-welcome"><p className="dashboard-eyebrow">{t[0]}</p><h1>{t[1]}, {name}</h1><p>{t[2]}</p></section>; }
