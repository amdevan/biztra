<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$settings = getSiteSettings();
$about = getAboutContent();
$services = getServices();
$industries = getIndustries();
$approachSteps = getApproachSteps();
$teamMembers = getTeamMembers();
$articles = getPublishedArticles(3);

$pageTitle = ($settings['brand_name'] ?? 'Biztra') . ' - Business Advisory';
$pageDescription = $settings['hero_subtitle'] ?? 'Professional business advisory, audit, accounting, and consulting services in Nepal.';
include __DIR__ . '/../includes/header.php';

$brandTagline = $settings['brand_tagline'] ?? 'Business Advisory';
$heroEyebrow = $settings['hero_eyebrow'] ?? 'Kathmandu · Nepal · Est. 2023';
$heroHeadline = $settings['hero_headline'] ?? 'Accounting, audit and tax — done properly & in plain words';
$heroSubtitle = $settings['hero_subtitle'] ?? 'We help Nepali businesses get their books in order, file taxes on time and make decisions backed by clear numbers. Small team, big-firm standards, no confusing jargon.';
$heroPrimaryCta = $settings['hero_primary_cta'] ?? 'Talk to us';
$heroSecondaryCta = $settings['hero_secondary_cta'] ?? 'See what we do';

$stats = [
    ['value' => $settings['hero_stat1_value'] ?? '6+', 'label' => $settings['hero_stat1_label'] ?? 'Years Professional Experience'],
    ['value' => $settings['hero_stat2_value'] ?? '9', 'label' => $settings['hero_stat2_label'] ?? 'Service Verticals'],
    ['value' => $settings['hero_stat3_value'] ?? '8+', 'label' => $settings['hero_stat3_label'] ?? 'Industries Served'],
    ['value' => $settings['hero_stat4_value'] ?? '100%', 'label' => $settings['hero_stat4_label'] ?? 'Nepal-Focused Advisory'],
];

// Featured team member for leadership teaser
$featuredMember = null;
foreach ($teamMembers as $m) {
    if (!empty($m['featured'])) { $featuredMember = $m; break; }
}
if (!$featuredMember && !empty($teamMembers)) { $featuredMember = $teamMembers[0]; }
?>

