#!/bin/bash
# FREE HOME — Model A: import EstiCRM → build Next.js → publikacja na domenę.
# Cała pętla działa na serwerze (bez GitHub Actions). Uruchamiany z CRON-a.
#
# Co robi:
#   1. php import.php  — pobiera paczki z Esti, aktualizuje MySQL,
#      regeneruje src/data/offers.json i public/oferty-esti/ (zdjęcia).
#   2. jeśli oferty się zmieniły → next build --debug-prerender (eksport do out/).
#   3. rsync out/ → katalog publiczny domeny (publikacja na żywo).
#
# Build z PUSTYM basePath → strona działa w root domeny (np. freehome.com.pl).

set -eo pipefail

# ── USTAW RAZ (skopiuj wartości z cPanel) ─────────────────────────────────
# 1) Linia aktywacji środowiska Node — cPanel → „Setup Node.js App" → Twoja
#    aplikacja → przycisk kopiowania „Enter to the virtual environment".
#    Wygląda mniej więcej tak (PODMIEŃ na swoją):
ACTIVATE="source /home/dm82980/nodevenv/freehome/20/bin/activate"

# 2) Katalog repozytorium na serwerze (cPanel → „Repozytorium Git™" → ścieżka).
REPO="/home/dm82980/freehome"

# 3) Katalog publiczny domeny — gdzie ma wylądować gotowa strona.
#    cPanel → „Domeny" pokazuje „Katalog główny" dla freehome.com.pl.
#    Potwierdzone przy dodawaniu domeny w cPanel (Domenomania):
DOCROOT="/home/dm82980/freehome.com.pl"

# 4) Adres kanoniczny strony (canonical/OG/JSON-LD). Staging na com.pl;
#    po przepięciu na produkcję zmień na: https://www.freehome.pl
SITE_URL="https://www.freehome.com.pl"
# ──────────────────────────────────────────────────────────────────────────

STAMP="$REPO/importer/.last-build.md5"

cd "$REPO"

echo "[$(date '+%F %T')] START build-and-deploy"

# 1. Import z Esti (jeśli są nowe paczki w inbox/).
php importer/import.php

# 2. Buduj tylko, gdy oferty faktycznie się zmieniły (albo brak publikacji).
NEW="$(md5sum src/data/offers.json | awk '{print $1}')"
OLD="$(cat "$STAMP" 2>/dev/null || echo '')"
if [ "$NEW" = "$OLD" ] && [ -f "$DOCROOT/index.html" ]; then
  echo "Brak zmian w ofertach — pomijam build i publikację."
  echo "[$(date '+%F %T')] KONIEC (bez zmian)"
  exit 0
fi

# 3. Build statyczny dla własnej domeny (root, bez prefiksu /freehome,
#    adres kanoniczny = SITE_URL).
eval "$ACTIVATE"
# CloudLinux Node Selector (nodevenv) ustawia NODE_PATH na DWA katalogi z
# node_modules → Next widzi dwie kopie Reacta → null hooks dispatcher i build
# wywala się przy prerenderze ("Cannot read properties of null (reading
# 'useState')"). Czyścimy NODE_PATH, żeby React rozwiązywał się jednoznacznie.
# Dodatkowo nodevenv zostawia NODE_ENV pusty — wymuszamy production.
unset NODE_PATH
export NODE_ENV=production
[ -d node_modules ] || npm install
rm -rf .next out
# CloudLinux nodevenv: zwykły build (worker prerender) wywala null React
# dispatcher przy `output: export` — w workerze React rozwiązuje się do null:
#   „Cannot read properties of null (reading 'useState'/'useContext')".
# `--debug-prerender` renderuje prerender IN-PROCESS (jeden proces) zamiast w
# workerach i buduje poprawnie. Wynik (statyczny out/) jest identyczny.
NEXT_PUBLIC_BASE_PATH="" NEXT_PUBLIC_SITE_URL="$SITE_URL" ./node_modules/.bin/next build --debug-prerender

# 4. Publikacja: zsynchronizuj kompletny out/ do katalogu domeny.
#    --delete sprząta stare pliki (out/ zawiera całą stronę, też zdjęcia ofert,
#    bo Next kopiuje public/ do out/ podczas eksportu).
rsync -a --delete out/ "$DOCROOT/"

echo "$NEW" > "$STAMP"
echo "[$(date '+%F %T')] KONIEC (opublikowano)"
