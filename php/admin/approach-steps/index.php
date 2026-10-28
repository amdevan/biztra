<?php
/**
 * Admin Approach Steps List — /admin/approach-steps
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

$items = getAllContent('approach_step');

ob_start();
?>

<div class="flex items-center justify-between mb-8">
    <div>
        <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span class="h-px w-6 bg-gold"></span>
            Approach Steps
        </span>
        <h1 class="mt-3 font-serif tracking-executive text-3xl font-medium text-navy-deep">Approach Steps</h1>
        <p class="mt-2 text-sm text-gray-500">Manage the engagement methodology steps.</p>
    </div>
    <a href="/admin/approach-steps/new" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors">
        <?= getIcon('Plus', 'w-4 h-4') ?>
        New Step
    </a>
</div>

<?php if (empty($items)): ?>
<div class="rounded-xl border border-gray-200 bg-white p-12 text-center">
    <?= getIcon('ListOrdered', 'w-10 h-10 mx-auto text-gray-300 mb-4') ?>
    <h3 class="font-serif text-lg font-semibold text-navy-deep mb-1">No steps yet</h3>
    <p class="text-sm text-gray-500 mb-5">Get started by creating your first approach step.</p>
    <a href="/admin/approach-steps/new" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors">
        <?= getIcon('Plus', 'w-4 h-4') ?>
        Create Step
    </a>
</div>
<?php else: ?>
<div class="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-200 bg-gray-50/50">
                    <th class="text-left px-4 py-3 font-medium text-gray-500 w-16">Order</th>
                    <th class="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                    <th class="text-left px-4 py-3 font-medium text-gray-500">Slug</th>
                    <th class="text-left px-4 py-3 font-medium text-gray-500 w-24">Status</th>
                    <th class="text-right px-4 py-3 font-medium text-gray-500 w-48">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $item): ?>
                <tr class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors" data-slug="<?= e($item['slug']) ?>">
                    <td class="px-4 py-3 text-gray-600 font-mono text-xs"><?= $item['order'] ?? 0 ?></td>
                    <td class="px-4 py-3 font-medium text-gray-900"><?= e($item['title']) ?></td>
                    <td class="px-4 py-3 text-gray-500 font-mono text-xs"><?= e($item['slug']) ?></td>
                    <td class="px-4 py-3">
                        <button onclick="toggleField('approach_step', '<?= e($item['slug']) ?>', 'published', this)"
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors <?= $item['published'] ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200' ?>">
                            <span class="h-1.5 w-1.5 rounded-full <?= $item['published'] ? 'bg-emerald-500' : 'bg-gray-400' ?>"></span>
                            <?= $item['published'] ? 'Published' : 'Draft' ?>
                        </button>
                    </td>
                    <td class="px-4 py-3 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <a href="/admin/approach-steps/edit?slug=<?= e($item['slug']) ?>"
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 hover:text-navy-deep hover:bg-gray-100 transition-colors">
                                <?= getIcon('Pencil', 'w-3.5 h-3.5') ?>
                                Edit
                            </a>
                            <button onclick="deleteItem('approach_step', '<?= e($item['slug']) ?>', this)"
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors">
                                <?= getIcon('Trash2', 'w-3.5 h-3.5') ?>
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
<?php endif; ?>

<script>
function toggleField(type, slug, field, btn) {
    var isPublished = btn.classList.contains('bg-emerald-50');
    var newValue = !isPublished;
    fetch('/api/content/' + type + '/' + slug, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: newValue })
    })
    .then(function(r) { return r.json(); })
    .then(function() {
        if (newValue) {
            btn.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors bg-emerald-50 text-emerald-700 hover:bg-emerald-100';
            btn.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Published';
        } else {
            btn.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-500 hover:bg-gray-200';
            btn.innerHTML = '<span class="h-1.5 w-1.5 rounded-full bg-gray-400"></span>Draft';
        }
        showToast('Updated successfully!', 'success');
    })
    .catch(function() { showToast('Failed to update.', 'error'); });
}

function deleteItem(type, slug, btn) {
    if (!confirm('Are you sure you want to delete this item? This cannot be undone.')) return;
    fetch('/api/content/' + type + '/' + slug, { method: 'DELETE' })
    .then(function(r) {
        if (r.ok) {
            btn.closest('tr').remove();
            showToast('Deleted successfully!', 'success');
        } else {
            showToast('Failed to delete.', 'error');
        }
    })
    .catch(function() { showToast('Network error.', 'error'); });
}
</script>

<?php
$content = ob_get_clean();
adminLayout('Approach Steps', '/admin/approach-steps', $content);
?>