<!-- Hero Section -->
<section id="home" class="relative overflow-hidden bg-navy-gradient noise-overlay text-white">
    <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-15%] right-[-10%] h-[55vh] w-[55vh] rounded-full opacity-30 blur-[120px]" style="background: radial-gradient(circle, rgba(76,133,92,0.5) 0%, transparent 70%);"></div>
        <div class="absolute bottom-[-30%] left-[-10%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[140px]" style="background: radial-gradient(circle, rgba(9,61,107,0.7) 0%, transparent 70%);"></div>
        <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <!-- Left column -->
            <div class="lg:col-span-7">
                <div class="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-gold"></span>
                    <span class="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80"><?= e($heroEyebrow) ?></span>
                </div>

                <h1 class="mt-6 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.05] font-medium">
                    <?php
                    $parts = explode('&', $heroHeadline, 2);
                    echo e(trim($parts[0]));
                    if (isset($parts[1])) {
                        echo ' &amp; <span class="italic text-gold">' . e(trim($parts[1])) . '</span>';
                    }
                    ?>
                </h1>

                <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl"><?= e($heroSubtitle) ?></p>

                <div class="mt-9 flex flex-col sm:flex-row gap-3">
                    <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                        <?= e($heroPrimaryCta) ?>
                        <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
                    </a>
                    <a href="/services" class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10">
                        <?= e($heroSecondaryCta) ?>
                        <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
                    </a>
                </div>

                <!-- Stats -->
                <dl class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/10 pt-8 max-w-2xl">
                    <?php foreach ($stats as $stat): ?>
                    <div class="flex flex-col">
                        <dt class="font-serif text-3xl lg:text-4xl font-semibold text-white tracking-executive"><?= e($stat['value']) ?></dt>
                        <dd class="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 leading-snug"><?= e($stat['label']) ?></dd>
                    </div>
                    <?php endforeach; ?>
                </dl>
            </div>

            <!-- Right column - Visual -->
            <div class="lg:col-span-5 relative">
                <div class="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] w-full max-w-md mx-auto">
                    <div class="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm overflow-hidden">
                        <!-- Card header -->
                        <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <div class="flex items-center gap-2">
                                <span class="h-2 w-2 rounded-full bg-gold"></span>
                                <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Advisory Snapshot</span>
                            </div>
                            <?= getIcon('Briefcase', 'h-4 w-4 text-white/40') ?>
                        </div>
                        <div class="p-5 space-y-4">
                            <div class="grid grid-cols-2 gap-3">
                                <div class="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                                    <div class="flex items-center gap-1.5 text-white/55">
                                        <?= getIcon('TrendingUp', 'h-3 w-3') ?>
                                        <span class="text-[9px] uppercase tracking-wider">Revenue Health</span>
                                    </div>
                                    <div class="mt-2 font-serif text-2xl text-white font-semibold">+18.4%</div>
                                    <div class="mt-1.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                                        <div class="h-full w-[78%] rounded-full bg-gold"></div>
                                    </div>
                                </div>
                                <div class="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                                    <div class="flex items-center gap-1.5 text-white/55">
                                        <?= getIcon('Shield', 'h-3 w-3') ?>
                                        <span class="text-[9px] uppercase tracking-wider">Compliance</span>
                                    </div>
                                    <div class="mt-2 font-serif text-2xl text-white font-semibold">100%</div>
                                    <div class="mt-1.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                                        <div class="h-full w-full rounded-full bg-gold"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center gap-2.5 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                    <?= getIcon('FileText', 'h-3.5 w-3.5 text-gold') ?>
                                    <span class="text-[11px] text-white/75">Statutory Audit Completed</span>
                                </div>
                                <div class="flex items-center gap-2.5 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                    <?= getIcon('Globe', 'h-3.5 w-3.5 text-gold') ?>
                                    <span class="text-[11px] text-white/75">IFRS-aligned Reporting</span>
                                </div>
                                <div class="flex items-center gap-2.5 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                    <?= getIcon('Target', 'h-3.5 w-3.5 text-gold') ?>
                                    <span class="text-[11px] text-white/75">Strategic Review Refresh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute -top-4 -right-4 -bottom-4 -left-4 rounded-2xl border border-gold/20 pointer-events-none" aria-hidden="true"></div>
                    <div class="absolute -top-3 -left-3 lg:-left-6 rounded-lg border border-white/15 bg-navy-deep/90 backdrop-blur-sm px-3.5 py-2 shadow-xl">
                        <div class="flex items-center gap-2">
                            <?= getIcon('Shield', 'h-3.5 w-3.5 text-gold') ?>
                            <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">Audit Ready</span>
                        </div>
                    </div>
                    <div class="absolute -bottom-3 -right-3 lg:-right-6 rounded-lg border border-white/15 bg-navy-deep/90 backdrop-blur-sm px-3.5 py-2 shadow-xl">
                        <div class="flex items-center gap-2">
                            <?= getIcon('Globe', 'h-3.5 w-3.5 text-gold') ?>
                            <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">Global Standards</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Who We Are Teaser -->
<section class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <!-- Left - Visual -->
            <div class="lg:col-span-5">
                <div class="relative">
                    <div class="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-gradient noise-overlay">
                        <div class="absolute inset-0 p-8 flex flex-col justify-between text-white">
                            <div>
                                <div class="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                                    <span class="h-px w-5 bg-gold"></span>
                                    Established 2023
                                </div>
                                <p class="mt-5 font-serif text-2xl lg:text-3xl leading-snug text-balance font-medium">
                                    &ldquo;<?= e($about['story_quote'] ?? 'A trusted partner helping Nepalese businesses operate with global professional standards.') ?>&rdquo;
                                </p>
                            </div>
                            <div class="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <div>
                                    <div class="font-serif text-base font-semibold">Kathmandu</div>
                                    <div class="mt-1 text-[9px] uppercase tracking-wider text-white/55">Headquarters</div>
                                </div>
                                <div>
                                    <div class="font-serif text-base font-semibold">Multi-sector</div>
                                    <div class="mt-1 text-[9px] uppercase tracking-wider text-white/55">Coverage</div>
                                </div>
                                <div>
                                    <div class="font-serif text-base font-semibold">CA-led</div>
                                    <div class="mt-1 text-[9px] uppercase tracking-wider text-white/55">Practice</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute -bottom-6 -right-6 hidden sm:block rounded-xl border border-border bg-white shadow-lg p-5 max-w-[220px]">
                        <div class="flex items-center gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-deep text-white">
                                <?= getIcon('Briefcase', 'h-5 w-5') ?>
                            </div>
                            <div>
                                <div class="font-serif text-sm font-semibold text-navy-deep">Quality-Driven Practice</div>
                                <div class="text-[11px] text-charcoal/70">Proactive &amp; Professional</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Right - Copy -->
            <div class="lg:col-span-7">
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    <?= e($about['story_eyebrow'] ?? 'Who We Are') ?>
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                    <?= e($about['story_heading'] ?? 'Your Trusted Partner for Business Growth') ?>
                </h2>
                <div class="mt-6 space-y-5 text-base leading-relaxed text-charcoal/70 text-pretty">
                    <?php if (!empty($about['story_paragraph1'])): ?>
                    <p><?= e($about['story_paragraph1']) ?></p>
                    <?php endif; ?>
                    <?php if (!empty($about['story_paragraph2'])): ?>
                    <p><?= e($about['story_paragraph2']) ?></p>
                    <?php endif; ?>
                </div>
                <a href="/about" class="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-5 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-navy-deep hover:text-white">
                    Discover Biztra
                    <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Services Teaser -->
