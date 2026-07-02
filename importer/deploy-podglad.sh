#!/bin/bash
# Deploy RĘCZNY na PODGLĄD (preview) — build statyczny na serwerze + publikacja
# do docroota podglad.dm82980.domenomania.eu.
#
# Po co osobny skrypt (zamiast build-and-deploy.sh):
#   • build-and-deploy.sh buduje TYLKO gdy zmieni się offers.json (strażnik MD5)
#     i publikuje do freehome.com.pl — tu chcemy wymusić build po ZMIANIE KODU
#     i opublikować na podgląd.
#   • Terminal cPanel bywa zrywany (WebSocket) — dlatego ten skrypt ma chodzić
#     ODŁĄCZONY od sesji, żeby przetrwał rozłączenie:
#
#     cd ~/freehome && nohup bash importer/deploy-podglad.sh > ~/deploy-podglad.log 2>&1 &
#     tail -f ~/deploy-podglad.log         # podgląd postępu
#
# UWAGA: build musi iść NA SERWERZE, bo to tu (MySQL importera) są prawdziwe
# oferty z Esti i zdjęcia w public/oferty-esti/. Lokalny build ma tylko seed.
set -eo pipefail

ACTIVATE="source /home/dm82980/nodevenv/freehome/20/bin/activate"
REPO="/home/dm82980/freehome"
DOCROOT="/home/dm82980/podglad.dm82980.domenomania.eu"
SITE_URL="https://podglad.dm82980.domenomania.eu"

cd "$REPO"
echo "[$(date '+%F %T')] START deploy-podglad"

# 1. Odśwież oferty (regeneruje src/data/offers.json + public/oferty-esti/).
#    Gdy brak nowych paczek / chwilowy problem — kontynuujemy na obecnych danych.
php importer/import.php || echo "import.php: ostrzeżenie — buduję na obecnych ofertach"

# 2. Build statyczny w root domeny (bez prefiksu /freehome), kanoniczny = podgląd.
eval "$ACTIVATE"
# CloudLinux nodevenv: dwa katalogi w NODE_PATH → dwie kopie Reacta → null
# dispatcher przy output:export. Czyścimy NODE_PATH i wymuszamy production.
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
# --debug-prerender: prerender IN-PROCESS (jeden proces) — omija null React
# dispatcher z workerów przy output:export. Wynik identyczny, mniejszy narzut.
NEXT_PUBLIC_BASE_PATH="" NEXT_PUBLIC_SITE_URL="$SITE_URL" $TASKSET ./node_modules/.bin/next build --debug-prerender

# 3. Publikacja: synchronizacja kompletnego out/ do docroota podglądu.
#    out/ zawiera też zdjęcia ofert (Next kopiuje public/ → out/).
#    Wykluczamy .well-known, żeby nie ruszać wyzwań SSL (Let's Encrypt).
rsync -a --delete --exclude='.well-known' out/ "$DOCROOT/"

# 4. Firmowa strona 404 + BLOKADA INDEKSOWANIA podglądu. Podgląd to robocza
#    kopia produkcji (freehome.pl) — bez noindex Google widziałby cały serwis
#    podwójnie (duplicate content, groźne dla świeżej domeny). X-Robots-Tag
#    działa dla KAŻDEGO pliku (HTML, obrazy, PDF), robots.txt dodatkowo
#    blokuje crawl. Oba pliki odtwarzamy PO rsync --delete, żeby publikacja
#    nigdy ich nie zgubiła.
printf 'ErrorDocument 404 /404.html\nHeader always set X-Robots-Tag "noindex, nofollow"\n' > "$DOCROOT/.htaccess"
printf 'User-agent: *\nDisallow: /\n' > "$DOCROOT/robots.txt"

echo "[$(date '+%F %T')] KONIEC deploy-podglad — OPUBLIKOWANO na $SITE_URL"
