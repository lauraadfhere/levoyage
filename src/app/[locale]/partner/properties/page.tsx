import PartnerPropertiesPage from "@/app/partner/properties/page";
export default async function LocalPartnerPropertiesPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return <div dir={locale === "ar" ? "rtl" : "ltr"}><PartnerPropertiesPage /></div>; }
