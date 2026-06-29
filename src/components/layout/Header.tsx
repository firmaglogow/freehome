"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Która podkategoria jest rozwinięta w menu mobilnym (po href). null = żadna.
  const [openSub, setOpenSub] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamknij menu (i rozwiniętą podkategorię) po zmianie trasy
  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 print:hidden",
        scrolled
          ? "bg-forest-950/95 backdrop-blur border-b border-gold-500/20 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Logo />

        {/* Nawigacja desktop */}
        <nav
          aria-label="Główna nawigacja"
          className="hidden lg:flex items-center gap-4 xl:gap-6"
        >
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            // Pozycja z podkategoriami (np. „Oferty") — rozwijana na hover.
            // Sam nagłówek nadal jest linkiem do pełnego listingu.
            if (item.children) {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 whitespace-nowrap text-sm tracking-wide transition-colors hover:text-gold-400",
                      active ? "text-gold-400" : "text-cream/85"
                    )}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden
                      className="h-2.5 w-2.5 transition-transform duration-200 group-hover:rotate-180"
                    >
                      <path
                        d="M2 4l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  {/* Rozwijane podkategorie. pt-3 mostkuje odstęp od nagłówka,
                      żeby kursor nie „gubił" hovera w drodze do menu.
                      group-focus-within → menu otwiera się też z klawiatury (Tab). */}
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-[190px] rounded-xl border border-gold-500/20 bg-forest-950/98 p-2 shadow-xl shadow-black/40 backdrop-blur">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-cream/85 transition-colors hover:bg-gold-500/10 hover:text-gold-400"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // „Rynek pierwotny" może zostać w dwóch liniach (wyśrodkowany, równy),
            // reszta pozycji wymuszona w jednej linii (whitespace-nowrap), żeby
            // np. „O nas" nie łamało się na „O" / „nas".
            const isRynek = item.href === "/rynek-pierwotny";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-gold-400",
                  isRynek ? "text-center leading-tight" : "whitespace-nowrap",
                  active ? "text-gold-400" : "text-cream/85"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/wycena"
            className="whitespace-nowrap rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
          >
            Zgłoś ofertę
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-cream"
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-6 bg-current transition-all",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-6 bg-current transition-all",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Panel mobilny. inert gdy zamknięty → linki znikają z kolejności Tab
          i z drzewa dostępności, mimo że pozostają w DOM (max-h-0). */}
      <div
        inert={!open}
        className={cn(
          "lg:hidden overflow-hidden border-t border-gold-500/10 bg-forest-950/98 backdrop-blur transition-[max-height] duration-300",
          open ? "max-h-[760px]" : "max-h-0"
        )}
      >
        <Container className="py-4">
          <nav aria-label="Nawigacja mobilna" className="flex flex-col">
            {nav.map((item) => {
              // Pozycja z podkategoriami — rozwijana tapnięciem w strzałkę.
              // Nagłówek pozostaje linkiem do pełnego listingu.
              if (item.children) {
                const expanded = openSub === item.href;
                return (
                  <div key={item.href} className="border-b border-cream/5">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-base text-cream/90 hover:text-gold-400"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={expanded ? "Zwiń podkategorie" : "Rozwiń podkategorie"}
                        aria-expanded={expanded}
                        onClick={() => setOpenSub(expanded ? null : item.href)}
                        className="grid h-11 w-11 place-items-center text-cream/70"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          aria-hidden
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            expanded && "rotate-180"
                          )}
                        >
                          <path
                            d="M2 4l4 4 4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className={cn(
                        "overflow-hidden transition-[max-height] duration-300",
                        expanded ? "max-h-60" : "max-h-0"
                      )}
                    >
                      <div className="flex flex-col pb-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-2 text-sm text-cream/75 hover:text-gold-400"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-cream/5 py-3 text-base text-cream/90 hover:text-gold-400"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/wycena"
            className="mt-4 block rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-semibold text-forest-950"
          >
            Zgłoś ofertę
          </Link>
        </Container>
      </div>
    </header>
  );
}
