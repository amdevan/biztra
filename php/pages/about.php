<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$settings = getSiteSettings();
$about = getAboutContent();
$coreValues = getCoreValues();
$whyChoose = getWhyChoose();

$pageTitle = 'About Us - Biztra';
$pageDescription = 'Established in 2023 in Kathmandu, Biztra Business Advisory provides a full spectrum of advisory and consulting services.';
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
                <li class="text-white">About Us</li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                About Us
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                Your Trusted Partner for Business Growth
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                Established in 2023 in Kathmandu, Biztra Business Advisory provides a full spectrum of advisory and consulting services — combining deep local expertise with rigorous professional standards.
            </p>
            <a href="#story" class="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Discover Biztra
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Our Story -->
<section id="story" class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <!-- Left - Visual -->
            <div class="lg:col-span-5">
                <div class="relative lg:sticky lg:top-28">
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
                    Our Story
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                    Building a Trusted Standard for Nepalese Advisory
                </h2>
                <div class="mt-6 space-y-5 text-base leading-relaxed text-charcoal/70 text-pretty">
                    <?php foreach (['story_paragraph1', 'story_paragraph2', 'story_paragraph3', 'story_paragraph4'] as $field): ?>
                        <?php if (!empty($about[$field])): ?>
                        <p><?= e($about[$field]) ?></p>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Vision -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-24 lg:py-32">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full opacity-25 blur-[140px] pointer-events-none" style="background: radial-gradient(circle, rgba(76,133,92,0.6) 0%, transparent 70%);"></div>
    <div class="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-3">
            <span class="h-px w-10 bg-gold"></span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                <?= getIcon('Eye', 'h-5 w-5') ?>
            </span>
            <span class="h-px w-10 bg-gold"></span>
        </div>
        <p class="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"><?= e($about['vision_eyebrow'] ?? 'Our Vision') ?></p>
        <blockquote class="mt-6 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.6rem] lg:leading-[1.25] font-medium italic">
            &ldquo;<?= e($about['vision_text'] ?? 'To accelerate enterprise growth across the industry by transforming conventional business practices into systematic, compliant, and globally standardized financial practices.') ?>&rdquo;
        </blockquote>
        <?php if (!empty($about['vision_context'])): ?>
        <p class="mt-8 text-pretty text-base leading-relaxed text-white/65 max-w-3xl mx-auto"><?= e($about['vision_context']) ?></p>
        <?php endif; ?>
        <div class="mt-10 mx-auto h-px w-16 bg-white/15"></div>
    </div>
</section>

<!-- Mission -->
<section class="relative bg-white py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <!-- Left - Visual -->
            <div class="lg:col-span-5">
                <div class="relative aspect-square rounded-2xl overflow-hidden border border-border bg-mist">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="relative h-3/4 w-3/4">
                            <div class="absolute rounded-full border border-navy-deep" style="inset: 0%;"></div>
                            <div class="absolute rounded-full border border-gold/60" style="inset: 12%;"></div>
                            <div class="absolute rounded-full border border-navy-deep/30" style="inset: 24%;"></div>
                            <div class="absolute rounded-full border border-gold/25" style="inset: 36%;"></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-navy-deep text-white shadow-lg">
                                    <?= getIcon('Target', 'h-6 w-6') ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute bottom-6 left-6 right-6">
                        <div class="rounded-lg border border-border bg-white/95 backdrop-blur-sm p-4 shadow-sm">
                            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Mission Compass</div>
                            <div class="mt-1 text-xs text-charcoal/70">Exceptional quality. Sustainable practice. Widespread awareness.</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Right - Copy -->
            <div class="lg:col-span-7">
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    <?= e($about['mission_eyebrow'] ?? 'Our Mission') ?>
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15] font-medium text-navy-deep">
                    <?= e($about['mission_heading'] ?? 'A One-Stop Hub for Comprehensive Advisory Excellence') ?>
                </h2>
                <?php if (!empty($about['mission_text'])): ?>
                <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70"><?= e($about['mission_text']) ?></p>
                <?php endif; ?>
                <div class="mt-8 grid sm:grid-cols-3 gap-4">
                    <div class="rounded-lg border border-border bg-white px-4 py-3.5">
                        <div class="font-serif text-sm font-semibold text-navy-deep">Premier Hub</div>
                        <div class="mt-1 text-[11px] text-charcoal/70">One-stop advisory</div>
                    </div>
                    <div class="rounded-lg border border-border bg-white px-4 py-3.5">
                        <div class="font-serif text-sm font-semibold text-navy-deep">Empower</div>
                        <div class="mt-1 text-[11px] text-charcoal/70">Professionals &amp; owners</div>
                    </div>
                    <div class="rounded-lg border border-border bg-white px-4 py-3.5">
                        <div class="font-serif text-sm font-semibold text-navy-deep">Awareness</div>
                        <div class="mt-1 text-[11px] text-charcoal/70">Global standards</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Core Values -->
