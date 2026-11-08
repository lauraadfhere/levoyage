import ExperiencesPage from "@/app/experiences/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><ExperiencesPage locale={locale} /></div>;
}
