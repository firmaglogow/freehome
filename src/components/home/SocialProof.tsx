import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewsCarousel from "@/components/opinie/ReviewsCarousel";
import AwardSeal from "@/components/ui/AwardSeal";
import { awards, reviews, site } from "@/lib/site";

export default function SocialProof() {
  return (
    <section className="bg-forest-950 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Zaufanie"
          title={`${site.reviewsCount}+ opinii 5 gwiazdek w Google`}
          subtitle="Realni klienci, realne historie. Dołącz do grona zadowolonych."
          align="center"
        />

        <div className="mt-12">
          <ReviewsCarousel reviews={reviews} />
          <div className="mt-8 text-center">
            <Link
              href="/opinie"
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 px-6 py-2.5 text-sm font-semibold text-gold-400 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
            >
              Zobacz wszystkie opinie →
            </Link>
          </div>
        </div>

        {/* Odznaki nagród */}
        <div className="mt-14">
          <div className="gold-rule" />
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/70">
            {awards.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <AwardSeal className="h-5 w-5 shrink-0 text-gold-500" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
