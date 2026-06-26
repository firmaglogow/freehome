import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import DevelopmentCard from "@/components/rynek/DevelopmentCard";
import { activeDevelopments } from "@/lib/developments";

export const metadata = {
  title: "Rynek pierwotny — inwestycje deweloperskie",
  description:
    "Nowe osiedla i inwestycje deweloperskie w Głogowie i okolicach. Mieszkania i domy z rynku pierwotnego — FREE HOME Nieruchomości.",
};

export default function RynekPierwotnyPage() {
  // Galeria pokazuje wyłącznie osiedla z aktywnymi ofertami (reguła widoczności
  // w src/lib/developments.ts). Siatka zaprojektowana na 6 inwestycji — układ
  // wygląda dobrze i przy 3 (jeden rząd), i przy 6 (dwa rzędy).
  const list = activeDevelopments();

  return (
    <>
      <PageHeader
        eyebrow="Rynek pierwotny"
        title="Inwestycje deweloperskie"
        subtitle="Współpracujemy z deweloperami z Głogowa i okolic. Poznaj osiedla, w których sprzedajemy mieszkania i domy z rynku pierwotnego."
        image="/hero/oferty.jpg"
      />
      <section className="py-12 sm:py-16">
        <Container>
          {list.length === 0 ? (
            <div className="rounded-2xl border border-gold-500/15 bg-forest-800 p-12 text-center text-cream/70">
              Aktualnie przygotowujemy prezentację naszych inwestycji
              deweloperskich. Zajrzyj wkrótce lub{" "}
              <Link href="/kontakt" className="font-semibold text-gold-400 hover:underline">
                skontaktuj się z nami
              </Link>
              .
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((dev) => (
                <DevelopmentCard key={dev.slug} dev={dev} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
