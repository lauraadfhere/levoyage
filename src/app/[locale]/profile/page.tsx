import ProfilePage from "@/app/profile/page";

export default async function LocalProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ProfilePage locale={locale} />;
}
