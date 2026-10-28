-- ============================================================
-- Biztra PHP — MySQL Seed Data
-- Idempotent: safe to re-run.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. ADMIN USER
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO users (id, email, name, password, role)
VALUES ('seed-001', 'admin@biztra.com.np', 'Biztra Admin', 'biztra-admin-2026', 'ADMIN');

-- ─────────────────────────────────────────────────────────────
-- 2. SITE SETTINGS (singleton)
-- ─────────────────────────────────────────────────────────────
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
    'Transforming Businesses Through Smarter Advisory & Financial Practices',
    'Biztra Business Advisory helps businesses across Nepal build stronger financial systems, maintain compliance, optimize operations, and achieve sustainable growth through professional, practical, and globally aligned advisory solutions.',
    'Book a Consultation',
    'Explore Our Services',
    '6+', 'Years Professional Experience',
    '9', 'Service Verticals',
    '8+', 'Industries Served',
    '100%', 'Nepal-Focused Advisory',
    'Professional Advisory. Practical Solutions. Sustainable Growth.',
    'A Nepal-focused business advisory practice combining local market expertise with globally standardized professional practices.',
    '+977-1-4000000', 'info@biztra.com.np',
    'Kathmandu, Nepal', 'Office address shared on request',
    'Sun — Fri · 9:30 — 17:30', 'Saturday closed',
    'We respond within 1 business day',
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

-- ─────────────────────────────────────────────────────────────
-- 3. ABOUT CONTENT (singleton)
-- ─────────────────────────────────────────────────────────────
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
    'Who We Are',
    'Your Trusted Partner for Business Growth',
    'Biztra Business Advisory was established in 2023 in Kathmandu, Nepal, with a clear founding premise: that Nepalese businesses deserve access to advisory services that meet the same professional standards expected of leading global firms — delivered by professionals who genuinely understand the local operating environment. In a continuously evolving corporate and regulatory landscape, we provide a full spectrum of business advisory solutions supported by highly qualified professionals with diversified experience across multiple industries.',
    'What distinguishes Biztra is the approach we take to consulting. We are quality-driven, proactive, and professional — not in the surface-level sense those words are often used, but in the deeper sense of how we structure every engagement. Rather than simply responding to immediate challenges, we partner with businesses to anticipate changes, strengthen corporate structures, improve financial practices, ensure compliance, and optimize strategic positioning. This means we invest time in understanding the organization before recommending solutions, and we remain engaged through implementation rather than delivering a report and departing.',
    'Our objective is to help organizations achieve sustainable growth and long-term success by combining deep local expertise with rigorous professional standards. The Nepalese business environment is dynamic — shaped by regulatory evolution, capital market development, sector-specific opportunities, and the increasing expectations of stakeholders including regulators, lenders, investors, and customers. We help businesses navigate that environment with confidence, ensuring that financial discipline, compliance, and strategic clarity are strengths rather than constraints.',
    'Every engagement we accept is anchored in the same commitment: actionable recommendations grounded in evidence, delivered by qualified professionals, and structured to produce measurable improvement in how the organization operates. We are not a compliance-only provider. We are a strategic business partner — one that earns trust through the quality of work, the depth of insight, and the sustained impact we deliver over time.',
    'A trusted partner helping Nepalese businesses operate with global professional standards.',
    'Our Vision',
    'To accelerate enterprise growth across the industry by transforming conventional business practices into systematic, compliant, and globally standardized financial practices.',
    'Our vision reflects the gap we see across the Nepalese corporate landscape — between the practices that have historically sustained businesses and the systematic, globally standardized practices that will sustain them in the years ahead. We exist to help close that gap, one organization at a time.',
    'Our Mission',
    'A One-Stop Hub for Comprehensive Advisory Excellence',
    'To serve as a premier, one-stop hub for comprehensive business advisory solutions, relentlessly delivering exceptional quality services. We are committed to actively empowering accounting & finance professionals and business owners while fostering widespread awareness and integration of globally standardized business practices across the corporate landscape.',
    'Core Values',
    'The Principles Behind Our Practice',
    'Six values that govern every engagement we accept — and every recommendation we make.',
    'Why Choose Us',
    'A Practice Built on Substance, Not Slogans',
    'We are chosen by organizations that value depth of expertise, structured thinking, and a partner who genuinely invests in their long-term outcomes.'
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

