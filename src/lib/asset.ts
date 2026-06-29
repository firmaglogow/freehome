// Prefiks ścieżek zasobów (obrazów) — IDENTYCZNY jak w image-loader.ts.
// next/image używa własnego loadera, który dokleja BASE_PATH. Ale w broszurze
// do druku renderujemy zwykłe <img> (kontener jest `display:none` na ekranie,
// więc lazy-loading next/image nigdy by się nie odpalił — IntersectionObserver
// nie widzi elementów bez layoutu). Dlatego prefiks dokładamy tu ręcznie.
//
// ⚠️ Wartość musi być spójna z BASE_PATH w image-loader.ts i next.config.ts.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

export const asset = (src: string): string =>
  /^https?:\/\//.test(src) ? src : `${BASE_PATH}${src}`;
