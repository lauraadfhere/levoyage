import { ContactForm } from "@/components/contact-form";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function ContactPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  return (
    <MarketingPage eyebrow={t("contact.eyebrow")} title={t("contact.title")} intro={t("contact.intro")} artTheme="explore">
      <ContactForm />
    </MarketingPage>
  );
}
