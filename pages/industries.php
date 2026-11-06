<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$settings = getSiteSettings();
$industries = getIndustries();

$pageTitle = 'Industries - Biztra Business Advisory';
$pageDescription = 'Sector-specific insight across the industries that shape Nepal\'s economy — built on real engagement, not theoretical models.';
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
                <li class="text-white">Industries</li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Industries
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                Industry Expertise That Understands Your Business
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                Sector-specific insight across the industries that shape Nepal's economy — built on real engagement, not theoretical models.
            </p>
            <a href="/contact" class="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Industries Grid -->
<section class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <?php if (empty($industries)): ?>
        <div class="rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Industries are coming soon.</p>
        </div>
        <?php else: ?>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            <?php foreach ($industries as $industry): ?>
            <a href="/industries/<?= e($industry['slug']) ?>" class="group relative h-full overflow-hidden rounded-2xl border border-border bg-white shadow-warm hover:shadow-warm-lg transition-shadow">
                <div class="relative h-24 overflow-hidden bg-navy-gradient noise-overlay">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-gold">
                            <?= getIcon($industry['icon_name'] ?? 'Briefcase', 'h-5 w-5') ?>
                        </div>
                    </div>
                    <div class="absolute inset-0 opacity-[0.05]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 24px 24px;"></div>
                </div>
                <div class="p-4">
                    <h3 class="font-serif text-base font-semibold text-navy-deep leading-snug"><?= e($industry['title']) ?></h3>
                    <p class="mt-1.5 text-[12px] leading-relaxed text-charcoal/70"><?= e($industry['data']['shortDescription'] ?? $industry['description'] ?? '') ?></p>
                </div>
                <span class="absolute bottom-0 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Engagement Stats -->
<section class="relative py-20 lg:py-24 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-border bg-white p-8 lg:p-12 shadow-sm">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div class="lg:col-span-7">
                    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                        <span class="h-px w-6 bg-gold"></span>
                        Multi-Sector Engagement
                    </span>
                    <h2 class="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                        Sector Insight Built on Real Engagement
                    </h2>
                    <p class="mt-5 text-pretty text-base leading-relaxed text-charcoal/70">
                        Our industry expertise is not theoretical. It is built engagement by engagement — working alongside operators, finance teams, and boards across each of the sectors we serve. This means our recommendations are grounded in how these industries actually work, the constraints they face, and the opportunities that are genuinely available to them in the Nepalese context.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="rounded-xl border border-border bg-mist p-5">
                            <div class="font-serif text-3xl font-semibold text-navy-deep tracking-executive">8+</div>
                            <div class="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/70 leading-snug">Industries Served</div>
                        </div>
                        <div class="rounded-xl border border-border bg-mist p-5">
                            <div class="font-serif text-3xl font-semibold text-navy-deep tracking-executive">9</div>
                            <div class="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/70 leading-snug">Service Verticals</div>
                        </div>
                        <div class="rounded-xl border border-border bg-mist p-5">
                            <div class="font-serif text-3xl font-semibold text-navy-deep tracking-executive">100%</div>
                            <div class="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/70 leading-snug">Nepal-Focused</div>
                        </div>
                        <div class="rounded-xl border border-border bg-mist p-5">
                            <div class="font-serif text-3xl font-semibold text-navy-deep tracking-executive">6+</div>
                            <div class="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/70 leading-snug">Years Experience</div>
                        </div>
                    </div>
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
            Start the Conversation
            <span class="h-px w-6 bg-gold"></span>
        </span>
        <h2 class="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Don't See Your Industry Listed?
        </h2>
        <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Our advisory experience extends beyond the sectors listed here. Reach out — even if your industry isn't shown, we likely have relevant engagement experience to draw on.
        </p>
        <div class="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
            <a href="/services" class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10">
                Explore Our Services
                <?= getIcon('ArrowRight', 'h-4 w-4') ?>
            </a>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
