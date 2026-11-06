<?php
/**
 * Admin layout wrapper function
 * Used by all admin pages to render consistent chrome
 */

require_once __DIR__ . '/../includes/icons.php';
require_once __DIR__ . '/../includes/helpers.php';

function adminLayout(string $pageTitle, string $activeNav, string $content) {
    $currentPath = getCurrentPath();

    $navItems = [
        ['label' => 'Dashboard',          'href' => '/admin',               'icon' => 'LayoutDashboard'],
        ['label' => 'Site Settings',      'href' => '/admin/settings',      'icon' => 'Settings'],
        ['label' => 'About Page',         'href' => '/admin/about',         'icon' => 'FileText'],
        ['label' => 'Services',           'href' => '/admin/services',      'icon' => 'Briefcase'],
        ['label' => 'Industries',         'href' => '/admin/industries',    'icon' => 'Factory'],
        ['label' => 'Core Values',        'href' => '/admin/core-values',   'icon' => 'Scale'],
        ['label' => 'Why Choose Us',      'href' => '/admin/why-choose',    'icon' => 'Target'],
        ['label' => 'Approach Steps',     'href' => '/admin/approach-steps','icon' => 'ListOrdered'],
        ['label' => 'Team Members',       'href' => '/admin/team',          'icon' => 'Users'],
        ['label' => 'Research Articles',  'href' => '/admin/articles',      'icon' => 'BookOpen'],
    ];

    function adminIsActive(string $href): bool {
        $current = rtrim(getCurrentPath(), '/');
        $target = rtrim($href, '/');
        if ($target === '/admin') {
            return $current === '/admin';
        }
        return $current === $target || str_starts_with($current, $target . '/');
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle) ?> — Biztra Admin</title>

    <!-- normal system fonts only -->
    <style>body { font-family: Arial, Helvetica, sans-serif; }</style>

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    navy: { DEFAULT: '#093d6b', deep: '#073055', soft: '#1a5a8a' },
                    charcoal: '#1c1e26',
                    gold: { DEFAULT: '#4c855c', soft: '#3d6b49' },
                    mist: '#f5f6f8',
                    cream: '#fbfbf9',
                },
                fontFamily: {
                    sans: ['Arial', 'Helvetica', 'sans-serif'],
                    serif: ['Arial', 'Helvetica', 'sans-serif'],
                    mono: ['Consolas', 'monospace'],
                },
            }
        }
    }
    </script>

    <style>
        .tracking-executive { letter-spacing: -0.02em; }
        .scrollbar-slim::-webkit-scrollbar { width: 6px; }
        .scrollbar-slim::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-slim::-webkit-scrollbar-thumb { background: #4c855c40; border-radius: 3px; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::selection { background: rgba(19,61,92,0.15); color: #1c1e26; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes slideInRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .slide-in { animation: slideInRight 0.3s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        /* Toast styles */
        #toast-container { position: fixed; top: 1rem; right: 1rem; z-index: 9999; display: flex; flex-direction: column; gap: 0.5rem; }
        .toast { padding: 0.75rem 1.25rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: fadeIn 0.3s ease-out forwards; max-width: 24rem; }
        .toast-success { background: #059669; }
        .toast-error { background: #dc2626; }
    </style>
</head>
<body class="bg-mist font-sans text-charcoal min-h-screen flex" style="background: oklch(0.97 0.005 250);">
    <!-- Toast container -->
    <div id="toast-container"></div>

    <!-- Sidebar — Desktop -->
    <aside class="hidden lg:flex w-64 flex-none flex-col bg-white border-r border-gray-200 fixed top-0 left-0 bottom-0 z-30">
        <?php renderSidebarContent($navItems, $activeNav); ?>
    </aside>

    <!-- Sidebar — Mobile overlay -->
    <div id="mobile-sidebar-overlay" class="fixed inset-0 z-40 bg-navy-deep/40 backdrop-blur-sm lg:hidden hidden" onclick="closeMobileSidebar()"></div>
    <aside id="mobile-sidebar" class="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col hidden slide-in">
        <?php renderSidebarContent($navItems, $activeNav, true); ?>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0 lg:ml-64">
        <!-- Mobile top bar -->
        <header class="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 h-14 flex items-center justify-between px-4">
            <button type="button" onclick="openMobileSidebar()" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-gray-100 transition-colors" aria-label="Open menu">
                <?= getIcon('Menu', 'w-5 h-5') ?>
            </button>
            <a href="/admin" class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-navy-deep flex items-center justify-center">
                    <div class="flex gap-[2px] items-end h-3.5">
                        <div class="w-[3px] bg-gold/55 rounded-sm h-1.5"></div>
                        <div class="w-[3px] bg-gold/80 rounded-sm h-2.5"></div>
                        <div class="w-[3px] bg-gold rounded-sm h-3.5"></div>
                    </div>
                </div>
                <span class="font-serif text-sm font-semibold text-navy-deep">Admin</span>
            </a>
            <a href="/" target="_blank" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-gray-100 transition-colors" aria-label="View site">
                <?= getIcon('ArrowRight', 'w-4 h-4') ?>
            </a>
        </header>

        <!-- Page content -->
        <main class="flex-1 overflow-x-hidden p-6 lg:p-10 fade-in">
            <?= $content ?>
        </main>
    </div>

    <script>
    function openMobileSidebar() {
        document.getElementById('mobile-sidebar').classList.remove('hidden');
        document.getElementById('mobile-sidebar-overlay').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    function closeMobileSidebar() {
        document.getElementById('mobile-sidebar').classList.add('hidden');
        document.getElementById('mobile-sidebar-overlay').classList.add('hidden');
        document.body.style.overflow = '';
    }
    function showToast(message, type) {
        var container = document.getElementById('toast-container');
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || 'success');
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(function() { toast.remove(); }, 300);
        }, 3500);
    }
    </script>
</body>
</html>
<?php
}

