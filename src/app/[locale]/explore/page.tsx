import ExplorePage from "@/app/explore/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><ExplorePage locale={locale} /></div>;
}
