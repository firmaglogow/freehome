// Wyłuskanie ID filmu z surowego linku YouTube zapisanego w Esti (<videoLink>,
// panel: Galeria → Film i prezentacja → „Link do filmu"). Agenci wklejają tam
// różne formy URL, więc obsługujemy wszystkie spotykane warianty:
//   https://www.youtube.com/watch?v=ID
//   https://youtu.be/ID
//   https://www.youtube.com/embed/ID
//   https://www.youtube.com/shorts/ID
//   https://m.youtube.com/watch?v=ID  (oraz z dodatkowymi parametrami &t=…)
// Zwraca 11-znakowe ID albo null, gdy linku nie da się rozpoznać.
export const youtubeId = (raw: string | null | undefined): string | null => {
  if (!raw) return null;
  const url = raw.trim();
  if (!url) return null;

  // 1) Goły identyfikator wklejony bez adresu.
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/, // watch?v=ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/, // youtu.be/ID
    /\/embed\/([a-zA-Z0-9_-]{11})/, // /embed/ID
    /\/shorts\/([a-zA-Z0-9_-]{11})/, // /shorts/ID
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
};

// Adres osadzenia (no-cookie — prywatniejszy tryb YouTube). autoplay=1 działa,
// bo odtwarzacz wstawiamy dopiero po kliknięciu w okładkę (gest użytkownika).
export const youtubeEmbedUrl = (id: string): string =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

// Miniatura okładki. „hqdefault" istnieje zawsze (640×480); „maxresdefault"
// bywa pusty dla starszych filmów, więc dla pewności bierzemy hq.
export const youtubeThumb = (id: string): string =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
