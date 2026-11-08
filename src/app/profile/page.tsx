import Link from "next/link";
import { ProfileForm } from "@/components/account-forms";
import { DashboardFooter } from "@/components/dashboard-chrome";
import { SiteHeader } from "@/components/site-chrome";
import { createTranslator, dirFor, localeOrDefault, pathFor } from "@/lib/i18n";

export default function ProfilePage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return <div className="profile-page" dir={dirFor(active)}>
    <SiteHeader />
    <main className="marketing-page">
      <section className="profile-page-hero">
        <div className="shell">
          <Link className="profile-back" href={pathFor("/dashboard", active)}>{t("profile.back")}</Link>
          <p className="section-kicker">{t("profile.kicker")}</p>
          <h1>{t("profile.title")}</h1>
          <p>{t("profile.intro")}</p>
        </div>
      </section>
      <div className="shell page-content"><ProfileForm /></div>
    </main>
    <DashboardFooter />
  </div>;
}
