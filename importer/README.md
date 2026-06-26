# FREE HOME — importer ofert z EstiCRM (Model A: wszystko na serwerze)

Importer pobiera oferty z **EstiCRM** (eksport XML+ZIP przez FTP), zapisuje je w
bazie MySQL, optymalizuje zdjęcia i generuje `src/data/offers.json`. Następnie
**na tym samym serwerze** budowana jest statyczna strona Next.js i publikowana do
katalogu domeny. Cała pętla działa lokalnie na hostingu — **bez GitHub Actions,
bez sekretów FTP, bez deployu z zewnątrz**. Strona pozostaje w 100% statyczna.

```
EstiCRM ──(eksport ZIP: XML + zdjęcia, przez FTP)──► importer/inbox/
                                                           │
                       CRON co godzinę: build-and-deploy.sh│
                                                           ▼
   ┌──────────────────────── na serwerze ───────────────────────────┐
   │ 1. php import.php                                                │
   │      • rozpakuj ZIP, zparsuj XML + definitions.xml              │
   │      • zapisz do MySQL (upsert / delete, incremental/full)       │
   │      • zoptymalizuj zdjęcia (GD)                                 │
   │      • wygeneruj src/data/offers.json + public/oferty-esti/      │
   │ 2. (jeśli oferty się zmieniły) npm run build  → out/            │
   │ 3. rsync out/ → katalog publiczny domeny (publikacja na żywo)    │
   └─────────────────────────────────────────────────────────────────┘
```

## Pliki

| Plik | Rola |
|------|------|
| `build-and-deploy.sh` | **Model A**: cała pętla import→build→publikacja (uruchamiany z CRON-a) |
| `import.php` | sam import z Esti (wywoływany przez skrypt powyżej) |
| `config.example.php` | szablon konfiguracji — **skopiuj do `config.php`** |
| `sql/schema.sql` | struktura bazy (3 tabele: `offers`, `offer_pictures`, `import_log`) |
| `lib/EstiImporter.php` | silnik: ZIP→XML→MySQL, tryb incremental/full, logi |
| `lib/OfferMapper.php` | mapowanie pól Esti → wiersz bazy |
| `lib/Dictionaries.php` | słowniki z `definitions.xml` (kody → etykiety) |
| `lib/Images.php` | optymalizacja zdjęć (GD; skaluje w dół, jakość JPEG) |
| `lib/JsonExporter.php` | generuje `src/data/offers.json` dla frontu |
| `lib/Database.php` | cienka warstwa PDO (upsert) |

> `config.php`, `inbox/`, `work/`, `processed/`, `media/`, `*.log`,
> `.last-build.md5` oraz `public/oferty-esti/` są w `.gitignore` —
> **nie trafiają do repo**. Hasła zostają wyłącznie na serwerze.

---

# ✅ Co musi zrobić właściciel (krok po kroku)

Wszystkie poniższe wymagają Twojego loginu/hasła — dlatego robisz je sam.
Kolejność ma znaczenie. Konto na hostingu: **dm82980**, katalog domowy
`/home/dm82980`.

### 1. Podepnij domenę na Domenomanii
- cPanel → **Domeny** → dodaj `freehome.com.pl` (staging).
- **Zanotuj „Główny katalog"** domeny (typowo
  `/home/dm82980/domains/freehome.com.pl/public_html`) — wpiszesz go do skryptu.
- Jeśli domena jest w nazwa.pl: ustaw DNS (rekordy A / nameservery) na Domenomanię.
- Docelowo to samo dla `freehome.pl` (produkcja).

### 2. Załóż bazę MySQL
- cPanel → **Bazy danych MySQL**:
  - **Nowa baza**: wpisz `freehome` → panel zrobi **`dm82980_freehome`**,
  - **Nowy użytkownik**: wpisz `freehome` → wyjdzie **`dm82980_freehome`**,
    ustaw **mocne hasło** (zapamiętaj — idzie do `config.php`),
  - **Dodaj użytkownika do bazy** → **WSZYSTKIE UPRAWNIENIA**.
- cPanel → **phpMyAdmin** → wybierz `dm82980_freehome` → **Import** → wgraj
  `importer/sql/schema.sql`.

### 3. Załóż konto FTP dla Esti
- cPanel → **Konta FTP** → utwórz konto, login `esti`, **mocne hasło**.
- Pole **„Katalog"** wpisz dokładnie:
  ```
  freehome/importer/inbox
  ```
  (pełna ścieżka: `/home/dm82980/freehome/importer/inbox`) — tam Esti wrzuca paczki.

