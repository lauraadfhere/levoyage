import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthForm } from "@/components/account-forms";
import { AuthLanguageSwitch } from "@/components/auth-language-switch";

export default async function LocalSignup({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!['en', 'fr', 'ar'].includes(locale)) notFound();
  return <main className="account-page" dir={locale === "ar" ? "rtl" : "ltr"}><header className="account-header"><Link href={`/${locale}`} aria-label="Veyyri home"><Image src="/veyyri.png" alt="Veyyri" width={304} height={110} priority /></Link><AuthLanguageSwitch page="signup" locale={locale} /></header><section className="account-panel"><h1>Create your traveler account</h1><p>Save stays, make trips and receive booking updates.</p><AuthForm mode="signup" locale={locale} /><p className="account-help"><Link href={`/${locale}/login`}>Already have an account? Sign in</Link></p></section><p className="account-copyright">© {new Date().getFullYear()} Piolian · Algeria Travel Platform</p></main>;
}