<section id="core-values" class="relative py-20 lg:py-28 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                <?= e($about['core_values_eyebrow'] ?? 'Core Values') ?>
                <span class="h-px w-6 bg-gold"></span>
            </span>
            <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                <?= e($about['core_values_heading'] ?? 'The Principles Behind Our Practice') ?>
            </h2>
            <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70">
                <?= e($about['core_values_subtitle'] ?? 'Six values that govern every engagement we accept — and every recommendation we make.') ?>
            </p>
        </div>

        <?php if (!empty($coreValues)): ?>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <?php foreach ($coreValues as $value): ?>
            <article class="group relative h-full rounded-xl border border-border bg-white p-7 transition-colors hover:border-gold/40">
                <div class="flex items-center gap-4">
                    <div class="flex h-11 w-11 items-center justify-center rounded-full border border-navy-deep/10 text-navy-deep transition-colors group-hover:border-gold group-hover:text-gold">
                        <?= getIcon($value['icon_name'] ?? 'Star', 'h-5 w-5') ?>
                    </div>
                    <h3 class="font-serif text-xl font-semibold text-navy-deep"><?= e($value['title']) ?></h3>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-charcoal/70"><?= e($value['description']) ?></p>
                <span class="absolute bottom-0 left-7 right-7 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </article>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Why Choose Us -->
<section id="why-choose" class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                <?= e($about['why_choose_eyebrow'] ?? 'Why Choose Us') ?>
                <span class="h-px w-6 bg-gold"></span>
            </span>
            <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                <?= e($about['why_choose_heading'] ?? 'A Practice Built on Substance, Not Slogans') ?>
            </h2>
            <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70 max-w-2xl">
                <?= e($about['why_choose_subtitle'] ?? 'We are chosen by organizations that value depth of expertise, structured thinking, and a partner who genuinely invests in their long-term outcomes.') ?>
            </p>
        </div>

        <?php if (!empty($whyChoose)): ?>
        <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <?php foreach ($whyChoose as $feature): ?>
            <article class="group relative h-full rounded-xl border border-border bg-white p-6 lg:p-7 shadow-sm transition-colors hover:border-navy-deep/20">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
                    <?= getIcon($feature['icon_name'] ?? 'Award', 'h-5 w-5') ?>
                </div>
                <h3 class="mt-5 font-serif text-xl font-semibold text-navy-deep"><?= e($feature['title']) ?></h3>
                <p class="mt-3 text-sm leading-relaxed text-charcoal/70"><?= e($feature['description']) ?></p>
                <span class="absolute top-0 right-0 h-px w-12 bg-gradient-to-r from-transparent to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </article>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- CTA -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
    <div class="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Get Started
            <span class="h-px w-6 bg-gold"></span>
        </span>
        <h2 class="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Ready to Build a Stronger, Smarter Business?
        </h2>
        <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Let's discuss your business challenges and identify practical opportunities for sustainable growth.
        </p>
        <div class="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
            <a href="/services" class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10">
                Explore Services
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
