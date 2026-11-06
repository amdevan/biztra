<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$settings = getSiteSettings();
$services = getServices();
$approachSteps = getApproachSteps();

$pageTitle = 'Services - Biztra Business Advisory';
$pageDescription = 'Comprehensive advisory solutions — business advisory, audit, accounting, taxation, financial modeling, budgeting, internal controls, strategy, and training.';
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
                <li class="text-white">Services</li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Services
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                Comprehensive Advisory Solutions
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                Professional expertise designed to help businesses operate better, comply confidently, and grow sustainably — across nine interrelated advisory disciplines.
            </p>
            <a href="/contact" class="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Services Grid -->
<section class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <?php if (empty($services)): ?>
        <div class="rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Services are coming soon. <a href="/contact" class="text-navy-deep font-semibold hover:text-gold transition-colors">Get in touch</a> with our team.</p>
        </div>
        <?php else: ?>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <?php foreach ($services as $idx => $service): ?>
            <div class="group relative h-full flex flex-col rounded-2xl border border-border bg-white p-6 lg:p-7 shadow-warm hover:shadow-warm-lg transition-shadow">
                <div class="flex items-start justify-between">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
                        <?= getIcon($service['icon_name'] ?? 'Briefcase', 'h-5 w-5') ?>
                    </div>
                    <span class="font-mono text-[11px] font-medium tracking-wider text-charcoal/70"><?= str_pad($idx + 1, 2, '0', STR_PAD_LEFT) ?></span>
                </div>
                <h3 class="mt-5 font-serif text-lg font-semibold text-navy-deep leading-snug"><?= e($service['title']) ?></h3>
                <p class="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70"><?= e($service['data']['shortDescription'] ?? $service['description'] ?? '') ?></p>
                <a href="/services/<?= e($service['slug']) ?>" class="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors">
                    Learn More
                    <?= getIcon('ArrowRight', 'h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5') ?>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Approach -->
<section id="approach" class="relative py-20 lg:py-28 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Our Approach
                <span class="h-px w-6 bg-gold"></span>
            </span>
            <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                A Structured Approach to Every Engagement
            </h2>
            <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70">
                A disciplined methodology that turns advisory engagement into measurable, sustainable outcomes.
            </p>
        </div>

        <?php if (!empty($approachSteps)): ?>
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

<!-- CTA -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
    <div class="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Engage With Us
            <span class="h-px w-6 bg-gold"></span>
        </span>
        <h2 class="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Not Sure Which Service Fits Your Needs?
        </h2>
        <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Most engagements span multiple disciplines. Our advisory team can help you scope the right combination of services for your specific context — no obligation, no pressure.
        </p>
        <div class="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
            <a href="/industries" class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10">
                View Industries We Serve
                <?= getIcon('ArrowRight', 'h-4 w-4') ?>
            </a>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