-- ─────────────────────────────────────────────────────────────
-- 4. SERVICES (9 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-004', 'service', 'business-advisory-consulting', 'Business Advisory & Consulting', NULL,
    'Our business advisory practice helps organizations align financial discipline with strategic objectives. We partner with founders, boards, and management teams to navigate growth transitions, restructuring decisions, and complex operational challenges. Rather than offering generic frameworks, we work deeply within your operating context to identify what is genuinely actionable — then translate that into a practical roadmap your team can execute. Our advisory covers strategic planning, performance improvement, organizational effectiveness, and the financial implications of major business decisions. The objective is always the same: stronger systems, better decisions, and sustainable outcomes that compound over years rather than quarters.',
    'Briefcase', 0, TRUE, FALSE,
    '{"shortDescription":"Strategic guidance that aligns financial discipline with business objectives — helping organizations navigate growth, restructuring, and complex operational decisions.","deliverables":["Strategic business reviews","Growth and restructuring roadmaps","Operational diagnostics","Decision-support frameworks"]}'
),
(
    'seed-005', 'service', 'statutory-internal-audit', 'Statutory & Internal Audit', NULL,
    'We provide independent audit services that strengthen governance, surface control gaps, and deliver assurance grounded in internationally accepted auditing standards. Our statutory audit work ensures regulatory compliance while providing meaningful insights into the financial health of the organization. Our internal audit practice goes beyond compliance — we evaluate the design and operating effectiveness of internal controls, identify process inefficiencies, and recommend improvements that protect value and reduce risk. Every audit engagement is staffed with qualified professionals who understand the sector, ensuring observations are practical and recommendations are implementable.',
    'ClipboardCheck', 1, TRUE, FALSE,
    '{"shortDescription":"Independent audit services that strengthen governance, surface control gaps, and deliver assurance grounded in internationally accepted auditing standards.","deliverables":["Statutory audit engagements","Internal audit programs","Control evaluations","Audit-ready documentation"]}'
),
(
    'seed-006', 'service', 'accounting-financial-advisory', 'Accounting & Financial Advisory', NULL,
    'From accounting framework design to financial reporting advisory, we build the financial backbone your organization needs to operate with confidence. Our team assists with chart-of-accounts design, accounting policy documentation, IFRS/Nepal Financial Reporting Standards (NFRS) alignment, and the implementation of close-and-reporting processes that produce reliable, decision-quality financial information. We also advise on complex accounting matters including revenue recognition, lease accounting, financial instruments, and business combinations. The objective is a finance function that produces trustworthy numbers — quickly, consistently, and in a form that supports both compliance and management decision-making.',
    'Calculator', 2, TRUE, FALSE,
    '{"shortDescription":"From accounting framework design to financial reporting advisory, we build the financial backbone your organization needs to operate with confidence.","deliverables":["Accounting framework design","Policy documentation","IFRS / NFRS alignment","Close-and-reporting optimization"]}'
),
(
    'seed-007', 'service', 'taxation-compliance', 'Taxation & Compliance', NULL,
    'We provide comprehensive tax planning, compliance, and advisory services across direct and indirect taxes, keeping your business fully aligned with Nepalese regulatory requirements. Our services cover corporate income tax, value-added tax (VAT), excise duty, customs, and withholding tax obligations, along with tax assessments and representation before tax authorities. Beyond compliance, we work proactively to identify planning opportunities, manage transfer pricing exposure, and structure transactions in a tax-efficient manner. Our objective is to ensure that tax is never a source of surprise — and that every obligation is met accurately, on time, and with full documentation.',
    'Receipt', 3, TRUE, FALSE,
    '{"shortDescription":"Comprehensive tax planning, compliance, and advisory across direct and indirect taxes — keeping your business fully aligned with Nepalese regulatory requirements.","deliverables":["Tax compliance & filings","Tax planning & structuring","VAT and indirect tax advisory","Assessment representation"]}'
),
(
    'seed-008', 'service', 'financial-modeling', 'Financial Modeling', NULL,
    'We build investment-grade financial models that translate strategic assumptions into defensible projections, supporting fundraising, valuation, and decision-making. Each model is built from first principles, fully transparent, and structured so that any user can trace every output back to its underlying assumption. We model three-statement projections, scenario and sensitivity analyses, valuation models, project finance models, and operating budgets. Our models are designed not only to be technically correct but to be genuinely useful — supporting the conversations that matter with boards, investors, lenders, and management teams.',
    'TrendingUp', 4, TRUE, FALSE,
    '{"shortDescription":"Investment-grade financial models that translate strategic assumptions into defensible projections, supporting fundraising, valuation, and decision-making.","deliverables":["Three-statement projections","Scenario & sensitivity analysis","Valuation models","Project finance models"]}'
),
(
    'seed-009', 'service', 'budgeting-forecasting', 'Budgeting & Forecasting', NULL,
    'We design structured budgeting processes and rolling forecasts that connect operational targets to financial outcomes, keeping performance visible and accountable across the organization. We work with management teams to define the right drivers, build a bottom-up budget that reflects operational reality, and establish a monthly forecasting rhythm that detects variances early. Our approach shifts budgeting from an annual compliance exercise to a continuous management tool — one that supports course correction, accountability, and the strategic conversation the leadership team needs to have.',
    'LineChart', 5, TRUE, FALSE,
    '{"shortDescription":"Structured budgeting processes and rolling forecasts that connect operational targets to financial outcomes — keeping performance visible and accountable.","deliverables":["Annual budget design","Rolling forecast frameworks","Variance analysis cadence","Driver-based planning"]}'
),
(
    'seed-010', 'service', 'internal-control-process-review', 'Internal Control & Business Process Review', NULL,
    'We conduct systematic evaluations of internal controls and business processes, identifying inefficiencies and designing frameworks that protect value and reduce risk. Our review covers the full process lifecycle — procurement-to-pay, order-to-cash, payroll, treasury, and financial close — mapping each process, identifying control gaps and process bottlenecks, and recommending practical improvements. The output is a documented control framework that supports both operational efficiency and audit readiness, with clear ownership for each control and a sustainable cadence for monitoring.',
    'ShieldCheck', 6, TRUE, FALSE,
    '{"shortDescription":"Systematic evaluation of internal controls and business processes, identifying inefficiencies and designing frameworks that protect value and reduce risk.","deliverables":["Process mapping","Control gap assessments","Risk-control matrices","Process improvement roadmaps"]}'
),
(
    'seed-011', 'service', 'strategy-policy-development', 'Strategy & Policy Development', NULL,
    'We help organizations translate vision into documented practice through corporate strategy development, governance frameworks, and internal policy design. Our work covers board governance structures, delegation-of-authority matrices, code-of-conduct and ethics policies, financial policies, procurement policies, and human resource policies. Each policy is drafted to align with the organization''s operating reality and the applicable regulatory environment, ensuring it is implementable from day one. The objective is a governance and policy framework that codifies how the organization operates — reducing ambiguity, supporting scalability, and providing a defensible basis for decisions.',
    'Settings', 7, TRUE, FALSE,
    '{"shortDescription":"Corporate strategy, governance frameworks, and internal policies that codify how your organization operates — turning vision into documented practice.","deliverables":["Corporate strategy documents","Governance frameworks","Policy manuals","Delegation-of-authority matrices"]}'
),
(
    'seed-012', 'service', 'training-professional-mentorship', 'Training & Professional Mentorship', NULL,
    'We deliver capacity-building programs and structured mentorship that elevate the capabilities of finance professionals and business owners across your organization. Our training covers financial reporting, taxation, internal audit, budgeting and forecasting, financial modeling, and the practical application of accounting standards in day-to-day work. Each program is tailored to the audience — from junior accounting staff to senior management — and combines conceptual depth with hands-on practice using real organizational data. Beyond training, we provide ongoing mentorship that supports finance professionals in their career progression and business owners in their financial literacy.',
    'GraduationCap', 8, TRUE, FALSE,
    '{"shortDescription":"Capacity-building programs and structured mentorship that elevate the capabilities of finance professionals and business owners across your organization.","deliverables":["Customized training programs","Hands-on workshops","Mentorship engagements","Finance literacy for owners"]}'
);

