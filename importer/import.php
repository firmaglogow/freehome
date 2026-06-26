<?php
/**
 * FREE HOME — punkt wejścia importera EstiCRM.
 *
 * Uruchamiany z CRON na hostingu, np. co godzinę:
 *   /usr/local/bin/php /home/dm82980/freehome/importer/import.php >> /home/dm82980/freehome/importer/cron.log 2>&1
 *
 * Można też odpalić ręcznie z poziomu Terminala cPanel / SSH:
 *   php import.php
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '1');
set_time_limit(0);                 // import dużej bazy może trwać
mb_internal_encoding('UTF-8');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    fwrite(STDERR, "Brak config.php — skopiuj config.example.php i uzupełnij dane.\n");
    exit(1);
}

$config = require $configFile;

require_once __DIR__ . '/lib/EstiImporter.php';
require_once __DIR__ . '/lib/JsonExporter.php';

try {
    $importer = new EstiImporter($config);
    $importer->log('--- START importu ---');

    $packages = $importer->run();

    // JSON regenerujemy zawsze, gdy coś przyszło (front czyta świeże dane).
    if ($packages > 0) {
        $exporter = new JsonExporter($importer->db(), $config);
        $written  = $exporter->export();
        $importer->log("offers.json zapisany: $written ofert aktywnych.");
    }

    $importer->log('--- KONIEC importu ---');
    exit(0);
} catch (\Throwable $e) {
    fwrite(STDERR, 'KRYTYCZNY BŁĄD: ' . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n");
    exit(1);
}
