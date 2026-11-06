<?php
// site header - nav etc. needs $pageTitle

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$settings = getSiteSettings();
$brandName = $settings['brand_name'] ?? 'Biztra';
$brandTagline = $settings['brand_tagline'] ?? 'Business Advisory';
$pageTitle = $pageTitle ?? 'Biztra Business Advisory';
$pageDescription = $pageDescription ?? 'Professional business advisory, audit, accounting, and consulting services in Nepal.';
$currentPath = getCurrentPath();
$isHome = $currentPath === '/';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= e($pageDescription) ?>">
    <title><?= e($pageTitle) ?></title>

    <!-- normal system fonts only, no fancy web fonts -->
    <style>body{font-family: Arial, Helvetica, sans-serif;}</style>

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
                    hand: ['Arial', 'Helvetica', 'sans-serif'],
                },
            }
        }
    }
    </script>

    <style>
        /* Custom utilities matching the original project */
        .tracking-executive { letter-spacing: -0.02em; }
        /* scrolled home header turns white, text goes dark */
        #site-header.header-solid { background: rgba(255,255,255,0.96); box-shadow: 0 1px 0 0 rgba(15,39,71,0.08); }
        #site-header.header-solid .header-brand { color: #073055 !important; }
        #site-header.header-solid nav a, #site-header.header-solid #mobile-menu-btn { color: #1c1e26 !important; }
        .border-hairline { border-width: 0.5px; }
        .shadow-warm { box-shadow: 0 1px 3px rgba(15,39,71,0.06), 0 4px 12px rgba(15,39,71,0.04); }
        .shadow-warm-lg { box-shadow: 0 4px 12px rgba(15,39,71,0.08), 0 12px 40px rgba(15,39,71,0.06); }
        .bg-navy-gradient {
            background: linear-gradient(135deg, #0c3559 0%, #133d5c 50%, #183f58 100%);
        }
        .noise-overlay { position: relative; }
        .noise-overlay::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: overlay;
        }
        .approach-line {
            background: linear-gradient(to right, transparent, #4c855c40, #4c855c80, #4c855c40, transparent);
        }
        .scrollbar-slim::-webkit-scrollbar { width: 6px; }
        .scrollbar-slim::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-slim::-webkit-scrollbar-thumb { background: #4c855c40; border-radius: 3px; }

        .gold-underline { position: relative; }
        .gold-underline::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -6px;
            width: 2.5rem;
            height: 2px;
            background: #4c855c;
            border-radius: 1px;
        }

        /* Squiggle underline SVG */
        .squiggle-underline {
            position: relative;
            display: inline-block;
        }
        .squiggle-underline::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 100%;
            height: 8px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='8'%3E%3Cpath d='M0,4 Q15,1 30,4 T60,4 T90,4 T120,4' fill='none' stroke='%234c855c' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x;
            background-size: contain;
        }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

        /* Selection */
        ::selection { background: rgba(19,61,92,0.15); color: #1c1e26; }

        /* Animations */
        .fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .slide-in-right { animation: slideInRight 0.3s ease-out forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* Prose content for articles */
        .prose-content h2 { font-size: 1.5rem; font-family: Arial, Helvetica, sans-serif; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; color: #073055; }
        .prose-content h3 { font-size: 1.25rem; font-family: Arial, Helvetica, sans-serif; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #073055; }
        .prose-content p { margin: 0.75rem 0; line-height: 1.75; }
        .prose-content strong { font-weight: 600; }
        .prose-content ul { list-style-type: disc; padding-left: 1.25rem; margin: 1rem 0; }
        .prose-content li { margin: 0.5rem 0; }
        .prose-content blockquote { border-left: 4px solid #4c855c; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280; background: rgba(245,246,248,0.3); border-radius: 0 0.5rem 0.5rem 0; padding: 0.5rem 1rem; }
        .prose-content hr { margin: 2rem 0; border-color: #e5e7eb; }
        .prose-content code { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; font-family: monospace; }
    </style>
</head>
<body class="bg-white font-sans text-charcoal">

<!-- Header -->
<header id="site-header" class="fixed top-0 inset-x-0 z-50 transition-all duration-500 <?= $isHome ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,39,71,0.08)]' ?>">
    <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-navy-deep flex items-center justify-center">
                    <div class="flex gap-[3px] items-end h-5">
                        <div class="w-[5px] bg-gold/55 rounded-sm h-2.5"></div>
                        <div class="w-[5px] bg-gold/80 rounded-sm h-3.5"></div>
                        <div class="w-[5px] bg-gold rounded-sm h-5"></div>
                    </div>
                </div>
                <div>
                    <span class="header-brand font-serif text-xl lg:text-2xl font-semibold tracking-executive text-navy-deep <?= $isHome ? 'text-white' : '' ?>"><?= e($brandName) ?></span>
                    <span class="block text-[9px] lg:text-[10px] font-medium uppercase tracking-[0.28em] text-gold"><?= e($brandTagline) ?></span>
                </div>
            </a>

            <!-- Desktop Nav -->
            <nav class="hidden lg:flex items-center gap-1">
                <a href="/" class="px-4 py-2 text-sm font-medium transition-colors rounded-md <?= $isHome ? 'text-white' : 'text-charcoal hover:text-gold' ?> <?= isActive('/') ? 'text-gold' : '' ?>">Home</a>
                <a href="/about" class="px-4 py-2 text-sm font-medium transition-colors rounded-md <?= $isHome ? 'text-white/80 hover:text-white' : 'text-charcoal/70 hover:text-gold' ?> <?= setActiveClass('/about') ?>">About Us</a>
                <a href="/services" class="px-4 py-2 text-sm font-medium transition-colors rounded-md <?= $isHome ? 'text-white/80 hover:text-white' : 'text-charcoal/70 hover:text-gold' ?> <?= setActiveClass('/services') ?>">Services</a>
                <a href="/industries" class="px-4 py-2 text-sm font-medium transition-colors rounded-md <?= $isHome ? 'text-white/80 hover:text-white' : 'text-charcoal/70 hover:text-gold' ?> <?= setActiveClass('/industries') ?>">Industries</a>
                <a href="/team" class="px-4 py-2 text-sm font-medium transition-colors rounded-md <?= $isHome ? 'text-white/80 hover:text-white' : 'text-charcoal/70 hover:text-gold' ?> <?= setActiveClass('/team') ?>">Our Team</a>
                <a href="/research" class="px-4 py-2 text-sm font-medium transition-colors rounded-md <?= $isHome ? 'text-white/80 hover:text-white' : 'text-charcoal/70 hover:text-gold' ?> <?= setActiveClass('/research') ?>">Research</a>
            </nav>

            <!-- Desktop CTA -->
            <a href="/contact" class="hidden lg:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all <?= $isHome ? 'bg-gold text-navy-deep hover:bg-white' : 'bg-navy-deep text-white hover:bg-gold hover:text-navy-deep' ?>">
                <?= e($settings['hero_primary_cta'] ?? 'Book a Consultation') ?>
            </a>

            <!-- Mobile Hamburger -->
            <button id="mobile-menu-btn" class="lg:hidden p-2 <?= $isHome ? 'text-white' : 'text-charcoal' ?>" onclick="toggleMobileMenu()">
                <?= getIcon('Menu', 'w-6 h-6') ?>
            </button>
        </div>
    </div>
</header>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="toggleMobileMenu()"></div>
    <aside class="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl slide-in-right overflow-y-auto">
        <div class="flex items-center justify-between p-5 border-b">
            <a href="/" class="font-serif text-xl font-semibold text-navy-deep">Menu</a>
            <button onclick="toggleMobileMenu()" class="p-2 text-charcoal/60 hover:text-charcoal">
                <?= getIcon('X', 'w-5 h-5') ?>
            </button>
        </div>
        <nav class="p-5 space-y-1">
            <a href="/" class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors <?= isActive('/') ? 'bg-muted text-gold font-semibold' : '' ?>">Home</a>
            <a href="/about" class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors <?= setActiveClass('/about') ?>">About Us</a>
            <a href="/services" class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors <?= setActiveClass('/services') ?>">Services</a>
            <a href="/industries" class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors <?= setActiveClass('/industries') ?>">Industries</a>
            <a href="/team" class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors <?= setActiveClass('/team') ?>">Our Team</a>
            <a href="/research" class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors <?= setActiveClass('/research') ?>">Research</a>
        </nav>
        <div class="p-5 border-t">
            <a href="/contact" class="block w-full text-center rounded-full bg-navy-deep text-white px-6 py-3 text-sm font-semibold hover:bg-gold hover:text-navy-deep transition-all">
                <?= e($settings['hero_primary_cta'] ?? 'Book a Consultation') ?>
            </a>
        </div>
    </aside>
</div>

<main class="flex-1 <?= $isHome ? '' : 'pt-16 lg:pt-20' ?>">
