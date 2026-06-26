# FREE HOME — importer ofert z EstiCRM

Importer pobiera oferty z **EstiCRM** (eksport XML+ZIP przez FTP), zapisuje je w
bazie MySQL, optymalizuje zdjęcia i generuje `src/data/offers.json`, który strona
Next.js czyta przy budowaniu. Dzięki temu strona pozostaje w 100% statyczna
(brak serwera Node), a oferty aktualizują się automatycznie.

```
EstiCRM  ──(eksport ZIP: XML + zdjęcia, przez FTP)──►  importer/inbox/
                                                              │
                              CRON co godzinę:  php import.php │
                                                              ▼
                          ┌─────────── importer (PHP) ───────────┐
                          │ 1. rozpakuj ZIP                        │
                          │ 2. zparsuj XML + definitions.xml       │
                          │ 3. zapisz do MySQL (upsert / delete)   │
                          │ 4. zoptymalizuj zdjęcia (GD)           │
                          │ 5. wygeneruj offers.json + /oferty-esti│
                          └───────────────────────────────────────┘
                                                              │
              offers.json + zdjęcia  ◄────────────────────────┘
                          │
            build Next.js (GitHub Actions) ──► statyczny `out/` ──► hosting
```

## Pliki

| Plik | Rola |
|------|------|
| `import.php` | punkt wejścia (uruchamiany z CRON-a) |
| `config.example.php` | szablon konfiguracji — **skopiuj do `config.php`** |
| `sql/schema.sql` | struktura bazy (3 tabele: `offers`, `offer_pictures`, `import_log`) |
| `lib/EstiImporter.php` | silnik: ZIP→XML→MySQL, tryb incremental/full, logi |
| `lib/OfferMapper.php` | mapowanie pól Esti → wiersz bazy |
| `lib/Dictionaries.php` | słowniki z `definitions.xml` (kody → etykiety) |
| `lib/Images.php` | optymalizacja zdjęć (GD; skaluje w dół, jakość JPEG) |
| `lib/JsonExporter.php` | generuje `src/data/offers.json` dla frontu |
| `lib/Database.php` | cienka warstwa PDO (upsert) |

> `config.php`, `inbox/`, `work/`, `processed/`, `media/`, `*.log` oraz
> `public/oferty-esti/` są w `.gitignore` — **nie trafiają do repo**.
> Hasła zostają wyłącznie na serwerze.

---

# ✅ Co musi zrobić właściciel (krok po kroku)

Wszystkie poniższe wymagają Twojego loginu/hasła — dlatego robisz je sam.
Kolejność ma znaczenie.

### 1. Podepnij domenę na Domenomanii
- cPanel → **Domeny** → dodaj `freehome.com.pl` (staging) jako domenę dodatkową
  lub główną. Zanotuj katalog domeny (np. `/freehome.com.pl/` albo `/public_html/`).
- Jeśli domena jest w nazwa.pl: ustaw DNS (rekordy A / nameservery) na Domenomanię.
- Docelowo to samo dla `freehome.pl` (produkcja).

### 2. Załóż bazę MySQL
- cPanel → **Bazy danych MySQL**:
  - utwórz bazę, np. `dm82980_freehome`,
  - utwórz użytkownika, np. `dm82980_freehome`, **ustaw mocne hasło**,
  - dodaj użytkownika do bazy z **wszystkimi uprawnieniami**.
- cPanel → **phpMyAdmin** → wybierz bazę → zakładka **Import** → wgraj
  `importer/sql/schema.sql`.

### 3. Załóż konto FTP (dla Esti i deployu)
- cPanel → **Konta FTP** → utwórz konto, np. `esti@freehome.com.pl`, **mocne hasło**.
- Katalog tego konta ustaw na folder `importer/inbox/` na serwerze
  (tam Esti będzie wrzucać paczki). Ścieżkę zanotuj.

