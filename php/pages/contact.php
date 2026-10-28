<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/content.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

$settings = getSiteSettings();
$pageTitle = 'Contact - Biztra';
$pageDescription = 'Tell us about your organization, your challenges, and the outcomes you are working toward.';
include __DIR__ . '/../includes/header.php';

$contactPhone = $settings['contact_phone'] ?? '+977-1-5970005';
$contactEmail = $settings['contact_email'] ?? 'info@biztra.com.np';
$contactAddress = $settings['contact_address'] ?? 'Kathmandu, Nepal';
$contactAddressDetail = $settings['contact_address_detail'] ?? 'Naxal, Kathmandu 44600';
$contactHours = $settings['contact_hours'] ?? 'Sun - Fri, 9:30 AM - 5:30 PM';
$contactHoursDetail = $settings['contact_hours_detail'] ?? 'Saturday closed';
$contactResponseTime = $settings['contact_response_time'] ?? 'We respond within 1 business day';
$mapsUrl = $settings['maps_url'] ?? 'https://maps.google.com';
$linkedinUrl = $settings['linkedin_url'] ?? '#';
$facebookUrl = $settings['facebook_url'] ?? '#';
$instagramUrl = $settings['instagram_url'] ?? '#';

$serviceOptions = [
    'Business Advisory & Consulting',
    'Statutory & Internal Audit',
    'Accounting & Financial Advisory',
    'Taxation & Compliance',
    'Financial Modeling',
    'Budgeting & Forecasting',
    'Internal Control & Process Review',
    'Strategy & Policy Development',
    'Training & Mentorship',
    'Other / Not Sure',
];
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
                <li class="text-white">Contact</li>
            </ol>
        </nav>
        <div class="max-w-4xl">
            <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span class="h-px w-6 bg-gold"></span>
                Contact
            </span>
            <h1 class="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
                Let's Discuss Your Business
            </h1>
            <p class="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                Tell us about your organization, your challenges, and the outcomes you're working toward. We'll respond within one business day with a thoughtful next step.
            </p>
        </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

<!-- Contact Form + Info -->
<section class="relative bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <!-- Form -->
            <div class="lg:col-span-7">
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Send a Message
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                    Book a Consultation
                </h2>
                <p class="mt-4 text-pretty text-base leading-relaxed text-charcoal/70">
                    Share a few details about your business and the advisory area you're exploring. The more context you provide, the more targeted our response can be.
                </p>

                <form action="#" method="POST" class="mt-8 grid sm:grid-cols-2 gap-5">
                    <div>
                        <label for="name" class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
                            Full Name <span class="text-gold">*</span>
                        </label>
                        <input id="name" name="name" type="text" required class="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="Your name" />
                    </div>
                    <div>
                        <label for="email" class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
                            Email <span class="text-gold">*</span>
                        </label>
                        <input id="email" name="email" type="email" required class="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="you@company.com.np" />
                    </div>
                    <div>
                        <label for="phone" class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">Phone</label>
                        <input id="phone" name="phone" type="tel" class="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="+977 98XXXXXXXX" />
                    </div>
                    <div>
                        <label for="company" class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">Organization</label>
                        <input id="company" name="company" type="text" class="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="Your company" />
                    </div>
                    <div class="sm:col-span-2">
                        <label for="service" class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">Service of Interest</label>
                        <select id="service" name="service" class="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                            <option value="">Select a service (optional)</option>
                            <?php foreach ($serviceOptions as $opt): ?>
                            <option value="<?= e($opt) ?>"><?= e($opt) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
                            Message <span class="text-gold">*</span>
                        </label>
                        <textarea id="message" name="message" required rows="5" class="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-y" placeholder="Tell us about your business and what you'd like to discuss..."></textarea>
                    </div>
                    <div class="sm:col-span-2">
                        <button type="submit" class="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy transition-all">
                            Send Message
                            <?= getIcon('Send', 'h-4 w-4 transition-transform group-hover:translate-x-0.5') ?>
                        </button>
                        <p class="mt-3 text-[11px] text-charcoal/70">Your information is treated with full confidentiality and is never shared with third parties.</p>
                    </div>
                </form>
            </div>

            <!-- Contact Info -->
            <div class="lg:col-span-5">
                <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span class="h-px w-6 bg-gold"></span>
                    Office &amp; Contact
                </span>
                <h2 class="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                    Reach Out Directly
                </h2>
                <p class="mt-4 text-pretty text-base leading-relaxed text-charcoal/70">
                    Prefer to reach us directly? Use any of the channels below — we are responsive and happy to discuss your needs.
                </p>

                <div class="mt-8 space-y-4">
                    <!-- Office -->
                    <div class="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm hover:border-navy-deep/20 hover:shadow-md transition-all">
                        <div class="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep flex-none">
                            <?= getIcon('MapPin', 'h-5 w-5') ?>
                        </div>
                        <div class="flex-1">
                            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/70">Office</div>
                            <div class="mt-1 font-serif text-base font-semibold text-navy-deep"><?= e($contactAddress) ?></div>
                            <div class="mt-1 text-[12px] text-charcoal/70"><?= e($contactAddressDetail) ?></div>
                        </div>
                    </div>
                    <!-- Phone -->
                    <a href="tel:<?= e(preg_replace('/[^+0-9]/', '', $contactPhone)) ?>" class="block">
                        <div class="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm hover:border-navy-deep/20 hover:shadow-md transition-all">
                            <div class="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep flex-none">
                                <?= getIcon('Phone', 'h-5 w-5') ?>
                            </div>
                            <div class="flex-1">
                                <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/70">Phone</div>
                                <div class="mt-1 font-serif text-base font-semibold text-navy-deep"><?= e($contactPhone) ?></div>
                                <div class="mt-1 text-[12px] text-charcoal/70"><?= e($contactHours) ?></div>
                            </div>
                        </div>
                    </a>
                    <!-- Email -->
                    <a href="mailto:<?= e($contactEmail) ?>" class="block">
                        <div class="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm hover:border-navy-deep/20 hover:shadow-md transition-all">
                            <div class="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep flex-none">
                                <?= getIcon('Mail', 'h-5 w-5') ?>
                            </div>
                            <div class="flex-1">
                                <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/70">Email</div>
                                <div class="mt-1 font-serif text-base font-semibold text-navy-deep"><?= e($contactEmail) ?></div>
                                <div class="mt-1 text-[12px] text-charcoal/70"><?= e($contactResponseTime) ?></div>
                            </div>
                        </div>
                    </a>
                    <!-- Hours -->
                    <div class="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm hover:border-navy-deep/20 hover:shadow-md transition-all">
                        <div class="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep flex-none">
                            <?= getIcon('Clock', 'h-5 w-5') ?>
                        </div>
                        <div class="flex-1">
                            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/70">Office Hours</div>
                            <div class="mt-1 font-serif text-base font-semibold text-navy-deep"><?= e($contactHours) ?></div>
                            <div class="mt-1 text-[12px] text-charcoal/70"><?= e($contactHoursDetail) ?></div>
                        </div>
                    </div>
                </div>

                <!-- Social -->
                <div class="mt-8">
                    <h4 class="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">Follow Us</h4>
                    <div class="mt-3 flex items-center gap-2">
                        <?php if ($linkedinUrl && $linkedinUrl !== '#'): ?>
                        <a href="<?= e($linkedinUrl) ?>" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-charcoal/70 hover:border-gold hover:text-gold transition-colors">
                            <?= getIcon('Linkedin', 'h-4 w-4') ?>
                        </a>
                        <?php endif; ?>
                        <?php if ($facebookUrl && $facebookUrl !== '#'): ?>
                        <a href="<?= e($facebookUrl) ?>" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-charcoal/70 hover:border-gold hover:text-gold transition-colors">
                            <?= getIcon('Facebook', 'h-4 w-4') ?>
                        </a>
                        <?php endif; ?>
                        <?php if ($instagramUrl && $instagramUrl !== '#'): ?>
                        <a href="<?= e($instagramUrl) ?>" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-charcoal/70 hover:border-gold hover:text-gold transition-colors">
                            <?= getIcon('Instagram', 'h-4 w-4') ?>
                        </a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Map Placeholder -->
