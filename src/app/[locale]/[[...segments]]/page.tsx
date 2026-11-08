import { notFound } from "next/navigation";
import Home from "@/app/page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; segments?: string[] }> }) {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) notFound();
  if (segments.length > 0) notFound();
  return <Home initialLanguage={locale} />;
}
