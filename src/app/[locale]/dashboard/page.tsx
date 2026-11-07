import DashboardPage from "@/app/dashboard/page";
export default async function LocalDashboardPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return <div dir={locale === "ar" ? "rtl" : "ltr"}><DashboardPage /></div>; }