-- ─────────────────────────────────────────────────────────────
-- 5. INDUSTRIES (8 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-013', 'industry', 'manufacturing', 'Manufacturing', NULL,
    'We work with manufacturing enterprises across Nepal to strengthen cost systems, inventory controls, and the process discipline required to operate efficiently at scale. Our engagements address production costing, variance analysis, working-capital optimization, and the financial controls that protect manufacturing margins. We understand the operational realities of Nepalese manufacturing — raw material volatility, supply chain constraints, energy costs, and regulatory obligations — and tailor our advisory to those realities rather than generic frameworks. The outcome is a finance function that supports both day-to-day operations and long-term capacity decisions.',
    'Factory', 0, TRUE, FALSE,
    '{"shortDescription":"Cost systems, inventory controls, and process discipline for production-driven enterprises.","services":["Cost accounting systems","Inventory controls","Process improvement","Compliance"]}'
),
(
    'seed-014', 'industry', 'trading', 'Trading', NULL,
    'Our trading-sector engagements focus on margin analysis, working-capital optimization, and the compliance frameworks that allow trading houses to operate profitably and confidently. We help trading businesses understand product-level profitability, optimize inventory turnover, manage foreign-exchange exposure on imports, and structure their tax position efficiently. Nepal''s trading environment — with its dependence on imports, currency volatility, and competitive pricing pressure — demands advisory that is both financially rigorous and operationally grounded. Our work helps trading businesses protect margins while remaining fully compliant with regulatory obligations.',
    'Store', 1, TRUE, FALSE,
    '{"shortDescription":"Margin analysis, working-capital optimization, and compliance frameworks for trading houses.","services":["Margin analysis","Working capital","Forex exposure management","Tax structuring"]}'
),
(
    'seed-015', 'industry', 'banking-financial-institutions', 'Banking & Financial Institutions', NULL,
    'We provide regulatory alignment, internal audit, and risk advisory services tailored to the specific requirements of the Banking and Financial Institutions (BFIs) sector. Our team understands the regulatory framework governing Nepalese BFIs — including NRB directives, prudential reporting, and risk-management expectations — and structures engagements accordingly. We support internal audit programs, credit portfolio reviews, compliance gap assessments, and the documentation required for regulatory examinations. Our objective is to strengthen the control environment, support regulatory confidence, and provide assurance that internal systems are operating as designed.',
    'Landmark', 2, TRUE, FALSE,
    '{"shortDescription":"Regulatory alignment, internal audit, and risk advisory tailored to the BFIs sector.","services":["Regulatory alignment","Internal audit","Credit reviews","Compliance assurance"]}'
),
(
    'seed-016', 'industry', 'education', 'Education', NULL,
    'We work with schools, colleges, and educational institutions to strengthen governance, design sustainable fee structures, and build the financial systems required to operate educational institutions with confidence. Our engagements address budget planning, fee structure analysis, financial controls over collections and expenditures, and compliance with the regulatory framework governing educational institutions in Nepal. We help institutions move from informal financial management to documented, auditable systems — supporting both institutional sustainability and the trust of parents, boards, and regulators.',
    'GraduationCap', 3, TRUE, FALSE,
    '{"shortDescription":"Governance, fee structures, and financial systems for schools, colleges, and institutions.","services":["Governance frameworks","Fee structure design","Budget planning","Compliance"]}'
),
(
    'seed-017', 'industry', 'healthcare', 'Healthcare', NULL,
    'Our healthcare-sector engagements help hospitals, clinics, and healthcare operators strengthen financial processes, implement control frameworks, and navigate the regulatory environment governing healthcare in Nepal. We address revenue cycle management, procurement controls, inventory management for medical supplies, and the financial reporting that supports both operational decisions and regulatory compliance. Healthcare operators face unique pressures — cost containment, regulatory scrutiny, and the need to balance financial sustainability with patient care. Our advisory is structured around those realities.',
    'HeartPulse', 4, TRUE, FALSE,
    '{"shortDescription":"Process reviews and compliance frameworks for hospitals, clinics, and healthcare operators.","services":["Revenue cycle review","Procurement controls","Inventory management","Compliance"]}'
),
(
    'seed-018', 'industry', 'information-technology', 'Information Technology', NULL,
    'We support information technology companies with revenue recognition, scaling finance teams, and the audit readiness required for growth-stage and enterprise technology businesses. Our advisory covers SaaS revenue recognition, deferred revenue management, equity compensation accounting, and the financial infrastructure required when technology companies raise capital or prepare for regulatory scrutiny. Nepal''s growing IT sector — with software services, product companies, and export-driven businesses — demands finance functions that can scale with the business while remaining compliant with both Nepalese and international expectations.',
    'Cpu', 5, TRUE, FALSE,
    '{"shortDescription":"Revenue recognition, scaling finance teams, and audit readiness for technology companies.","services":["Revenue recognition","Finance team scaling","Audit readiness","Fundraising support"]}'
),
(
    'seed-019', 'industry', 'hydropower', 'Hydropower', NULL,
    'We provide project financial structuring, capital advisory, and statutory compliance services for hydropower and energy projects in Nepal. Our work covers project financial modeling, debt-equity structuring, financial close documentation, and the ongoing compliance and reporting required throughout the project lifecycle. Hydropower projects involve long gestation periods, significant capital deployment, and complex multi-party arrangements — requiring advisory that combines financial rigor with deep understanding of the Nepalese energy sector. We support developers, sponsors, and lenders with the financial discipline these projects demand.',
    'Droplets', 6, TRUE, FALSE,
    '{"shortDescription":"Project financial structuring, capital advisory, and statutory compliance for energy projects.","services":["Project financial modeling","Capital structuring","Compliance","Lender reporting"]}'
),
(
    'seed-020', 'industry', 'service-industries', 'Service Industries', NULL,
    'Our engagements with service industries — professional services firms, hospitality operators, logistics businesses, and consumer service providers — focus on operational advisory and the financial discipline required to grow sustainably. We help service businesses understand unit economics, optimize pricing, manage working capital, and build the financial reporting that supports both daily operations and strategic decisions. Service businesses in Nepal face competitive pressure, talent costs, and the challenge of scaling without compromising quality — and our advisory is structured around helping them navigate those realities.',
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
    'We uphold ethical standards in every professional engagement we accept.',
    'Scale', 0, TRUE, FALSE, '{}'
),
(
    'seed-022', 'core_value', 'honesty', 'Honesty', NULL,
    'We communicate transparently and responsibly, even when the message is difficult.',
    'Handshake', 1, TRUE, FALSE, '{}'
),
(
    'seed-023', 'core_value', 'objectivity', 'Objectivity', NULL,
    'We provide independent, fact-based professional advice free from undue influence.',
    'Target', 2, TRUE, FALSE, '{}'
),
(
    'seed-024', 'core_value', 'professional-competence', 'Professional Competence', NULL,
    'We continuously develop our knowledge, skills, and professional expertise.',
    'GraduationCap', 3, TRUE, FALSE, '{}'
),
(
    'seed-025', 'core_value', 'confidentiality', 'Confidentiality', NULL,
    'We protect sensitive business and financial information with the highest care.',
    'Lock', 4, TRUE, FALSE, '{}'
),
(
    'seed-026', 'core_value', 'accountability', 'Accountability', NULL,
    'We take responsibility for the quality and impact of every engagement we deliver.',
    'CheckCircle2', 5, TRUE, FALSE, '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 7. WHY CHOOSE (6 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-027', 'why_choose', 'local-expertise', 'Local Expertise', NULL,
    'Deep understanding of Nepal''s business environment, regulatory frameworks, taxation structures, and corporate practices across diverse sectors.',
    'MapPin', 0, TRUE, FALSE, '{}'
),
(
    'seed-028', 'why_choose', 'professional-excellence', 'Professional Excellence', NULL,
    'A team of highly qualified professionals delivering reliable, quality-driven advisory services grounded in rigorous professional standards.',
    'Award', 1, TRUE, FALSE, '{}'
),
(
    'seed-029', 'why_choose', 'global-standards', 'Global Standards', NULL,
    'Internationally aligned financial and business practices, thoughtfully adapted to the realities and nuances of the Nepalese market.',
    'Globe', 2, TRUE, FALSE, '{}'
),
(
    'seed-030', 'why_choose', 'practical-solutions', 'Practical Solutions', NULL,
    'Actionable recommendations designed around real business challenges, ensuring measurable impact rather than theoretical frameworks.',
    'Target', 3, TRUE, FALSE, '{}'
),
(
    'seed-031', 'why_choose', 'multi-industry-experience', 'Multi-Industry Experience', NULL,
    'Experience across manufacturing, trading, banking & financial institutions, education, healthcare, IT, hydropower, and service sectors.',
    'Building2', 4, TRUE, FALSE, '{}'
),
(
    'seed-032', 'why_choose', 'long-term-partnership', 'Long-Term Partnership', NULL,
    'A collaborative approach focused on sustainable business growth, not short-term fixes — building relationships that compound over time.',
    'Handshake', 5, TRUE, FALSE, '{}'
);

