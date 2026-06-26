<?php
/**
 * Wczytuje definitions.xml z paczki Esti i tłumaczy kody słownikowe na nazwy.
 *
 * W XML pola mają atrybut dictionary="...", np.:
 *   <transaction dictionary="transaction">131</transaction>
 * a definitions.xml zawiera <transaction key="131">sprzedaż</transaction>.
 */

declare(strict_types=1);

final class Dictionaries
{
    /** @var array<string,array<string,string>>  [słownik => [klucz => nazwa]] */
    private array $maps = [];

    public function __construct(?string $definitionsXmlPath = null)
    {
        if ($definitionsXmlPath !== null && is_file($definitionsXmlPath)) {
            $this->load($definitionsXmlPath);
        }
    }

    private function load(string $path): void
    {
        $xml = @simplexml_load_file($path);
        if ($xml === false) {
            return;
        }

        // Każde dziecko <definitions> to jeden słownik (np. <transaction>),
        // a w nim wpisy o tej samej nazwie z atrybutem key.
        foreach ($xml->children() as $dictName => $dict) {
            $name = (string) $dictName;
            foreach ($dict->children() as $entry) {
                $key = (string) $entry['key'];
                $this->maps[$name][$key] = trim((string) $entry);
            }
        }
    }

    /** Zwraca nazwę dla danego słownika i klucza (lub null). */
    public function label(string $dictionary, ?string $key): ?string
    {
        if ($key === null || $key === '') {
            return null;
        }
        return $this->maps[$dictionary][$key] ?? null;
    }

    public function has(string $dictionary): bool
    {
        return isset($this->maps[$dictionary]);
    }
}
