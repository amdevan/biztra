<?php
/**
 * Common HTML footer include
 */

$settings = getSiteSettings() ?? [];
$brandName = $settings['brand_name'] ?? 'Biztra';
$brandTagline = $settings['brand_tagline'] ?? 'Business Advisory';
$footerTagline = $settings['footer_tagline'] ?? 'Building enduring value through strategic advisory.';
$footerDescription = $settings['footer_description'] ?? 'Empowering businesses across Nepal with comprehensive professional services since 2023.';
$contactPhone = $settings['contact_phone'] ?? '+977-1-5970005';
$contactEmail = $settings['contact_email'] ?? 'info@biztra.com.np';
$contactAddress = $settings['contact_address'] ?? 'Kathmandu, Nepal';
$contactAddressDetail = $settings['contact_address_detail'] ?? 'Naxal, Kathmandu 44600';
$mapsUrl = $settings['maps_url'] ?? '#';
$linkedinUrl = $settings['linkedin_url'] ?? '#';
$facebookUrl = $settings['facebook_url'] ?? '#';
$instagramUrl = $settings['instagram_url'] ?? '#';

$companyLinks = [
    ['label' => 'About Us', 'href' => '/about'],
    ['label' => 'Our Team', 'href' => '/team'],
    ['label' => 'Industries', 'href' => '/industries'],
    ['label' => 'Research', 'href' => '/research'],
    ['label' => 'Contact', 'href' => '/contact'],
];

$footerServices = getPublishedContent('service');
$serviceLinks = array_slice($footerServices, 0, 6);
?>

<!-- Mobile menu script -->
<script>
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    document.body.style.overflow = menu.classList.contains('hidden') ? '' : 'hidden';
}

// Header scroll effect
(function() {
    const header = document.getElementById('site-header');
    const isHome = <?= $isHome ? 'true' : 'false' ?>;
    if (isHome && header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.remove('bg-transparent');
                header.classList.add('bg-white/95', 'backdrop-blur-md');
            } else {
                header.classList.add('bg-transparent');
                header.classList.remove('bg-white/95', 'backdrop-blur-md');
            }
        });
    }
})();
</script>

<!-- Footer -->
<footer class="relative bg-navy-deep text-white">
    <div class="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <!-- Brand Column -->
            <div class="lg:col-span-4">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                        <div class="flex gap-[3px] items-end h-5">
                            <div class="w-[5px] bg-navy-deep/55 rounded-sm h-2.5"></div>
                            <div class="w-[5px] bg-navy-deep/80 rounded-sm h-3.5"></div>
                            <div class="w-[5px] bg-navy-deep rounded-sm h-5"></div>
                        </div>
                    </div>
                    <div>
                        <span class="font-serif text-xl font-semibold tracking-executive"><?= e($brandName) ?></span>
                        <span class="block text-[9px] font-medium uppercase tracking-[0.28em] text-gold"><?= e($brandTagline) ?></span>
                    </div>
                </div>
                <p class="text-white/50 text-sm mt-3 max-w-sm leading-relaxed"><?= e($footerTagline) ?></p>
                <p class="text-white/40 text-sm mt-2 max-w-sm leading-relaxed"><?= e($footerDescription) ?></p>
                <div class="flex gap-2 mt-5">
                    <?php if ($linkedinUrl && $linkedinUrl !== '#'): ?>
                    <a href="<?= e($linkedinUrl) ?>" target="_blank" rel="noopener" class="h-9 w-9 rounded-md border border-white/10 bg-white/[0.03] text-white/60 hover:border-gold hover:text-gold flex items-center justify-center transition-all">
                        <?= getIcon('Linkedin', 'w-4 h-4') ?>
                    </a>
                    <?php endif; ?>
                    <?php if ($facebookUrl && $facebookUrl !== '#'): ?>
                    <a href="<?= e($facebookUrl) ?>" target="_blank" rel="noopener" class="h-9 w-9 rounded-md border border-white/10 bg-white/[0.03] text-white/60 hover:border-gold hover:text-gold flex items-center justify-center transition-all">
                        <?= getIcon('Facebook', 'w-4 h-4') ?>
                    </a>
                    <?php endif; ?>
                    <?php if ($instagramUrl && $instagramUrl !== '#'): ?>
                    <a href="<?= e($instagramUrl) ?>" target="_blank" rel="noopener" class="h-9 w-9 rounded-md border border-white/10 bg-white/[0.03] text-white/60 hover:border-gold hover:text-gold flex items-center justify-center transition-all">
                        <?= getIcon('Instagram', 'w-4 h-4') ?>
                    </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Company Links -->
            <div class="lg:col-span-5 grid sm:grid-cols-2 gap-8">
                <div>
                    <h4 class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-4">Company</h4>
                    <ul class="space-y-2.5">
                        <?php foreach ($companyLinks as $link): ?>
                        <li>
                            <a href="<?= e($link['href']) ?>" class="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white">
                                <?= e($link['label']) ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div>
                    <h4 class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-4">Services</h4>
                    <ul class="space-y-2.5">
                        <?php foreach ($serviceLinks as $service): ?>
                        <li>
                            <a href="/services/<?= e($service['slug']) ?>" class="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white">
                                <?= e($service['title']) ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>

            <!-- Contact Column -->
            <div class="lg:col-span-3">
                <h4 class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-4">Contact</h4>
                <ul class="space-y-3">
                    <li class="flex items-start gap-2.5">
                        <span class="text-white/40 mt-0.5"><?= getIcon('MapPin', 'w-4 h-4') ?></span>
                        <div>
                            <p class="text-sm text-white/70"><?= e($contactAddress) ?></p>
                            <p class="text-xs text-white/40 mt-0.5"><?= e($contactAddressDetail) ?></p>
                        </div>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <span class="text-white/40"><?= getIcon('Phone', 'w-4 h-4') ?></span>
                        <a href="tel:<?= e($contactPhone) ?>" class="text-sm text-white/70 hover:text-white transition-colors"><?= e($contactPhone) ?></a>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <span class="text-white/40"><?= getIcon('Mail', 'w-4 h-4') ?></span>
                        <a href="mailto:<?= e($contactEmail) ?>" class="text-sm text-white/70 hover:text-white transition-colors"><?= e($contactEmail) ?></a>
                    </li>
                </ul>
                <?php if ($mapsUrl && $mapsUrl !== '#'): ?>
                <a href="<?= e($mapsUrl) ?>" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 mt-4 text-xs text-white/40 hover:text-gold transition-colors">
                    <?= getIcon('MapPin', 'w-3 h-3') ?>
                    View on Google Maps
                </a>
                <?php endif; ?>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-xs text-white/30">&copy; <?= date('Y') ?> <?= e($brandName) ?>. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
                <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>

</body>
</html>
