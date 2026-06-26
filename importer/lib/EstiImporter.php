<?php
/**
 * Główny silnik importu paczek EstiCRM XML.
 *
 * Przebieg dla każdej paczki *.zip z folderu inbox:
 *   1. rozpakuj do work_dir
 *   2. wczytaj definitions.xml (słowniki) + główny plik eksportu (offers)
 *   3. tryb z atrybutu <offers export="incremental|full">
 *   4. dla każdej <offer>:
 *        - action=delete  → wygaś ofertę (is_active=0)
 *        - action=update  → upsert + galeria + optymalizacja zdjęć
 *   5. tryb full → wygaś oferty, których NIE było w paczce
 *   6. przenieś ZIP do processed, zapisz wpis w import_log
 */

declare(strict_types=1);

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Dictionaries.php';
require_once __DIR__ . '/OfferMapper.php';
require_once __DIR__ . '/Images.php';

final class EstiImporter
{
    private Database $db;
    private Images $images;

    public function __construct(private array $config)
    {
        $this->db     = new Database($config['db']);
        $this->images = new Images($config);
        $this->ensureDirs();
    }

    /** Przetwarza wszystkie paczki w inbox. Zwraca liczbę przetworzonych. */
    public function run(): int
    {
        $packages = glob(rtrim($this->config['inbox_dir'], '/') . '/*.zip') ?: [];
        sort($packages); // chronologicznie wg nazwy (EstiCRM_<id>_<data>_<czas>.zip)

        if ($packages === []) {
            $this->log('Brak nowych paczek w inbox.');
            return 0;
        }

        $count = 0;
        foreach ($packages as $zipPath) {
            try {
                $this->processPackage($zipPath);
                $count++;
            } catch (\Throwable $e) {
                $this->log('BŁĄD paczki ' . basename($zipPath) . ': ' . $e->getMessage());
                $this->writeLogRow(basename($zipPath), null, 0, 0, 0, 0, 'error', $e->getMessage(), null);
            }
        }
        return $count;
    }

    private function processPackage(string $zipPath): void
    {
        $started = gmdate('Y-m-d H:i:s');
        $name    = basename($zipPath);
        $this->log("== Paczka: $name ==");

        $work = rtrim($this->config['work_dir'], '/') . '/' . pathinfo($name, PATHINFO_FILENAME);
        $this->rrmdir($work);
        mkdir($work, 0775, true);

        // 1. rozpakuj
        $zip = new \ZipArchive();
        if ($zip->open($zipPath) !== true) {
            throw new \RuntimeException('Nie mogę otworzyć ZIP.');
        }
        $zip->extractTo($work);
        $zip->close();

        // 2. znajdź pliki XML
        $definitions = $this->findFile($work, 'definitions.xml');
        $exportXml   = $this->findExportXml($work);
        if ($exportXml === null) {
            throw new \RuntimeException('Brak głównego pliku eksportu XML w paczce.');
        }

        $dict   = new Dictionaries($definitions);
        $mapper = new OfferMapper($dict, $this->config);

        $xml = simplexml_load_file($exportXml);
        if ($xml === false) {
            throw new \RuntimeException('Niepoprawny XML eksportu.');
        }

        $mode = (string) ($xml['export'] ?? 'incremental');
        $this->log("Tryb eksportu: $mode");

        $seenIds   = [];
        $upserted  = 0;
        $deleted   = 0;
        $total     = 0;

        // 3+4. oferty
        foreach ($xml->offer as $offerXml) {
            $total++;
            $mapped = $mapper->map($offerXml);
            $estiId = (int) $mapped['row']['esti_id'];
            $seenIds[] = $estiId;

            if ($mapped['action'] === 'delete') {
                $this->deactivate($estiId);
                $deleted++;
                continue;
            }

            $this->saveOffer($mapped['row']);
            $this->savePictures($estiId, $mapped['row']['number'], $mapped['pictures'], $work);
            $upserted++;
        }

        // 5. full → wygaś nieobecne
        $deactivated = 0;
        if (strtolower($mode) === 'full' && $seenIds !== []) {
            $deactivated = $this->deactivateMissing($seenIds);
        }

        // 6. archiwizuj paczkę
        $this->archive($zipPath);
        $this->rrmdir($work);

        $this->log("OK: total=$total, upsert=$upserted, delete=$deleted, wygaszone=$deactivated");
        $this->writeLogRow($name, $mode, $total, $upserted, $deleted, $deactivated, 'ok', null, $started);
    }

    // --- zapis do bazy ---------------------------------------------------

    private function saveOffer(array $row): void
    {
        $updateCols = array_keys($row);
        // esti_id to klucz — nie aktualizujemy go w ON DUPLICATE
        $updateCols = array_values(array_filter($updateCols, static fn ($c) => $c !== 'esti_id'));
        $this->db->upsert('offers', $row, $updateCols);
    }

