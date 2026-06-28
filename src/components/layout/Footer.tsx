import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import AwardSeal from "@/components/ui/AwardSeal";
import { nav, site } from "@/lib/site";
import { awardHighlights as awards } from "@/lib/awards";

export default function Footer() {
  return (
    <footer className="border-t border-gold-500/15 bg-forest-900">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka + dane */}
          <div className="lg:col-span-2">
            <Logo width={180} height={60} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              Lokalne biuro nieruchomości w Głogowie. Ludzie, których znasz —
              sprzedaż i zakup z osobistym podejściem.
            </p>
            <div className="mt-5 space-y-1 text-sm text-cream/70">
              <p>
                {site.address.street}, {site.address.city}
              </p>
              <p>
                <a href={site.phoneHref} className="hover:text-gold-400">
                  tel. {site.phone}
                </a>{" "}
                ·{" "}
                <a href={`mailto:${site.email}`} className="hover:text-gold-400">
                  {site.email}
                </a>
              </p>
              <p className="text-cream/50">
                Licencja {site.legal.license} · NIP {site.legal.nip} · REGON{" "}
                {site.legal.regon}
              </p>
            </div>

            {/* Social media — oryginalne logotypy marek (Simple Icons) w kolorach firmowych */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FREE HOME na Facebooku"
                className="block transition-all duration-200 hover:scale-110 hover:brightness-110"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="#1877F2"
                    d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.063a12.995 12.995 0 0 0 10.183-12.69C24 5.367 18.633 0 12 0S0 5.367 0 12c0 6.084 4.515 11.114 10.379 11.943z"
                  />
                </svg>
              </a>

              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FREE HOME na Instagramie"
                className="block transition-all duration-200 hover:scale-110 hover:brightness-110"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <defs>
                    <linearGradient
                      id="ig-gradient"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FFDC80" />
                      <stop offset="15%" stopColor="#FCAF45" />
                      <stop offset="30%" stopColor="#F77737" />
                      <stop offset="45%" stopColor="#F56040" />
                      <stop offset="60%" stopColor="#FD1D1D" />
                      <stop offset="75%" stopColor="#E1306C" />
                      <stop offset="90%" stopColor="#C13584" />
                      <stop offset="100%" stopColor="#833AB4" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#ig-gradient)"
                    d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                  />
                </svg>
              </a>

              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FREE HOME na TikToku"
                className="block transition-all duration-200 hover:scale-110 hover:brightness-110"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="#25F4EE"
                    transform="translate(-0.7 -0.7)"
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  />
                  <path
                    fill="#FE2C55"
                    transform="translate(0.7 0.7)"
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Menu */}
          <nav aria-label="Nawigacja w stopce" className="flex flex-col gap-2.5">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gold-400">
              Nawigacja
            </h3>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-cream/70 hover:text-gold-400"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/wycena"
              className="text-sm text-cream/70 hover:text-gold-400"
            >
              Darmowa wycena
            </Link>
            {/* Link tylko w stopce — FAQ świadomie poza górnym menu (nav). */}
            <Link
              href="/faq"
              className="text-sm text-cream/70 hover:text-gold-400"
            >
              FAQ — najczęstsze pytania
            </Link>
          </nav>

          {/* Nagrody + powiązane */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-400">
              Wyróżnienia
            </h3>
            <ul className="space-y-1.5 text-sm text-cream/70">
              {awards.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <AwardSeal className="h-4 w-4 shrink-0 text-gold-500/80" />
                  {a}
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-widest text-gold-400">
              Zobacz też
            </h3>
            <ul className="space-y-1.5 text-sm text-cream/70">
              {site.related.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-rule mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-x-6 gap-y-3 text-xs text-cream/50 sm:flex-row sm:flex-wrap">
          <p>
            © {new Date().getFullYear()} {site.fullName}. Wszelkie prawa
            zastrzeżone.
          </p>
          <div className="flex gap-4">
            <Link href="/polityka-prywatnosci" className="hover:text-gold-400">
              Polityka prywatności
            </Link>
            <Link href="/polityka-cookies" className="hover:text-gold-400">
              Cookies
            </Link>
            <Link href="/regulamin" className="hover:text-gold-400">
              Regulamin
            </Link>
          </div>
          <p className="text-cream/60">
            Projekt i realizacja —{" "}
            <a
              href={site.creator.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/55 transition hover:text-gold-400"
            >
              {site.creator.label}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
