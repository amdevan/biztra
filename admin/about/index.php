<?php
/**
 * Admin About Page — /admin/about
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

$about = getAboutContent() ?? [];

$getField = function($key, $default = '') use ($about) {
    return $about[$key] ?? $default;
};

ob_start();
?>

<div class="mb-8">
    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        <span class="h-px w-6 bg-gold"></span>
        About Page
    </span>
    <h1 class="mt-3 font-serif tracking-executive text-3xl font-medium text-navy-deep">About Page Content</h1>
    <p class="mt-2 text-sm text-gray-500">Manage the story, vision, mission, and section headings for the About page.</p>
</div>

<form id="aboutForm" onsubmit="handleSave(event)">
    <!-- Story Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Story</h2>
        <div class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Eyebrow</label>
                    <input type="text" name="story_eyebrow" value="<?= e($getField('story_eyebrow', 'Who We Are')) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Heading</label>
                    <input type="text" name="story_heading" value="<?= e($getField('story_heading')) ?>"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <?php for ($i = 1; $i <= 4; $i++): ?>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Paragraph <?= $i ?></label>
                <textarea name="story_paragraph<?= $i ?>" rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('story_paragraph' . $i)) ?></textarea>
            </div>
            <?php endfor; ?>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Quote</label>
                <textarea name="story_quote" rows="2"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('story_quote')) ?></textarea>
            </div>
        </div>
    </div>

    <!-- Vision Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Vision</h2>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Eyebrow</label>
                <input type="text" name="vision_eyebrow" value="<?= e($getField('vision_eyebrow', 'Our Vision')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Vision Text</label>
                <textarea name="vision_text" rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('vision_text')) ?></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Vision Context</label>
                <textarea name="vision_context" rows="2"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('vision_context')) ?></textarea>
            </div>
        </div>
    </div>

    <!-- Mission Section -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Mission</h2>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Eyebrow</label>
                <input type="text" name="mission_eyebrow" value="<?= e($getField('mission_eyebrow', 'Our Mission')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Heading</label>
                <input type="text" name="mission_heading" value="<?= e($getField('mission_heading')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Mission Text</label>
                <textarea name="mission_text" rows="4"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('mission_text')) ?></textarea>
            </div>
        </div>
    </div>

    <!-- Core Values Section Heading -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Core Values Section</h2>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Eyebrow</label>
                <input type="text" name="core_values_eyebrow" value="<?= e($getField('core_values_eyebrow', 'Core Values')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Heading</label>
                <input type="text" name="core_values_heading" value="<?= e($getField('core_values_heading')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                <textarea name="core_values_subtitle" rows="2"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('core_values_subtitle')) ?></textarea>
            </div>
        </div>
    </div>

    <!-- Why Choose Section Heading -->
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Why Choose Us Section</h2>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Eyebrow</label>
                <input type="text" name="why_choose_eyebrow" value="<?= e($getField('why_choose_eyebrow', 'Why Choose Us')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Heading</label>
                <input type="text" name="why_choose_heading" value="<?= e($getField('why_choose_heading')) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                <textarea name="why_choose_subtitle" rows="2"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($getField('why_choose_subtitle')) ?></textarea>
            </div>
        </div>
    </div>

    <!-- Submit -->
    <div class="flex items-center justify-end gap-4">
        <a href="/admin" class="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</a>
        <button type="submit" id="save-btn"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-deep/30 focus:ring-offset-2">
            <?= getIcon('FileText', 'w-4 h-4') ?>
            Save About Content
        </button>
    </div>
</form>

<script>
function handleSave(e) {
    e.preventDefault();
    var form = document.getElementById('aboutForm');
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    var btn = document.getElementById('save-btn');
    btn.disabled = true;
    btn.style.opacity = '0.6';

    fetch('/api/about', {
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
            showToast('About content saved successfully!', 'success');
        } else {
            showToast(result.data.message || result.data.error || 'Failed to save.', 'error');
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
adminLayout('About Page', '/admin/about', $content);
?>
