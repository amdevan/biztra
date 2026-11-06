<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$settings = getSiteSettings();
$articles = getPublishedArticles();
$categories = getPublishedCategories();

$pageTitle = 'Research & Insights - Biztra Business Advisory';
$pageDescription = 'Practical perspectives on tax, accounting, governance, and strategy — researched and written for finance professionals and business owners across Nepal.';
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
                <li class="text-white">Research</li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Research &amp; Insights
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                Research and Insights for Better Business Decisions
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                Practical perspectives on tax, accounting, governance, and strategy — researched and written for finance professionals and business owners across Nepal.
            </p>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Articles with Client-Side Category Filtering -->
<section class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <!-- Category Filter Tabs -->
        <div class="mb-10">
            <div id="filter-tabs" class="flex flex-wrap gap-2">
                <button onclick="filterArticles('all')" data-category="all" class="filter-tab inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold transition-all bg-navy-deep text-white">
                    All Research
                </button>
                <?php foreach ($categories as $cat): ?>
                <button onclick="filterArticles('<?= e($cat) ?>')" data-category="<?= e($cat) ?>" class="filter-tab inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold transition-all border border-border bg-white text-charcoal/70 hover:border-navy-deep/20 hover:text-navy-deep">
                    <?= e($cat) ?>
                </button>
                <?php endforeach; ?>
            </div>
        </div>

        <?php if (empty($articles)): ?>
        <div class="rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Research articles are coming soon. Check back shortly, or <a href="/contact" class="text-navy-deep font-semibold hover:text-gold transition-colors">get in touch</a> with our team.</p>
        </div>
        <?php else: ?>
        <div id="articles-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($articles as $article): ?>
            <a href="/research/<?= e($article['slug']) ?>" data-category="<?= e($article['category']) ?>" class="article-card group relative h-full flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div class="relative h-44 overflow-hidden bg-navy-gradient noise-overlay">
                    <div class="absolute inset-0">
                        <svg viewBox="0 0 400 200" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <linearGradient id="grad-<?= e($article['slug']) ?>" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stop-color="#4c855c" stop-opacity="0.7" />
                                    <stop offset="100%" stop-color="#093d6b" stop-opacity="0.2" />
                                </linearGradient>
                            </defs>
                            <g opacity="0.85">
                                <rect x="40" y="96" width="20" height="48" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="72" y="68" width="20" height="76" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="104" y="80" width="20" height="64" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="136" y="56" width="20" height="88" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="168" y="68" width="20" height="76" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="200" y="48" width="20" height="96" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="232" y="56" width="20" height="88" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="264" y="32" width="20" height="112" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="296" y="40" width="20" height="104" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="328" y="20" width="20" height="124" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="360" y="48" width="20" height="96" fill="url(#grad-<?= e($article['slug']) ?>)" rx="2" />
                            </g>
                            <path d="M40 120 L60 105 L80 112 L100 90 L120 98 L140 75 L160 82 L180 65 L200 72 L220 50 L240 58 L260 35" stroke="#4c855c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="absolute top-4 left-4">
                        <span class="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep"><?= e($article['category']) ?></span>
                    </div>
                    <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy-deep shadow">
                            <?= getIcon('ArrowRight', 'h-4 w-4') ?>
                        </span>
                    </div>
                </div>
                <div class="flex flex-1 flex-col p-6">
                    <h3 class="font-serif text-lg font-semibold text-navy-deep leading-snug"><?= e($article['title']) ?></h3>
                    <p class="mt-3 flex-1 text-[13px] leading-relaxed text-charcoal/70"><?= e($article['excerpt']) ?></p>
                    <div class="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <span class="text-[11px] font-medium text-charcoal/70"><?= formatDate($article['published_at'] ?? $article['created_at']) ?></span>
                        <span class="text-[11px] text-charcoal/70"><?= e($article['read_time'] ?? '') ?></span>
                    </div>
                    <span class="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors">
                        Read More
                        <?= getIcon('ArrowRight', 'h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5') ?>
                    </span>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Newsletter Signup -->
<section class="relative py-20 lg:py-24 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-border bg-white p-8 lg:p-12 shadow-sm">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div class="lg:col-span-7">
                    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                        <span class="h-px w-6 bg-gold"></span>
                        Stay Informed
                    </span>
                    <h2 class="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                        Receive Research Updates From Biztra
                    </h2>
                    <p class="mt-5 text-pretty text-base leading-relaxed text-charcoal/70">
                        Practical perspectives on tax changes, accounting standards, governance practice, and strategic finance — delivered to your inbox as we publish them. No marketing noise, just the research that matters for finance professionals and business owners in Nepal.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <form class="flex flex-col sm:flex-row gap-3">
                        <input type="email" required placeholder="you@company.com.np" class="flex-1 rounded-full border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                        <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors whitespace-nowrap">
                            Subscribe
                            <?= getIcon('ArrowRight', 'h-4 w-4') ?>
                        </button>
                    </form>
                    <p class="mt-3 text-[11px] text-charcoal/70">We respect your inbox. Unsubscribe anytime.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
    <div class="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Have a Question?
            <span class="h-px w-6 bg-gold"></span>
        </span>
        <h2 class="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Need Advisory on a Specific Topic?
        </h2>
        <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Our research is grounded in real engagement. If you have a specific business challenge that requires tailored advisory, we would welcome the conversation.
        </p>
        <div class="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
            <a href="/services" class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10">
                View Our Services
                <?= getIcon('ArrowRight', 'h-4 w-4') ?>
            </a>
        </div>
    </div>
</section>

<!-- Category Filter JavaScript -->
<script>
function filterArticles(category) {
    const cards = document.querySelectorAll('.article-card');
    const tabs = document.querySelectorAll('.filter-tab');

    // Update tab styles
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.className = 'filter-tab inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold transition-all bg-navy-deep text-white';
        } else {
            tab.className = 'filter-tab inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold transition-all border border-border bg-white text-charcoal/70 hover:border-navy-deep/20 hover:text-navy-deep';
        }
    });

    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
