-- Biztra seed data. Safe to run again — existing rows are kept.

-- admin login (change the password after you log in)
INSERT IGNORE INTO users (id, email, name, password, role)
VALUES ('seed-001', 'admin@biztra.com.np', 'Biztra Admin', 'biztra-admin-2026', 'ADMIN');

-- homepage + contact block. Edit these from /admin/settings too.

INSERT INTO site_settings (
    id,
    brand_name, brand_tagline,
    hero_eyebrow, hero_headline, hero_subtitle,
    hero_primary_cta, hero_secondary_cta,
    hero_stat1_value, hero_stat1_label,
    hero_stat2_value, hero_stat2_label,
    hero_stat3_value, hero_stat3_label,
    hero_stat4_value, hero_stat4_label,
    footer_tagline, footer_description,
    contact_phone, contact_email,
    contact_address, contact_address_detail,
    contact_hours, contact_hours_detail,
    contact_response_time,
    maps_url, linkedin_url, facebook_url, instagram_url
) VALUES (
    'singleton',
    'Biztra', 'Business Advisory',
    'Kathmandu · Nepal · Est. 2023',
    'Accounting, audit and tax — done properly & in plain words',
    'We help Nepali businesses get their books in order, file taxes on time and make decisions backed by clear numbers. Small team, big-firm standards, no confusing jargon.',
    'Talk to us',
    'See what we do',
    '6+', 'Years in the field',
    '9', 'Services',
    '8+', 'Industries we work with',
    '100%', 'Nepal-first',
    'Straight talk. Proper books. On-time filing.',
    'A small Kathmandu firm. We do audit, accounting, tax and advisory for factories, traders, schools, hospitals and growing companies — the way they should be done.',
    '+977-1-4000000', 'info@biztra.com.np',
    'Kathmandu, Nepal', 'Naxal, Kathmandu 44600',
    'Sun — Fri · 9:30 — 17:30', 'Saturday: closed',
    'We usually reply within a day',
    'https://maps.google.com',
    '#', '#', '#'
) ON DUPLICATE KEY UPDATE
    brand_name          = VALUES(brand_name),
    brand_tagline       = VALUES(brand_tagline),
    hero_eyebrow        = VALUES(hero_eyebrow),
    hero_headline       = VALUES(hero_headline),
    hero_subtitle       = VALUES(hero_subtitle),
    hero_primary_cta    = VALUES(hero_primary_cta),
    hero_secondary_cta  = VALUES(hero_secondary_cta),
    hero_stat1_value    = VALUES(hero_stat1_value),
    hero_stat1_label    = VALUES(hero_stat1_label),
    hero_stat2_value    = VALUES(hero_stat2_value),
    hero_stat2_label    = VALUES(hero_stat2_label),
    hero_stat3_value    = VALUES(hero_stat3_value),
    hero_stat3_label    = VALUES(hero_stat3_label),
    hero_stat4_value    = VALUES(hero_stat4_value),
    hero_stat4_label    = VALUES(hero_stat4_label),
    footer_tagline      = VALUES(footer_tagline),
    footer_description  = VALUES(footer_description),
    contact_phone       = VALUES(contact_phone),
    contact_email       = VALUES(contact_email),
    contact_address     = VALUES(contact_address),
    contact_address_detail = VALUES(contact_address_detail),
    contact_hours       = VALUES(contact_hours),
    contact_hours_detail = VALUES(contact_hours_detail),
    contact_response_time = VALUES(contact_response_time),
    maps_url            = VALUES(maps_url),
    linkedin_url        = VALUES(linkedin_url),
    facebook_url        = VALUES(facebook_url),
    instagram_url       = VALUES(instagram_url);

-- the about page text

