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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.fullName,
    url: site.url,
    telephone: `+48${site.phone.replace(/\s/g, "")}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: "PL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(site.reviewsCount),
    },
    areaServed: ["Głogów", "Polkowice", "Radwanice", "Przemków", "Sława"],
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
