import PropertyPage from "@/app/properties/[slug]/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalPropertyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <PropertyPage params={Promise.resolve({ slug })} locale={locale} />
    </div>
  );
}
