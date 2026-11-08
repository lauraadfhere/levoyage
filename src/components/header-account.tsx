"use client";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";

type Account = { fullName: string; avatarId: string | null };
export function HeaderAccount({ language, onLanguage }: { language?: string; onLanguage?: (value: "en" | "fr" | "ar") => void }) {
  const pathname = usePathname();
  const t = createTranslator(localeFromPath(pathname));
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => { const loadAccount = () => fetch("/api/auth/profile").then(async response => { if (response.ok) setAccount(await response.json()); }).catch(() => undefined); loadAccount(); window.addEventListener("account-profile-updated", loadAccount); return () => window.removeEventListener("account-profile-updated", loadAccount); }, []);
  const initials = account?.fullName.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase() || "";
  async function signOut() { await fetch("/api/auth/logout", { method: "POST" }); setAccount(null); }
  return <div className="header-account">
    {onLanguage && <label className="language-menu"><span className="sr-only">{t("account.language")}</span><Image className="language-world" src="/world.svg" alt="" width={15} height={15} aria-hidden="true" /><select value={language} onChange={event => onLanguage(event.target.value as "en" | "fr" | "ar")} aria-label={t("account.chooseLanguage")}><option value="en">EN · English</option><option value="fr">FR · Français</option><option value="ar">AR · العربية</option></select></label>}
    <Link className="support-link" href="/contact" aria-label={t("account.support")} title={t("account.support")}>?</Link>
    {account ? <details className="profile-menu">
      <summary><span className="header-avatar">{initials}</span><span className="profile-label">{account.fullName}</span><i aria-hidden="true">⌄</i></summary>
      <div>
        <Link href="/dashboard">{t("account.myTravel")}</Link>
        <Link href="/profile">{t("account.profile")}</Link>
        <Link href="/destinations">{t("account.exploreAll")}</Link>
        <Link href="/partner">{t("account.partnerCentre")}</Link>
        <button type="button" onClick={signOut}>{t("account.signOut")}</button>
      </div>
    </details> : <>
      <Link className="outline-button" href="/signup">{t("account.register")}</Link>
      <Link className="light-button" href="/login">{t("account.signIn")}</Link>
    </>}
  </div>;
}
