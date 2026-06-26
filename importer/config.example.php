<?php
/**
 * FREE HOME — konfiguracja importera EstiCRM.
 *
 * SKOPIUJ ten plik do  config.php  i uzupełnij wartości na hostingu.
 * config.php NIE trafia do gita (jest w .gitignore) — hasła zostają tylko na serwerze.
 *
 *   cp config.example.php config.php
 *   nano config.php
 */

return [

    // --- Baza MySQL (cPanel → „Bazy danych MySQL") -------------------
    'db' => [
        'host'    => 'localhost',
        'name'    => 'dm82980_freehome',   // nazwa bazy (z prefiksem konta)
        'user'    => 'dm82980_freehome',   // użytkownik bazy
        'pass'    => 'TUTAJ_HASLO_BAZY',   // <-- UZUPEŁNIJ
        'charset' => 'utf8mb4',
    ],

    // --- Skąd Esti wrzuca paczki (folder FTP na hostingu) ------------
    // Esti eksportuje ZIP-y (XML + zdjęcia) na konto FTP wskazujące ten katalog.
    'inbox_dir'      => __DIR__ . '/inbox',      // tu lądują *.zip z Esti
    'work_dir'       => __DIR__ . '/work',       // rozpakowywanie (czyszczone po imporcie)
    'processed_dir'  => __DIR__ . '/processed',  // archiwum przetworzonych paczek
    'media_dir'      => __DIR__ . '/media',      // oryginały zdjęć (źródło prawdy)

    // --- Co importer generuje dla frontu -----------------------------
    // JSON z ofertami, który czyta strona Next.js przy budowaniu.
    'output_json'    => __DIR__ . '/../src/data/offers.json',
    // Katalog na zoptymalizowane zdjęcia (w public/ frontu).
    'output_images'  => __DIR__ . '/../public/oferty-esti',
    // Prefiks URL zapisywany w JSON (bez basePath — dokłada go loader Next).
    'web_image_base' => '/oferty-esti',

    // --- Optymalizacja zdjęć (GD) ------------------------------------
    'image_max_width' => 1600,   // px — większe są skalowane w dół
    'image_quality'   => 82,     // 0-100 (JPEG)
    'thumb_max_width' => 800,    // px — miniatura do listingu/kart

    // --- Reguły publikacji -------------------------------------------
    // Pokazujemy tylko oferty „Aktywna publikacja" (status 3) i offerExport=1.
    'publish_status_ids' => [3],   // 3 = Aktywna publikacja
    'require_offer_export' => true,

    // --- Mapowanie opiekuna Esti → nasz agent (slug z site.ts people) -
    // Klucz = contactEmail z Esti, wartość = slug u nas.
    // Oferty bez dopasowania pokazują dane kontaktowe wprost z Esti.
    'agent_map' => [
        // 'grzegorz.lukasik@freehome.com.pl' => 'grzegorz-lukasik',
        // 'daria.lukasik@freehome.com.pl'    => 'daria-lukasik',
        // 'angelika@freehome.com.pl'         => 'angelika-skorupinska',
    ],

    // --- Logowanie ----------------------------------------------------
    'log_file' => __DIR__ . '/import.log',
];
