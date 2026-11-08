import SearchPage from "@/app/search/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ destination?: string; checkIn?: string; checkOut?: string; guests?: string }>;
}) {
  const { locale } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <SearchPage locale={locale} searchParams={searchParams} />
    </div>
  );
}
