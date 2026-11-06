<?php
/**
 * Admin Site Settings — /admin/settings
 */
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/content.php';
require_once __DIR__ . '/../../includes/articles.php';
require_once __DIR__ . '/../../includes/helpers.php';
require_once __DIR__ . '/../../includes/icons.php';
require_once __DIR__ . '/../layout.php';

$currentPath = getCurrentPath();
if ($currentPath !== '/admin/login' && !isLoggedIn()) {
    header('Location: /admin/login');
    exit;
}

$settings = getSiteSettings() ?? [];

$brandName = $settings['brand_name'] ?? 'Biztra';
$brandTagline = $settings['brand_tagline'] ?? 'Business Advisory';
$heroEyebrow = $settings['hero_eyebrow'] ?? 'Kathmandu · Nepal · Est. 2023';
$heroHeadline = $settings['hero_headline'] ?? '';
$heroSubtitle = $settings['hero_subtitle'] ?? '';
$heroPrimaryCta = $settings['hero_primary_cta'] ?? 'Book a Consultation';
$heroSecondaryCta = $settings['hero_secondary_cta'] ?? 'Explore Our Services';
$heroStat1Value = $settings['hero_stat1_value'] ?? '6+';
$heroStat1Label = $settings['hero_stat1_label'] ?? 'Years Professional Experience';
$heroStat2Value = $settings['hero_stat2_value'] ?? '9';
$heroStat2Label = $settings['hero_stat2_label'] ?? 'Service Verticals';
$heroStat3Value = $settings['hero_stat3_value'] ?? '8+';
$heroStat3Label = $settings['hero_stat3_label'] ?? 'Industries Served';
$heroStat4Value = $settings['hero_stat4_value'] ?? '100%';
$heroStat4Label = $settings['hero_stat4_label'] ?? 'Nepal-Focused Advisory';
$footerTagline = $settings['footer_tagline'] ?? '';
$footerDescription = $settings['footer_description'] ?? '';
$contactPhone = $settings['contact_phone'] ?? '';
$contactEmail = $settings['contact_email'] ?? '';
$contactAddress = $settings['contact_address'] ?? '';
$contactAddressDetail = $settings['contact_address_detail'] ?? '';
$contactHours = $settings['contact_hours'] ?? '';
$contactHoursDetail = $settings['contact_hours_detail'] ?? '';
$contactResponseTime = $settings['contact_response_time'] ?? '';
$mapsUrl = $settings['maps_url'] ?? '';
$linkedinUrl = $settings['linkedin_url'] ?? '';
$facebookUrl = $settings['facebook_url'] ?? '';
$instagramUrl = $settings['instagram_url'] ?? '';

ob_start();
?>

<div class="mb-8">
    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        <span class="h-px w-6 bg-gold"></span>
        Site Settings
    </span>
    <h1 class="mt-3 font-serif tracking-executive text-3xl font-medium text-navy-deep">Site Settings</h1>
    <p class="mt-2 text-sm text-gray-500">Configure brand, hero section, contact info, and footer across the website.</p>
</div>

<form id="settingsForm" onsubmit="handleSave(event)">
    <!-- Brand Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Brand</h2>
        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Brand Name</label>
                <input type="text" name="brand_name" value="<?= e($brandName) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Brand Tagline</label>
                <input type="text" name="brand_tagline" value="<?= e($brandTagline) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
        </div>
    </div>

    <!-- Hero Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Hero Section</h2>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Eyebrow Text</label>
                <input type="text" name="hero_eyebrow" value="<?= e($heroEyebrow) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Headline</label>
                <input type="text" name="hero_headline" value="<?= e($heroHeadline) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                <textarea name="hero_subtitle" rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($heroSubtitle) ?></textarea>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Primary CTA</label>
                    <input type="text" name="hero_primary_cta" value="<?= e($heroPrimaryCta) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Secondary CTA</label>
                    <input type="text" name="hero_secondary_cta" value="<?= e($heroSecondaryCta) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <!-- Stats -->
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 1 Value</label>
                    <input type="text" name="hero_stat1_value" value="<?= e($heroStat1Value) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 1 Label</label>
                    <input type="text" name="hero_stat1_label" value="<?= e($heroStat1Label) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 2 Value</label>
                    <input type="text" name="hero_stat2_value" value="<?= e($heroStat2Value) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 2 Label</label>
                    <input type="text" name="hero_stat2_label" value="<?= e($heroStat2Label) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 3 Value</label>
                    <input type="text" name="hero_stat3_value" value="<?= e($heroStat3Value) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 3 Label</label>
                    <input type="text" name="hero_stat3_label" value="<?= e($heroStat3Label) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 4 Value</label>
                    <input type="text" name="hero_stat4_value" value="<?= e($heroStat4Value) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Stat 4 Label</label>
                    <input type="text" name="hero_stat4_label" value="<?= e($heroStat4Label) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
        </div>
    </div>

    <!-- Contact Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Contact</h2>
        <div class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input type="text" name="contact_phone" value="<?= e($contactPhone) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" name="contact_email" value="<?= e($contactEmail) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                    <input type="text" name="contact_address" value="<?= e($contactAddress) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Address Detail</label>
                    <input type="text" name="contact_address_detail" value="<?= e($contactAddressDetail) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Hours</label>
                    <input type="text" name="contact_hours" value="<?= e($contactHours) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Hours Detail</label>
                    <input type="text" name="contact_hours_detail" value="<?= e($contactHoursDetail) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Response Time</label>
                <input type="text" name="contact_response_time" value="<?= e($contactResponseTime) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Maps URL</label>
                <input type="url" name="maps_url" value="<?= e($mapsUrl) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
        </div>
    </div>

    <!-- Footer Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Footer</h2>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Footer Tagline</label>
                <input type="text" name="footer_tagline" value="<?= e($footerTagline) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Footer Description</label>
                <textarea name="footer_description" rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($footerDescription) ?></textarea>
            </div>
            <div class="grid sm:grid-cols-3 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL</label>
                    <input type="url" name="linkedin_url" value="<?= e($linkedinUrl) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Facebook URL</label>
                    <input type="url" name="facebook_url" value="<?= e($facebookUrl) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Instagram URL</label>
                    <input type="url" name="instagram_url" value="<?= e($instagramUrl) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
        </div>
    </div>

    <!-- Submit -->
    <div class="flex items-center justify-end gap-4">
        <a href="/admin" class="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</a>
        <button type="submit" id="save-btn"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-deep/30 focus:ring-offset-2">
            <?= getIcon('Settings', 'w-4 h-4') ?>
            Save Settings
        </button>
    </div>
</form>

<script>
function handleSave(e) {
    e.preventDefault();
    var form = document.getElementById('settingsForm');
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    var btn = document.getElementById('save-btn');
    btn.disabled = true;
    btn.style.opacity = '0.6';

    fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        return response.json().then(function(result) {
            return { ok: response.ok, data: result };
        });
    })
    .then(function(result) {
        btn.disabled = false;
        btn.style.opacity = '1';
        if (result.ok) {
            showToast('Settings saved successfully!', 'success');
        } else {
            showToast(result.data.message || 'Failed to save settings.', 'error');
        }
    })
    .catch(function() {
        btn.disabled = false;
        btn.style.opacity = '1';
        showToast('Network error. Please try again.', 'error');
    });
}
</script>

<?php
$content = ob_get_clean();
adminLayout('Site Settings', '/admin/settings', $content);
?>
