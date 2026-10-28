<?php
/**
 * Helper / utility functions
 */

function e(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function slugify(string $text): string {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9-]/', '-', $text);
    $text = preg_replace('/-+/', '-', $text);
    return trim($text, '-');
}

function formatDate(?string $dateStr): string {
    if (!$dateStr) return '';
    $dt = new DateTime($dateStr);
    return $dt->format('M d, Y');
}

function getBaseUrl(): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return $scheme . '://' . $host;
}

function getCurrentPath(): string {
    return parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
}

function isActive(string $path): bool {
    $current = rtrim(getCurrentPath(), '/');
    $target = rtrim($path, '/');
    return $current === $target || str_starts_with($current, $target . '/');
}

function setActiveClass(string $path): string {
    return isActive($path) ? 'text-gold font-semibold' : '';
}
