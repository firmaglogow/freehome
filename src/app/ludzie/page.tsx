import PageHeader from "@/components/ui/PageHeader";
import People from "@/components/home/People";

export const metadata = {
  title: "Zespół",
  description:
    "Poznaj zespół FREE HOME Nieruchomości — ludzie, do których trafiasz bezpośrednio, oraz zaufany partner kredytowy (Lendi).",
};

export default function LudziePage() {
  return (
    <>
      <PageHeader
        eyebrow="Poznaj nas"
        title="Zespół FREE HOME"
        subtitle="Bez hierarchii, bez infolinii. Ludzie, którzy poprowadzą Twoją sprawę — i zaufany partner kredytowy."
        image="/hero/zespol.jpg"
      />
      <People withHeading={false} />
    </>
  );
}
