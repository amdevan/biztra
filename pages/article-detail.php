<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';
require_once __DIR__ . '/../includes/markdown.php';

$slug = $_GET['slug'] ?? '';
$article = $slug ? getArticleBySlug($slug) : null;

if (!$article) {
    http_response_code(404);
    echo 'Not found';
    exit;
}

// Get related articles
$relatedArticles = getRelatedArticles($article['slug'], $article['category'], 3);

$htmlContent = renderMarkdown($article['content'] ?? '');
$formattedDate = formatDate($article['published_at'] ?? $article['created_at']);

$pageTitle = e($article['title']) . ' - Biztra Business Advisory';
$pageDescription = $article['excerpt'] ?? '';
include __DIR__ . '/../includes/header.php';
?>

<!-- Page Hero -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
    <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-15%] right-[-10%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[120px]" style="background: radial-gradient(circle, rgba(76,133,92,0.5) 0%, transparent 70%);"></div>
        <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;"></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" class="mb-8">
            <ol class="flex items-center gap-1.5 text-[12px] font-medium text-white/55">
                <li class="flex items-center gap-1.5"><a href="/" class="transition-colors hover:text-gold">Home</a></li>
                <li class="flex items-center gap-1.5"><svg class="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></li>
                <li class="flex items-center gap-1.5"><a href="/research" class="transition-colors hover:text-gold">Research</a></li>
                <li class="flex items-center gap-1.5"><svg class="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></li>
                <li class="text-white"><?= e($article['category']) ?></li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                <?= e($article['category']) ?>
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                <?= e($article['title']) ?>
            </h1>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Article Body -->
<article class="relative bg-white py-16 lg:py-20">
    <div class="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <!-- Meta row -->
        <div class="flex flex-wrap items-center gap-4 text-[12px] text-charcoal/70 border-b border-border pb-6 mb-8">
            <div class="flex items-center gap-2">
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep text-white text-[10px] font-semibold">
                    <?php
                    $authorInitials = '';
                    $authorWords = explode(' ', $article['author'] ?? '');
                    foreach (array_slice($authorWords, 0, 2) as $w) {
                        $authorInitials .= mb_strtoupper(mb_substr($w, 0, 1));
                    }
                    echo e($authorInitials);
                    ?>
                </span>
                <span class="font-medium text-navy-deep"><?= e($article['author'] ?? '') ?></span>
            </div>
            <?php if ($formattedDate): ?>
            <div class="flex items-center gap-1.5">
                <?= getIcon('Clock', 'h-3.5 w-3.5') ?>
                <span><?= e($formattedDate) ?></span>
            </div>
            <?php endif; ?>
            <div class="flex items-center gap-1.5">
                <?= getIcon('Clock', 'h-3.5 w-3.5') ?>
                <span><?= e($article['read_time'] ?? '') ?></span>
            </div>
        </div>

        <!-- Excerpt as lead -->
        <?php if (!empty($article['excerpt'])): ?>
        <p class="font-serif text-xl sm:text-2xl leading-relaxed text-navy-deep text-pretty mb-10">
            <?= e($article['excerpt']) ?>
        </p>
        <?php endif; ?>

        <!-- Rendered Markdown content -->
        <div class="prose-content text-base leading-relaxed text-charcoal/70 space-y-4" id="article-content">
            <?= $htmlContent ?>
        </div>

        <!-- Back to research -->
        <div class="mt-12 pt-8 border-t border-border">
            <a href="/research" class="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors">
                <?= getIcon('ArrowRight', 'h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5') ?>
                Back to Research
            </a>
        </div>
    </div>
</article>

<!-- Recommended Articles -->
<?php if (!empty($relatedArticles)): ?>
<section class="relative py-16 lg:py-20 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-10 max-w-5xl">
            <div>
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Continue Reading
                </span>
                <h2 class="mt-3 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] font-medium text-navy-deep">
                    More Research &amp; Insights
                </h2>
            </div>
            <a href="/research" class="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap">
                View All Research
                <?= getIcon('ArrowRight', 'h-4 w-4') ?>
            </a>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($relatedArticles as $r): ?>
            <a href="/research/<?= e($r['slug']) ?>" class="group block h-full rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div class="relative h-32 overflow-hidden bg-navy-gradient noise-overlay">
                    <svg viewBox="0 0 400 200" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="rec-<?= e($r['slug']) ?>" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stop-color="#4c855c" stop-opacity="0.7" />
                                <stop offset="100%" stop-color="#093d6b" stop-opacity="0.2" />
                            </linearGradient>
                        </defs>
                        <g opacity="0.85">
                            <rect x="40" y="96" width="20" height="48" fill="url(#rec-<?= e($r['slug']) ?>)" rx="2" />
                            <rect x="72" y="68" width="20" height="76" fill="url(#rec-<?= e($r['slug']) ?>)" rx="2" />
                            <rect x="104" y="80" width="20" height="64" fill="url(#rec-<?= e($r['slug']) ?>)" rx="2" />
                            <rect x="136" y="56" width="20" height="88" fill="url(#rec-<?= e($r['slug']) ?>)" rx="2" />
                            <rect x="168" y="68" width="20" height="76" fill="url(#rec-<?= e($r['slug']) ?>)" rx="2" />
                            <rect x="200" y="48" width="20" height="96" fill="url(#rec-<?= e($r['slug']) ?>)" rx="2" />
                        </g>
                    </svg>
                </div>
                <div class="p-5">
                    <span class="inline-flex items-center rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-deep">
                        <?= e($r['category']) ?>
                    </span>
                    <h3 class="mt-3 font-serif text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors">
                        <?= e($r['title']) ?>
                    </h3>
                    <p class="mt-2 text-[12px] text-charcoal/70"><?= e($r['excerpt']) ?></p>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php include __DIR__ . '/../includes/footer.php'; ?>
