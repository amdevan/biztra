<?php
/**
 * GET  /api/about — fetch about content
 * PUT  /api/about — update about content (admin)
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/helpers.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $about = getAboutContent();
    if (!$about) {
        json_response(['error' => 'About content not found'], 404);
    }
    json_response(['about' => $about]);
}

if ($method === 'PUT') {
    requireAuth();

    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        json_response(['error' => 'Invalid JSON body'], 400);
    }

    $allowedFields = [
        'story_eyebrow', 'story_heading',
        'story_paragraph1', 'story_paragraph2',
        'story_paragraph3', 'story_paragraph4',
        'story_quote',
        'vision_eyebrow', 'vision_text', 'vision_context',
        'mission_eyebrow', 'mission_heading', 'mission_text',
        'core_values_eyebrow', 'core_values_heading', 'core_values_subtitle',
        'why_choose_eyebrow', 'why_choose_heading', 'why_choose_subtitle',
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
    $existing = getAboutContent();

    if ($existing) {
        $setClauses = [];
        $values = [];
        foreach ($updateData as $field => $value) {
            $setClauses[] = '`' . $field . '` = ?';
            $values[] = $value;
        }
        $setClauses[] = '`updated_at` = NOW()';
        $sql = "UPDATE about_content SET " . implode(', ', $setClauses) . " WHERE id = 'singleton'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
    } else {
        $updateData['id'] = 'singleton';
        $columns = array_keys($updateData);
        $placeholders = array_fill(0, count($columns), '?');
        $quotedColumns = array_map(function ($c) {
            return '`' . $c . '`';
        }, $columns);
        $sql = "INSERT INTO about_content (" . implode(', ', $quotedColumns) . ") VALUES (" . implode(', ', $placeholders) . ")";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_values($updateData));
    }

    $about = getAboutContent();
    json_response(['about' => $about]);
}

json_response(['error' => 'Method not allowed'], 405);