<section id="services" class="relative py-20 lg:py-28 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-5xl">
            <div>
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Services
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                    Comprehensive Advisory Solutions
                </h2>
            </div>
            <a href="/services" class="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap">
                View All Services
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
        <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70 max-w-2xl">
            Professional expertise designed to help businesses operate better, comply confidently, and grow sustainably — across nine interrelated advisory disciplines.
        </p>

        <?php $teaserServices = array_slice($services, 0, 6); ?>
        <?php if (empty($teaserServices)): ?>
        <div class="mt-12 rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Services are coming soon. <a href="/contact" class="text-navy-deep font-semibold hover:text-gold transition-colors">Get in touch</a> with our team.</p>
        </div>
        <?php else: ?>
        <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <?php foreach ($teaserServices as $idx => $service): ?>
            <a href="/services/<?= e($service['slug']) ?>" class="group relative h-full rounded-xl border border-border bg-white p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div class="flex items-start justify-between">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
                        <?= getIcon($service['icon_name'] ?? 'Briefcase', 'h-5 w-5') ?>
                    </div>
                    <span class="font-mono text-[11px] font-medium tracking-wider text-charcoal/70"><?= str_pad($idx + 1, 2, '0', STR_PAD_LEFT) ?></span>
                </div>
                <h3 class="mt-5 font-serif text-xl font-semibold text-navy-deep"><?= e($service['title']) ?></h3>
                <p class="mt-3 text-sm leading-relaxed text-charcoal/70 flex-1"><?= e($service['data']['shortDescription'] ?? $service['description'] ?? '') ?></p>
                <span class="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors">
                    Learn More
                    <?= getIcon('ArrowRight', 'h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5') ?>
                </span>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Industries Teaser -->
<section id="industries" class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-5xl">
            <div>
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Industries
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                    Industry Expertise That Understands Your Business
                </h2>
            </div>
            <a href="/industries" class="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap">
                View All Industries
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>

        <?php $teaserIndustries = array_slice($industries, 0, 4); ?>
        <?php if (empty($teaserIndustries)): ?>
        <div class="mt-12 rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Industries are coming soon.</p>
        </div>
        <?php else: ?>
        <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            <?php foreach ($teaserIndustries as $industry): ?>
            <a href="/industries/<?= e($industry['slug']) ?>" class="group relative h-full overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div class="relative h-28 overflow-hidden bg-navy-gradient noise-overlay">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-gold">
                            <?= getIcon($industry['icon_name'] ?? 'Briefcase', 'h-6 w-6') ?>
                        </div>
                    </div>
                    <div class="absolute inset-0 opacity-[0.05]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 32px 32px;"></div>
                </div>
                <div class="p-5">
                    <h3 class="font-serif text-lg font-semibold text-navy-deep leading-snug"><?= e($industry['title']) ?></h3>
                    <p class="mt-2 text-[13px] leading-relaxed text-charcoal/70"><?= e($industry['data']['shortDescription'] ?? $industry['description'] ?? '') ?></p>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Approach Teaser -->
