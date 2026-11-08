import PlannerPage from "@/app/planner/page";
import { dirFor, localeOrDefault } from "@/lib/i18n";

export default async function LocalPlannerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ destination?: string }>;
}) {
  const { locale } = await params;
  return (
    <div dir={dirFor(localeOrDefault(locale))}>
      <PlannerPage locale={locale} searchParams={searchParams} />
    </div>
  );
}
