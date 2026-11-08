import PrivacyPage from "@/app/privacy/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><PrivacyPage locale={locale} /></div>;
}