    private function savePictures(int $estiId, string $number, array $pictures, string $work): void
    {
        // wyczyść i zapisz od nowa (galeria zawsze odzwierciedla paczkę)
        $this->db->execute('DELETE FROM offer_pictures WHERE esti_id = ?', [$estiId]);

        foreach ($pictures as $pic) {
            $this->db->upsert(
                'offer_pictures',
                [
                    'esti_id'  => $estiId,
                    'filename' => $pic['filename'],
                    'type'     => $pic['type'],
                    'position' => $pic['position'],
                ],
                ['type', 'position']
            );
            $this->processImage($number, $pic['filename'], $work);
        }
    }

    private function processImage(string $number, string $filename, string $work): void
    {
        $src = $this->findFile($work, $filename);
        if ($src === null) {
            return; // zdjęcia mogą przyjść osobną paczką galerii — pominie się teraz
        }

        // oryginał → media (źródło prawdy)
        $mediaDst = rtrim($this->config['media_dir'], '/') . "/$number/$filename";
        if (!is_file($mediaDst)) {
            @mkdir(dirname($mediaDst), 0775, true);
            @copy($src, $mediaDst);
        }

        // zoptymalizowana wersja → public/oferty-esti
        $webDst = rtrim($this->config['output_images'], '/') . "/$number/$filename";
        if (!is_file($webDst)) {
            $this->images->optimize($src, $webDst);
        }
    }

    private function deactivate(int $estiId): void
    {
        $this->db->execute(
            'UPDATE offers SET is_active = 0, last_seen_at = ? WHERE esti_id = ?',
            [gmdate('Y-m-d H:i:s'), $estiId]
        );
    }

    /** Wygasza oferty, których nie ma na liście widzianych (tryb full). */
    private function deactivateMissing(array $seenIds): int
    {
        $placeholders = implode(',', array_fill(0, count($seenIds), '?'));
        $stmt = $this->db->execute(
            "UPDATE offers SET is_active = 0 WHERE is_active = 1 AND esti_id NOT IN ($placeholders)",
            $seenIds
        );
        return $stmt->rowCount();
    }

    // --- pliki / pomocnicze ---------------------------------------------

    private function findExportXml(string $dir): ?string
    {
        foreach (glob("$dir/*.xml") ?: [] as $f) {
            if (strtolower(basename($f)) !== 'definitions.xml') {
                return $f;
            }
        }
        // czasem pliki są w podkatalogu
        foreach (glob("$dir/*/*.xml") ?: [] as $f) {
            if (strtolower(basename($f)) !== 'definitions.xml') {
                return $f;
            }
        }
        return null;
    }

    private function findFile(string $dir, string $filename): ?string
    {
        $direct = "$dir/$filename";
        if (is_file($direct)) {
            return $direct;
        }
        $hits = glob("$dir/*/$filename") ?: [];
        return $hits[0] ?? null;
    }

    private function archive(string $zipPath): void
    {
        $dest = rtrim($this->config['processed_dir'], '/') . '/' . basename($zipPath);
        if (!@rename($zipPath, $dest)) {
            @copy($zipPath, $dest);
            @unlink($zipPath);
        }
    }

    private function ensureDirs(): void
    {
        foreach (['inbox_dir', 'work_dir', 'processed_dir', 'media_dir', 'output_images'] as $key) {
            $dir = $this->config[$key] ?? null;
            if ($dir && !is_dir($dir)) {
                @mkdir($dir, 0775, true);
            }
        }
        $jsonDir = dirname($this->config['output_json'] ?? '');
        if ($jsonDir && !is_dir($jsonDir)) {
            @mkdir($jsonDir, 0775, true);
        }
    }

    private function rrmdir(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }
        $items = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($items as $item) {
            $item->isDir() ? @rmdir($item->getPathname()) : @unlink($item->getPathname());
        }
        @rmdir($dir);
    }

    private function writeLogRow(
        string $package,
        ?string $mode,
        int $total,
        int $upserted,
        int $deleted,
        int $deactivated,
        string $status,
        ?string $message,
        ?string $started
    ): void {
        $this->db->upsert(
            'import_log',
            [
                'package'            => $package,
                'export_mode'        => $mode,
                'offers_total'       => $total,
                'offers_upserted'    => $upserted,
                'offers_deleted'     => $deleted,
                'offers_deactivated' => $deactivated,
                'status'             => $status,
                'message'            => $message,
                'started_at'         => $started ?? gmdate('Y-m-d H:i:s'),
                'finished_at'        => gmdate('Y-m-d H:i:s'),
            ],
            ['finished_at'] // import_log nie ma klucza unikalnego poza id → zawsze INSERT
        );
    }

    public function log(string $msg): void
    {
        $line = '[' . gmdate('Y-m-d H:i:s') . '] ' . $msg . "\n";
        if (!empty($this->config['log_file'])) {
            @file_put_contents($this->config['log_file'], $line, FILE_APPEND);
        }
        echo $line;
    }

    public function db(): Database
    {
        return $this->db;
    }
}
