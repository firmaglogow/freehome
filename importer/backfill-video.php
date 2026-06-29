<?php
/**
 * Jednorazowy backfill: uzupełnia offers.video_url (film z prezentacji,
 * <videoLink> z Esti) dla ofert zaimportowanych ZANIM mapper zaczął czytać to
 * pole. Bezpieczny i idempotentny:
 *   • dodaje kolumnę video_url, jeśli jeszcze nie istnieje (ALTER),
 *   • przechodzi po archiwum przetworzonych paczek (processed/*.zip)
 *     chronologicznie i robi UPDATE offers SET video_url=? WHERE esti_id=?
 *     (późniejsze paczki nadpisują wcześniejsze — ostatni link wygrywa),
 *   • NIE wygasza ofert, NIE rusza zdjęć ani innych pól — wyłącznie video_url,
 *   • z każdego ZIP-a czyta tylko plik XML (pomija zdjęcia — szybko, bez /tmp),
 *   • na końcu regeneruje src/data/offers.json (JsonExporter).
 *
 * Uruchom raz na serwerze po wdrożeniu kodu:  php importer/backfill-video.php
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '1');
set_time_limit(0);
mb_internal_encoding('UTF-8');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    fwrite(STDERR, "Brak config.php — uruchom na serwerze.\n");
    exit(1);
}
$config = require $configFile;

require_once __DIR__ . '/lib/Database.php';
require_once __DIR__ . '/lib/JsonExporter.php';

$db  = new Database($config['db']);
$pdo = $db->pdo();

// 1. Kolumna video_url — dodaj, jeśli brak (idempotentnie).
$exists = (int) ($db->execute(
    "SELECT COUNT(*) AS c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'offers'
       AND COLUMN_NAME = 'video_url'"
)->fetch()['c'] ?? 0);

if ($exists === 0) {
    $pdo->exec("ALTER TABLE offers ADD COLUMN video_url VARCHAR(255) NULL AFTER tags");
    echo "Dodano kolumnę offers.video_url\n";
} else {
    echo "Kolumna offers.video_url już istnieje — pomijam ALTER\n";
}

// 2. Backfill z archiwum paczek (tylko XML, bez rozpakowywania zdjęć).
$processed = rtrim($config['processed_dir'], '/');
$zips = glob($processed . '/*.zip') ?: [];
sort($zips); // chronologicznie wg nazwy: EstiCRM_<id>_<data>_<czas>.zip

$upd      = $pdo->prepare("UPDATE offers SET video_url = ? WHERE esti_id = ?");
$withLink = 0;
$scanned  = 0;

foreach ($zips as $zip) {
    $za = new ZipArchive();
    if ($za->open($zip) !== true) {
        echo "  (pomijam — nie otwiera się: " . basename($zip) . ")\n";
        continue;
    }

    // Wyłuskaj sam plik eksportu XML (nie definitions.xml), bez ekstrakcji.
    $xmlContent = null;
    for ($i = 0; $i < $za->numFiles; $i++) {
        $name = (string) $za->getNameIndex($i);
        if (!preg_match('/\.xml$/i', $name)) continue;
        if (preg_match('/definitions\.xml$/i', $name)) continue;
        $xmlContent = $za->getFromIndex($i);
        break;
    }
    $za->close();

    if ($xmlContent === null || $xmlContent === false) {
        continue;
    }

    $xml = simplexml_load_string($xmlContent);
    if ($xml === false) {
        continue;
    }

    $pkgLinks = 0;
    foreach ($xml->offer as $o) {
        $scanned++;
        $estiId = (int) trim((string) $o->id);
        $link   = isset($o->videoLink) ? trim((string) $o->videoLink) : '';
        if ($estiId > 0 && $link !== '') {
            $upd->execute([$link, $estiId]);
            $withLink++;
            $pkgLinks++;
        }
    }
    echo "  " . basename($zip) . " — ofert z filmem: $pkgLinks\n";
}

echo "Razem ofert z linkiem do filmu (po archiwum): $withLink (przejrzano: $scanned)\n";

// 3. Regeneracja offers.json (projekcja bazy na kształt frontu).
$exporter = new JsonExporter($db, $config);
$written  = $exporter->export();
echo "offers.json zapisany: $written ofert aktywnych\n";
echo "GOTOWE.\n";
