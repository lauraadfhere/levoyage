import { notFound } from "next/navigation";
import { AuthPage } from "@/components/auth-page";
import { isLocale } from "@/lib/i18n";

export default async function LocalSignup({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AuthPage mode="signup" locale={locale} />;
}
