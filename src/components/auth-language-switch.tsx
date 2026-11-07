"use client";

import Image from "next/image";

const locales = [["en", "English"], ["fr", "Français"], ["ar", "العربية"]] as const;

export function AuthLanguageSwitch({ page, locale = "en" }: { page: "login" | "signup"; locale?: string }) {
  const activeLocale = locales.some(([value]) => value === locale) ? locale : "en";
  function change(value: string) { window.location.assign(`/${value}/${page}`); }
  return <label className="auth-language-menu"><Image src="/world.svg" alt="" width={18} height={18} aria-hidden="true" /><span>Language</span><select value={activeLocale} onChange={event => change(event.target.value)} aria-label="Choose language">{locales.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>;
}