### 4. Wgraj repo na serwer, zainstaluj zależności, skonfiguruj
- cPanel → **Repozytorium Git™** → sklonuj repo do `/home/dm82980/freehome`
  (albo wgraj cały projekt Menedżerem plików — potrzebny jest też `src/` i `public/`,
  bo build dzieje się na serwerze).
- cPanel → **Setup Node.js App** → utwórz aplikację wskazującą na
  `/home/dm82980/freehome` (wersja Node 20). Skopiuj pokazaną linię
  **„Enter to the virtual environment"** (`source /home/dm82980/nodevenv/.../activate`).
- Terminal cPanel / SSH:
  ```bash
  cd ~/freehome/importer
  cp config.example.php config.php
  nano config.php           # wpisz hasło bazy z kroku 2 (pole 'pass'); reszta gotowa
  mkdir -p inbox work processed media
  cd ~/freehome
  source /home/dm82980/nodevenv/.../activate   # wklej swoją linię z cPanel
  npm install               # jednorazowo (potem build używa node_modules)
  php importer/import.php    # test: na pusto napisze „brak paczek" — OK
  ```
- W pliku **`importer/build-and-deploy.sh`** ustaw na górze 3 wartości:
  `ACTIVATE` (linia z cPanel), `REPO` (`/home/dm82980/freehome`),
  `DOCROOT` (katalog domeny z kroku 1).

### 5. Skonfiguruj eksport w EstiCRM
- W panelu Esti włącz eksport **EstiCRMXml** na konto FTP z kroku 3:
  - host: `ftp.dm82980.domenomania.eu`, port **21**, login/hasło z kroku 3,
  - **załącz zdjęcia** w paczce,
  - tryb przyrostowy (incremental) + okresowy pełny (full) — jeśli Esti pozwala.
- Eksportuj oferty **„Aktywna publikacja"** (status 3), `offerExport=1`.

### 6. Ustaw CRON (cała pętla jedną komendą)
- cPanel → **Zadania Cron** → co godzinę:
  ```
  0 * * * * /home/dm82980/freehome/importer/build-and-deploy.sh >> /home/dm82980/freehome/importer/cron.log 2>&1
  ```
- Skrypt sam: zaimportuje, zbuduje (tylko gdy oferty się zmieniły) i opublikuje.

### 7. ❌ NIE dotyczy Modelu A — GitHub Secrets / workflow FTP
W Modelu A **nie ustawiasz** żadnych sekretów GitHub ani nie wgrywasz workflow FTP
— publikacja dzieje się w całości na serwerze (krok 6). Plik
`.github/workflows/deploy-ftp.yml` zostaje nieużywany (przyda się tylko, gdybyś
kiedyś przeszedł na build w GitHub Actions).

### 8. 🔐 Bezpieczeństwo — zmień hasło do EstiCRM
Hasło do Esti pojawiło się wcześniej w materiałach roboczych — **zmień je**
w panelu Esti na nowe, znane tylko Tobie. Hasła Esti / FTP / bazy ustaw jako
osobne, mocne i różne.

---

## Uwagi techniczne

- **Build tylko przy zmianach** — `build-and-deploy.sh` liczy sumę `offers.json`
  i pomija build+publikację, gdy nic się nie zmieniło (stempel `.last-build.md5`).
- **Tryb incremental vs full** — importer czyta atrybut `export` z korzenia XML.
  W `full` oferty nieobecne w paczce są dezaktywowane (`is_active=0`) i znikają ze
  strony. W `incremental` zmienia tylko to, co przyszło; `<action>delete</action>`
  dezaktywuje pojedynczą ofertę.
- **Publikacja ofert** — na stronę trafiają tylko oferty `status=3`
  (Aktywna publikacja) i `offerExport=1` (`config.php`: `publish_status_ids`,
  `require_offer_export`).
- **Zdjęcia** — oryginały w `media/`, zoptymalizowane w
  `public/oferty-esti/<numer-oferty>/`. Podczas `npm run build` Next kopiuje
  `public/` do `out/`, więc zdjęcia trafiają na stronę automatycznie (osobny
  upload nie jest potrzebny).
- **basePath** — front buduje się z prefiksem `/freehome` (GitHub Pages) lub bez
  (własna domena). Skrypt buduje z `NEXT_PUBLIC_BASE_PATH=""` → strona działa
  w root domeny.
- **Walidacja mappera** — logikę mapowania sprawdzono na realnej paczce
  (19 ofert, 64 zdjęcia) skryptem `esti-analiza/validate_mapping.py` — wynik zgodny.
