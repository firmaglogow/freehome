"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const fieldCls =
  "w-full rounded-lg border border-forest-600/60 bg-forest-950/50 px-3.5 py-3 text-sm text-cream placeholder:text-cream/55 outline-none transition focus:border-gold-500/70 focus:ring-1 focus:ring-gold-500/40";

// Wysyłka przez FormSubmit.co — bez własnego backendu (działa na GitHub Pages).
// Ten sam adres, co formularz wyceny i rekrutacji. Firmowa skrzynka kontakt@freehome.pl;
// przy pierwszym zgłoszeniu z danej domeny FormSubmit wyśle tam mail aktywacyjny do kliknięcia.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/kontakt@freehome.pl";

export default function ContactForm({
  compact = false,
  context,
}: {
  compact?: boolean;
  /** Dodatkowy kontekst do tematu e-maila, np. numer oferty „FH-1001". */
  context?: string;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: context
            ? `Zapytanie o ofertę ${context} — strona FREE HOME`
            : `Nowa wiadomość ze strony FREE HOME${
                data.subject ? `: ${data.subject}` : ""
              }`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.success === "false") {
        throw new Error(body.message || "Nie udało się wysłać wiadomości.");
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Coś poszło nie tak. Spróbuj ponownie lub zadzwoń."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-gold-500/30 bg-forest-800 p-8 text-center"
      >
        <p className="font-display text-xl text-gold-400">Dziękujemy!</p>
        <p className="mt-2 text-sm text-cream/75">
          Wiadomość została wysłana. Odezwiemy się najszybciej, jak to możliwe.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot — pole-pułapka na boty (ludzie go nie widzą) */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
        <input
          required
          name="name"
          aria-label="Imię i nazwisko"
          autoComplete="name"
          placeholder="Imię i nazwisko"
          className={fieldCls}
        />
        <input
          required
          name="phone"
          type="tel"
          aria-label="Telefon"
          autoComplete="tel"
          placeholder="Telefon"
          className={fieldCls}
        />
      </div>
      <input
        name="email"
        type="email"
        aria-label="E-mail"
        autoComplete="email"
        placeholder="E-mail"
        className={fieldCls}
      />
      {!compact && (
        <input
          name="subject"
          aria-label="Temat"
          placeholder="Temat"
          className={fieldCls}
        />
      )}
      <textarea
        required
        name="message"
        aria-label="Wiadomość"
        rows={compact ? 3 : 4}
        placeholder="Wiadomość"
        className={cn(fieldCls, "resize-none")}
      />
      <label className="flex items-start gap-2.5 text-xs text-cream/60">
        <input
          type="checkbox"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-none accent-gold-500"
        />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w
          formularzu przez FREE HOME Nieruchomości (ul. Grodzka 18, Głogów, NIP
          693-210-77-22) w celu udzielenia odpowiedzi na moje zapytanie.
          Administratorem danych jest FREE HOME Nieruchomości. Dane przetwarzane
          są zgodnie z RODO (Rozporządzenie UE 2016/679). Podanie danych jest
          dobrowolne, ale niezbędne do kontaktu. Mam prawo dostępu do swoich
          danych, ich sprostowania, usunięcia oraz wycofania zgody w dowolnym
          momencie.
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
