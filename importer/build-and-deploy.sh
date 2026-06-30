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
#    PRODUKCJA freehome.pl: Domenomania ustawiła freehome.pl jako domenę GŁÓWNĄ
#    konta dm82980 → jej document root to public_html. Tu publikujemy stronę.
#    (com.pl zostaje jak jest; kiedyś zrobi 301 → freehome.pl.)
DOCROOT="/home/dm82980/public_html"

# 4) Adres kanoniczny strony (canonical/OG/JSON-LD). Produkcja = freehome.pl
#    BEZ www (www.freehome.pl → 301 → freehome.pl robi .htaccess Domenomanii).
SITE_URL="https://freehome.pl"
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
# CloudLinux LVE: host pokazuje 14 rdzeni i 78 GB RAM, ale konto ma UKRYTY
# limit pamięci (PMEM). Next/Turbopack skalują liczbę workerów do widocznych
# rdzeni → ~14× pamięci jednocześnie → kernel ubija build ("Killed"/SIGKILL,
# bez logu OOM bo limit jest po stronie LVE, nie zwykłego ulimit/cgroup konta).
# taskset przypina build do 2 rdzeni — os.availableParallelism() oraz pula
# wątków Turbopacka (Rust) respektują maskę affinity → ~7× mniej pamięci.
# NODE_OPTIONS dodatkowo ścina stertę V8, która sama rośnie do RAM hosta (78 GB).
# MALLOC_ARENA_MAX=2: glibc na 14 rdzeniach tworzy do 8×14=112 aren malloc
# (~64 MB każda → ~7 GB pamięci na proces). Limit aren do 2 zbija RSS/VSZ
# każdego procesu node ~kilkukrotnie — to był główny powód SIGKILL (suma
# pamięci wszystkich workerów przekraczała ukryty limit LVE).
export MALLOC_ARENA_MAX=2
export NODE_OPTIONS="--max-old-space-size=1024"
TASKSET="taskset -c 0-1"
command -v taskset >/dev/null 2>&1 || TASKSET=""
[ -d node_modules ] || npm install
rm -rf .next out
# CloudLinux nodevenv: zwykły build (worker prerender) wywala null React
# dispatcher przy `output: export` — w workerze React rozwiązuje się do null:
#   „Cannot read properties of null (reading 'useState'/'useContext')".
# `--debug-prerender` renderuje prerender IN-PROCESS (jeden proces) zamiast w
# workerach i buduje poprawnie. Wynik (statyczny out/) jest identyczny.
NEXT_PUBLIC_BASE_PATH="" NEXT_PUBLIC_SITE_URL="$SITE_URL" $TASKSET ./node_modules/.bin/next build --debug-prerender

# 4. Publikacja: zsynchronizuj kompletny out/ do katalogu domeny.
#    --delete sprząta stare pliki (out/ zawiera całą stronę, też zdjęcia ofert,
#    bo Next kopiuje public/ do out/ podczas eksportu).
#    WYKLUCZENIA (KLUCZOWE dla public_html jako root freehome.pl): nie kasujemy
#    plików/katalogów, których Next NIE generuje, a które są infrastrukturą konta:
#      .htaccess     → przekierowanie 301 www→bez-www + dyrektywy PHP cPanela,
#      .well-known   → wyzwania SSL (Let's Encrypt) — kasacja zrywa certyfikat,
#      php.ini / .user.ini → konfiguracja PHP konta (cPanel),
#      cgi-bin       → standardowy katalog cPanela,
#      freehome-node → mount aplikacji Node.js (Passenger) z własnym .htaccess.
#    Eksport statyczny Next nie tworzy żadnego z nich, więc wykluczenie jest
#    bezpieczne i chroni je przed --delete. (Stary index.html parkingu Domenomanii
#    NIE jest wykluczony — celowo nadpisujemy go naszą stroną.)
rsync -a --delete \
  --exclude='.well-known' \
  --exclude='.htaccess' \
  --exclude='php.ini' \
  --exclude='.user.ini' \
  --exclude='cgi-bin' \
  --exclude='freehome-node' \
  out/ "$DOCROOT/"

echo "$NEW" > "$STAMP"
echo "[$(date '+%F %T')] KONIEC (opublikowano)"
