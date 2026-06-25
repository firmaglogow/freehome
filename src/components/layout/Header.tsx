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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamknij menu po zmianie trasy
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-forest-950/95 backdrop-blur border-b border-gold-500/20 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Logo />

        {/* Nawigacja desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-gold-400",
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
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
          >
            Wyceń nieruchomość
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

      {/* Panel mobilny */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-gold-500/10 bg-forest-950/98 backdrop-blur transition-[max-height] duration-300",
          open ? "max-h-[480px]" : "max-h-0"
        )}
      >
        <Container className="py-4">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-cream/5 py-3 text-base text-cream/90 hover:text-gold-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/wycena"
            className="mt-4 block rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-semibold text-forest-950"
          >
            Wyceń nieruchomość
          </Link>
        </Container>
      </div>
    </header>
  );
}
