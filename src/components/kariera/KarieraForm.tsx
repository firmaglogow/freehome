"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const fieldCls =
  "w-full rounded-lg border border-forest-600/60 bg-forest-950/50 px-3.5 py-3 text-sm text-cream placeholder:text-cream/55 outline-none transition focus:border-gold-500/70 focus:ring-1 focus:ring-gold-500/40";
const labelCls = "mb-1.5 block text-xs font-medium text-cream/60";

// Wysyłka przez FormSubmit.co — bez własnego backendu (działa na GitHub Pages).
// Zgłoszenia rekrutacyjne trafiają na ten adres. [DO USTALENIA: kontakt@ vs rekrutacja@]
// Uwaga: załącznik CV wysyłamy jako multipart/form-data. FormSubmit przyjmuje
// pliki przy wysyłce formularzem — wymaga to wcześniejszej aktywacji adresu.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/kontakt@freehome.com.pl";

const experienceOptions = [
  "Brak — chcę się nauczyć",
  "Trochę / pokrewna branża",
  "Tak, pracowałem/-am w nieruchomościach",
];

export default function KarieraForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("_subject", "Nowe zgłoszenie rekrutacyjne — Kariera FREE HOME");
    fd.append("_template", "table");
    fd.append("_captcha", "false");

    // Jeśli plik CV nie został wybrany, nie wysyłamy pustego pola.
    const cv = fd.get("cv");
    if (cv instanceof File && cv.size === 0) {
      fd.delete("cv");
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
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
      <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/30 bg-forest-800 p-8 text-center">
        <p className="font-display text-2xl text-gold-400">Dzięki!</p>
        <p className="mt-3 text-sm leading-relaxed text-cream/75">
          Twoje zgłoszenie do nas dotarło. Odezwiemy się szybko — zwykle w ciągu
          kilku dni roboczych. Jeśli chcesz przyspieszyć sprawę, po prostu
          zadzwoń:{" "}
          <a
            href="tel:+48537264666"
            className="font-semibold text-gold-400 hover:underline"
          >
            537 264 666
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-gold-500/15 bg-forest-800 p-6 sm:p-9">
      <h3 className="text-center font-display text-2xl text-cream">
        Aplikuj do FREE HOME
      </h3>
      <p className="mt-1.5 mb-7 text-center text-sm text-cream/60">
        Opowiedz nam krótko o sobie — resztę dopowiemy przy rozmowie.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Honeypot — pole-pułapka na boty */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="imie">
              Imię i nazwisko <span className="text-gold-400">*</span>
            </label>
            <input
              id="imie"
              name="imie"
              required
              placeholder="Jan Kowalski"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="telefon">
              Telefon <span className="text-gold-400">*</span>
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              required
              placeholder="500 600 700"
              className={fieldCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="email">
            E-mail <span className="text-gold-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jan@example.com"
            className={fieldCls}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="doswiadczenie">
            Doświadczenie w nieruchomościach
          </label>
          <select
            id="doswiadczenie"
            name="doswiadczenie"
            className={fieldCls}
            defaultValue={experienceOptions[0]}
          >
            {experienceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="motywacja">
            Dlaczego chcesz dołączyć? Co Cię napędza?
          </label>
          <textarea
            id="motywacja"
            name="motywacja"
            rows={4}
            placeholder="Kilka zdań o sobie — co potrafisz, czego szukasz, dlaczego FREE HOME."
            className={cn(fieldCls, "resize-y")}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="cv">
            CV (opcjonalnie)
          </label>
          <label
            htmlFor="cv"
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gold-500/30 bg-forest-950/40 px-3.5 py-3 text-sm text-cream/70 transition hover:border-gold-500/60"
          >
            <span className="rounded-md bg-gold-500/15 px-3 py-1.5 text-xs font-semibold text-gold-300">
              Wybierz plik
            </span>
            <span className="truncate">
              {fileName ?? "PDF lub DOC"}
            </span>
          </label>
          <input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <p className="mt-1.5 text-xs text-cream/60">
            Nie masz CV pod ręką? Nie szkodzi — napisz parę zdań wyżej.
          </p>
        </div>

        <label className="flex items-start gap-2.5 text-xs text-cream/60">
          <input
            type="checkbox"
            required
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-none accent-gold-500"
          />
          <span>
            Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w
            zgłoszeniu przez FREE HOME Nieruchomości (ul. Grodzka 18, Głogów) na
            potrzeby procesu rekrutacji, zgodnie z RODO (Rozporządzenie UE
            2016/679). Podanie danych jest dobrowolne. Mam prawo dostępu do
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
          {sending ? "Wysyłanie…" : "Wyślij zgłoszenie"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-cream/60">
        Wolisz bezpośrednio? Zadzwoń:{" "}
        <a
          href="tel:+48537264666"
          className="font-semibold text-gold-400 hover:underline"
        >
          537 264 666
        </a>
      </p>
    </div>
  );
}
