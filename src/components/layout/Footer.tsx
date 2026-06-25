import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import { awards, nav, site } from "@/lib/site";

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
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2.5">
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
          </nav>

          {/* Nagrody + powiązane */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-400">
              Wyróżnienia
            </h3>
            <ul className="space-y-1.5 text-sm text-cream/70">
              {awards.map((a) => (
                <li key={a}>{a}</li>
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
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400"
                >
                  Facebook
                </a>
              </li>
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
          <p className="text-cream/35">
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
