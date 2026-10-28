<?php
/**
 * Cookie-based session authentication
 */

require_once __DIR__ . '/db.php';

define('SESSION_COOKIE', 'biztra_admin_session');
define('SESSION_MAX_AGE', 604800); // 7 days

function validateCredentials(string $email, string $password): ?array {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(TRIM(?)) AND role = 'ADMIN'");
    $stmt->execute([trim($email)]);
    $user = $stmt->fetch();

    if ($user && $user['password'] === $password) {
        return ['email' => $user['email'], 'name' => $user['name']];
    }
    return null;
}

function generateSessionToken(string $email): string {
    $payload = [
        'email'   => $email,
        'issued'  => time() * 1000,
        'expires' => (time() + SESSION_MAX_AGE) * 1000,
    ];
    return base64_encode(json_encode($payload));
}

function setSessionCookie(string $token): void {
    setcookie(SESSION_COOKIE, $token, [
        'expires'  => time() + SESSION_MAX_AGE,
        'path'     => '/',
        'secure'   => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
        'httponly'  => true,
        'samesite' => 'Lax',
    ]);
}

function clearSessionCookie(): void {
    setcookie(SESSION_COOKIE, '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'secure'   => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
        'httponly'  => true,
        'samesite' => 'Lax',
    ]);
}

function getSessionUser(): ?array {
    $token = $_COOKIE[SESSION_COOKIE] ?? null;
    if (!$token) return null;

    $decoded = base64_decode($token, true);
    if ($decoded === false) return null;

    $payload = json_decode($decoded, true);
    if (!$payload || !isset($payload['expires'])) return null;

    if (time() * 1000 >= $payload['expires']) return null;

    return ['email' => $payload['email']];
}

function isLoggedIn(): bool {
    return getSessionUser() !== null;
}

function requireAuth(): void {
    if (!isLoggedIn()) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['authenticated' => false]);
        exit;
    }
}
