import ContactPage from "@/app/contact/page";
import { dirFor } from "@/lib/i18n";

export default async function LocalContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div dir={dirFor(locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en")}><ContactPage locale={locale} /></div>;
}