INSERT INTO about_content (
    id,
    story_eyebrow, story_heading,
    story_paragraph1, story_paragraph2, story_paragraph3, story_paragraph4,
    story_quote,
    vision_eyebrow, vision_text, vision_context,
    mission_eyebrow, mission_heading, mission_text,
    core_values_eyebrow, core_values_heading, core_values_subtitle,
    why_choose_eyebrow, why_choose_heading, why_choose_subtitle
) VALUES (
    'singleton',
    'Who we are',
    'A small firm in Kathmandu that acts like a partner, not a vendor',
    'I started Biztra in 2023 after years of seeing the same thing from inside big firms and family businesses alike: the books were messy, taxes were filed in a rush at the last minute, and owners were making big decisions with numbers they did not fully trust. None of that was because people were careless. It was because nobody had set up a simple, honest system and stuck to it.',
    'So that is what we do. We come in, look properly at how your business actually runs — not how a textbook says it should — and help you fix the basics first: a clean chart of accounts, a monthly close that finishes on time, VAT and TDS filed before the due date without panic. Then, once the foundation is solid, we help with the bigger questions: pricing, expansion, taking a loan, or getting ready for an audit.',
    'We are a small team and we like it that way. You will talk to the people doing the work, not a sales team. If something is not feasible or not worth doing, we will tell you. If your numbers need more work than you thought, we will tell you that too — early, in plain words.',
    'At the end of the day, our job is simple: help your business run on numbers you can trust, stay on the right side of the tax office, and grow without financial surprises. Nothing fancy. Just done properly.',
    'We would rather be useful than sound impressive.',
    'What we believe',
    'Good books make good businesses.',
    'If you cannot see where the money went, you cannot fix what is leaking. Everything we do starts from that one idea.',
    'How we work',
    'One place for the money stuff',
    'Audit, accounts, tax, budgeting, training — we do them together, because in a real business they are connected. You should not need five different advisors to tell you if your business is healthy.',
    'What matters to us',
    'The things we hold on to, every job',
    'Six habits we try not to break, even when things get busy.',
    'Why people call us',
    'Why clients stay with us',
    'Most of our clients came to us through a friend or a CA referrals. Here is what they say matters to them.'
) ON DUPLICATE KEY UPDATE
    story_eyebrow       = VALUES(story_eyebrow),
    story_heading       = VALUES(story_heading),
    story_paragraph1    = VALUES(story_paragraph1),
    story_paragraph2    = VALUES(story_paragraph2),
    story_paragraph3    = VALUES(story_paragraph3),
    story_paragraph4    = VALUES(story_paragraph4),
    story_quote         = VALUES(story_quote),
    vision_eyebrow      = VALUES(vision_eyebrow),
    vision_text         = VALUES(vision_text),
    vision_context      = VALUES(vision_context),
    mission_eyebrow     = VALUES(mission_eyebrow),
    mission_heading     = VALUES(mission_heading),
    mission_text        = VALUES(mission_text),
    core_values_eyebrow = VALUES(core_values_eyebrow),
    core_values_heading = VALUES(core_values_heading),
    core_values_subtitle = VALUES(core_values_subtitle),
    why_choose_eyebrow  = VALUES(why_choose_eyebrow),
    why_choose_heading  = VALUES(why_choose_heading),
    why_choose_subtitle = VALUES(why_choose_subtitle);

-- services

INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-004', 'service', 'business-advisory-consulting', 'Business Advisory & Consulting', NULL,
    'Sometimes you just need someone experienced to talk things through with — whether it is pricing, a loan decision, a partner dispute, or whether to open a new branch. We sit with founders and managers, look at the actual numbers, and help you think it through before you commit. No thick reports nobody reads. Just honest advice, in plain Nepali or English, whichever you prefer.',
    'Briefcase', 0, TRUE, FALSE,
    '{"shortDescription":"Honest, practical advice for founders and managers — pricing, growth, restructuring and the big calls. No thick reports, just clear next steps.","deliverables":["Business review (where are we, really?)","Growth and restructuring plan","Pricing and margin check","Loan / investment decision support"]}'
),
(
    'seed-005', 'service', 'statutory-internal-audit', 'Statutory & Internal Audit', NULL,
    'Audit done the way it should be: we check the books properly, point out what is weak, and leave you with a clear list of fixes. Statutory audit for compliance, internal audit to catch control gaps before they turn into losses. If the tax office or a bank ever asks questions, you will be ready.',
    'ClipboardCheck', 1, TRUE, FALSE,
    '{"shortDescription":"Proper audits that find the weak spots and leave you with a fix-list. Statutory for compliance, internal to catch problems early.","deliverables":["Statutory audit","Internal audit","Control check (who approves what?)","Audit-ready files"]}'
),
(
    'seed-006', 'service', 'accounting-financial-advisory', 'Accounting & Financial Advisory', NULL,
    'If your books live in three different notebooks and a Tally licence nobody understands, we can fix that. We set up a clean chart of accounts, write down how things should be recorded, align with NFRS where it applies, and make sure your monthly close happens in a week, not a month. The goal: numbers you can actually trust.',
    'Calculator', 2, TRUE, FALSE,
    '{"shortDescription":"Clean books and a monthly close that finishes on time. Chart of accounts, policies, NFRS alignment — set up once, used every month.","deliverables":["Chart of accounts setup","Accounting policy note (simple, usable)","NFRS alignment","Monthly close checklist"]}'
),
(
    'seed-007', 'service', 'taxation-compliance', 'Taxation & Compliance', NULL,
    'VAT, income tax, TDS, excise, customs — Nepalese tax is not complicated, but the deadlines and paperwork punish small mistakes. We handle your filings, keep a calendar so nothing is late, and help you plan so you are not overpaying when you do not have to. If the IRD ever calls, we sit with you.',
    'Receipt', 3, TRUE, FALSE,
    '{"shortDescription":"VAT, income tax, TDS and customs handled on time, every time. Filings, planning and help if the IRD asks questions.","deliverables":["Monthly VAT + TDS filing","Annual income tax return","Tax planning (pay what is due, not more)","Help with IRD assessments"]}'
),
(
    'seed-008', 'service', 'financial-modeling', 'Financial Modeling', NULL,
    'If you are raising money, buying a machine, or deciding whether a new product line is worth it, a simple model helps you see the numbers before you spend. We build models you can actually follow — every figure traces back to an assumption you can change and test. No black boxes.',
    'TrendingUp', 4, TRUE, FALSE,
    '{"shortDescription":"Simple models for big decisions — loans, expansion, new products. Built so you can change the assumptions and see what happens.","deliverables":["3-year projections","What-if scenarios","Project cost model","Lender / investor one-pager"]}'
),
(
    'seed-009', 'service', 'budgeting-forecasting', 'Budgeting & Forecasting', NULL,
    'A budget that sits in a drawer is useless. We help you set targets your team actually believes in, then check in monthly so small problems get caught early. Sales down 10%? You know in week two, not in Dashain.',
    'LineChart', 5, TRUE, FALSE,
    '{"shortDescription":"Budgets your team actually uses. Targets set together, checked monthly, fixed early — not reviewed after the damage is done.","deliverables":["Yearly budget","Monthly forecast (rolling)","Variance check — what changed and why","Cash flow watch"]}'
),
(
    'seed-010', 'service', 'internal-control-process-review', 'Internal Control & Business Process Review', NULL,
    'Cash going out, stock going missing, one person approving their own expenses — these are the quiet leaks. We look at how purchasing, sales, payroll and payments really flow in your company, find the gaps, and set up simple checks that stop the leaks without slowing everyone down.',
    'ShieldCheck', 6, TRUE, FALSE,
    '{"shortDescription":"Find the quiet leaks — purchasing, payments, stock, payroll. Simple checks that stop losses without slowing work down.","deliverables":["How work really flows (mapped out)","Gap list, in priority order","Simple approval checks","Stock and cash controls"]}'
),
(
    'seed-011', 'service', 'strategy-policy-development', 'Strategy & Policy Development', NULL,
    'As a business grows, one person cannot approve everything anymore. We help you write down how things should work — who decides what, how hiring and spending work, how the board meets. Short, clear policies your staff will actually read, not a 200-page manual.',
    'Settings', 7, TRUE, FALSE,
    '{"shortDescription":"Write down how the business should run — who decides what, spending limits, board basics. Short policies people will actually read.","deliverables":["Simple strategy note","Who-decides-what sheet","Spending and hiring rules","Board / family business basics"]}'
),
(
    'seed-012', 'service', 'training-professional-mentorship', 'Training & Professional Mentorship', NULL,
    'Your accountant probably learned on the job. That is fine — until it is not. We train your team on the stuff they actually do every day: bookkeeping, tax, budgeting, Excel. Short sessions, real examples from your own files, and follow-up questions welcome.',
    'GraduationCap', 8, TRUE, FALSE,
    '{"shortDescription":"Short, practical training for your accounts team — using your own files, not textbook examples. Questions welcome afterwards.","deliverables":["Bookkeeping + tax basics","Excel and reporting skills","Budgeting for non-finance managers","One-on-one mentoring"]}'
);

