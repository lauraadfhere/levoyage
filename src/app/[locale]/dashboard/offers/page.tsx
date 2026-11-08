import DashboardOffersPage from "@/app/dashboard/offers/page";

export default async function LocalDashboardOffersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <DashboardOffersPage locale={locale} />;
}
