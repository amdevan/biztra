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

// admin forms post flat fields, this tucks them into the right columns + data json
function normalizeContentPayload(array $body): array {
    // Icon: accept icon, icon_name, or iconName
    $icon = $body['icon'] ?? $body['icon_name'] ?? $body['iconName'] ?? null;
    unset($body['icon'], $body['icon_name'], $body['iconName']);

    // Order: accept order or item_order
    $order = $body['order'] ?? $body['item_order'] ?? null;
    unset($body['order'], $body['item_order']);

    // Move type-specific flat fields into data{}
    $data = $body['data'] ?? [];
    if (!is_array($data)) {
        $data = [];
    }

    // Map admin form field names -> canonical data keys used by the site
    $dataKeyMap = [
        'short_description' => 'shortDescription',
        'full_description'  => 'fullDescription',
        'deliverables'      => 'deliverables',
        'services'          => 'services',
        'initials'          => 'initials',
        'role'              => 'role',
        'designation'       => 'designation',
        'expertise'         => 'expertise',
        'highlights'        => 'highlights',
        'step_number'       => 'number',
        'number'            => 'number',
    ];
    foreach ($dataKeyMap as $formKey => $dataKey) {
        if (array_key_exists($formKey, $body)) {
            $data[$dataKey] = $body[$formKey];
            unset($body[$formKey]);
        }
    }
    // Also map existing data{} keys that came in snake_case
    foreach ($dataKeyMap as $formKey => $dataKey) {
        if ($formKey !== $dataKey && array_key_exists($formKey, $data)) {
            $data[$dataKey] = $data[$formKey];
            unset($data[$formKey]);
        }
    }

    // Normalize deliverables / expertise (textarea: one per line -> array)
    foreach (['deliverables', 'expertise'] as $listKey) {
        if (isset($data[$listKey]) && is_string($data[$listKey])) {
            $data[$listKey] = array_values(array_filter(array_map('trim', explode("\n", $data[$listKey])), function ($v) {
                return $v !== '';
            }));
        }
    }

    // Normalize highlights (textarea "Label: Value" lines -> array of objects)
    if (isset($data['highlights']) && is_string($data['highlights'])) {
        $data['highlights'] = array_values(array_filter(array_map(function ($line) {
            $line = trim($line);
            if ($line === '') return null;
            $idx = strpos($line, ':');
            if ($idx !== false && $idx > 0) {
                return ['label' => trim(substr($line, 0, $idx)), 'value' => trim(substr($line, $idx + 1))];
            }
            return ['label' => $line, 'value' => ''];
        }, explode("\n", $data['highlights'])), function ($v) {
            return $v !== null;
        }));
    }

    // Normalize services (comma-separated -> array)
    if (isset($data['services']) && is_string($data['services'])) {
        $data['services'] = array_values(array_filter(array_map('trim', explode(',', $data['services'])), function ($v) {
            return $v !== '';
        }));
    }

    // approach_step: accept "step_number" alias (already mapped to number above)
    if (!isset($data['number']) && isset($body['step_number'])) {
        $data['number'] = $body['step_number'];
    }
    unset($body['step_number'], $body['number']);

    if ($icon !== null) {
        $body['icon_name'] = $icon;
    }
    if ($order !== null) {
        $body['item_order'] = (int) $order;
    }
    if (!empty($data)) {
        $body['data'] = $data;
    }

    return $body;
}
