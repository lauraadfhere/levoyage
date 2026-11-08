import DestinationsPage from "@/app/destinations/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalDestinationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ wilaya?: string; place?: string; q?: string }>;
}) {
  const { locale } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <DestinationsPage locale={locale} searchParams={searchParams} />
    </div>
  );
}
