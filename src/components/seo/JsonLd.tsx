// Renderuje jeden lub wiele bloków danych strukturalnych JSON-LD jako
// <script type="application/ld+json">. Komponent serwerowy — bez stanu, bez JS
// po stronie klienta. Używany do BreadcrumbList oraz Product/Offer.
export default function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
