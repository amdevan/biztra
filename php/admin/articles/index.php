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

$articles = getAllArticles();
$categories = getPublishedCategories();

ob_start();
?>
<div class="p-6 lg:p-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="font-serif text-3xl font-semibold tracking-executive text-navy-deep">Research Articles</h1>
            <p class="text-charcoal/60 text-sm mt-1"><?php echo count($articles); ?> articles total</p>
        </div>
        <a href="/admin/articles/new" class="h-10 px-5 rounded-lg bg-navy-deep text-white text-sm font-medium hover:bg-navy transition-colors flex items-center gap-2">
            <?php echo getIcon('Plus', 'w-4 h-4'); ?> New Article
        </a>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" id="search" placeholder="Search articles..." class="h-10 px-4 rounded-lg border border-charcoal/15 bg-white text-sm w-full sm:max-w-xs focus:outline-none focus:border-gold">
        <select id="category-filter" class="h-10 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
            <option value="">All Categories</option>
            <?php foreach ($categories as $cat): ?>
            <option value="<?php echo e($cat); ?>"><?php echo e($cat); ?></option>
            <?php endforeach; ?>
        </select>
        <select id="status-filter" class="h-10 px-4 rounded-lg border border-charcoal/15 bg-white text-sm focus:outline-none focus:border-gold">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="featured">Featured</option>
        </select>
    </div>

    <div class="bg-white rounded-xl border border-charcoal/10 overflow-hidden shadow-warm">
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-charcoal/10 bg-mist/50">
                    <th class="text-left px-5 py-3 font-semibold text-charcoal/70">Title</th>
                    <th class="text-left px-5 py-3 font-semibold text-charcoal/70 hidden md:table-cell">Category</th>
                    <th class="text-left px-5 py-3 font-semibold text-charcoal/70 hidden lg:table-cell">Status</th>
                    <th class="text-right px-5 py-3 font-semibold text-charcoal/70">Actions</th>
                </tr>
            </thead>
            <tbody id="articles-tbody">
                <?php foreach ($articles as $a): ?>
                <tr class="border-b border-charcoal/5 hover:bg-mist/30" data-title="<?php echo e(strtolower($a['title'])); ?>" data-category="<?php echo e($a['category']); ?>" data-published="<?php echo $a['published'] ? '1' : '0'; ?>" data-featured="<?php echo $a['featured'] ? '1' : '0'; ?>">
                    <td class="px-5 py-4">
                        <a href="/admin/articles/edit?slug=<?php echo e($a['slug']); ?>" class="font-medium text-navy-deep hover:text-gold transition-colors"><?php echo e($a['title']); ?></a>
                        <p class="text-xs text-charcoal/40 mt-0.5">/<?php echo e($a['slug']); ?></p>
                    </td>
                    <td class="px-5 py-4 hidden md:table-cell">
                        <span class="inline-flex px-2.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium"><?php echo e($a['category']); ?></span>
                    </td>
                    <td class="px-5 py-4 hidden lg:table-cell">
                        <div class="flex gap-2">
                            <button onclick="toggleField('<?php echo e($a['slug']); ?>', 'published', <?php echo $a['published'] ? 'false' : 'true'; ?>)" class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer <?php echo $a['published'] ? 'bg-emerald-100 text-emerald-700' : 'bg-charcoal/10 text-charcoal/50'; ?>">
                                <?php echo $a['published'] ? 'Published' : 'Draft'; ?>
                            </button>
                            <button onclick="toggleField('<?php echo e($a['slug']); ?>', 'featured', <?php echo $a['featured'] ? 'false' : 'true'; ?>)" class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer <?php echo $a['featured'] ? 'bg-gold/20 text-gold' : 'bg-charcoal/10 text-charcoal/40'; ?>">
                                <?php echo $a['featured'] ? 'Featured' : '—'; ?>
                            </button>
                        </div>
                    </td>
                    <td class="px-5 py-4 text-right">
                        <div class="flex justify-end gap-2">
                            <a href="/admin/articles/edit?slug=<?php echo e($a['slug']); ?>" class="h-8 w-8 rounded-md border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:text-gold hover:border-gold transition-colors" title="Edit">
                                <?php echo getIcon('Pencil', 'w-4 h-4'); ?>
                            </a>
                            <button onclick="deleteArticle('<?php echo e($a['slug']); ?>', '<?php echo e(addslashes($a['title'])); ?>')" class="h-8 w-8 rounded-md border border-charcoal/10 flex items-center justify-center text-charcoal/50 hover:text-red-600 hover:border-red-300 transition-colors" title="Delete">
                                <?php echo getIcon('Trash2', 'w-4 h-4'); ?>
                            </button>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php if (empty($articles)): ?>
        <div class="p-12 text-center text-charcoal/40 text-sm">No articles yet. Create your first article.</div>
        <?php endif; ?>
    </div>
</div>
<script>
document.getElementById('search').addEventListener('input', filterRows);
document.getElementById('category-filter').addEventListener('change', filterRows);
document.getElementById('status-filter').addEventListener('change', filterRows);

function filterRows() {
    const q = document.getElementById('search').value.toLowerCase();
    const cat = document.getElementById('category-filter').value;
    const status = document.getElementById('status-filter').value;
    document.querySelectorAll('#articles-tbody tr').forEach(tr => {
        const matchQ = !q || tr.dataset.title.includes(q);
        const matchCat = !cat || tr.dataset.category === cat;
        let matchStatus = true;
        if (status === 'published') matchStatus = tr.dataset.published === '1';
        else if (status === 'draft') matchStatus = tr.dataset.published === '0';
        else if (status === 'featured') matchStatus = tr.dataset.featured === '1';
        tr.style.display = matchQ && matchCat && matchStatus ? '' : 'none';
    });
}

async function toggleField(slug, field, value) {
    try {
        const res = await fetch('/api/articles.php?slug=' + encodeURIComponent(slug), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [field]: value })
        });
        if (res.ok) location.reload();
        else alert('Failed to update');
    } catch (e) { alert('Network error'); }
}

async function deleteArticle(slug, title) {
    if (!confirm('Delete "' + title + '"? This cannot be undone.')) return;
    try {
        const res = await fetch('/api/articles.php?slug=' + encodeURIComponent(slug), { method: 'DELETE' });
        if (res.ok) location.reload();
        else alert('Failed to delete');
    } catch (e) { alert('Network error'); }
}
</script>
<?php
$content = ob_get_clean();
require_once __DIR__ . '/layout.php';
adminLayout('Research Articles - Biztra Admin', 'articles', $content);
