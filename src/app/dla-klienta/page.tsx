import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata = {
  title: "Dla klienta",
  description:
    "Narzędzia dla klientów FREE HOME: opinie Google naszych klientów, interaktywna mapa osiedli Głogowa z wyszukiwarką ulic oraz realne ceny transakcyjne mieszkań w okolicy (akty notarialne, RCN/GUGiK).",
};

// basePath musi być spójny z next.config.ts / image-loader.ts.
// Mapa osiedli to samodzielny plik statyczny w public/mapa-osiedli/ — nie jest
// trasą Next, więc link musi sam dokleić prefiks (na własnej domenie pusty).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

// Oficjalne, 4-kolorowe logo Google („G") — brand asset Google, to samo wolne
// źródło (Simple Icons / Google brand), z którego pochodzą ikony social w stopce.
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="h-9 w-9">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

// Bezpieczna grafika miasta — stylizowana mapa ze złotą pinezką (NIE herb
// Głogowa, który bywa chroniony uchwałą). W kolorach marki (currentColor=złoto).
function MapMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className="h-9 w-9 text-gold-400"
    >
      <path
        d="M6 13 18 9l12 4 12-4v26l-12 4-12-4-12 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M18 9v26M30 13v26"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.5"
      />
      <path
        d="M24 13c-4.3 0-7.8 3.4-7.8 7.6 0 5.4 7.8 13.4 7.8 13.4s7.8-8 7.8-13.4c0-4.2-3.5-7.6-7.8-7.6z"
        fill="currentColor"
      />
      <circle cx="24" cy="20.6" r="2.7" fill="#0D2618" />
    </svg>
  );
}

// Ikona narzędzia cen: lupa nad rosnącymi słupkami = „sprawdź ceny".
// W kolorach marki (currentColor = złoto), spójna z MapMark.
function PriceMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className="h-9 w-9 text-gold-400"
    >
      <circle cx="21" cy="21" r="13" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M31 31l9 9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <rect x="14.6" y="22" width="3.4" height="6" rx="1" fill="currentColor" />
      <rect x="19.3" y="18" width="3.4" height="10" rx="1" fill="currentColor" />
      <rect x="24" y="14" width="3.4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

type Tile = {
  key: string;
  icon: React.ReactNode;
  badge?: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  /** Link do pliku statycznego poza routerem Next (zwykły <a>, nie <Link>). */
  external?: boolean;
};

const tiles: Tile[] = [
  {
    key: "opinie",
    icon: <GoogleMark />,
    badge: `${site.reviewsCount}+ opinii 5★`,
    title: "Opinie Google",
    desc: "Realni klienci, realne historie. Zobacz, co mówią o współpracy z nami osoby, które już kupiły lub sprzedały z FREE HOME.",
    href: "/opinie",
    cta: "Zobacz opinie",
  },
  {
    key: "mapa",
    icon: <MapMark />,
    badge: "Interaktywna",
    title: "Mapa osiedli Głogowa",
    desc: "Interaktywna mapa miasta z podziałem na osiedla i wyszukiwarką ulic — sprawdź, do którego osiedla należy dany adres.",
    href: `${BASE_PATH}/mapa-osiedli/`,
    cta: "Otwórz mapę",
    external: true,
  },
  {
    key: "ceny",
    icon: <PriceMark />,
    badge: "Dane od notariusza",
    title: "Sprawdź ceny w swojej okolicy",
    desc: "Zobacz, za ile naprawdę sprzedały się mieszkania w pobliżu Twojego adresu — realne ceny transakcyjne z aktów notarialnych (RCN/GUGiK), dokładnie takie, jakie były. Wpisz adres, wybierz okres i promień, a zobaczysz je na mapie i w liczbach.",
    href: `${BASE_PATH}/ceny-w-okolicy/`,
    cta: "Sprawdź ceny",
    external: true,
  },
];

export default function DlaKlientaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dla klienta"
        title="Narzędzia dla klientów"
        subtitle="Wszystko, co przyda Ci się przy decyzji o nieruchomości — w jednym miejscu."
        image="/hero/klucze-dom.jpg"
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((t, i) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-950/60 ring-1 ring-gold-500/20">
                      {t.icon}
                    </span>
                    {t.badge && (
                      <span className="rounded-full border border-gold-500/25 bg-forest-950/40 px-3 py-1 text-xs font-medium text-gold-300">
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-6 font-display text-2xl text-cream group-hover:text-gold-300">
                    {t.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/70">
                    {t.desc}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-gold-400">
                    {t.cta} →
                  </span>
                </>
              );

              const cardCls =
                "group flex h-full flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-8 transition hover:border-gold-500/40 hover:bg-forest-800/80";

              return (
                <Reveal key={t.key} delay={i * 80}>
                  {t.external ? (
                    <a href={t.href} className={cardCls}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={t.href} className={cardCls}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
