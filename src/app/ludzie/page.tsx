import PageHeader from "@/components/ui/PageHeader";
import People from "@/components/home/People";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Zespół",
  description:
    "Poznaj zespół FREE HOME Nieruchomości — ludzie, do których trafiasz bezpośrednio, oraz zaufany partner kredytowy (Lendi).",
  path: "/ludzie",
  ogImage: "/og/zespol.jpg",
});

export default function LudziePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Zespół", path: "/ludzie" }])} />
      <PageHeader
        eyebrow="Poznaj nas"
        title="Zespół FREE HOME"
        subtitle="Bez hierarchii, bez infolinii. Ludzie, którzy poprowadzą Twoją sprawę — i zaufany partner kredytowy."
        image="/hero/zespol.webp"
      />
      <People withHeading={false} />
    </>
  );
}
