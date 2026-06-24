import PageHeader from "@/components/ui/PageHeader";
import People from "@/components/home/People";

export const metadata = {
  title: "Ludzie",
  description:
    "Poznaj FREE HOME Nieruchomości — dwie osoby, do których trafiasz bezpośrednio.",
};

export default function LudziePage() {
  return (
    <>
      <PageHeader
        eyebrow="Ludzie"
        title="Zespół FREE HOME"
        subtitle="Bez hierarchii, bez infolinii. Dwie osoby, które poprowadzą Twoją sprawę."
      />
      <People withHeading={false} />
    </>
  );
}
