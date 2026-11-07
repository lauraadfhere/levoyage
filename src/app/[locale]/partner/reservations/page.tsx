import PartnerReservationsPage from "@/app/partner/reservations/page";
export default async function LocalPartnerReservationsPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return <div dir={locale === "ar" ? "rtl" : "ltr"}><PartnerReservationsPage /></div>; }
