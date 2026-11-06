<?php
/**
 * Admin New Team Member — /admin/team/new
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

$availableIcons = [
    'Briefcase', 'TrendingUp', 'Shield', 'Calculator', 'FileText', 'DollarSign',
    'PieChart', 'Target', 'CheckSquare', 'Award', 'Users', 'BookOpen', 'Globe',
    'Factory', 'GraduationCap', 'Heart', 'Cpu', 'Zap', 'Headphones', 'Settings',
    'Book', 'Scale', 'ListOrdered', 'MapPin', 'Phone', 'Mail', 'Clock',
    'ArrowRight', 'Lightbulb', 'Presentation', 'Handshake',
];

ob_start();
?>

<div class="mb-8">
    <span class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        <span class="h-px w-6 bg-gold"></span>
        Team Members
    </span>
    <h1 class="mt-3 font-serif tracking-executive text-3xl font-medium text-navy-deep">New Team Member</h1>
    <p class="mt-2 text-sm text-gray-500">Create a new team member profile.</p>
</div>

<form id="createForm" onsubmit="handleCreate(event)">
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="font-serif text-lg font-semibold text-navy-deep mb-5">Basic Information</h2>
        <div class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Title <span class="text-red-500">*</span></label>
                    <input type="text" name="title" id="title" required oninput="autoSlug(this.value)"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors"
                        placeholder="e.g. Rajesh Kumar Shrestha">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Slug <span class="text-red-500">*</span></label>
                    <input type="text" name="slug" id="slug" required
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors"
                        placeholder="auto-generated-from-title">
                </div>
            </div>
            <div class="grid sm:grid-cols-4 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Icon</label>
                    <select name="icon"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors bg-white">
                        <?php foreach ($availableIcons as $icon): ?>
                        <option value="<?= e($icon) ?>"><?= e($icon) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Order</label>
                    <input type="number" name="order" value="0" min="0"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="flex items-center gap-2 cursor-pointer mt-7">
                        <input type="checkbox" name="published" value="1" checked class="w-4 h-4 rounded border-gray-300 text-navy-deep focus:ring-navy-deep/20">
                        <span class="text-sm font-medium text-gray-700">Published</span>
                    </label>
                </div>
                <div>
                    <label class="flex items-center gap-2 cursor-pointer mt-7">
                        <input type="checkbox" name="featured" value="1" class="w-4 h-4 rounded border-gray-300 text-navy-deep focus:ring-navy-deep/20">
                        <span class="text-sm font-medium text-gray-700">Featured</span>
                    </label>
                </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                    <input type="text" name="subtitle" placeholder="e.g. Senior Partner"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Initials</label>
                    <input type="text" name="initials" placeholder="e.g. RKS"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                    <input type="text" name="role" placeholder="e.g. Partner"
                        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Designation</label>
                <input type="text" name="designation" placeholder="e.g. FCA, ACCA"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                <textarea name="bio" rows="4"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"
                    placeholder="Brief biography"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Expertise <span class="text-gray-400 font-normal">(one per line)</span></label>
                <textarea name="expertise" rows="4"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"
                    placeholder="Tax Advisory&#10;Financial Planning&#10;Audit"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Highlights <span class="text-gray-400 font-normal">(format: "Label: Value" one per line)</span></label>
                <textarea name="highlights" rows="4"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors resize-y"
                    placeholder="Experience: 15+ years&#10;Specialization: Tax Advisory&#10;Certification: FCA"></textarea>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-end gap-4">
        <a href="/admin/team" class="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</a>
        <button type="submit" id="save-btn"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-deep/30 focus:ring-offset-2">
            <?= getIcon('Plus', 'w-4 h-4') ?>
            Create Team Member
        </button>
    </div>
</form>

<script>
function autoSlug(title) {
    var slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    document.getElementById('slug').value = slug;
}

function handleCreate(e) {
    e.preventDefault();
    var form = document.getElementById('createForm');
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

    fetch('/api/content/team_member', {
        method: 'POST',
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
            showToast('Team member created successfully!', 'success');
            setTimeout(function() { window.location.href = '/admin/team'; }, 1000);
        } else {
            showToast(result.data.message || result.data.error || 'Failed to create.', 'error');
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
adminLayout('New Team Member', '/admin/team', $content);
?>