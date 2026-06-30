"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const fieldCls =
  "w-full rounded-lg border border-forest-600/60 bg-forest-950/50 px-3.5 py-3 text-sm text-cream placeholder:text-cream/55 outline-none transition focus:border-gold-500/70 focus:ring-1 focus:ring-gold-500/40";
const labelCls = "mb-1.5 block text-xs font-medium text-cream/60";

const propertyTypes = ["Mieszkanie", "Dom", "Działka", "Lokal", "Inne"];
const conditions = [
  "Do remontu",
  "Do odświeżenia",
  "Dobry",
  "Bardzo dobry / po remoncie",
  "Deweloperski / nowy",
];
const goals = ["Sprzedaż", "Tylko orientacyjnie"];

// Wysyłka przez FormSubmit.co — działa bez własnego backendu (także na GitHub Pages).
// Zgłoszenia trafiają na firmową skrzynkę kontakt@freehome.pl:
const FORM_ENDPOINT = "https://formsubmit.co/ajax/kontakt@freehome.pl";

export default function ValuationForm() {
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
          _subject: `Wycena: ${data.typ || "nieruchomość"} — ${data.lokalizacja || ""}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.success === "false") {
        throw new Error(body.message || "Nie udało się wysłać zgłoszenia.");
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
      <div className="rounded-2xl border border-gold-500/30 bg-forest-800 p-8 text-center">
        <p className="font-display text-2xl text-gold-400">Dziękujemy!</p>
        <p className="mt-2 text-sm text-cream/75">
          Zgłoszenie wyceny zostało wysłane. Odezwiemy się z orientacyjną wartością
          najszybciej, jak to możliwe.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot — pole-pułapka na boty (ludzie go nie widzą) */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-cream">
          O nieruchomości
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="typ">
              Typ nieruchomości
            </label>
            <select id="typ" name="typ" required className={fieldCls}>
              <option value="">— wybierz —</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="lokalizacja">
              Lokalizacja (miasto / dzielnica)
            </label>
            <input
              id="lokalizacja"
              name="lokalizacja"
              required
              placeholder="np. Głogów, Stare Miasto"
              className={fieldCls}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls} htmlFor="powierzchnia">
              Powierzchnia (m²)
            </label>
            <input
              id="powierzchnia"
              name="powierzchnia"
              type="number"
              min="1"
              required
              placeholder="np. 54"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="pokoje">
              Liczba pokoi
            </label>
            <select id="pokoje" name="pokoje" className={fieldCls}>
              <option value="">—</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                  {n === 5 ? "+" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="pietro">
              Piętro
            </label>
            <input
              id="pietro"
              name="pietro"
              placeholder="np. 2/4"
              className={fieldCls}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="stan">
              Stan
            </label>
            <select id="stan" name="stan" className={fieldCls}>
              <option value="">— wybierz —</option>
              {conditions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="cel">
              Cel wyceny
            </label>
            <select id="cel" name="cel" className={fieldCls}>
              <option value="">— wybierz —</option>
              {goals.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="opis">
            Dodatkowe informacje (opcjonalnie)
          </label>
          <textarea
            id="opis"
            name="opis"
            rows={3}
            placeholder="np. balkon, garaż, rok budowy, co warto wiedzieć"
            className={cn(fieldCls, "resize-none")}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-cream">Kontakt do Ciebie</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="imie">
              Imię i nazwisko
            </label>
            <input id="imie" name="imie" required className={fieldCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="telefon">
              Telefon
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              required
              className={fieldCls}
            />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            E-mail (opcjonalnie)
          </label>
          <input id="email" name="email" type="email" className={fieldCls} />
        </div>
      </fieldset>

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
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Wysyłanie…" : "Wyślij zapytanie o wycenę"}
      </button>
    </form>
  );
}