-- ─────────────────────────────────────────────────────────────
-- 8. APPROACH STEPS (4 items)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-033', 'approach_step', 'understand', 'Understand', NULL,
    'We begin by deeply understanding your organization''s objectives, challenges, financial position, and operating environment.',
    'Users', 0, TRUE, FALSE, '{"number":"01"}'
),
(
    'seed-034', 'approach_step', 'analyze', 'Analyze', NULL,
    'We evaluate financial, operational, regulatory, and strategic factors using a structured, evidence-led methodology.',
    'FileBarChart', 1, TRUE, FALSE, '{"number":"02"}'
),
(
    'seed-035', 'approach_step', 'advise', 'Advise', NULL,
    'We develop customized, practical, and actionable recommendations aligned with your specific business context.',
    'Settings', 2, TRUE, FALSE, '{"number":"03"}'
),
(
    'seed-036', 'approach_step', 'empower', 'Empower', NULL,
    'We support implementation and help organizations establish sustainable systems for long-term, scalable growth.',
    'TrendingUp', 3, TRUE, FALSE, '{"number":"04"}'
);

-- ─────────────────────────────────────────────────────────────
-- 9. TEAM MEMBERS (1 item)
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO content_items (id, type, slug, title, subtitle, description, icon_name, item_order, published, featured, data)
VALUES
(
    'seed-037', 'team_member', 'narendra-chaudhary', 'Mr. Narendra Chaudhary', 'Managing Director',
    'Chartered Accountant with over six years of professional experience across manufacturing, trading, banking and financial institutions, education, healthcare, IT, hydropower, and various service sectors. Multi-disciplinary expertise spans the full spectrum of professional advisory — from audit and accounting frameworks to strategy, financial modeling, and compliance — combining the discipline of international professional practice with the practical understanding of how Nepalese businesses actually operate. Prior to founding Biztra, his professional experience at PwC — one of the world''s leading professional services firms — anchors the firm''s commitment to globally standardized professional practice and rigorous quality.',
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
    'Navigating Nepal''s Evolving Tax Filing Landscape in 2026',
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
    'Building a Finance Function That Scales With Your Business',
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
    'Why Internal Controls Are a Growth Strategy, Not a Cost Center',
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
    'Corporate Governance for Nepalese Boards: A Practical Framework',
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
    'Strategic Budgeting for Nepalese Manufacturers',
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
    'Financial Structuring for Hydropower Projects in Nepal',
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