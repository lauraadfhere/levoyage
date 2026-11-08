import AboutPage from "@/app/about/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><AboutPage locale={locale} /></div>;
}
