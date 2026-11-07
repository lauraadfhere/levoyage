import Link from "next/link";

export type Card = { title: string; meta: string; detail: string; price?: string; badge?: string; href?: string };

export function CatalogGrid({ cards }: { cards: Card[] }) {
  return <div className="catalog-grid">{cards.map((card) => <article className="catalog-card" key={card.title}><div className="catalog-image"><span>{card.badge || "ALGERIA"}</span></div><div className="catalog-copy"><p>{card.meta}</p><h2>{card.title}</h2><p className="catalog-detail">{card.detail}</p>{card.price && <strong>{card.price}</strong>}<Link href={card.href || "/search"}>Explore <span aria-hidden="true">→</span></Link></div></article>)}</div>;
}
