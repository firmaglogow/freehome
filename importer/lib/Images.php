<?php
/**
 * Optymalizacja zdjęć ofert przy użyciu GD.
 * Skaluje w dół do zadanej szerokości i zapisuje JPEG o ustalonej jakości.
 * Jeśli GD jest niedostępne — kopiuje plik 1:1 (lepsze to niż brak zdjęcia).
 */

declare(strict_types=1);

final class Images
{
    public function __construct(private array $config)
    {
    }

    public function gdAvailable(): bool
    {
        return function_exists('imagecreatefromjpeg');
    }

    /**
     * Tworzy zoptymalizowaną wersję $src w $dst (JPEG).
     * @param int|null $maxWidth nadpisuje image_max_width z configu
     */
    public function optimize(string $src, string $dst, ?int $maxWidth = null): bool
    {
        if (!is_file($src)) {
            return false;
        }

        $dir = dirname($dst);
        if (!is_dir($dir) && !mkdir($dir, 0775, true) && !is_dir($dir)) {
            return false;
        }

        $maxWidth ??= (int) ($this->config['image_max_width'] ?? 1600);
        $quality  = (int) ($this->config['image_quality'] ?? 82);

        if (!$this->gdAvailable()) {
            return copy($src, $dst);
        }

        $info = @getimagesize($src);
        if ($info === false) {
            return copy($src, $dst);
        }

        [$width, $height] = $info;
        $type = $info[2];

        $img = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($src),
            IMAGETYPE_PNG  => @imagecreatefrompng($src),
            IMAGETYPE_WEBP => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($src) : false,
            default        => false,
        };

        if ($img === false) {
            return copy($src, $dst);
        }

        // Skalowanie tylko w dół.
        if ($width > $maxWidth) {
            $newW = $maxWidth;
            $newH = (int) round($height * ($maxWidth / $width));
            $resized = imagescale($img, $newW, $newH);
            if ($resized !== false) {
                imagedestroy($img);
                $img = $resized;
            }
        }

        $ok = imagejpeg($img, $dst, $quality);
        imagedestroy($img);

        return $ok;
    }
}
