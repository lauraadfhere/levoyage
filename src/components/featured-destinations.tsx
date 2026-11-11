import Link from "next/link";
import { DestinationPicture, type DestinationPictureKind } from "@/components/destination-picture";

type Locale = "en" | "fr" | "ar";

const pictureKind: Record<string, DestinationPictureKind> = {
  algiers: "sea", oran: "sea", tipaza: "sea", bejaia: "sea", annaba: "sea",
  constantine: "ksar", tlemcen: "ksar", ghardaia: "ksar",
  illizi: "desert", djanet: "desert", tamanrasset: "desert", timimoun: "desert",
};

const featured = [
  { slug: "algiers", name: { en: "Algiers", fr: "Alger", ar: "الجزائر العاصمة" }, note: { en: "Casbah, Notre-Dame d'Afrique and the Mediterranean bay.", fr: "Casbah, Notre-Dame d'Afrique et la baie méditerranéenne.", ar: "القصبة وكاتدرائية نوتردام دافريك وخليج المتوسط." } },
  { slug: "oran", name: { en: "Oran", fr: "Oran", ar: "وهران" }, note: { en: "Raï music, Santa Cruz fort and the Corniche.", fr: "Raï, fort Santa Cruz et la Corniche.", ar: "موسيقى الراي وحصن سانتا كروز والكورنيش." } },
  { slug: "constantine", name: { en: "Constantine", fr: "Constantine", ar: "قسنطينة" }, note: { en: "City of bridges and gorges, perched above the Rhumel.", fr: "Ville des ponts et des gorges, au-dessus du Rhumel.", ar: "مدينة الجسور والمضايق فوق وادي الرمال." } },
  { slug: "tipaza", name: { en: "Tipaza", fr: "Tipasa", ar: "تيبازة" }, note: { en: "Roman ruins by the sea and sunset views over the coast.", fr: "Ruines romaines au bord de la mer.", ar: "آثار رومانية على البحر وغروب ساحر." } },
  { slug: "bejaia", name: { en: "Béjaïa", fr: "Béjaïa", ar: "بجاية" }, note: { en: "Coastal old town, Gouraya National Park and bay beaches.", fr: "Vieille ville côtière, parc de Gouraya et plages.", ar: "مدينة ساحلية قديمة وحديقة جرجرة وشواطئ الخليج." } },
  { slug: "annaba", name: { en: "Annaba", fr: "Annaba", ar: "عنابة" }, note: { en: "Hippone ruins, Cap de Garde and the Seraidi beaches.", fr: "Ruines d'Hippone, cap de Garde et plages.", ar: "أطلال هيبون ورأس الحرس وشواطئ سرايدي." } },
  { slug: "tlemcen", name: { en: "Tlemcen", fr: "Tlemcen", ar: "تلمسان" }, note: { en: "Andalusian heritage, Mansourah ruins and Lalla Setti.", fr: "Patrimoine andalou, ruines de Mansourah.", ar: "التراث الأندلسي وأطلال المنصورة." } },
  { slug: "ghardaia", name: { en: "Ghardaïa", fr: "Ghardaïa", ar: "غرداية" }, note: { en: "M'zab Valley, a UNESCO World Heritage ksar town.", fr: "Vallée du M'zab, patrimoine mondial de l'UNESCO.", ar: "وادي ميزاب، تراث عالمي لليونسكو." } },
  { slug: "illizi", name: { en: "Illizi", fr: "Illizi", ar: "إليزي" }, note: { en: "Gateway to the Tassili n'Ajjer rock art and desert landscapes.", fr: "Porte du Tassili n'Ajjer et de son art rupestre.", ar: "بوابة طاسيلي ناجر وفنونها الصخرية." } },
  { slug: "djanet", name: { en: "Djanet", fr: "Djanet", ar: "جانت" }, note: { en: "Oasis town at the foot of the Tassili plateau.", fr: "Oasis au pied du plateau du Tassili.", ar: "واحة عند سفح هضبة طاسيلي." } },
  { slug: "tamanrasset", name: { en: "Tamanrasset", fr: "Tamanrasset", ar: "تمنراست" }, note: { en: "Hoggar Mountains and the Assekrem hermitage.", fr: "Massif du Hoggar et l'ermitage d'Assekrem.", ar: "جبال الهقار وصومعة أسكرم." } },
  { slug: "timimoun", name: { en: "Timimoun", fr: "Timimoun", ar: "تيميمون" }, note: { en: "The Red Oasis, its ksar and golden dunes.", fr: "L'oasis rouge, son ksar et ses dunes dorées.", ar: "الواحة الحمراء وقصورها وكثبانها الذهبية." } },
];

const labels = {
  en: { kicker: "MOST VISITED", title: "Famous Algerian destinations", cta: "Open destination", vr: "360° / VR" },
  fr: { kicker: "LES PLUS VISITÉS", title: "Destinations algériennes incontournables", cta: "Ouvrir la destination", vr: "360° / VR" },
  ar: { kicker: "الأكثر زيارة", title: "أشهر الوجهات الجزائرية", cta: "فتح الوجهة", vr: "360° / VR" },
} as const;

export function FeaturedDestinations({ locale }: { locale: Locale }) {
  const t = labels[locale];
  return (
    <section className="featured-destinations" aria-label={t.title}>
      <p className="section-kicker">{t.kicker}</p>
      <h2>{t.title}</h2>
      <div className="catalog-grid destination-grid">
        {featured.map((item) => (
          <article className="catalog-card" key={item.slug}>
            <DestinationPicture kind={pictureKind[item.slug]} label={item.name[locale]} />
            <div className="catalog-copy">
              <h3>{item.name[locale]}</h3>
              <p className="catalog-detail">{item.note[locale]}</p>
              <div className="destination-card-actions">
                <Link href={`/destinations/${item.slug}`}>{t.cta}</Link>
                <Link href={`/explore-360?destination=${item.slug}`}>{t.vr}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
