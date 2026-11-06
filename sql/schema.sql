-- run this first, then seed.sql

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    id          VARCHAR(36)  PRIMARY KEY,
    email       VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(50)  NOT NULL DEFAULT 'ADMIN',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. ARTICLES
CREATE TABLE IF NOT EXISTS articles (
    id           VARCHAR(36)  PRIMARY KEY,
    slug         VARCHAR(255) NOT NULL,
    title        VARCHAR(255) NOT NULL,
    excerpt      TEXT         NOT NULL,
    content      LONGTEXT     NOT NULL,
    category     VARCHAR(100) NOT NULL,
    author       VARCHAR(255) NOT NULL DEFAULT 'Biztra Business Advisory',
    read_time    VARCHAR(50)  NOT NULL DEFAULT '5 min read',
    published    BOOLEAN      NOT NULL DEFAULT FALSE,
    featured     BOOLEAN      NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP    NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_articles_slug (slug),
    INDEX idx_articles_published (published, published_at),
    INDEX idx_articles_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. SITE SETTINGS (singleton — always id='singleton')
CREATE TABLE IF NOT EXISTS site_settings (
    id                    VARCHAR(50)  PRIMARY KEY DEFAULT 'singleton',
    brand_name            VARCHAR(255) NOT NULL DEFAULT 'Biztra',
    brand_tagline         VARCHAR(255) NOT NULL DEFAULT 'Business Advisory',
    hero_eyebrow          VARCHAR(255) NOT NULL DEFAULT '',
    hero_headline         VARCHAR(500) NOT NULL DEFAULT '',
    hero_subtitle         TEXT,
    hero_primary_cta      VARCHAR(255) NOT NULL DEFAULT 'Book a Consultation',
    hero_secondary_cta    VARCHAR(255) NOT NULL DEFAULT 'Our Services',
    hero_stat1_value      VARCHAR(50)  NOT NULL DEFAULT '6+',
    hero_stat1_label      VARCHAR(255) NOT NULL DEFAULT 'Years of Excellence',
    hero_stat2_value      VARCHAR(50)  NOT NULL DEFAULT '9',
    hero_stat2_label      VARCHAR(255) NOT NULL DEFAULT 'Service Verticals',
    hero_stat3_value      VARCHAR(50)  NOT NULL DEFAULT '8+',
    hero_stat3_label      VARCHAR(255) NOT NULL DEFAULT 'Industries Served',
    hero_stat4_value      VARCHAR(50)  NOT NULL DEFAULT '100%',
    hero_stat4_label      VARCHAR(255) NOT NULL DEFAULT 'Nepal-Focused',
    footer_tagline        VARCHAR(500) NOT NULL DEFAULT '',
    footer_description    TEXT,
    contact_phone         VARCHAR(100) NOT NULL DEFAULT '',
    contact_email         VARCHAR(255) NOT NULL DEFAULT '',
    contact_address       VARCHAR(255) NOT NULL DEFAULT '',
    contact_address_detail VARCHAR(255) NOT NULL DEFAULT '',
    contact_hours         VARCHAR(100) NOT NULL DEFAULT '',
    contact_hours_detail  VARCHAR(255) NOT NULL DEFAULT '',
    contact_response_time VARCHAR(100) NOT NULL DEFAULT '',
    maps_url              VARCHAR(500) NOT NULL DEFAULT '',
    linkedin_url          VARCHAR(500) NOT NULL DEFAULT '',
    facebook_url          VARCHAR(500) NOT NULL DEFAULT '',
    instagram_url         VARCHAR(500) NOT NULL DEFAULT '',
    updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. ABOUT CONTENT (singleton — always id='singleton')
CREATE TABLE IF NOT EXISTS about_content (
    id                  VARCHAR(50)  PRIMARY KEY DEFAULT 'singleton',
    story_eyebrow       VARCHAR(255) NOT NULL DEFAULT 'Who We Are',
    story_heading       VARCHAR(255) NOT NULL DEFAULT '',
    story_paragraph1    TEXT,
    story_paragraph2    TEXT,
    story_paragraph3    TEXT,
    story_paragraph4    TEXT,
    story_quote         TEXT,
    vision_eyebrow      VARCHAR(255) NOT NULL DEFAULT 'Our Vision',
    vision_text         TEXT,
    vision_context      TEXT,
    mission_eyebrow     VARCHAR(255) NOT NULL DEFAULT 'Our Mission',
    mission_heading     VARCHAR(255) NOT NULL DEFAULT '',
    mission_text        TEXT,
    core_values_eyebrow VARCHAR(255) NOT NULL DEFAULT 'Our Values',
    core_values_heading VARCHAR(255) NOT NULL DEFAULT '',
    core_values_subtitle TEXT,
    why_choose_eyebrow  VARCHAR(255) NOT NULL DEFAULT 'Why Choose Us',
    why_choose_heading  VARCHAR(255) NOT NULL DEFAULT '',
    why_choose_subtitle TEXT,
    updated_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
-- 5. CONTENT ITEMS (generic / polymorphic)
--    type = service | industry | core_value | why_choose | approach_step | team_member
--    data = JSON column for type-specific fields
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_items (
    id           VARCHAR(36)  PRIMARY KEY,
    type         VARCHAR(50)  NOT NULL,
    slug         VARCHAR(255) NOT NULL,
    title        VARCHAR(255) NOT NULL,
    subtitle     VARCHAR(255) NULL,
    description  TEXT         NULL,
    icon_name    VARCHAR(100) NOT NULL DEFAULT 'Briefcase',
    item_order   INT          NOT NULL DEFAULT 0,
    published    BOOLEAN      NOT NULL DEFAULT TRUE,
    featured     BOOLEAN      NOT NULL DEFAULT FALSE,
    data         JSON,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY  unique_type_slug (type, slug),
    INDEX idx_content_type_published_order (type, published, item_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;