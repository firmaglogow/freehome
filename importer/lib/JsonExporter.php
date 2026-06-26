<?php
/**
 * Generuje src/data/offers.json z aktywnych ofert w bazie.
 * To jest „projekcja" bazy na kształt oczekiwany przez front (Next.js).
 */

declare(strict_types=1);

require_once __DIR__ . '/Database.php';

final class JsonExporter
{
    public function __construct(
        private Database $db,
        private array $config
    ) {
    }

    public function export(): int
    {
        $offers = $this->db->execute(
            'SELECT * FROM offers WHERE is_active = 1 ORDER BY portal_promote DESC, update_date DESC'
        )->fetchAll();

        $picStmt = $this->db->pdo()->prepare(
            'SELECT filename FROM offer_pictures WHERE esti_id = ? ORDER BY position ASC'
        );

        $base = rtrim($this->config['web_image_base'] ?? '/oferty-esti', '/');
        $out  = [];

        foreach ($offers as $o) {
            $number = (string) $o['number'];

            $picStmt->execute([$o['esti_id']]);
            $files   = $picStmt->fetchAll(\PDO::FETCH_COLUMN) ?: [];
            $gallery = array_map(static fn ($f) => "$base/$number/$f", $files);

            $category = $this->category((int) $o['main_type_id'], $o['type_name']);

            $out[] = [
                'id'              => $number,
                'estiId'          => (int) $o['esti_id'],
                'slug'            => $this->slug($category, $o['city'], $number),
                'title'           => $this->title($o, $category),
                'transaction'     => $o['transaction'] ?? 'sprzedaz',
                'type'            => $category,
                'typeName'        => $o['type_name'],
                'location'        => $this->location($o),
                'city'            => $o['city'],
                'price'           => $o['price'] !== null ? (float) $o['price'] : null,
                'pricePerMeter'   => $o['price_permeter'] !== null ? (int) round((float) $o['price_permeter']) : null,
                'areaTotal'       => $o['area_total'] !== null ? (float) $o['area_total'] : null,
                'areaPlot'        => $o['area_plot'] !== null ? (float) $o['area_plot'] : null,
                'rooms'           => $o['rooms'] !== null ? (int) $o['rooms'] : null,
                'floor'           => $this->floor($o),
                'image'           => $gallery[0] ?? null,
                'gallery'         => $gallery,
                'geo'             => ($o['lat'] !== null && $o['lng'] !== null)
                                        ? ['lat' => (float) $o['lat'], 'lng' => (float) $o['lng']]
                                        : null,
                'description'     => $o['description'],
                'descriptionHtml' => $o['description_html'],
                'market'          => $o['market'],
                'buildingYear'    => $o['building_year'] !== null ? (int) $o['building_year'] : null,
                'investmentId'    => $o['investment_id'] !== null ? (int) $o['investment_id'] : null,
                'investmentName'  => $o['investment_name'],
                'promoted'        => (bool) $o['portal_promote'],
                'agent'           => $o['agent_slug'],
                'agentName'       => $o['contact_name'],
                'agentPhone'      => $o['contact_phone'],
                'updatedAt'       => $o['update_date'],
                'addDate'         => $o['add_date'],
            ];
        }

        $json = json_encode(
            $out,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        $path = $this->config['output_json'];
        @mkdir(dirname($path), 0775, true);
        file_put_contents($path, $json . "\n");

        return count($out);
    }

    private function category(int $mainTypeId, ?string $typeName): string
    {
        return match ($mainTypeId) {
            1       => 'Dom',
            2       => 'Mieszkanie',
            3       => 'Działka',
            default => $typeName ?: 'Lokal',
        };
    }

    private function title(array $o, string $category): string
    {
        $t = match ($o['transaction'] ?? null) {
            'wynajem', 'najem' => 'na wynajem',
            default            => 'na sprzedaż',
        };
        $city = $o['city'] ? ', ' . $o['city'] : '';
        return "$category $t$city";
    }

    private function location(array $o): ?string
    {
        $city = $o['city'] ?? null;
        if ($city === null) {
            return null;
        }
        return $o['precinct'] ? "$city — {$o['precinct']}" : $city;
    }

    private function floor(array $o): ?string
    {
        if ($o['floor_no'] === null) {
            return null;
        }
        return $o['building_floors'] !== null
            ? "{$o['floor_no']}/{$o['building_floors']}"
            : (string) $o['floor_no'];
    }

    private function slug(string $category, ?string $city, string $number): string
    {
        return $this->slugify($category . ' ' . ($city ?? '') . ' ' . $number);
    }

    private function slugify(string $text): string
    {
        $map = [
            'ą'=>'a','ć'=>'c','ę'=>'e','ł'=>'l','ń'=>'n','ó'=>'o','ś'=>'s','ż'=>'z','ź'=>'z',
            'Ą'=>'a','Ć'=>'c','Ę'=>'e','Ł'=>'l','Ń'=>'n','Ó'=>'o','Ś'=>'s','Ż'=>'z','Ź'=>'z',
        ];
        $text = strtr($text, $map);
        $text = mb_strtolower($text, 'UTF-8');
        $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
        return trim($text, '-');
    }
}
