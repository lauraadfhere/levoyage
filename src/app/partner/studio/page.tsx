import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function StudioPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  const steps = [
    ["studio.s1t", "studio.s1d"],
    ["studio.s2t", "studio.s2d"],
    ["studio.s3t", "studio.s3d"],
    ["studio.s4t", "studio.s4d"],
  ] as const;
  return (
    <MarketingPage eyebrow={t("partner.studio")} title={t("studio.title")} intro={t("studio.intro")} artTheme="explore">
      <ol className="studio-steps">
        {steps.map(([titleKey, detailKey]) => (
          <li key={titleKey}><b>{t(titleKey)}</b><span>{t(detailKey)}</span></li>
        ))}
      </ol>
    </MarketingPage>
  );
}
