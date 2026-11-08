"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createTranslator, localeFromPath, localeSwitchPath, type Locale } from "@/lib/i18n";

export { LOCALES, localizedPath } from "@/lib/i18n";
export type { Locale } from "@/lib/i18n";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = localeFromPath(pathname);
  const t = createTranslator(locale);
  return (
    <label className={`language-menu ${className}`}>
      <span className="sr-only">{t("account.language")}</span>
      <Image className="language-world" src="/world.svg" alt="" width={15} height={15} aria-hidden="true" />
      <select
        value={locale}
        onChange={(event) => router.push(`${localeSwitchPath(pathname, event.target.value as Locale)}${window.location.search}`)}
        aria-label={t("account.chooseLanguage")}
      >
        <option value="en">EN · English</option>
        <option value="fr">FR · Français</option>
        <option value="ar">AR · العربية</option>
      </select>
    </label>
  );
}