-- ─────────────────────────────────────────────────────────────
-- 5. INDUSTRIES (8 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-013', 'industry', 'manufacturing', 'Manufacturing', NULL,
    'Factories in Nepal deal with rising raw material prices, load-shedding history, and import delays. We help you cost properly, control stock, and know your real margin per product — so you stop guessing.',
    'Factory', 0, TRUE, FALSE,
    '{"shortDescription":"Cost systems, inventory controls, and process discipline for production-driven enterprises.","services":["Cost accounting systems","Inventory controls","Process improvement","Compliance"]}'
),
(
    'seed-014', 'industry', 'trading', 'Trading', NULL,
    'Imports, exchange rates, tight margins — trading is harder than it looks. We help you see which products actually make money, manage your stock better, and stay clean with VAT and customs.',
    'Store', 1, TRUE, FALSE,
    '{"shortDescription":"Margin analysis, working-capital optimization, and compliance frameworks for trading houses.","services":["Margin analysis","Working capital","Forex exposure management","Tax structuring"]}'
),
(
    'seed-015', 'industry', 'banking-financial-institutions', 'Banking & Financial Institutions', NULL,
    'BFIs live under NRB rules and constant reporting. We help with internal audit, credit reviews and documentation that stands up to inspection — without the panic before visit season.',
    'Landmark', 2, TRUE, FALSE,
    '{"shortDescription":"Regulatory alignment, internal audit, and risk advisory tailored to the BFIs sector.","services":["Regulatory alignment","Internal audit","Credit reviews","Compliance assurance"]}'
),
(
    'seed-016', 'industry', 'education', 'Education', NULL,
    'Schools and colleges run on fees, but fee collection and spending often run on habit. We help you set fees that cover costs, track collections, and keep the board and parents informed.',
    'GraduationCap', 3, TRUE, FALSE,
    '{"shortDescription":"Governance, fee structures, and financial systems for schools, colleges, and institutions.","services":["Governance frameworks","Fee structure design","Budget planning","Compliance"]}'
),
(
    'seed-017', 'industry', 'healthcare', 'Healthcare', NULL,
    'Hospitals juggle expensive equipment, medicine stock and tight margins. We help with billing, purchasing controls and reporting that keeps both doctors and auditors happy.',
    'HeartPulse', 4, TRUE, FALSE,
    '{"shortDescription":"Process reviews and compliance frameworks for hospitals, clinics, and healthcare operators.","services":["Revenue cycle review","Procurement controls","Inventory management","Compliance"]}'
),
(
    'seed-018', 'industry', 'information-technology', 'Information Technology', NULL,
    'Nepal''s IT firms are growing fast — foreign clients, deferred income, staff costs. We help you record revenue properly, build a finance team that keeps up, and get ready if investors or auditors look closely.',
    'Cpu', 5, TRUE, FALSE,
    '{"shortDescription":"Revenue recognition, scaling finance teams, and audit readiness for technology companies.","services":["Revenue recognition","Finance team scaling","Audit readiness","Fundraising support"]}'
),
(
    'seed-019', 'industry', 'hydropower', 'Hydropower', NULL,
    'Hydropower takes years and a lot of money before the first rupee comes back. We help with project costs, loan-equity mix, and the reporting lenders will ask for year after year.',
    'Droplets', 6, TRUE, FALSE,
    '{"shortDescription":"Project financial structuring, capital advisory, and statutory compliance for energy projects.","services":["Project financial modeling","Capital structuring","Compliance","Lender reporting"]}'
),
(
    'seed-020', 'industry', 'service-industries', 'Service Industries', NULL,
    'Restaurants, hotels, logistics, agencies — service businesses sell hours and care. We help you price properly, track costs per job, and make sure growth does not leave you cash-poor.',
    'Wrench', 7, TRUE, FALSE,
    '{"shortDescription":"Operational advisory and financial discipline for professional and consumer service firms.","services":["Unit economics","Pricing strategy","Working capital","Operational reporting"]}'
);

