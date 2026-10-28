<?php
/**
 * Content data access layer
 */

require_once __DIR__ . '/db.php';

function getSiteSettings(): ?array {
    $pdo = getDB();
    $stmt = $pdo->query("SELECT * FROM site_settings WHERE id = 'singleton'");
    return $stmt->fetch() ?: null;
}

function getAboutContent(): ?array {
    $pdo = getDB();
    $stmt = $pdo->query("SELECT * FROM about_content WHERE id = 'singleton'");
    return $stmt->fetch() ?: null;
}

function getPublishedContent(string $type): array {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT * FROM content_items WHERE type = ? AND published = 1 ORDER BY item_order ASC, created_at ASC");
    $stmt->execute([$type]);
    $items = $stmt->fetchAll();
    return array_map(function ($item) {
        $item['data'] = json_decode($item['data'] ?? '{}', true);
        return $item;
    }, $items);
}

function getAllContent(string $type): array {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT * FROM content_items WHERE type = ? ORDER BY item_order ASC, created_at ASC");
    $stmt->execute([$type]);
    $items = $stmt->fetchAll();
    return array_map(function ($item) {
        $item['data'] = json_decode($item['data'] ?? '{}', true);
        return $item;
    }, $items);
}

function getContentItem(string $type, string $slug, bool $includeUnpublished = false): ?array {
    $pdo = getDB();
    $sql = "SELECT * FROM content_items WHERE type = ? AND slug = ?";
    if (!$includeUnpublished) {
        $sql .= " AND published = 1";
    }
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$type, $slug]);
    $item = $stmt->fetch();
    if ($item) {
        $item['data'] = json_decode($item['data'] ?? '{}', true);
    }
    return $item ?: null;
}

// Typed convenience wrappers
function getServices(): array { return getPublishedContent('service'); }
function getIndustries(): array { return getPublishedContent('industry'); }
function getCoreValues(): array { return getPublishedContent('core_value'); }
function getWhyChoose(): array { return getPublishedContent('why_choose'); }
function getApproachSteps(): array { return getPublishedContent('approach_step'); }
function getTeamMembers(): array { return getPublishedContent('team_member'); }
