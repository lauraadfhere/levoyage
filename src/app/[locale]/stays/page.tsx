import StaysPage from "@/app/stays/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalStaysPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ city?: string; q?: string }>;
}) {
  const { locale } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <StaysPage locale={locale} searchParams={searchParams} />
    </div>
  );
}
