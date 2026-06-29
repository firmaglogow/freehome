import { site } from "@/lib/site";

type Props = {
  /** Nagłówek karty = element „Name" w NAP (domyślnie pełna nazwa firmy). */
  title?: string;
  /** Dodatkowe klasy (np. margines w kontekście strony). */
  className?: string;
  /** Pokaż identyfikatory prawne (licencja/NIP/REGON). Domyślnie false. */
  showLegal?: boolean;
};

/**
 * Spójny blok NAP (Name–Address–Phone) — jedno źródło prawdy: `site` (site.ts).
 * Te same dane co w stopce i danych strukturalnych JSON-LD, więc Google widzi
 * IDENTYCZNY NAP w wielu miejscach (silny sygnał lokalnego SEO). Używany pod
 * formularzami, gdzie kontakt do biura nie był jeszcze pokazany (np. /wycena).
 * Style i etykiety celowo zgodne z blokiem w sekcji kontaktu, żeby dane się nie
 * rozjeżdżały wizualnie ani treściowo.
 */
export default function NapCard({
  title = site.fullName,
  className = "",
  showLegal = false,
}: Props) {
  return (
    <div
      className={`rounded-2xl border border-gold-500/15 bg-forest-800 p-6 ${className}`}
    >
      <h3 className="font-display text-lg text-cream">{title}</h3>
      <p className="mt-1 text-sm text-gold-400">{site.tagline}</p>

      <div className="mt-5 space-y-3 text-sm">
        <p className="text-cream/85">
          <span className="text-cream/55">Adres: </span>
          {site.address.street}, {site.address.city}
        </p>
        <p className="text-cream/85">
          <span className="text-cream/55">Telefon: </span>
          <a href={site.phoneHref} className="text-gold-400 hover:underline">
            {site.phone}
          </a>
        </p>
        <p className="text-cream/85">
          <span className="text-cream/55">E-mail: </span>
          <a
            href={`mailto:${site.email}`}
            className="text-gold-400 hover:underline"
          >
            {site.email}
          </a>
        </p>
        <p className="text-cream/85">
          <span className="text-cream/55">Godziny: </span>
          {site.hours}
        </p>
      </div>

      {showLegal && (
        <p className="mt-4 text-xs text-cream/50">
          Licencja {site.legal.license} · NIP {site.legal.nip} · REGON{" "}
          {site.legal.regon}
        </p>
      )}
    </div>
  );
}