<section class="relative py-20 lg:py-24 bg-mist">
    <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-border bg-white p-8 lg:p-12 shadow-sm">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div class="lg:col-span-5">
                    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                        <span class="h-px w-6 bg-gold"></span>
                        Visit Us
                    </span>
                    <h2 class="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                        Find Us in Kathmandu
                    </h2>
                    <p class="mt-5 text-pretty text-base leading-relaxed text-charcoal/70">
                        Biztra Business Advisory is headquartered in Kathmandu, Nepal. We serve clients across the Kathmandu Valley and throughout Nepal, with engagement models that accommodate both in-person and remote collaboration.
                    </p>
                    <a href="<?= e($mapsUrl) ?>" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors">
                        <?= getIcon('MapPin', 'h-4 w-4') ?>
                        Open in Google Maps
                        <?= getIcon('ArrowRight', 'h-4 w-4') ?>
                    </a>
                </div>
                <div class="lg:col-span-7">
                    <div class="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-navy-gradient noise-overlay">
                        <div class="absolute inset-0 opacity-[0.06]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 40px 40px;"></div>
                        <!-- SVG Map Illustration -->
                        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice">
                            <path d="M0 80 L400 120" stroke="white" stroke-width="1" opacity="0.15" />
                            <path d="M0 180 L400 220" stroke="white" stroke-width="1" opacity="0.15" />
                            <path d="M80 0 L120 300" stroke="white" stroke-width="1" opacity="0.15" />
                            <path d="M240 0 L280 300" stroke="white" stroke-width="1" opacity="0.15" />
                            <path d="M0 150 Q200 100 400 180" stroke="white" stroke-width="1" opacity="0.2" fill="none" />
                        </svg>
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class="relative">
                                <div class="absolute inset-0 rounded-full bg-gold animate-ping opacity-30"></div>
                                <div class="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                                    <?= getIcon('MapPin', 'h-6 w-6') ?>
                                </div>
                            </div>
                        </div>
                        <div class="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-navy-deep/80 backdrop-blur-sm px-3.5 py-2">
                            <div class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Kathmandu</div>
                            <div class="text-[11px] text-white/85">Biztra HQ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