-- ─────────────────────────────────────────────────────────────
-- 6. CORE VALUES (6 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-021', 'core_value', 'integrity', 'Integrity', NULL,
    'If the numbers say one thing and the client wants another, we stick with the numbers. Always.',
    'Scale', 0, TRUE, FALSE, '{}'
),
(
    'seed-022', 'core_value', 'honesty', 'Honesty', NULL,
    'We say it straight, even when it is not welcome news. Late is worse than difficult.',
    'Handshake', 1, TRUE, FALSE, '{}'
),
(
    'seed-023', 'core_value', 'objectivity', 'Objectivity', NULL,
    'Our advice follows the facts, not friendships or pressure.',
    'Target', 2, TRUE, FALSE, '{}'
),
(
    'seed-024', 'core_value', 'professional-competence', 'Professional Competence', NULL,
    'Tax rules change, standards change. We keep learning so you don''t have to.',
    'GraduationCap', 3, TRUE, FALSE, '{}'
),
(
    'seed-025', 'core_value', 'confidentiality', 'Confidentiality', NULL,
    'Your books are your business. We treat them that way — files stored safely, nothing shared.',
    'Lock', 4, TRUE, FALSE, '{}'
),
(
    'seed-026', 'core_value', 'accountability', 'Accountability', NULL,
    'If we did the work, we own the result. Mistakes get fixed, not hidden.',
    'CheckCircle2', 5, TRUE, FALSE, '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 7. WHY CHOOSE (6 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-027', 'why_choose', 'local-expertise', 'Local Expertise', NULL,
    'We only work in Nepal, so we know it: IRD deadlines, NRB rules, how files get checked, what usually goes wrong.',
    'MapPin', 0, TRUE, FALSE, '{}'
),
(
    'seed-028', 'why_choose', 'professional-excellence', 'Professional Excellence', NULL,
    'Our team is qualified and experienced, but you will never get a lecture. Just straight, useful answers.',
    'Award', 1, TRUE, FALSE, '{}'
),
(
    'seed-029', 'why_choose', 'global-standards', 'Global Standards', NULL,
    'We use NFRS and proper standards — but explained in a way that makes sense for a Nepali business.',
    'Globe', 2, TRUE, FALSE, '{}'
),
(
    'seed-030', 'why_choose', 'practical-solutions', 'Practical Solutions', NULL,
    'Every suggestion comes with a next step and a cost. If it won''t work in your office, we don''t suggest it.',
    'Target', 3, TRUE, FALSE, '{}'
),
(
    'seed-031', 'why_choose', 'multi-industry-experience', 'Multi-Industry Experience', NULL,
    'Factories, schools, hospitals, IT companies, hydropower — eight sectors and counting. We know the patterns.',
    'Building2', 4, TRUE, FALSE, '{}'
),
(
    'seed-032', 'why_choose', 'long-term-partnership', 'Long-Term Partnership', NULL,
    'We don''t do one-off fixes and disappear. Most clients stay with us for years, and we like it that way.',
    'Handshake', 5, TRUE, FALSE, '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 8. APPROACH STEPS (4 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-033', 'approach_step', 'understand', 'Understand', NULL,
    'We sit with you and your team and actually listen. Where are the numbers, where is the pain — no judgement, just facts.',
    'Users', 0, TRUE, FALSE, '{"number":"01"}'
),
(
    'seed-034', 'approach_step', 'analyze', 'Analyze', NULL,
    'We look at the books, the tax files, how approvals happen. We write down what we find, good and bad.',
    'FileBarChart', 1, TRUE, FALSE, '{"number":"02"}'
),
(
    'seed-035', 'approach_step', 'advise', 'Advise', NULL,
    'You get a short list, in priority order, with costs and timelines. Nothing borrowed from another company.',
    'Settings', 2, TRUE, FALSE, '{"number":"03"}'
),
(
    'seed-036', 'approach_step', 'empower', 'Empower', NULL,
    'We stay until the new system actually works — train your staff, check in monthly, fix what breaks.',
    'TrendingUp', 3, TRUE, FALSE, '{"number":"04"}'
);

