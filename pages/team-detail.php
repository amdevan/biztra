<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$slug = $_GET['slug'] ?? '';
$member = $slug ? getContentItem('team_member', $slug) : null;

if (!$member) {
    http_response_code(404);
    echo 'Not found';
    exit;
}

$allMembers = getTeamMembers();
$others = array_filter($allMembers, fn($m) => $m['slug'] !== $member['slug']);
$others = array_slice($others, 0, 3);

$name = $member['title'];
$role = $member['subtitle'] ?? $member['data']['role'] ?? '';
$designation = $member['data']['designation'] ?? '';
$initials = $member['data']['initials'] ?? '';
$bio = $member['description'] ?? '';
$expertise = $member['data']['expertise'] ?? [];
$highlights = $member['data']['highlights'] ?? [];

$pageTitle = e($name) . ' - Biztra Business Advisory';
$pageDescription = mb_substr(strip_tags($bio), 0, 160);
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
                <li class="flex items-center gap-1.5"><a href="/team" class="transition-colors hover:text-gold">Our Team</a></li>
                <li class="flex items-center gap-1.5"><svg class="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></li>
                <li class="text-white"><?= e($name) ?></li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Our Team
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                <?= e($name) ?>
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                <?= e($role ? ($role . ($designation ? ' · ' . $designation : '')) : $designation) ?>
            </p>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Profile Body -->
<section class="relative bg-white py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <!-- Left - Portrait -->
            <div class="lg:col-span-5">
                <div class="relative lg:sticky lg:top-28">
                    <div class="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-navy-gradient noise-overlay border border-navy-deep/20">
                        <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <div class="relative">
                                <div class="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                                    <span class="font-serif text-5xl font-medium text-gold"><?= e($initials) ?></span>
                                </div>
                                <div class="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                                    <?= getIcon('Award', 'h-5 w-5') ?>
                                </div>
                            </div>
                            <div class="mt-7 text-center px-6">
                                <h3 class="font-serif text-2xl font-semibold"><?= e($name) ?></h3>
                                <?php if ($role): ?>
                                <p class="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"><?= e($role) ?></p>
                                <?php endif; ?>
                                <?php if ($designation): ?>
                                <p class="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60"><?= e($designation) ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-gold/40"></div>
                        <div class="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-gold/40"></div>
                    </div>

                    <!-- Highlights -->
                    <?php if (!empty($highlights) && is_array($highlights)): ?>
                    <div class="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                        <?php foreach ($highlights as $h): ?>
                        <div class="rounded-lg border border-border bg-white p-4 shadow-sm">
                            <div class="text-[10px] uppercase tracking-wider text-charcoal/70"><?= e($h['label']) ?></div>
                            <div class="mt-1 font-serif text-base font-semibold text-navy-deep"><?= e($h['value']) ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Right - Bio -->
            <div class="lg:col-span-7">
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Profile
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15] font-medium text-navy-deep">
                    About <?= e($name) ?>
                </h2>

                <!-- Bio paragraphs -->
                <div class="mt-6 space-y-5 text-base leading-relaxed text-charcoal/70 text-pretty">
                    <?php foreach (explode("\n\n", $bio) as $para): ?>
                        <?php $para = trim($para); if ($para): ?>
                        <p><?= e($para) ?></p>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>

                <!-- Expertise -->
                <?php if (!empty($expertise) && is_array($expertise)): ?>
                <div class="mt-8">
                    <div class="flex items-center gap-2">
                        <?= getIcon('Briefcase', 'h-4 w-4 text-gold') ?>
                        <h4 class="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">Areas of Expertise</h4>
                    </div>
                    <ul class="mt-4 grid sm:grid-cols-2 gap-2.5">
                        <?php foreach ($expertise as $area): ?>
                        <li class="flex items-center gap-2.5 text-sm text-charcoal/70">
                            <span class="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy-deep/5 text-gold">
                                <span class="h-1 w-1 rounded-full bg-gold"></span>
                            </span>
                            <?= e($area) ?>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php endif; ?>

                <!-- PwC highlight for featured -->
                <?php if (!empty($member['featured'])): ?>
                <div class="mt-8 rounded-xl border border-navy-deep/15 bg-navy-deep/[0.02] p-5 sm:p-6">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div class="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-navy-deep text-white">
                            <?= getIcon('Briefcase', 'h-5 w-5') ?>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-serif text-base font-semibold text-navy-deep">PwC — PricewaterhouseCoopers</span>
                                <span class="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                                    Big Four Foundation
                                </span>
                            </div>
                            <p class="mt-1.5 text-sm text-charcoal/70 leading-relaxed">
                                Professional experience at PwC anchors Biztra's commitment to globally standardized professional practice and rigorous quality.
                            </p>
                        </div>
                    </div>
                </div>
                <?php endif; ?>

                <!-- CTA -->
                <div class="mt-8 flex flex-col sm:flex-row gap-3">
                    <a href="/contact" class="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors">
                        Book a Consultation
                        <?= getIcon('ArrowRight', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
                    </a>
                    <a href="/team" class="group inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-semibold text-navy-deep hover:bg-mist transition-colors">
                        <?= getIcon('ArrowRight', 'h-4 w-4 rotate-180') ?>
                        Back to Team
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Other Team Members -->
<?php if (!empty($others)): ?>
<section class="relative py-16 lg:py-20 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Continue Meeting
        </span>
        <h2 class="mt-3 font-serif tracking-executive text-balance text-2xl sm:text-3xl font-medium text-navy-deep">
            Other Team Members
        </h2>
        <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <?php foreach ($others as $m): ?>
            <a href="/team/<?= e($m['slug']) ?>" class="group block h-full rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div class="relative aspect-[4/3] overflow-hidden bg-navy-gradient noise-overlay">
                    <div class="absolute inset-0 flex items-center justify-center text-white">
                        <div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                            <span class="font-serif text-xl font-medium text-gold"><?= e($m['data']['initials'] ?? '') ?></span>
                        </div>
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="font-serif text-base font-semibold text-navy-deep"><?= e($m['title']) ?></h3>
                    <?php $mRole = $m['subtitle'] ?? $m['data']['role'] ?? ''; ?>
                    <?php if ($mRole): ?>
                    <p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold"><?= e($mRole) ?></p>
                    <?php endif; ?>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php include __DIR__ . '/../includes/footer.php'; ?>
