import StudioPage from "@/app/partner/studio/page";

export default async function LocalStudioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <StudioPage locale={locale} />;
}
