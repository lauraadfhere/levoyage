import TermsPage from "@/app/terms/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><TermsPage locale={locale} /></div>;
}
