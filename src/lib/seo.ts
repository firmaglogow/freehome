// Wspólne narzędzia SEO: budowanie pełnych metadanych podstron (canonical +
// Open Graph + Twitter, ze spójnym obrazem OG) oraz danych strukturalnych
// JSON-LD (BreadcrumbList, Product/Offer dla ofert).
//
// Dlaczego pełny openGraph w każdej podstronie? W tej wersji Next obiekt
// `openGraph` ustawiony w segmencie potomnym ZASTĘPUJE (a nie scala) openGraph
// z layoutu. Dlatego helper `pageMetadata` zawsze zwraca komplet pól OG, żeby
// podstrona nie „zgubiła” siteName/locale/type dziedziczonych z layoutu.
import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { Person } from "@/lib/site";
import type { Offer } from "@/lib/offers";
import { formatArea, formatPrice } from "@/lib/offers";

/**
 * Domyka ścieżkę ukośnikiem — spójnie z next.config (trailingSlash: true), żeby
 * canonical/OG/breadcrumb wskazywały realny URL i nie trafiały na przekierowanie.
 * Zostawia bez zmian: katalog główny "/" oraz ścieżki z zapytaniem/kotwicą.
 */
function withTrailingSlash(path: string): string {
  if (path === "/" || path.includes("?") || path.includes("#")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

/** Ścieżka względna → bezwzględny URL na kanonicznej domenie serwisu. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

type PageMetaInput = {
  /** Tytuł podstrony bez sufiksu marki — szablon z layoutu doda „· FREE HOME". */
  title: string;
  description: string;
  /** Ścieżka kanoniczna, np. "/oferty". */
  path: string;
  /** Obraz OG (ścieżka względna). Domyślnie ogólny /og.jpg. */
  ogImage?: string;
  /** Nadpisanie tytułu w karcie OG (domyślnie „<title> · FREE HOME"). */
  ogTitle?: string;
};

/**
 * Buduje komplet metadanych podstrony: canonical, pełny Open Graph i Twitter.
 * Pole `title` zostaje stringiem, żeby zadziałał szablon `%s · FREE HOME`.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = "/og.jpg",
  ogTitle,
}: PageMetaInput): Metadata {
  const composed = ogTitle ?? `${title} · ${site.name}`;
  const canonical = withTrailingSlash(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: site.fullName,
      url: canonical,
      title: composed,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: composed }],
    },
    twitter: {
      card: "summary_large_image",
      title: composed,
      description,
      images: [ogImage],
    },
  };
}

/**
 * BreadcrumbList JSON-LD (okruszki tylko jako dane strukturalne — bez zmiany
 * warstwy wizualnej). „Strona główna" jest doklejana automatycznie jako 1. krok.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Strona główna", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(withTrailingSlash(it.path)),
    })),
  };
}

/**
 * Product + zagnieżdżony Offer JSON-LD dla pojedynczej oferty. Sprzedawcą jest
 * RealEstateAgent FREE HOME. `offers` dołączamy tylko gdy znamy cenę (>0) —
 * dla ofert typu „kupno/poszukiwane" cena bywa pusta.
 */
export function offerJsonLd(offer: Offer) {
  const url = absoluteUrl(`/oferty/${offer.id}/`);

  const images = (offer.gallery && offer.gallery.length > 0
    ? offer.gallery
    : offer.image
      ? [offer.image]
      : []
  )
    .slice(0, 6)
    .map((src) => absoluteUrl(src));

  const description =
    (offer.description && offer.description.trim().slice(0, 320)) ||
    `${offer.type} · ${offer.location} · ${formatArea(offer.areaTotal)} · ${formatPrice(
      offer.price
    )}.`;

  const props: { "@type": "PropertyValue"; name: string; value: string | number; unitText?: string }[] =
    [];
  if (offer.areaTotal)
    props.push({ "@type": "PropertyValue", name: "Powierzchnia", value: offer.areaTotal, unitText: "m²" });
  if (offer.rooms)
    props.push({ "@type": "PropertyValue", name: "Liczba pokoi", value: offer.rooms });
  if (offer.floor)
    props.push({ "@type": "PropertyValue", name: "Piętro", value: offer.floor });
  if (offer.market)
    props.push({ "@type": "PropertyValue", name: "Rynek", value: offer.market });
  if (offer.buildingYear)
    props.push({ "@type": "PropertyValue", name: "Rok budowy", value: offer.buildingYear });

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.title,
    description,
    category: offer.typeName || offer.type,
    url,
    brand: { "@type": "Brand", name: site.fullName },
  };
  if (images.length > 0) data.image = images;
  if (props.length > 0) data.additionalProperty = props;

  if (offer.price && offer.price > 0) {
    data.offers = {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "RealEstateAgent",
        name: site.fullName,
        telephone: `+48${site.phone.replace(/\s/g, "")}`,
        url: site.url,
      },
    };
  }

  return data;
}

/**
 * Person JSON-LD dla podstrony profilu (/ludzie/[slug]). Agenci FREE HOME
 * dostają `worksFor` = biuro; partner kredytowy (Lendi) — własną organizację,
 * żeby nie sugerować zatrudnienia w FREE HOME. Telefon/e-mail dokładamy tylko
 * gdy realne (spójnie z warunkami w widoku profilu).
 */
export function personJsonLd(person: Person) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    url: absoluteUrl(`/ludzie/${person.slug}/`),
    image: absoluteUrl(person.photo),
    worksFor: person.partner
      ? { "@type": "Organization", name: "Lendi" }
      : { "@type": "RealEstateAgent", name: site.fullName, url: site.url },
  };
  if (person.phone && /\d/.test(person.phone))
    data.telephone = `+48${person.phone.replace(/\s/g, "")}`;
  if (person.email && person.email.includes("@")) data.email = person.email;
  return data;
}
