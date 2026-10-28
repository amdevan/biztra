<?php
/**
 * Articles data access layer
 */

require_once __DIR__ . '/db.php';

function getArticleBySlug(string $slug): ?array {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT * FROM articles WHERE slug = ? AND published = 1");
    $stmt->execute([$slug]);
    return $stmt->fetch() ?: null;
}

function getArticleBySlugAdmin(string $slug): ?array {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT * FROM articles WHERE slug = ?");
    $stmt->execute([$slug]);
    return $stmt->fetch() ?: null;
}

function getPublishedArticles(int $limit = 0): array {
    $pdo = getDB();
    $sql = "SELECT id, slug, title, excerpt, category, author, read_time, published, featured, published_at, created_at, updated_at FROM articles WHERE published = 1 ORDER BY published_at DESC, created_at DESC";
    if ($limit > 0) {
        $sql .= " LIMIT " . (int)$limit;
    }
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function getAllArticles(): array {
    $pdo = getDB();
    $stmt = $pdo->query("SELECT id, slug, title, excerpt, category, author, read_time, published, featured, published_at, created_at, updated_at FROM articles ORDER BY published_at DESC, created_at DESC");
    return $stmt->fetchAll();
}

function getPublishedArticlesByCategory(string $category): array {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT id, slug, title, excerpt, category, author, read_time, published, featured, published_at, created_at, updated_at FROM articles WHERE published = 1 AND category = ? ORDER BY published_at DESC");
    $stmt->execute([$category]);
    return $stmt->fetchAll();
}

function getPublishedCategories(): array {
    $pdo = getDB();
    $stmt = $pdo->query("SELECT DISTINCT category FROM articles WHERE published = 1 ORDER BY category ASC");
    return array_column($stmt->fetchAll(), 'category');
}

function getRelatedArticles(string $currentSlug, string $category, int $limit = 3): array {
    $pdo = getDB();
    // First try same category
    $stmt = $pdo->prepare("SELECT id, slug, title, excerpt, category, author, read_time, published_at FROM articles WHERE published = 1 AND slug != ? AND category = ? ORDER BY published_at DESC LIMIT ?");
    $stmt->execute([$currentSlug, $category, $limit]);
    $articles = $stmt->fetchAll();

    // Fill remaining with other categories
    if (count($articles) < $limit) {
        $existingSlugs = array_column($articles, 'slug');
        $placeholders = str_repeat('?,', count($existingSlugs)) . '?';
        $remaining = $limit - count($articles);
        $params = array_merge([$currentSlug], $existingSlugs, [$remaining]);
        $stmt = $pdo->prepare("SELECT id, slug, title, excerpt, category, author, read_time, published_at FROM articles WHERE published = 1 AND slug != ? AND slug NOT IN ($placeholders) ORDER BY published_at DESC LIMIT ?");
        $stmt->execute($params);
        $articles = array_merge($articles, $stmt->fetchAll());
    }

    return $articles;
}