<section id="approach" class="relative py-20 lg:py-28 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Our Approach
                <span class="h-px w-6 bg-gold"></span>
            </span>
            <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                A Structured Approach to Better Business
            </h2>
            <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70">
                A disciplined methodology that turns advisory engagement into measurable, sustainable outcomes.
            </p>
        </div>

        <?php if (empty($approachSteps)): ?>
        <div class="mt-12 rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Approach steps are coming soon.</p>
        </div>
        <?php else: ?>
        <!-- Desktop: 4-col grid -->
        <div class="mt-16 hidden lg:block">
            <div class="relative">
                <div class="absolute top-[3.25rem] left-[8%] right-[8%] h-px approach-line opacity-50"></div>
                <div class="grid grid-cols-4 gap-6">
                    <?php foreach ($approachSteps as $step): ?>
                    <div class="group relative text-center">
                        <div class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-white text-navy-deep shadow-sm transition-colors group-hover:border-gold group-hover:text-gold">
                            <?= getIcon($step['icon_name'] ?? 'Briefcase', 'h-5 w-5') ?>
                            <span class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-deep text-[10px] font-mono font-semibold text-white">
                                <?= e($step['data']['number'] ?? '') ?>
                            </span>
                        </div>
                        <h3 class="mt-5 font-serif text-xl font-semibold text-navy-deep"><?= e($step['title']) ?></h3>
                        <p class="mt-3 text-[13px] leading-relaxed text-charcoal/70"><?= e($step['description'] ?? '') ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <!-- Mobile: vertical -->
        <div class="mt-12 lg:hidden">
            <div class="relative">
                <div class="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold/40 via-border to-gold/40"></div>
                <div class="space-y-6">
                    <?php foreach ($approachSteps as $step): ?>
                    <div class="relative pl-20">
                        <div class="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-navy-deep shadow-sm">
                            <?= getIcon($step['icon_name'] ?? 'Briefcase', 'h-5 w-5') ?>
                        </div>
                        <div class="rounded-xl border border-border bg-white p-5 shadow-sm">
                            <div class="flex items-center gap-2">
                                <span class="font-mono text-[11px] font-medium tracking-wider text-gold"><?= e($step['data']['number'] ?? '') ?></span>
                                <span class="h-px w-4 bg-border"></span>
                                <h3 class="font-serif text-lg font-semibold text-navy-deep"><?= e($step['title']) ?></h3>
                            </div>
                            <p class="mt-2 text-sm leading-relaxed text-charcoal/70"><?= e($step['description'] ?? '') ?></p>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Leadership Teaser -->
<?php if ($featuredMember): ?>
<section id="leadership" class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <!-- Left - Portrait -->
            <div class="lg:col-span-5">
                <div class="relative">
                    <div class="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden bg-navy-gradient noise-overlay border border-navy-deep/20">
                        <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <div class="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                                <span class="font-serif text-5xl font-medium text-gold"><?= e($featuredMember['data']['initials'] ?? '') ?></span>
                            </div>
                            <div class="mt-7 text-center px-6">
                                <h3 class="font-serif text-2xl font-semibold"><?= e($featuredMember['title']) ?></h3>
                                <p class="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"><?= e($featuredMember['subtitle'] ?? $featuredMember['data']['role'] ?? '') ?></p>
                                <p class="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60"><?= e($featuredMember['data']['designation'] ?? '') ?></p>
                            </div>
                        </div>
                        <div class="absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-gold/40"></div>
                        <div class="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-gold/40"></div>
                    </div>
                </div>
            </div>
            <!-- Right - Copy -->
            <div class="lg:col-span-7">
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Our Team
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                    Leadership That Combines Experience With Vision
                </h2>
                <?php
                $bioParts = explode('.', $featuredMember['description'] ?? $featuredMember['data']['bio'] ?? '');
                $bioExcerpt = isset($bioParts[1]) ? trim($bioParts[1]) : 'a qualified Chartered Accountant with multi-sector experience';
                ?>
                <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70">
                    Biztra is led by <span class="text-navy-deep font-medium"><?= e($featuredMember['title']) ?></span>, <?= e($bioExcerpt) ?>.
                </p>
                <?php
                $highlights = $featuredMember['data']['highlights'] ?? [];
                if (!empty($highlights) && is_array($highlights)):
                ?>
                <div class="mt-6 flex flex-wrap gap-3">
                    <?php foreach ($highlights as $h): ?>
                    <div class="rounded-lg border border-border bg-mist px-4 py-2.5">
                        <div class="text-[10px] uppercase tracking-wider text-charcoal/70"><?= e($h['label']) ?></div>
                        <div class="mt-0.5 font-serif text-sm font-semibold text-navy-deep"><?= e($h['value']) ?></div>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
                <a href="/team" class="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-deep px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy">
                    Meet Our Team
                    <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
                </a>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Insights Teaser -->
