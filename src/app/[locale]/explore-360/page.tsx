import Explore360Page from "@/app/explore-360/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalExplore360Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ destination?: string; place?: string; scene?: string }>;
}) {
  const { locale } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <Explore360Page locale={locale} searchParams={searchParams} />
    </div>
  );
}
