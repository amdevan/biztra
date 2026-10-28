<?php
/**
 * Admin login page — standalone (no adminLayout)
 */
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/icons.php';

if (isLoggedIn()) {
    header('Location: /admin');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In — Biztra Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
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
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    serif: ['Playfair Display', 'serif'],
                },
            }
        }
    }
    </script>
    <style>
        .tracking-executive { letter-spacing: -0.02em; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .slide-up { animation: slideUp 0.5s ease-out forwards; }
    </style>
</head>
<body class="min-h-screen bg-navy-deep flex items-center justify-center p-5" style="background: linear-gradient(135deg, #073055 0%, #093d6b 50%, #0a4272 100%);">
    <div class="w-full max-w-md fade-in">
        <!-- Brand -->
        <div class="text-center mb-8 slide-up">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 mb-5">
                <div class="flex gap-[3px] items-end h-6">
                    <div class="w-[5px] bg-gold/55 rounded-sm h-3"></div>
                    <div class="w-[5px] bg-gold/80 rounded-sm h-4.5"></div>
                    <div class="w-[5px] bg-gold rounded-sm h-6"></div>
                </div>
            </div>
            <h1 class="font-serif text-2xl font-semibold text-white tracking-executive">Biztra Admin</h1>
            <p class="mt-1.5 text-sm text-white/50">Sign in to manage your website content</p>
        </div>

        <!-- Login card -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 slide-up" style="animation-delay: 0.1s;">
            <form id="loginForm" onsubmit="handleLogin(event)">
                <div class="space-y-5">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                        <input type="email" id="email" name="email" required
                            class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors"
                            placeholder="admin@biztra.com.np">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                        <div class="relative">
                            <input type="password" id="password" name="password" required
                                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-deep/20 focus:border-navy-deep transition-colors pr-10"
                                placeholder="Enter your password">
                            <button type="button" onclick="togglePassword()" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                                <?= getIcon('Eye', 'w-4 h-4') ?>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Error message -->
                <div id="error-message" class="hidden mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"></div>

                <!-- Loading indicator -->
                <div id="loading-indicator" class="hidden mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Signing in...
                </div>

                <button type="submit" id="submit-btn"
                    class="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-navy-deep text-white text-sm font-semibold hover:bg-navy-deep/90 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-deep/30 focus:ring-offset-2">
                    <?= getIcon('Lock', 'w-4 h-4') ?>
                    Sign In
                </button>
            </form>
        </div>

        <!-- Credentials hint -->
        <div class="mt-6 p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm slide-up" style="animation-delay: 0.2s;">
            <p class="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40 mb-2">Default credentials</p>
            <div class="flex items-center gap-3 text-sm text-white/60">
                <span class="font-mono text-white/80">admin@biztra.com.np</span>
                <span class="text-white/30">/</span>
                <span class="font-mono text-white/80">biztra-admin-2026</span>
            </div>
        </div>

        <!-- Back to site -->
        <div class="mt-6 text-center slide-up" style="animation-delay: 0.3s;">
            <a href="/" class="text-xs text-white/40 hover:text-white/70 transition-colors">&larr; Back to website</a>
        </div>
    </div>

    <script>
    function togglePassword() {
        var input = document.getElementById('password');
        input.type = input.type === 'password' ? 'text' : 'password';
    }

    function handleLogin(e) {
        e.preventDefault();
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        var errorDiv = document.getElementById('error-message');
        var loading = document.getElementById('loading-indicator');
        var submitBtn = document.getElementById('submit-btn');

        errorDiv.classList.add('hidden');
        loading.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(function(response) {
            return response.json().then(function(data) {
                return { ok: response.ok, data: data };
            });
        })
        .then(function(result) {
            if (result.ok && result.data.authenticated) {
                window.location.href = '/admin';
            } else {
                var msg = result.data.message || 'Invalid email or password.';
                errorDiv.textContent = msg;
                errorDiv.classList.remove('hidden');
                loading.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        })
        .catch(function() {
            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.classList.remove('hidden');
            loading.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        });
    }
    </script>
</body>
</html>
