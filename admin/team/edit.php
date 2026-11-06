<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/content.php';
require_once __DIR__ . '/../../includes/helpers.php';
require_once __DIR__ . '/../../includes/icons.php';

if (!isLoggedIn()) {
    header('Location: /admin/login');
    exit;
}

$slug = $_GET['slug'] ?? '';
$item = $slug ? getContentItem('team_member', $slug, true) : null;
if (!$item) {
    header('Location: /admin/team');
    exit;
}

$data = $item['data'] ?? [];
$highlights = $data['highlights'] ?? [];
$highlinesStr = '';
foreach ($highlights as $h) {
    $highlinesStr .= ($h['label'] ?? '') . ': ' . ($h['value'] ?? '') . "\n";
}
$expertiseStr = implode("\n", $data['expertise'] ?? []);

ob_start();
?>
<div class="p-6 lg:p-10 max-w-3xl">
    <div class="flex items-center gap-3 mb-8">
        <a href="/admin/team" class="text-sm text-charcoal/50 hover:text-charcoal flex items-center gap-1.5">
            <?php echo getIcon('ArrowLeft', 'w-4 h-4'); ?> Back to Team
        </a>
    </div>
    <h1 class="font-serif text-3xl font-semibold tracking-executive text-navy-deep mb-2">Edit Team Member</h1>
    <p class="text-charcoal/60 text-sm mb-8"><?php echo e($item['title']); ?></p>

    <form id="edit-form" class="space-y-6">
        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Name *</label>
                <input type="text" name="title" required value="<?php echo e($item['title']); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Slug *</label>
                <input type="text" name="slug" required value="<?php echo e($item['slug']); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Subtitle</label>
                <input type="text" name="subtitle" value="<?php echo e($item['subtitle'] ?? ''); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Initials</label>
                <input type="text" name="initials" maxlength="3" value="<?php echo e($data['initials'] ?? ''); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm uppercase focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Role</label>
                <input type="text" name="role" value="<?php echo e($data['role'] ?? ''); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Designation</label>
                <input type="text" name="designation" value="<?php echo e($data['designation'] ?? ''); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
        </div>
        <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Bio</label>
            <textarea name="description" rows="6" class="w-full px-4 py-3 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"><?php echo e($item['description'] ?? ''); ?></textarea>
        </div>
        <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Expertise (one per line)</label>
            <textarea name="expertise" rows="4" class="w-full px-4 py-3 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"><?php echo e($expertiseStr); ?></textarea>
        </div>
        <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Highlights (format: "Label: Value", one per line)</label>
            <textarea name="highlights" rows="4" class="w-full px-4 py-3 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"><?php echo e($highlinesStr); ?></textarea>
        </div>
        <div class="grid sm:grid-cols-3 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Icon</label>
                <select name="icon_name" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
                    <?php foreach (getIconNames() as $ic): ?>
                    <option value="<?php echo $ic; ?>" <?php echo ($item['icon_name'] ?? '') === $ic ? 'selected' : ''; ?>><?php echo $ic; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Order</label>
                <input type="number" name="item_order" value="<?php echo (int)($item['item_order'] ?? 0); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
            </div>
            <div class="flex items-end gap-6">
                <label class="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="published" <?php echo !empty($item['published']) ? 'checked' : ''; ?> class="w-4 h-4 accent-[var(--gold)]">
                    Published
                </label>
                <label class="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="featured" <?php echo !empty($item['featured']) ? 'checked' : ''; ?> class="w-4 h-4 accent-[var(--gold)]">
                    Featured
                </label>
            </div>
        </div>
        <div class="flex gap-3 pt-4">
            <button type="submit" class="h-11 px-6 rounded-lg bg-navy-deep text-white text-sm font-medium hover:bg-navy transition-colors">Save Changes</button>
            <a href="/admin/team" class="h-11 px-6 rounded-lg border border-charcoal/15 text-charcoal/70 text-sm font-medium hover:bg-mist flex items-center">Cancel</a>
        </div>
    </form>
    <div id="toast" class="hidden fixed bottom-6 right-6 px-5 py-3 rounded-lg bg-navy-deep text-white text-sm shadow-warm-lg z-50"></div>
</div>
<script>
document.getElementById('edit-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const highlights = fd.get('highlights').split('\n').map(s => s.trim()).filter(Boolean).map(line => {
        const idx = line.indexOf(':');
        return idx > 0 ? { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() } : { label: line, value: '' };
    });
    const expertise = fd.get('expertise').split('\n').map(s => s.trim()).filter(Boolean);
    const body = {
        title: fd.get('title'),
        slug: fd.get('slug'),
        subtitle: fd.get('subtitle'),
        description: fd.get('description'),
        icon_name: fd.get('icon_name'),
        item_order: parseInt(fd.get('item_order')) || 0,
        published: this.querySelector('[name=published]').checked,
        featured: this.querySelector('[name=featured]').checked,
        data: {
            initials: fd.get('initials'),
            role: fd.get('role'),
            designation: fd.get('designation'),
            expertise,
            highlights
        }
    };
    try {
        const res = await fetch('/api/content/item.php?type=team_member&slug=<?php echo urlencode($item['slug']); ?>', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            showToast('Team member updated successfully');
            setTimeout(() => location.href = '/admin/team', 1000);
        } else {
            const err = await res.json().catch(() => ({}));
            showToast(err.error || 'Failed to update', true);
        }
    } catch (err) {
        showToast('Network error', true);
    }
});
function showToast(msg, isError) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    if (isError) t.style.background = '#b91c1c';
    setTimeout(() => t.classList.add('hidden'), 3000);
}
</script>
<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';
adminLayout('Edit Team Member - Biztra Admin', 'team', $content);
