import GuidePage from "@/app/guide/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><GuidePage locale={locale} /></div>;
}
