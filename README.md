# Biztra — PHP Version (cPanel Deployment)

Plain PHP + MySQL conversion of the Next.js Biztra site, ready for shared-hosting (cPanel) deployment.

## File Structure

```
public_html/                 # upload these files/folders directly
├── .htaccess              # Pretty-URL routing (public pages, admin, API)
├── index.php              # Entry point → home page
├── config/
│   └── database.php       # MySQL credentials — EDIT THIS for cPanel
├── includes/              # Shared data-access layer & HTML partials
│   ├── db.php             # PDO connection singleton
│   ├── auth.php           # Cookie-based session auth
│   ├── content.php        # Content item queries (services, industries, etc.)
│   ├── articles.php       # Article queries
│   ├── helpers.php        # e(), slugify(), formatDate(), payload normalizer
│   ├── icons.php          # Lucide-style SVG icon map (getIcon())
│   ├── markdown.php       # Lightweight markdown renderer
│   ├── header.php         # <head>, nav, opens <main>
│   └── footer.php         # Footer, closes <body>
├── pages/                 # Public pages (routed via .htaccess)
│   ├── home.php           # /
│   ├── about.php          # /about
│   ├── contact.php        # /contact
│   ├── services.php       # /services
│   ├── service-detail.php # /services/{slug}
│   ├── industries.php     # /industries
│   ├── industry-detail.php# /industries/{slug}
│   ├── team.php           # /team
│   ├── team-detail.php    # /team/{slug}
│   ├── research.php       # /research
│   └── article-detail.php # /research/{slug}
├── admin/                 # CMS (requires login)
│   ├── login.php          # /admin/login
│   ├── index.php          # /admin (dashboard)
│   ├── layout.php         # Sidebar layout wrapper
│   ├── settings/index.php # /admin/settings
│   ├── about/index.php    # /admin/about
│   ├── services/          # /admin/services (+ new, edit/{slug})
│   ├── industries/        # /admin/industries
│   ├── core-values/       # /admin/core-values
│   ├── why-choose/        # /admin/why-choose
│   ├── approach-steps/    # /admin/approach-steps
│   ├── team/              # /admin/team
│   └── articles/          # /admin/articles
├── api/                   # JSON endpoints used by the admin panel
│   ├── auth/              # login, logout, session
│   ├── settings.php       # GET/PUT site settings
│   ├── about.php          # GET/PUT about content
│   ├── content/           # CRUD for content items
│   └── articles.php       # CRUD for articles
└── sql/
    ├── schema.sql         # MySQL tables
    └── seed.sql           # Initial data (idempotent)
```

## cPanel Deployment Steps

1. **Upload** — Copy the website files (`index.php`, `.htaccess`, `admin/`, `api/`, `config/`, `includes/`, `pages/`, `sql/`) into `public_html/`.

2. **Create the database** — In cPanel:
   - MySQL Databases → create a database (e.g. `cpuser_biztra`)
   - Create a user and grant it ALL privileges on that database

3. **Import the schema** — In phpMyAdmin, select the database and:
   - Import `sql/schema.sql`
   - Import `sql/seed.sql`

4. **Configure** — Edit `config/database.php`:
   ```php
   'dbname'   => 'cpuser_biztra',   // your cPanel DB name
   'username' => 'cpuser_biztra',   // your cPanel DB user
   'password' => 'your_password',
   ```

5. **PHP version** — Requires PHP 8.0+ (cPanel: MultiPHP Manager → set domain to 8.1 or newer). Ensure the `pdo_mysql` extension is enabled.

6. **Login to the CMS** — Visit `/admin/login`
   - Email: `admin@biztra.com.np`
   - Password: `biztra-admin-2026`
   - **Change these immediately** (update the `users` table).

## Notes

- **Routes**: `.htaccess` maps clean URLs (`/services`, `/admin/team/edit/{slug}`) to the PHP files. If the site is deployed in a subfolder (e.g. `public_html/site/`), add `RewriteBase /site/` to the `.htaccess`.
- **HTTPS**: Sessions are marked secure only over HTTPS — force HTTPS in cPanel (SSL/TLS Status → Run AutoSSL, then force redirect).
- **Tailwind**: Loaded via CDN for simplicity. For production, consider compiling Tailwind and serving a static CSS file.
- **Icons**: All icons are inline SVG (no icon font or package needed).
- The original Next.js source lives outside this folder and is not required for the PHP deployment.
