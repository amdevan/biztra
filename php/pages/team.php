<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$teamMembers = getTeamMembers();

$pageTitle = 'Our Team - Biztra Business Advisory';
$pageDescription = 'Biztra is led by a Chartered Accountant with multi-sector experience and a foundation built at one of the world\'s leading professional services firms.';
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
                <li class="text-white">Our Team</li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Our Team
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                Leadership That Combines Experience With Vision
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                Biztra is led by a Chartered Accountant with multi-sector experience and a foundation built at one of the world's leading professional services firms.
            </p>
            <a href="/contact" class="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white">
                Book a Consultation
                <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
            </a>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Team Grid -->
<section class="relative py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Our People
            </span>
            <h2 class="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Meet the Team Leading Biztra
            </h2>
            <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-charcoal/70">
                Click on any team member's card to view their full profile, expertise, and professional background.
            </p>
        </div>

        <?php if (empty($teamMembers)): ?>
        <div class="rounded-xl border border-border bg-white p-10 text-center">
            <p class="text-sm text-charcoal/70">Team profiles are coming soon.</p>
        </div>
        <?php else: ?>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <?php foreach ($teamMembers as $member): ?>
            <a href="/team/<?= e($member['slug']) ?>" class="group relative h-full overflow-hidden rounded-3xl border border-border bg-white shadow-warm hover:shadow-warm-lg transition-shadow">
                <!-- Portrait area -->
                <div class="relative aspect-[4/3] overflow-hidden bg-navy-gradient noise-overlay">
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div class="relative">
                            <div class="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                                <span class="font-serif text-2xl font-medium text-gold"><?= e($member['data']['initials'] ?? '') ?></span>
                            </div>
                            <?php if (!empty($member['featured'])): ?>
                            <span class="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                                <svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            </span>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="absolute inset-0 opacity-[0.05]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 32px 32px;"></div>
                    <div class="absolute top-3 left-3 h-5 w-5 border-l border-t border-gold/30"></div>
                    <div class="absolute bottom-3 right-3 h-5 w-5 border-r border-b border-gold/30"></div>
                </div>
                <!-- Body -->
                <div class="p-5 lg:p-6">
                    <h3 class="font-serif text-lg lg:text-xl font-semibold text-navy-deep leading-snug"><?= e($member['title']) ?></h3>
                    <?php $role = $member['subtitle'] ?? $member['data']['role'] ?? ''; ?>
                    <?php if ($role): ?>
                    <p class="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold"><?= e($role) ?></p>
                    <?php endif; ?>
                    <?php $designation = $member['data']['designation'] ?? ''; ?>
                    <?php if ($designation): ?>
                    <p class="mt-1 text-[11px] uppercase tracking-[0.14em] text-charcoal/70"><?= e($designation) ?></p>
                    <?php endif; ?>
                    <span class="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors">
                        View Full Profile
                        <?= getIcon('ArrowRight', 'h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5') ?>
                    </span>
                </div>
                <span class="absolute bottom-0 left-5 right-5 lg:left-6 lg:right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <div class="mt-12 rounded-xl border border-border bg-mist p-6 text-center">
            <p class="text-sm text-charcoal/70">
                We are actively building a multi-disciplinary team of qualified professionals. <a href="/contact" class="text-navy-deep font-semibold hover:text-gold transition-colors">Explore career opportunities</a>
            </p>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
    <div class="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Engage With Our Team
            <span class="h-px w-6 bg-gold"></span>
        </span>
        <h2 class="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Ready to Work With Biztra?
        </h2>
        <p class="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Whether you need a single advisory engagement or a long-term strategic partner, we would welcome the opportunity to discuss your needs.
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

<?php include __DIR__ . '/../includes/footer.php'; ?>
