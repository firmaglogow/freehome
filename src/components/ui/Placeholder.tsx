// Widoczny placeholder na treści [DO UZUPEŁNIENIA] — nie do przeoczenia.
export default function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-gold-500/50 bg-gold-500/5 p-5 text-sm text-gold-300">
      <span className="mr-2 font-semibold uppercase tracking-wider text-gold-400">
        Do uzupełnienia:
      </span>
      {children}
    </div>
  );
}
