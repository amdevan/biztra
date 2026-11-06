<?php
// db connection, reused everywhere
// note: host must be 127.0.0.1 not localhost — mac/windows php uses a socket for localhost and fails

require_once __DIR__ . '/../config/database.php';

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $config = require __DIR__ . '/../config/database.php';
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";
        $pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}
