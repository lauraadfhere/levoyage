"use client";

import Image from "next/image";
import { createTranslator, localeOrDefault } from "@/lib/i18n";

const locales = [["en", "English"], ["fr", "Français"], ["ar", "العربية"]] as const;

export function AuthLanguageSwitch({ page, locale = "en" }: { page: "login" | "signup"; locale?: string }) {
  const activeLocale = localeOrDefault(locale);
  const t = createTranslator(activeLocale);
  function change(value: string) { window.location.assign(`/${value}/${page}`); }
  return <label className="auth-language-menu"><Image src="/world.svg" alt="" width={18} height={18} aria-hidden="true" /><span>{t("account.language")}</span><select value={activeLocale} onChange={event => change(event.target.value)} aria-label={t("account.chooseLanguage")}>{locales.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>;
}
