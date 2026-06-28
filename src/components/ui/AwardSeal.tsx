// Skromna ikona „odznaki" (medal z gwiazdką i wstążką) — towarzyszy nazwom
// wyróżnień (lista `awards`). Rysowana w `currentColor`, więc kolor i rozmiar
// sterujemy klasą z zewnątrz (np. `h-4 w-4 text-gold-500`). Czysto dekoracyjna.
export default function AwardSeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* okrąg medalu */}
      <circle cx="12" cy="9.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      {/* gwiazdka w środku */}
      <path
        d="M12 6.4l.95 1.93 2.13.31-1.54 1.5.36 2.12L12 11.36l-1.9 1 .36-2.12-1.54-1.5 2.13-.31L12 6.4z"
        fill="currentColor"
      />
      {/* wstążka */}
      <path
        d="M9.4 14.3l-1.6 4.9 4.2-1.9 4.2 1.9-1.6-4.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
