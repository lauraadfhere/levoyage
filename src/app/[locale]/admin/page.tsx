import AdminPage from "@/app/admin/page";
export default async function LocalAdminPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return <div dir={locale === "ar" ? "rtl" : "ltr"}><AdminPage /></div>; }