-- ─────────────────────────────────────────────────────────────
-- 9. TEAM MEMBERS (1 item)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-037', 'team_member', 'narendra-chaudhary', 'Mr. Narendra Chaudhary', 'Managing Director',
    'Narendra is a Chartered Accountant who spent time at PwC before starting Biztra in 2023. Over six-plus years he has worked with factories, traders, banks, schools, hospitals, IT firms and hydropower projects. He does the big-firm standard of work, but explains it in simple words — and he answers the phone himself.',
    'Award', 0, TRUE, TRUE,
    '{"initials":"NC","role":"Managing Director","designation":"Chartered Accountant","expertise":["Business Advisory & Consulting","Statutory & Internal Audit","Accounting Frameworks","Strategy & Policy Development","Financial Modeling","Budgeting & Forecasting","Internal Controls","Business Process Review","Taxation & Compliance","Training & Mentorship"],"highlights":[{"label":"Experience","value":"6+ Years"},{"label":"Foundation","value":"PwC Alumni"},{"label":"Sectors","value":"8+ Industries"},{"label":"Qualification","value":"Chartered Accountant"}]}'
);

-- ─────────────────────────────────────────────────────────────
-- 10. ARTICLES (6 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO articles (id, slug, title, excerpt, content, category, author, read_time, published, featured, published_at)
VALUES
(
    'seed-038', 'navigating-nepal-tax-filing-2026',
    'Filing taxes in Nepal in 2026: what actually changed',
    'A practical look at recent changes in Nepal''s tax regulations and what finance teams should prioritize to remain fully compliant this fiscal year.',
    'Recent changes to Nepal''s tax filing framework have introduced both new obligations and new opportunities for finance teams across the country. For chartered accountants, CFOs, and business owners, the question is no longer whether to comply — it is how to comply efficiently while minimizing the operational burden on the finance function.

## What has changed

The Inland Revenue Department has continued to refine the electronic filing portal, with incremental updates to VAT returns, corporate income tax returns, and withholding tax submissions. For most businesses, the substantive obligations have not changed dramatically, but the format, the supporting documentation required, and the timelines for response have become stricter.

## What finance teams should prioritize

First, ensure your chart of accounts is structured to support tax reporting — not just accounting reporting. Many Nepalese businesses maintain charts of accounts designed for management reporting but lack the granularity required for direct tax extraction.

Second, document every withholding transaction at source. The IRD''s audit approach increasingly focuses on withholding compliance, and undocumented or under-documented withholdings are a common source of assessment exposure.

Third, build a monthly tax close discipline rather than treating tax as an annual event. The cost of catching up at year-end is significantly higher than the cost of maintaining compliance continuously.

## Looking ahead

The regulatory direction is clear — toward more granular, more frequent, and more digitally integrated reporting. Finance teams that build the discipline now will find the next wave of changes easier to absorb; those that defer will face increasingly costly catch-up cycles.',
    'Tax & Compliance', 'Biztra Business Advisory', '6 min read', TRUE, TRUE, NOW()
),
(
    'seed-039', 'building-scalable-finance-function',
    'Your books are a mess. Here is where to start.',
    'From chart-of-accounts design to monthly close discipline — the foundational practices that separate sustainable finance functions from reactive ones.',
    'A finance function that scales is not built by accident. It is the product of deliberate choices made early — choices that compound over years and ultimately determine whether the finance team is a strategic asset or a cost center.

## The foundational practices

The chart of accounts is the starting point. A well-structured chart of accounts supports both management reporting and statutory compliance, with enough granularity to extract meaningful insights without becoming unmanageably complex. Many Nepalese businesses operate with charts designed years ago that no longer reflect how the business actually generates revenue or incurs cost.

The monthly close is the second foundation. A disciplined monthly close — completed within 5-10 working days of period end — produces reliable numbers that management can act on. A delayed or rushed close produces numbers that are technically correct but operationally useless.

## What scales and what doesn''t

Manual reconciliations do not scale. Spreadsheet-based consolidations do not scale. Ad-hoc approvals routed through individual inboxes do not scale. Each of these practices works at small scale and fails predictably as transaction volume grows.

What does scale: documented policies, system-based controls, automated reconciliations where possible, and clear ownership for every balance sheet account. These investments feel expensive at small scale and indispensable at scale.

## The path forward

For most Nepalese businesses, the path forward begins with a structured review of the current state — identifying which practices are sustainable, which are not, and where the highest-leverage improvements lie. The objective is not to rebuild the finance function overnight but to build, quarter by quarter, a function that supports the business the leadership team wants to become.',
    'Accounting & Finance', 'Biztra Business Advisory', '8 min read', TRUE, TRUE, NOW()
),
(
    'seed-040', 'internal-controls-as-growth-strategy',
    'Internal controls: less cost, more confidence',
    'How a well-designed internal control environment accelerates decision-making, builds investor confidence, and protects long-term enterprise value.',
    'Internal controls are often discussed as a compliance obligation — something to be implemented because auditors or regulators require it. This framing misses the more important truth: a well-designed internal control environment is a growth strategy.

## The connection between controls and growth

Growth requires capital. Capital — whether debt or equity — requires confidence. Confidence, in turn, requires that the numbers a business reports can be relied upon. And reliable numbers are the product of a control environment that ensures transactions are recorded accurately, completely, and on time.

When a business approaches a lender or an investor, the diligence process ultimately evaluates the reliability of the financial information. A business with documented controls, evidence of control operation, and a clean audit history will command better terms and close faster than a business where financial information is informal.

## Beyond compliance

The same controls that satisfy auditors also accelerate internal decision-making. When management knows the numbers are reliable, decisions can be made faster. When approvals are routed through documented channels rather than ad-hoc conversations, accountability is clear. When exceptions are surfaced systematically rather than discovered accidentally, risks are addressed before they compound.

## A practical perspective

For most Nepalese businesses, the right starting point is not a comprehensive controls overhaul. It is a focused review of the highest-risk processes — typically procurement, cash disbursements, revenue recognition, and payroll — followed by targeted improvements that produce visible impact within a quarter or two. The objective is momentum, not perfection.',
    'Business Advisory', 'Biztra Business Advisory', '5 min read', TRUE, TRUE, NOW()
),
(
    'seed-041', 'corporate-governance-for-nepalese-boards',
    'Running a board in Nepal: a practical guide',
    'What effective board governance looks like in the Nepalese context — and the structures, policies, and practices that strengthen board effectiveness.',
    'Effective corporate governance is not an imported concept imposed on Nepalese businesses — it is a practical framework that helps boards make better decisions, manage risk more deliberately, and build the trust of stakeholders including shareholders, lenders, regulators, and employees.

## The building blocks

A functioning board requires three foundational elements: a clear composition with independent perspectives, documented terms of reference that define what the board decides versus what management decides, and a cadence of meetings that allows issues to be discussed rather than merely reported.

Many Nepalese boards operate without one or more of these elements. Boards composed entirely of executive directors lack the independent perspective that challenges management thinking. Boards without documented terms of reference find their authority expanding or contracting based on personality rather than policy. Boards that meet infrequently find themselves rubber-stamping decisions rather than shaping them.

## The committees

For larger organizations, the establishment of an audit committee and a risk committee transforms the board''s effectiveness. The audit committee, in particular, becomes the bridge between the board and the external auditor — ensuring that audit findings are addressed rather than archived.

## A practical path forward

For most Nepalese businesses, the path forward begins with documentation — capturing what the board currently does, comparing it to leading practice, and identifying the highest-leverage improvements. The objective is not to import a foreign governance model but to build, deliberately, the governance practices that will support the organization''s next stage of growth.',
    'Corporate Governance', 'Biztra Business Advisory', '7 min read', TRUE, FALSE, NOW()
),
(
    'seed-042', 'strategic-budgeting-for-manufacturers',
    'Budgets for factories: skip the ritual, make a forecast',
    'How manufacturing businesses in Nepal can move beyond annual budgeting rituals toward rolling forecasts that genuinely inform operational decisions.',
    'For Nepalese manufacturers, the annual budget has become, in many organizations, a ritual rather than a tool. Finance teams spend weeks producing a detailed document that is outdated within months and rarely referenced in operational decisions. There is a better way.

## Why annual budgets fail manufacturers

Manufacturing operations are exposed to input-cost volatility, supply-chain disruption, energy costs, and demand variability. An annual budget, fixed at the start of the fiscal year, cannot absorb these realities. By the second quarter, variance against budget becomes so large that the budget itself ceases to inform decisions.

The result is that operational leaders learn to ignore the budget — making decisions based on instinct, recent actuals, and informal forecasts — while the finance team continues to produce monthly variance reports that no one acts on.

## The rolling forecast alternative

Rolling forecasts — typically covering the next 12-18 months, updated monthly or quarterly — provide a more responsive planning tool. Rather than replacing the budget, they sit alongside it: the budget remains the annual commitment, while the rolling forecast becomes the operational planning tool that reflects current reality.

For Nepalese manufacturers, the highest-value starting point is typically a driver-based forecast built around the few variables that actually drive the business: raw material costs, production volume, selling prices, and working-capital requirements.

## Implementation realities

Implementing rolling forecasts requires three things: clean historical data, a small number of well-understood drivers, and the discipline to update the forecast on a fixed cadence. None of these are easy. All of them are achievable — and the payoff, in terms of decision quality, is substantial.',
    'Business Strategy', 'Biztra Business Advisory', '9 min read', TRUE, FALSE, NOW()
),
(
    'seed-043', 'hydropower-financial-structuring-nepal',
    'Hydropower finance: the questions before financial close',
    'Key considerations in structuring the financial close for hydropower projects — from debt-equity calibration to lender reporting discipline.',
    'Hydropower remains one of Nepal''s most significant long-term economic opportunities — and one of its most financially complex. The structuring of a hydropower project''s financial close shapes the project''s viability for decades. Getting it right requires both technical financial expertise and deep understanding of the Nepalese energy sector.

## The structuring decision

The core financial structuring decision in any hydropower project is the calibration of debt and equity. Too much debt, and the project becomes exposed to cash-flow shocks during construction delays or low-generation years. Too little debt, and the equity returns may not meet sponsor expectations.

The right calibration depends on multiple factors: the project''s expected generation profile, the power purchase agreement terms, the construction timeline and risk profile, the cost of debt in the relevant market, and the sponsor''s return expectations.

## Documentation and lender reporting

Once the capital structure is set, the documentation discipline begins. Lenders require detailed reporting throughout the construction and operational phases — including construction progress, cost variance, generation performance, and debt service coverage ratios.

For many developer teams, this reporting burden is underestimated. The cost of building the financial reporting capability — typically a combination of internal finance staff and external advisors — should be factored into the project''s operational budget from the beginning.

## A long-term perspective

Hydropower projects operate on multi-decade horizons. The decisions made at financial close — about capital structure, about reporting cadence, about reserve accounts, about covenant packages — will shape the project''s flexibility for years. Taking the time to structure these decisions thoughtfully, with experienced advisory support, is one of the highest-leverage investments a developer can make.',
    'Nepal Business Updates', 'Biztra Business Advisory', '10 min read', TRUE, FALSE, NOW()
);