function renderSidebarContent(array $navItems, string $activeNav, bool $isMobile = false) {
?>
    <!-- Brand header -->
    <div class="h-16 flex items-center justify-between px-5 border-b border-gray-200">
        <a href="/admin" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-navy-deep flex items-center justify-center">
                <div class="flex gap-[2px] items-end h-3.5">
                    <div class="w-[3px] bg-gold/55 rounded-sm h-1.5"></div>
                    <div class="w-[3px] bg-gold/80 rounded-sm h-2.5"></div>
                    <div class="w-[3px] bg-gold rounded-sm h-3.5"></div>
                </div>
            </div>
            <div class="flex flex-col leading-none">
                <span class="font-serif text-base font-semibold text-navy-deep">Biztra</span>
                <span class="text-[9px] font-medium uppercase tracking-[0.22em] text-gold mt-0.5">Admin</span>
            </div>
        </a>
        <?php if ($isMobile): ?>
        <button type="button" onclick="closeMobileSidebar()" class="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <?= getIcon('X', 'w-5 h-5') ?>
        </button>
        <?php endif; ?>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto scrollbar-slim p-3" aria-label="Admin navigation">
        <ul class="space-y-0.5">
            <?php foreach ($navItems as $item): ?>
            <li>
                <?php
                $active = adminIsActive($item['href']);
                $activeClass = $active ? 'bg-navy-deep text-white' : 'text-gray-500 hover:text-navy-deep hover:bg-gray-50';
                ?>
                <a href="<?= e($item['href']) ?>" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors <?= $activeClass ?>">
                    <?= getIcon($item['icon'], 'h-4 w-4 flex-none') ?>
                    <span class="truncate"><?= e($item['label']) ?></span>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
    </nav>

    <!-- Footer actions -->
    <div class="p-3 border-t border-gray-200 space-y-1">
        <a href="/" target="_blank" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-navy-deep hover:bg-gray-50 transition-colors">
            <?= getIcon('ArrowRight', 'h-4 w-4 flex-none') ?>
            View Live Site
        </a>
        <button type="button" onclick="handleSignOut()" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
            <?= getIcon('LogOut', 'h-4 w-4 flex-none') ?>
            Sign Out
        </button>
    </div>

    <script>
    function handleSignOut() {
        fetch('/api/auth/logout', { method: 'POST' }).then(function() {
            window.location.href = '/admin/login';
        });
    }
    </script>
<?php
}
