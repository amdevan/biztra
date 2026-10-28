<?php
/**
 * Admin Edit Industry — /admin/industries/edit?slug=...
 */
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/content.php';
require_once __DIR__ . '/../../includes/articles.php';
require_once __DIR__ . '/../../includes/helpers.php';
require_once __DIR__ . '/../../includes/icons.php';
require_once __DIR__ . '/layout.php';

$currentPath = getCurrentPath();
if ($currentPath !== '/admin/login' && !isLoggedIn()) {
    header('Location: /admin/login');
    exit;
}

$slug = $_GET['slug'] ?? '';
if (!$slug) {
    header('Location: /admin/industries');
    exit;
}

$item = getContentItem('industry', $slug, true);
if (!$item) {
    header('Location: /admin/industries');
    exit;
}

$data = $item['data'] ?? [];
$availableIcons = [
    'Briefcase', 'TrendingUp', 'Shield', 'Calculator', 'FileText', 'DollarSign',
    'PieChart', 'Target', 'CheckSquare', 'Award', 'Users', 'BookOpen', 'Globe',
    'Factory', 'GraduationCap', 'Heart', 'Cpu', 'Zap', 'Headphones', 'Settings',
    'Book', 'Scale', 'ListOrdered', 'MapPin', 'Phone', 'Mail', 'Clock',
    'ArrowRight', 'Lightbulb', 'Presentation', 'Handshake',
];

$services = $data['services'] ?? '';
if (is_array($services)) {
    $services = implode(', ', $services);
}

ob_start();
?>

<div class="mb-8">
    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        <span class="h-px w-6 bg-gold"></span>
        Industries
    </span>
    <h1 class="mt-3 font-serif tracking-executive text-3xl font-medium text-navy-deep">Edit Industry</h1>
    <p class="mt-2 text-sm text-gray-500">Editing: <span class="font-medium text-gray-700"><?= e($item['title']) ?></span></p>
</div>

<form id="editForm" onsubmit="handleUpdate(event)">
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Basic Information</h2>
        <div class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Title <span class="text-red-500">*</span></label>
                    <input type="text" name="title" value="<?= e($item['title']) ?>" required
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                    <input type="text" value="<?= e($item['slug']) ?>" disabled
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 bg-gray-50 font-mono">
                    <p class="mt-1 text-xs text-gray-400">Slug cannot be changed after creation.</p>
                </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Icon</label>
                    <select name="icon"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors bg-white">
                        <?php foreach ($availableIcons as $icon): ?>
                        <option value="<?= e($icon) ?>" <?= ($item['icon'] ?? '') === $icon ? 'selected' : '' ?>><?= e($icon) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Order</label>
                    <input type="number" name="order" value="<?= $item['order'] ?? 0 ?>" min="0"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div class="flex items-end gap-5">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="published" value="1" <?= $item['published'] ? 'checked' : '' ?> class="w-4 h-4 rounded border-gray-300 text-navy-deep focus:ring-navy-deep/20">
                        <span class="text-sm font-medium text-gray-700">Published</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="featured" value="1" <?= $item['featured'] ? 'checked' : '' ?> class="w-4 h-4 rounded border-gray-300 text-navy-deep focus:ring-navy-deep/20">
                        <span class="text-sm font-medium text-gray-700">Featured</span>
                    </label>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
                <textarea name="short_description" rows="2"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($data['short_description'] ?? '') ?></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Description</label>
                <textarea name="full_description" rows="5"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"><?= e($data['full_description'] ?? '') ?></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Services <span class="text-gray-400 font-normal">(comma-separated)</span></label>
                <input type="text" name="services" value="<?= e($services) ?>"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
        </div>
    </div>

    <div class="flex items-center justify-end gap-4">
        <a href="/admin/industries" class="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</a>
        <button type="submit" id="save-btn"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-deep/30 focus:ring-offset-2">
            <?= getIcon('Settings', 'w-4 h-4') ?>
            Save Changes
        </button>
    </div>
</form>

<script>
function handleUpdate(e) {
    e.preventDefault();
    var form = document.getElementById('editForm');
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });
    data.published = form.querySelector('input[name="published"]').checked;
    data.featured = form.querySelector('input[name="featured"]').checked;

    var btn = document.getElementById('save-btn');
    btn.disabled = true;
    btn.style.opacity = '0.6';

    fetch('/api/content/industry/<?= e($item['slug']) ?>', {
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
            showToast('Industry updated successfully!', 'success');
        } else {
            showToast(result.data.message || result.data.error || 'Failed to update.', 'error');
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
adminLayout('Edit Industry', '/admin/industries', $content);
?>