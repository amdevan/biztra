<?php
/**
 * GET  /api/articles                          — list articles
 * POST /api/articles                          — create article (admin)
 * GET  /api/articles?slug=xxx                 — fetch single article
 * PUT  /api/articles?slug=xxx                 — update article (admin)
 * DELETE /api/articles?slug=xxx               — delete article (admin)
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';

$slug = $_GET['slug'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDB();

// ─── Slug-specific routes ────────────────────────────────────────
if ($slug) {
    if ($method === 'GET') {
        $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';

        $article = $admin ? getArticleBySlugAdmin($slug) : getArticleBySlug($slug);
        if (!$article) {
            json_response(['error' => 'Article not found'], 404);
        }

        json_response(['article' => $article]);
    }

    if ($method === 'PUT') {
        requireAuth();

        $existing = getArticleBySlugAdmin($slug);
        if (!$existing) {
            json_response(['error' => 'Article not found'], 404);
        }

        $body = json_decode(file_get_contents('php://input'), true);
        if (!$body) {
            json_response(['error' => 'Invalid JSON body'], 400);
        }

        // If slug is being changed, check uniqueness
        if (!empty($body['slug']) && $body['slug'] !== $slug) {
            $checkStmt = $pdo->prepare("SELECT id FROM articles WHERE slug = ?");
            $checkStmt->execute([$body['slug']]);
            if ($checkStmt->fetch()) {
                json_response(['error' => 'An article with this slug already exists'], 409);
            }
        }

        // Auto-set published_at when transitioning from unpublished to published
        $wasUnpublished = empty($existing['published']) || $existing['published'] == 0;
        $isNowPublished = !empty($body['published']) && $body['published'];
        $shouldSetPublishedAt = $wasUnpublished && $isNowPublished && empty($existing['published_at']);

        // Build dynamic UPDATE
        $setClauses = [];
        $values = [];

        $fieldMap = [
            'title'     => 'title',
            'slug'      => 'slug',
            'excerpt'   => 'excerpt',
            'content'   => 'content',
            'category'  => 'category',
            'author'    => 'author',
            'readTime'  => 'read_time',
            'published' => 'published',
            'featured'  => 'featured',
        ];

        foreach ($fieldMap as $bodyKey => $dbCol) {
            if (array_key_exists($bodyKey, $body)) {
                $setClauses[] = '`' . $dbCol . '` = ?';
                if ($bodyKey === 'published' || $bodyKey === 'featured') {
                    $values[] = $body[$bodyKey] ? 1 : 0;
                } else {
                    $values[] = $body[$bodyKey];
                }
            }
        }

        if ($shouldSetPublishedAt) {
            $setClauses[] = '`published_at` = NOW()';
        }

        if (!empty($setClauses)) {
            $setClauses[] = '`updated_at` = NOW()';
            $sql = "UPDATE articles SET " . implode(', ', $setClauses) . " WHERE slug = ?";
            $values[] = $slug;
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
        }

        $newSlug = $body['slug'] ?? $slug;
        $article = getArticleBySlugAdmin($newSlug);
        json_response(['article' => $article]);
    }

    if ($method === 'DELETE') {
        requireAuth();

        $existing = getArticleBySlugAdmin($slug);
        if (!$existing) {
            json_response(['error' => 'Article not found'], 404);
        }

        $stmt = $pdo->prepare("DELETE FROM articles WHERE slug = ?");
        $stmt->execute([$slug]);

        json_response(['success' => true]);
    }

    json_response(['error' => 'Method not allowed'], 405);
}

// ─── List / Create routes ────────────────────────────────────────
if ($method === 'GET') {
    $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';
    $category = $_GET['category'] ?? null;
    $publishedParam = $_GET['published'] ?? null;
    $limitParam = $_GET['limit'] ?? null;

    $whereClauses = [];
    $values = [];

    if ($admin) {
        if ($publishedParam === 'true') {
            $whereClauses[] = 'published = 1';
        } elseif ($publishedParam === 'false') {
            $whereClauses[] = 'published = 0';
        }
    } else {
        $whereClauses[] = 'published = 1';
    }

    if ($category && $category !== 'All') {
        $whereClauses[] = 'category = ?';
        $values[] = $category;
    }

    $sql = "SELECT id, slug, title, excerpt, category, author, read_time, published, featured, published_at, created_at, updated_at FROM articles";
    if (!empty($whereClauses)) {
        $sql .= " WHERE " . implode(' AND ', $whereClauses);
    }
    $sql .= " ORDER BY published_at DESC, created_at DESC";

    if ($limitParam) {
        $limit = (int) $limitParam;
        if ($limit > 0) {
            $sql .= " LIMIT " . $limit;
        }
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($values);
    $articles = $stmt->fetchAll();

    json_response(['articles' => $articles]);
}

if ($method === 'POST') {
    requireAuth();

    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        json_response(['error' => 'Invalid JSON body'], 400);
    }

    if (empty($body['title']) || empty($body['slug']) || empty($body['excerpt']) || empty($body['content']) || empty($body['category'])) {
        json_response(['error' => 'Missing required fields: title, slug, excerpt, content, category'], 400);
    }

    // Check slug uniqueness
    $checkStmt = $pdo->prepare("SELECT id FROM articles WHERE slug = ?");
    $checkStmt->execute([$body['slug']]);
    if ($checkStmt->fetch()) {
        json_response(['error' => 'An article with this slug already exists'], 409);
    }

    $isPublished = !empty($body['published']);
    $publishedAt = $isPublished ? date('Y-m-d H:i:s') : null;

    $insertSql = "INSERT INTO articles (slug, title, excerpt, content, category, author, read_time, published, featured, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
    $insertStmt = $pdo->prepare($insertSql);
    $insertStmt->execute([
        $body['slug'],
        $body['title'],
        $body['excerpt'],
        $body['content'],
        $body['category'],
        $body['author'] ?? 'Biztra Business Advisory',
        $body['readTime'] ?? '5 min read',
        $isPublished ? 1 : 0,
        !empty($body['featured']) ? 1 : 0,
        $publishedAt,
    ]);

    // Fetch the created article
    $getStmt = $pdo->prepare("SELECT * FROM articles WHERE slug = ?");
    $getStmt->execute([$body['slug']]);
    $article = $getStmt->fetch();

    json_response(['article' => $article], 201);
}

json_response(['error' => 'Method not allowed'], 405);
