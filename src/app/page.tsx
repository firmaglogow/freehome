import Hero from "@/components/home/Hero";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import LocalAdvantage from "@/components/home/LocalAdvantage";
import Services from "@/components/home/Services";
import People from "@/components/home/People";
import SocialProof from "@/components/home/SocialProof";
import ValuationCTA from "@/components/home/ValuationCTA";
import BlogPreview from "@/components/home/BlogPreview";
import ContactSection from "@/components/home/ContactSection";
import { offers } from "@/lib/offers";
import { site } from "@/lib/site";
import { absoluteUrl, ORG_ID } from "@/lib/seo";

// Tylko canonical — tytuł/opis/Open Graph dziedziczymy z layoutu (gdybyśmy
// ustawili tu openGraph, zastąpiłby cały obiekt z layoutu, a nie scalił).
export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: site.fullName,
    url: site.url,
    logo: absoluteUrl("/brand/logo.webp"),
    image: absoluteUrl("/og.jpg"),
    telephone: `+48${site.phone.replace(/\s/g, "")}`,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      // Głogów — kod pocztowy 67-200 (pewny dla miasta).
      postalCode: "67-200",
      // Region bez prefiksu „woj." — zgodnie z konwencją schema.org.
      addressRegion: "dolnośląskie",
      addressCountry: "PL",
    },
    // Dokładne współrzędne budynku ul. Grodzka 18, Stare Miasto, Głogów
    // (geokodowanie OpenStreetMap/Nominatim, trafienie na numer domu).
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.6638212,
      longitude: 16.0903005,
    },
    // Profile społecznościowe i marka osobista — wiąże encję z resztą sieci.
    sameAs: [
      ...Object.values(site.social),
      ...site.related.map((r) => r.href),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(site.reviewsCount),
    },
    areaServed: site.areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero offersCount={offers.length} />
      <FeaturedOffers />
      <LocalAdvantage />
      <Services />
      <People />
      <SocialProof />
      <ValuationCTA />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
