import DestinationDetail from "@/app/destinations/[slug]/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalDestinationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ place?: string; scene?: string }>;
}) {
  const { locale, slug } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <DestinationDetail params={Promise.resolve({ slug })} searchParams={searchParams} locale={locale} />
    </div>
  );
}
