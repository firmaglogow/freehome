"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const fieldCls =
  "w-full rounded-lg border border-forest-600/60 bg-forest-950/50 px-3.5 py-3 text-sm text-cream placeholder:text-cream/40 outline-none transition focus:border-gold-500/70 focus:ring-1 focus:ring-gold-500/40";

export default function ContactForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO (Etap 3): podpiąć server action + wysyłkę e-mail (Resend / Nodemailer).
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-gold-500/30 bg-forest-800 p-8 text-center">
        <p className="font-display text-xl text-gold-400">Dziękujemy!</p>
        <p className="mt-2 text-sm text-cream/75">
          Wiadomość została przyjęta. Odezwiemy się najszybciej, jak to możliwe.
        </p>
        <p className="mt-2 text-xs text-cream/45">
          (Demo — wysyłka e-mail zostanie podpięta na etapie wdrożenia.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
        <input
          required
          name="name"
          placeholder="Imię i nazwisko"
          className={fieldCls}
        />
        <input
          required
          name="phone"
          type="tel"
          placeholder="Telefon"
          className={fieldCls}
        />
      </div>
      <input name="email" type="email" placeholder="E-mail" className={fieldCls} />
      {!compact && (
        <input name="subject" placeholder="Temat" className={fieldCls} />
      )}
      <textarea
        required
        name="message"
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
          Wyrażam zgodę na przetwarzanie moich danych w celu kontaktu (RODO).
          [DO UZUPEŁNIENIA: pełna klauzula]
        </span>
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
      >
        Wyślij wiadomość
      </button>
    </form>
  );
}
