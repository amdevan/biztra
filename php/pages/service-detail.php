<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$slug = $_GET['slug'] ?? '';
$service = $slug ? getContentItem('service', $slug) : null;

if (!$service) {
    http_response_code(404);
    echo 'Not found';
    exit;
}

$allServices = getServices();
$related = array_filter($allServices, fn($s) => $s['slug'] !== $service['slug']);
$related = array_slice($related, 0, 3);

$shortDescription = $service['data']['shortDescription'] ?? '';
$deliverables = $service['data']['deliverables'] ?? [];

$pageTitle = e($service['title']) . ' - Biztra Business Advisory';
$pageDescription = $shortDescription ?: $service['description'] ?? '';
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
                <li class="flex items-center gap-1.5"><a href="/services" class="transition-colors hover:text-gold">Services</a></li>
                <li class="flex items-center gap-1.5"><svg class="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></li>
                <li class="text-white"><?= e($service['title']) ?></li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Services
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                <?= e($service['title']) ?>
            </h1>
            <?php if ($shortDescription): ?>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl"><?= e($shortDescription) ?></p>
            <?php endif; ?>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Service Body -->
<article class="relative bg-white py-16 lg:py-20">
    <div class="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <!-- Icon + lead -->
        <div class="flex items-center gap-4 mb-8">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep">
                <?= getIcon($service['icon_name'] ?? 'Briefcase', 'h-6 w-6') ?>
            </div>
            <div>
                <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Service</div>
                <div class="font-serif text-lg font-semibold text-navy-deep"><?= e($service['title']) ?></div>
            </div>
        </div>

        <!-- Description -->
        <?php if (!empty($service['description'])): ?>
        <div class="prose-content text-base leading-relaxed text-charcoal/70 space-y-4">
            <?php foreach (explode("\n\n", $service['description']) as $para): ?>
                <?php $para = trim($para); if ($para): ?>
                <p class="text-pretty"><?= e($para) ?></p>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <!-- Deliverables -->
        <?php if (!empty($deliverables) && is_array($deliverables)): ?>
        <div class="mt-10 rounded-xl border border-border bg-mist p-6 lg:p-8">
            <h3 class="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">Key Deliverables</h3>
            <ul class="mt-4 grid sm:grid-cols-2 gap-3">
                <?php foreach ($deliverables as $d): ?>
                <li class="flex items-center gap-2.5 text-sm text-navy-deep">
                    <svg class="h-4 w-4 flex-none text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <?= e($d) ?>
                </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php endif; ?>

        <!-- CTA -->
        <div class="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors">
                Discuss This Service
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
            <a href="/services" class="group inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-semibold text-navy-deep hover:bg-mist transition-colors">
                <?= getIcon('ArrowRight', 'h-4 w-4 rotate-180') ?>
                Back to Services
            </a>
        </div>
    </div>
</article>

<!-- Related Services -->
<?php if (!empty($related)): ?>
<section class="relative py-16 lg:py-20 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Continue Exploring
        </span>
        <h2 class="mt-3 font-serif tracking-executive text-balance text-2xl sm:text-3xl font-medium text-navy-deep">
            Related Services
        </h2>
        <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <?php foreach ($related as $r): ?>
            <a href="/services/<?= e($r['slug']) ?>" class="group block h-full rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white">
                    <?= getIcon($r['icon_name'] ?? 'Briefcase', 'h-5 w-5') ?>
                </div>
                <h3 class="mt-4 font-serif text-base font-semibold text-navy-deep leading-snug"><?= e($r['title']) ?></h3>
                <p class="mt-2 text-[13px] text-charcoal/70"><?= e($r['data']['shortDescription'] ?? $r['description'] ?? '') ?></p>
                <span class="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors">
                    Learn More
                    <?= getIcon('ArrowRight', 'h-3 w-3 transition-transform group-hover:translate-x-0.5') ?>
                </span>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php include __DIR__ . '/../includes/footer.php'; ?>
