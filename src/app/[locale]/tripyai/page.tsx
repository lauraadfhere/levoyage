import TripyaiPage from "@/app/tripyai/page";

export default async function LocalTripyaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TripyaiPage locale={locale} />;
}
