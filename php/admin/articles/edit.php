<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/articles.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

if (!isLoggedIn()) {
    header('Location: /admin/login');
    exit;
}

$slug = $_GET['slug'] ?? '';
$article = $slug ? getArticleBySlugAdmin($slug) : null;
if (!$article) {
    header('Location: /admin/articles');
    exit;
}

$categories = ['Financial Advisory', 'Tax Advisory', 'Audit Advisory', 'Corporate Strategy', 'Accounting Advisory', 'Industry Insights'];

ob_start();
?>
<div class="p-6 lg:p-10 max-w-3xl">
    <div class="flex items-center gap-3 mb-8">
        <a href="/admin/articles" class="text-sm text-charcoal/50 hover:text-charcoal flex items-center gap-1.5">
            <?php echo getIcon('ArrowLeft', 'w-4 h-4'); ?> Back to Articles
        </a>
    </div>
    <h1 class="font-serif text-3xl font-semibold tracking-executive text-navy-deep mb-2">Edit Article</h1>
    <p class="text-charcoal/60 text-sm mb-8"><?php echo e($article['title']); ?></p>

    <form id="edit-form" class="space-y-6">
        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Title *</label>
                <input type="text" name="title" required value="<?php echo e($article['title']); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Slug *</label>
                <input type="text" name="slug" required value="<?php echo e($article['slug']); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
            </div>
        </div>
        <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Excerpt *</label>
            <textarea name="excerpt" rows="2" required class="w-full px-4 py-3 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"><?php echo e($article['excerpt']); ?></textarea>
        </div>
        <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Content (Markdown) *</label>
            <textarea name="content" rows="18" required class="w-full px-4 py-3 rounded-lg border border-charcoal/15 bg-white text-sm font-mono focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"><?php echo e($article['content']); ?></textarea>
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Category *</label>
                <select name="category" required class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
                    <?php foreach ($categories as $cat): ?>
                    <option value="<?php echo e($cat); ?>" <?php echo $article['category'] === $cat ? 'selected' : ''; ?>><?php echo e($cat); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Author</label>
                <input type="text" name="author" value="<?php echo e($article['author']); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
            </div>
        </div>
        <div class="grid sm:grid-cols-3 gap-5">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1.5">Read Time</label>
                <input type="text" name="read_time" value="<?php echo e($article['read_time']); ?>" class="w-full h-11 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
            </div>
            <div class="flex items-end gap-6 sm:col-span-2">
                <label class="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="published" <?php echo !empty($article['published']) ? 'checked' : ''; ?> class="w-4 h-4 accent-[var(--gold)]">
                    Published
                </label>
                <label class="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="featured" <?php echo !empty($article['featured']) ? 'checked' : ''; ?> class="w-4 h-4 accent-[var(--gold)]">
                    Featured
                </label>
            </div>
        </div>
        <div class="flex gap-3 pt-4">
            <button type="submit" class="h-11 px-6 rounded-lg bg-navy-deep text-white text-sm font-medium hover:bg-navy transition-colors">Save Changes</button>
            <a href="/admin/articles" class="h-11 px-6 rounded-lg border border-charcoal/15 text-charcoal/70 text-sm font-medium hover:bg-mist flex items-center">Cancel</a>
        </div>
    </form>
    <div id="toast" class="hidden fixed bottom-6 right-6 px-5 py-3 rounded-lg bg-navy-deep text-white text-sm shadow-warm-lg z-50"></div>
</div>
<script>
document.getElementById('edit-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const body = {
        title: fd.get('title'),
        slug: fd.get('slug'),
        excerpt: fd.get('excerpt'),
        content: fd.get('content'),
        category: fd.get('category'),
        author: fd.get('author'),
        read_time: fd.get('read_time'),
        published: this.querySelector('[name=published]').checked,
        featured: this.querySelector('[name=featured]').checked
    };
    try {
        const res = await fetch('/api/articles.php?slug=<?php echo urlencode($article['slug']); ?>', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            showToast('Article updated successfully');
            setTimeout(() => location.href = '/admin/articles', 1000);
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
adminLayout('Edit Article - Biztra Admin', 'articles', $content);
