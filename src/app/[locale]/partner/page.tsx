import PartnerPage from "@/app/partner/page";

export default async function LocalPartnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PartnerPage locale={locale} />;
}
