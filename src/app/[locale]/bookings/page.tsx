import BookingsPage from "@/app/bookings/page";

export default async function LocalBookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BookingsPage locale={locale} />;
}
