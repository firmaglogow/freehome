<?php
/**
 * Cienka nakładka na PDO (MySQL) — połączenie + pomocnicze metody.
 */

declare(strict_types=1);

final class Database
{
    private \PDO $pdo;

    public function __construct(array $cfg)
    {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $cfg['host'],
            $cfg['name'],
            $cfg['charset'] ?? 'utf8mb4'
        );

        $this->pdo = new \PDO($dsn, $cfg['user'], $cfg['pass'], [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }

    public function pdo(): \PDO
    {
        return $this->pdo;
    }

    /** Wstawia/aktualizuje wiersz (INSERT ... ON DUPLICATE KEY UPDATE). */
    public function upsert(string $table, array $data, array $updateColumns): void
    {
        $cols         = array_keys($data);
        $placeholders = array_map(static fn ($c) => ':' . $c, $cols);

        $updates = array_map(
            static fn ($c) => "`$c` = VALUES(`$c`)",
            $updateColumns
        );

        $sql = sprintf(
            'INSERT INTO `%s` (`%s`) VALUES (%s) ON DUPLICATE KEY UPDATE %s',
            $table,
            implode('`, `', $cols),
            implode(', ', $placeholders),
            implode(', ', $updates)
        );

        $stmt = $this->pdo->prepare($sql);
        foreach ($data as $col => $val) {
            $stmt->bindValue(':' . $col, $val, self::pdoType($val));
        }
        $stmt->execute();
    }

    public function execute(string $sql, array $params = []): \PDOStatement
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    private static function pdoType(mixed $val): int
    {
        return match (true) {
            is_int($val)  => \PDO::PARAM_INT,
            is_bool($val) => \PDO::PARAM_BOOL,
            is_null($val) => \PDO::PARAM_NULL,
            default       => \PDO::PARAM_STR,
        };
    }
}
