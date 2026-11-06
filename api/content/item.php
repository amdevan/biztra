<?php
/**
 * GET    /api/content/item?type=service&slug=tax-compliance    — fetch single item
 * PUT    /api/content/item?type=service&slug=tax-compliance    — update item (admin)
 * DELETE /api/content/item?type=service&slug=tax-compliance    — delete item (admin)
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/content.php';
require_once __DIR__ . '/../../includes/helpers.php';
$VALID_TYPES = ['service', 'industry', 'core_value', 'why_choose', 'approach_step', 'team_member'];

$type = $_GET['type'] ?? '';
$slug = $_GET['slug'] ?? '';

if (!$type || !in_array($type, $VALID_TYPES)) {
    json_response(['error' => 'Invalid content type'], 400);
}
if (!$slug) {
    json_response(['error' => 'Missing slug parameter'], 400);
}

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDB();

if ($method === 'GET') {
    $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';

    $item = getContentItem($type, $slug, $admin);
    if (!$item) {
        json_response(['error' => 'Item not found'], 404);
    }

    json_response(['item' => $item]);
}

if ($method === 'PUT') {
    requireAuth();

    // Fetch existing item
    $existing = getContentItem($type, $slug, true);
    if (!$existing) {
        json_response(['error' => 'Item not found'], 404);
    }

    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        json_response(['error' => 'Invalid JSON body'], 400);
    }

    // Normalize flat admin payload (icon, order, short_description, ...)
    $body = normalizeContentPayload($body);

    // If slug is being changed, check uniqueness within type
    if (!empty($body['slug']) && $body['slug'] !== $slug) {
        $checkStmt = $pdo->prepare("SELECT id FROM content_items WHERE type = ? AND slug = ?");
        $checkStmt->execute([$type, $body['slug']]);
        if ($checkStmt->fetch()) {
            json_response(['error' => 'An item with this slug already exists'], 409);
        }
    }

    // Build dynamic UPDATE
    $setClauses = [];
    $values = [];

    $fieldMap = [
        'title'       => 'title',
        'slug'        => 'slug',
        'subtitle'    => 'subtitle',
        'description' => 'description',
        'iconName'    => 'icon_name',
        'icon_name'   => 'icon_name',
        'item_order'  => 'item_order',
        'order'       => 'item_order',
        'published'   => 'published',
        'featured'    => 'featured',
    ];

    foreach ($fieldMap as $bodyKey => $dbCol) {
        if (array_key_exists($bodyKey, $body)) {
            $setClauses[] = '`' . $dbCol . '` = ?';
            if ($bodyKey === 'published' || $bodyKey === 'featured' || $bodyKey === 'order' || $bodyKey === 'item_order') {
                $values[] = (int) $body[$bodyKey];
            } else {
                $values[] = $body[$bodyKey];
            }
        }
    }

    if (array_key_exists('data', $body)) {
        $setClauses[] = '`data` = ?';
        $values[] = is_string($body['data']) ? $body['data'] : json_encode($body['data']);
    }

    if (!empty($setClauses)) {
        $setClauses[] = '`updated_at` = NOW()';
        $sql = "UPDATE content_items SET " . implode(', ', $setClauses) . " WHERE type = ? AND slug = ?";
        $values[] = $type;
        $values[] = $slug;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
    }

    $newSlug = $body['slug'] ?? $slug;
    $item = getContentItem($type, $newSlug, true);
    json_response(['item' => $item]);
}

if ($method === 'DELETE') {
    requireAuth();

    $existing = getContentItem($type, $slug, true);
    if (!$existing) {
        json_response(['error' => 'Item not found'], 404);
    }

    $stmt = $pdo->prepare("DELETE FROM content_items WHERE type = ? AND slug = ?");
    $stmt->execute([$type, $slug]);

    json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
