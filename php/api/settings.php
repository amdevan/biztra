<?php
/**
 * GET  /api/settings — fetch site settings
 * PUT  /api/settings — update site settings (admin)
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/helpers.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $settings = getSiteSettings();
    if (!$settings) {
        json_response(['error' => 'Settings not found'], 404);
    }
    json_response(['settings' => $settings]);
}

if ($method === 'PUT') {
    requireAuth();

    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        json_response(['error' => 'Invalid JSON body'], 400);
    }

    $allowedFields = [
        'brand_name', 'brand_tagline',
        'hero_eyebrow', 'hero_headline', 'hero_subtitle',
        'hero_primary_cta', 'hero_secondary_cta',
        'hero_stat1_value', 'hero_stat1_label',
        'hero_stat2_value', 'hero_stat2_label',
        'hero_stat3_value', 'hero_stat3_label',
        'hero_stat4_value', 'hero_stat4_label',
        'footer_tagline', 'footer_description',
        'contact_phone', 'contact_email',
        'contact_address', 'contact_address_detail',
        'contact_hours', 'contact_hours_detail',
        'contact_response_time',
        'maps_url', 'linkedin_url', 'facebook_url', 'instagram_url',
    ];

    $updateData = [];
    foreach ($allowedFields as $field) {
        if (array_key_exists($field, $body)) {
            $updateData[$field] = $body[$field];
        }
    }

    if (empty($updateData)) {
        json_response(['error' => 'No valid fields to update'], 400);
    }

    $pdo = getDB();
    $existing = getSiteSettings();

    if ($existing) {
        $setClauses = [];
        $values = [];
        foreach ($updateData as $field => $value) {
            $setClauses[] = '`' . $field . '` = ?';
            $values[] = $value;
        }
        $setClauses[] = '`updated_at` = NOW()';
        $sql = "UPDATE site_settings SET " . implode(', ', $setClauses) . " WHERE id = 'singleton'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
    } else {
        $updateData['id'] = 'singleton';
        $columns = array_keys($updateData);
        $placeholders = array_fill(0, count($columns), '?');
        $quotedColumns = array_map(function ($c) {
            return '`' . $c . '`';
        }, $columns);
        $sql = "INSERT INTO site_settings (" . implode(', ', $quotedColumns) . ") VALUES (" . implode(', ', $placeholders) . ")";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_values($updateData));
    }

    $settings = getSiteSettings();
    json_response(['settings' => $settings]);
}

json_response(['error' => 'Method not allowed'], 405);
