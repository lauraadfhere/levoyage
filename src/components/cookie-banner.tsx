"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath, localizedPath } from "@/lib/i18n";

const COOKIE_NOTICE_KEY = "poilian-cookie-notice-dismissed";
const localeNames = { en: "English", fr: "Français", ar: "العربية" } as const;

export function CookieBanner() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = createTranslator(locale);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(window.localStorage.getItem(COOKIE_NOTICE_KEY) !== "true"), []);
  const dismiss = () => { window.localStorage.setItem(COOKIE_NOTICE_KEY, "true"); setIsVisible(false); };
  if (!isVisible) return null;
  return <aside className="cookie-banner" aria-label={t("cookie.language")} dir={locale === "ar" ? "rtl" : "ltr"}>
    <div className="cookie-banner-top">
      <span className="cookie-language" aria-label={t("cookie.language")}>⌘ <span>{localeNames[locale]}</span><i aria-hidden="true">⌄</i></span>
      <button className="cookie-close" type="button" onClick={dismiss} aria-label={t("cookie.close")}>×</button>
    </div>
    <p>{t("cookie.text")} <Link href={localizedPath("/privacy", locale)}>{t("cookie.policy")}</Link>.</p>
  </aside>;
}
