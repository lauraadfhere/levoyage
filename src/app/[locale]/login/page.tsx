import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthForm } from "@/components/account-forms";
import { AuthLanguageSwitch } from "@/components/auth-language-switch";

const copy = {
  en: ["Sign in to My Travel", "Access your trips, saved places and traveler profile."],
  fr: ["Connectez-vous à Mes voyages", "Accédez à vos séjours, lieux enregistrés et profil voyageur."],
  ar: ["تسجيل الدخول إلى رحلاتي", "ادخل إلى رحلاتك والأماكن المحفوظة وملف المسافر."],
} as const;

export default async function LocalLogin({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(locale in copy)) notFound();
  const [title, intro] = copy[locale as keyof typeof copy];
  return <main className="account-page" dir={locale === "ar" ? "rtl" : "ltr"}><header className="account-header"><Link href={`/${locale}`} aria-label="Le Voyage home"><Image src="/levoyage.png" alt="Le Voyage" width={330} height={110} priority /></Link><AuthLanguageSwitch page="login" locale={locale} /></header><section className="account-panel"><h1>{title}</h1><p>{intro}</p><AuthForm mode="login" locale={locale} /><p className="account-help"><Link href={`/${locale}/signup`}>Create an account</Link></p></section><p className="account-copyright">© {new Date().getFullYear()} Le Voyage · Algeria Travel Platform</p></main>;
}
