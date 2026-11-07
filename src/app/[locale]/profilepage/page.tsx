import ProfilePage from "@/app/profile/page";
export default async function LocalProfilePageAlias({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return <div dir={locale === "ar" ? "rtl" : "ltr"}><ProfilePage /></div>; }
