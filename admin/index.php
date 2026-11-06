<?php
// dashboard
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';
require_once __DIR__ . '/layout.php';

$currentPath = getCurrentPath();
if ($currentPath !== '/admin/login' && !isLoggedIn()) {
    header('Location: /admin/login');
    exit;
}

// Fetch stats from DB directly
$pdo = getDB();

$types = ['service', 'industry', 'core_value', 'why_choose', 'approach_step', 'team_member'];
$stats = [];
foreach ($types as $type) {
    $stmt = $pdo->prepare("SELECT COUNT(*) as total, SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) as published FROM content_items WHERE type = ?");
    $stmt->execute([$type]);
    $row = $stmt->fetch();
    $stats[$type] = [
        'total' => (int)($row['total'] ?? 0),
        'published' => (int)($row['published'] ?? 0),
    ];
}

$stmt = $pdo->query("SELECT COUNT(*) as total, SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) as published, SUM(CASE WHEN published = 0 THEN 1 ELSE 0 END) as drafts, SUM(CASE WHEN featured = 1 THEN 1 ELSE 0 END) as featured FROM articles");
$articleStats = $stmt->fetch();
$articleStats = [
    'total' => (int)($articleStats['total'] ?? 0),
    'published' => (int)($articleStats['published'] ?? 0),
    'drafts' => (int)($articleStats['drafts'] ?? 0),
    'featured' => (int)($articleStats['featured'] ?? 0),
];

$totalContent = array_sum(array_column($stats, 'total'));

$sections = [
    ['label' => 'Site Settings', 'href' => '/admin/settings', 'icon' => 'Settings', 'description' => 'Brand, hero, contact info, footer', 'total' => 1, 'published' => 1, 'unit' => 'configuration'],
    ['label' => 'About Page', 'href' => '/admin/about', 'icon' => 'FileText', 'description' => 'Story, vision, mission, section headings', 'total' => 1, 'published' => 1, 'unit' => 'configuration'],
    ['label' => 'Services', 'href' => '/admin/services', 'icon' => 'Briefcase', 'description' => 'Advisory services offered', 'total' => $stats['service']['total'], 'published' => $stats['service']['published'], 'unit' => 'services'],
    ['label' => 'Industries', 'href' => '/admin/industries', 'icon' => 'Factory', 'description' => 'Industry sectors served', 'total' => $stats['industry']['total'], 'published' => $stats['industry']['published'], 'unit' => 'industries'],
    ['label' => 'Core Values', 'href' => '/admin/core-values', 'icon' => 'Scale', 'description' => 'Six principles behind the practice', 'total' => $stats['core_value']['total'], 'published' => $stats['core_value']['published'], 'unit' => 'values'],
    ['label' => 'Why Choose Us', 'href' => '/admin/why-choose', 'icon' => 'Target', 'description' => 'Six differentiators', 'total' => $stats['why_choose']['total'], 'published' => $stats['why_choose']['published'], 'unit' => 'items'],
    ['label' => 'Approach Steps', 'href' => '/admin/approach-steps', 'icon' => 'ListOrdered', 'description' => 'Four-step engagement methodology', 'total' => $stats['approach_step']['total'], 'published' => $stats['approach_step']['published'], 'unit' => 'steps'],
    ['label' => 'Team Members', 'href' => '/admin/team', 'icon' => 'Users', 'description' => 'Leadership profiles', 'total' => $stats['team_member']['total'], 'published' => $stats['team_member']['published'], 'unit' => 'members'],
    ['label' => 'Research Articles', 'href' => '/admin/articles', 'icon' => 'BookOpen', 'description' => 'Published research & insights', 'total' => $articleStats['total'], 'published' => $articleStats['published'], 'unit' => 'articles'],
];

ob_start();
?>

<!-- Welcome header -->
<div class="mb-8">
    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        <span class="h-px w-6 bg-gold"></span>
        Dashboard
    </span>
    <h1 class="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
        Welcome back, Admin
    </h1>
    <p class="mt-2 text-sm text-gray-500">
        Manage all content across the Biztra Business Advisory website from this dashboard.
    </p>
</div>

<!-- Quick stats -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Total Content Items</div>
            <span class="text-gold"><?= getIcon('TrendingUp', 'h-4 w-4') ?></span>
        </div>
        <div class="mt-2 font-serif text-3xl font-semibold text-navy-deep"><?= $totalContent ?></div>
    </div>
    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Published Articles</div>
            <span class="text-gold"><?= getIcon('Eye', 'h-4 w-4') ?></span>
        </div>
        <div class="mt-2 font-serif text-3xl font-semibold text-navy-deep"><?= $articleStats['published'] ?></div>
    </div>
    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Draft Articles</div>
            <span class="text-gold"><?= getIcon('EyeOff', 'h-4 w-4') ?></span>
        </div>
        <div class="mt-2 font-serif text-3xl font-semibold text-navy-deep"><?= $articleStats['drafts'] ?></div>
    </div>
    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Featured Articles</div>
            <span class="text-gold"><?= getIcon('Target', 'h-4 w-4') ?></span>
        </div>
        <div class="mt-2 font-serif text-3xl font-semibold text-navy-deep"><?= $articleStats['featured'] ?></div>
    </div>
</div>

<!-- Content sections -->
<div class="mb-6">
    <h2 class="font-serif text-xl font-semibold text-navy-deep">Content Sections</h2>
    <p class="mt-1 text-sm text-gray-500">Click any section below to manage its content.</p>
</div>

<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <?php foreach ($sections as $section): ?>
    <a href="<?= e($section['href']) ?>" class="group block h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-navy-deep/20 transition-all">
        <div class="flex items-start justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
                <?= getIcon($section['icon'], 'h-5 w-5') ?>
            </div>
            <span class="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <?= getIcon('ArrowRight', 'h-4 w-4') ?>
            </span>
        </div>
        <h3 class="mt-5 font-serif text-lg font-semibold text-navy-deep"><?= e($section['label']) ?></h3>
        <p class="mt-1.5 text-[12px] text-gray-500 leading-relaxed"><?= e($section['description']) ?></p>
        <div class="mt-4 flex items-center gap-2 text-[11px]">
            <span class="font-semibold text-navy-deep"><?= $section['total'] ?></span>
            <span class="text-gray-500"><?= e($section['unit']) ?></span>
            <?php if ($section['total'] !== $section['published'] && $section['total'] > 0): ?>
                <span class="h-1 w-1 rounded-full bg-gray-400/40"></span>
                <span class="text-amber-600 font-medium"><?= $section['total'] - $section['published'] ?> unpublished</span>
            <?php elseif ($section['total'] > 0): ?>
                <span class="h-1 w-1 rounded-full bg-gray-400/40"></span>
                <span class="text-emerald-600 font-medium">All published</span>
            <?php endif; ?>
        </div>
    </a>
    <?php endforeach; ?>
</div>

<!-- Footer note -->
<div class="mt-10 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
    <p>
        <span class="font-semibold text-navy-deep">Need help?</span> All changes
        made in this dashboard are reflected immediately on the live website. Use the
        &ldquo;View Live Site&rdquo; link in the sidebar to verify your changes.
    </p>
</div>

<?php
$content = ob_get_clean();
adminLayout('Dashboard', '/admin', $content);
?>