<section id="insights" class="relative py-20 lg:py-28 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-5xl">
            <div>
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Research &amp; Insights
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                    Insights for Better Business Decisions
                </h2>
            </div>
            <a href="/research" class="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap">
                View All Research
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>

        <?php if (empty($articles)): ?>
        <div class="mt-12 rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Research articles are coming soon. Check back shortly, or <a href="/contact" class="text-navy-deep font-semibold hover:text-gold transition-colors">get in touch</a> with our team.</p>
        </div>
        <?php else: ?>
        <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($articles as $article): ?>
            <a href="/research/<?= e($article['slug']) ?>" class="group relative h-full flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div class="relative h-44 overflow-hidden bg-navy-gradient noise-overlay">
                    <div class="absolute inset-0">
                        <svg viewBox="0 0 400 200" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <linearGradient id="grad-home-<?= e($article['slug']) ?>" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stop-color="#4c855c" stop-opacity="0.7" />
                                    <stop offset="100%" stop-color="#093d6b" stop-opacity="0.2" />
                                </linearGradient>
                            </defs>
                            <g opacity="0.85">
                                <rect x="40" y="96" width="20" height="48" fill="url(#grad-home-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="72" y="68" width="20" height="76" fill="url(#grad-home-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="104" y="80" width="20" height="64" fill="url(#grad-home-<?= e($article['slug']) ?>)" rx="2" />
                                <rect x="136" y="56" width="20" height="88" fill="url(#grad-home-<?= e($article['slug']) ?>)" rx="2" />
                            </g>
                            <path d="M40 120 L80 95 L120 105 L160 75" stroke="#4c855c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="absolute top-4 left-4">
                        <span class="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep"><?= e($article['category']) ?></span>
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

<!-- Final CTA -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-24 lg:py-32">
    <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;"></div>
        <div class="absolute top-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-[130px]" style="background: radial-gradient(circle, rgba(76,133,92,0.6) 0%, transparent 70%);"></div>
        <div class="absolute bottom-[-30%] left-[-10%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[130px]" style="background: radial-gradient(circle, rgba(9,61,107,0.5) 0%, transparent 70%);"></div>
        <svg class="absolute right-10 bottom-10 opacity-[0.06] hidden lg:block" width="220" height="120" viewBox="0 0 220 120" fill="none">
            <rect x="10" y="60" width="18" height="60" fill="white" rx="1" />
            <rect x="38" y="40" width="18" height="80" fill="white" rx="1" />
            <rect x="66" y="70" width="18" height="50" fill="white" rx="1" />
            <rect x="94" y="20" width="18" height="100" fill="white" rx="1" />
            <rect x="122" y="45" width="18" height="75" fill="white" rx="1" />
            <rect x="150" y="10" width="18" height="110" fill="white" rx="1" />
            <rect x="178" y="30" width="18" height="90" fill="white" rx="1" />
        </svg>
    </div>

    <div class="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <div class="flex justify-center mb-6">
            <div class="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <div class="flex gap-[3px] items-end h-7">
                    <div class="w-[6px] bg-gold/55 rounded-sm h-3"></div>
                    <div class="w-[6px] bg-gold/80 rounded-sm h-5"></div>
                    <div class="w-[6px] bg-gold rounded-sm h-7"></div>
                </div>
            </div>
        </div>
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Start the Conversation
            <span class="h-px w-6 bg-gold"></span>
        </span>
        <h2 class="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1] font-medium">
            Ready to Build a Stronger, Smarter Business?
        </h2>
        <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Let's discuss your business challenges and identify practical opportunities for sustainable growth.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
            <a href="mailto:<?= e($settings['contact_email'] ?? 'info@biztra.com.np') ?>" class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10">
                Contact Us
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
        <div class="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm">
            <a href="tel:<?= e($settings['contact_phone'] ?? '+977-1-5970005') ?>" class="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
                <?= getIcon('Phone', 'h-3.5 w-3.5') ?>
                <?= e($settings['contact_phone'] ?? '+977-1-5970005') ?>
            </a>
            <span class="hidden sm:block h-3 w-px bg-white/20"></span>
            <a href="mailto:<?= e($settings['contact_email'] ?? 'info@biztra.com.np') ?>" class="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
                <?= getIcon('Mail', 'h-3.5 w-3.5') ?>
                <?= e($settings['contact_email'] ?? 'info@biztra.com.np') ?>
            </a>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
