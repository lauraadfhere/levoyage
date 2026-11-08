import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/account-forms";
import { AuthLanguageSwitch } from "@/components/auth-language-switch";
import { createTranslator, dirFor, localeOrDefault, localizedPath } from "@/lib/i18n";

export function AuthPage({ mode, locale }: { mode: "login" | "signup"; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const isLogin = mode === "login";
  return (
    <main className="account-page" dir={dirFor(active)}>
      <header className="account-header">
        <Link href={`/${active}`} aria-label="Le Voyage home">
          <Image src="/levoyage-white.png" alt="Le Voyage" width={330} height={110} priority />
        </Link>
        <AuthLanguageSwitch page={mode} locale={active} />
      </header>
      <section className="account-panel">
        <h1>{t(isLogin ? "auth.signInTitle" : "auth.signUpTitle")}</h1>
        <p>{t(isLogin ? "auth.signInIntro" : "auth.signUpIntro")}</p>
        <AuthForm mode={mode} locale={active} />
        <p className="account-help">
          {isLogin
            ? <>{t("auth.newHere")} <Link href={localizedPath("/signup", active)}>{t("auth.createAccount")}</Link></>
            : <>{t("auth.haveAccount")} <Link href={localizedPath("/login", active)}>{t("auth.signIn")}</Link></>}
        </p>
        <footer>
          {t("auth.termsLead")} <Link href={localizedPath("/terms", active)}>{t("auth.terms")}</Link> {t("auth.and")} <Link href={localizedPath("/privacy", active)}>{t("auth.privacy")}</Link>.
        </footer>
      </section>
      <p className="account-copyright">{t("auth.copyright", { year: new Date().getFullYear() })}</p>
    </main>
  );
}
