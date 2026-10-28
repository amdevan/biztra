<?php
/**
 * GET  /api/content?type=service         — list published items of a type
 * GET  /api/content?type=service&admin=1 — list all items (including drafts)
 * POST /api/content?type=service         — create new content item (admin)
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/content.php';
require_once __DIR__ . '/../../includes/helpers.php';

$VALID_TYPES = ['service', 'industry', 'core_value', 'why_choose', 'approach_step', 'team_member'];

$type = $_GET['type'] ?? '';
if (!$type || !in_array($type, $VALID_TYPES)) {
    json_response(['error' => 'Invalid content type'], 400);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';

    if ($admin) {
        $items = getAllContent($type);
    } else {
        $items = getPublishedContent($type);
    }

    json_response(['items' => $items]);
}

if ($method === 'POST') {
    requireAuth();

    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        json_response(['error' => 'Invalid JSON body'], 400);
    }

    // Normalize flat admin payload (icon, order, short_description, ...) 
    $body = normalizeContentPayload($body);

    if (empty($body['title']) || empty($body['slug'])) {
        json_response(['error' => 'Missing required fields: title, slug'], 400);
    }

    $pdo = getDB();

    // Check slug uniqueness within type
    $checkStmt = $pdo->prepare("SELECT id FROM content_items WHERE type = ? AND slug = ?");
    $checkStmt->execute([$type, $body['slug']]);
    if ($checkStmt->fetch()) {
        json_response(['error' => 'An item with this slug already exists in this type'], 409);
    }

    // Determine next order if not provided
    $order = $body['order'] ?? $body['item_order'] ?? null;
    if ($order === null) {
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM content_items WHERE type = ?");
        $countStmt->execute([$type]);
        $order = (int) $countStmt->fetchColumn();
    }
    $order = (int) $order;

    $itemData = $body['data'] ?? [];

    $insertSql = "INSERT INTO content_items (type, slug, title, subtitle, description, icon_name, item_order, published, featured, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
    $insertStmt = $pdo->prepare($insertSql);
    $insertStmt->execute([
        $type,
        $body['slug'],
        $body['title'],
        $body['subtitle'] ?? null,
        $body['description'] ?? null,
        $body['iconName'] ?? $body['icon_name'] ?? 'Briefcase',
        $order,
        isset($body['published']) ? ($body['published'] ? 1 : 0) : 1,
        !empty($body['featured']) ? 1 : 0,
        json_encode($itemData),
    ]);

    // Fetch the created item
    $getStmt = $pdo->prepare("SELECT * FROM content_items WHERE type = ? AND slug = ?");
    $getStmt->execute([$type, $body['slug']]);
    $item = $getStmt->fetch();
    if ($item) {
        $item['data'] = json_decode($item['data'] ?? '{}', true);
    }

    json_response(['item' => $item], 201);
}

json_response(['error' => 'Method not allowed'], 405);