### 4. Wgraj importer na serwer i skonfiguruj
- Wgraj folder `importer/` na hosting (przez Menedżer plików cPanel, FTP albo
  „Repozytorium Git™" w cPanel).
- W Terminalu cPanel / SSH:
  ```bash
  cd ~/freehome/importer
  cp config.example.php config.php
  nano config.php       # wpisz hasło bazy (krok 2) i ewentualnie agent_map
  mkdir -p inbox work processed media
  ```
- Sprawdź ręcznie pierwsze uruchomienie:
  ```bash
  php import.php
  ```
  (na pusto napisze, że nie ma paczek — to OK).

### 5. Skonfiguruj eksport w EstiCRM
- W panelu Esti włącz eksport **EstiCRMXml** na to konto FTP (krok 3):
  - host: `ftp.dm82980.domenomania.eu`, port **21**, login/hasło z kroku 3,
  - **załącz zdjęcia** w paczce,
  - tryb przyrostowy (incremental) + okresowy pełny (full) — jeśli Esti pozwala.
- Eksportuj tylko oferty ze statusem **Aktywna publikacja** i `offerExport=1`
  (importer i tak filtruje, ale mniej danych = szybciej).

### 6. Ustaw CRON
- cPanel → **Zadania Cron** → dodaj (np. co godzinę):
  ```
  0 * * * * /usr/local/bin/php /home/dm82980/freehome/importer/import.php >> /home/dm82980/freehome/importer/cron.log 2>&1
  ```
  (ścieżkę do `php` potwierdź w cPanel → „Wybór wersji PHP").

### 7. Dodaj sekrety GitHub (dla auto-deployu FTP)
Repo na GitHub → **Settings → Secrets and variables → Actions → New secret**:

| Sekret | Wartość |
|--------|---------|
| `FTP_SERVER` | `ftp.dm82980.domenomania.eu` |
| `FTP_USERNAME` | login konta FTP do **katalogu strony** (nie inbox!) |
| `FTP_PASSWORD` | hasło tego konta FTP |
| `FTP_SERVER_DIR` | katalog domeny z `/` na końcu, np. `/freehome.com.pl/` |

Potem w repo: workflow **„Deploy na Domenomanię (FTP)"** → uruchom ręcznie
(Actions → Run workflow). Gdy zadziała, można odkomentować wyzwalacz `push`
w `.github/workflows/deploy-ftp.yml` i wyłączyć stary deploy na GitHub Pages.

### 8. 🔐 Bezpieczeństwo — zmień hasło do EstiCRM
Hasło do Esti pojawiło się wcześniej w materiałach roboczych — **zmień je**
w panelu Esti na nowe, znane tylko Tobie. Hasła FTP/bazy ustaw jako osobne,
mocne i różne.

---

## Uwagi techniczne

- **Tryb incremental vs full** — importer czyta atrybut `export` z korzenia XML.
  W trybie `full` oferty, których nie ma w paczce, są dezaktywowane
  (`is_active=0`), więc znikają ze strony. W `incremental` zmienia tylko to,
  co przyszło; `<action>delete</action>` dezaktywuje pojedynczą ofertę.
- **Publikacja** — na stronę trafiają tylko oferty `status=3` (Aktywna publikacja)
  i `offerExport=1` (reguła w `config.php`: `publish_status_ids`, `require_offer_export`).
- **Zdjęcia** — oryginały lądują w `media/`, zoptymalizowane w
  `public/oferty-esti/<numer-oferty>/`. Deploy FTP **nie** kasuje tego katalogu
  (jest na liście `exclude`), bo zarządza nim importer na serwerze.
- **basePath** — front buduje się z prefiksem `/freehome` (GitHub Pages) lub bez
  (własna domena). Build na własną domenę: `NEXT_PUBLIC_BASE_PATH="" npm run build`
  (workflow FTP robi to automatycznie).
- **Walidacja mappera** — logikę mapowania sprawdzono na realnej paczce
  (19 ofert, 64 zdjęcia) skryptem `esti-analiza/validate_mapping.py` — wynik zgodny.
