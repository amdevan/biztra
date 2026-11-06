/* eslint-disable @typescript-eslint/no-require-imports */
// Seed the Biztra database with all initial content.
// Usage: `bun run db:seed`

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const ADMIN_EMAIL = "admin@biztra.com.np";
const ADMIN_PASSWORD = "biztra-admin-2026"; // change after first login

// ─────────────────────────────────────────────────────────────
// SITE SETTINGS (singleton)
// ─────────────────────────────────────────────────────────────
const SITE_SETTINGS = {
  id: "singleton",
  brandName: "Biztra",
  brandTagline: "Business Advisory",
  heroEyebrow: "Kathmandu · Nepal · Est. 2023",
  heroHeadline:
    "Transforming Businesses Through Smarter Advisory & Financial Practices",
  heroSubtitle:
    "Biztra Business Advisory helps businesses across Nepal build stronger financial systems, maintain compliance, optimize operations, and achieve sustainable growth through professional, practical, and globally aligned advisory solutions.",
  heroPrimaryCta: "Book a Consultation",
  heroSecondaryCta: "Explore Our Services",
  heroStat1Value: "6+",
  heroStat1Label: "Years Professional Experience",
  heroStat2Value: "9",
  heroStat2Label: "Service Verticals",
  heroStat3Value: "8+",
  heroStat3Label: "Industries Served",
  heroStat4Value: "100%",
  heroStat4Label: "Nepal-Focused Advisory",
  footerTagline:
    "Professional Advisory. Practical Solutions. Sustainable Growth.",
  footerDescription:
    "A Nepal-focused business advisory practice combining local market expertise with globally standardized professional practices.",
  contactPhone: "+977-1-4000000",
  contactEmail: "info@biztra.com.np",
  contactAddress: "Kathmandu, Nepal",
  contactAddressDetail: "Office address shared on request",
  contactHours: "Sun — Fri · 9:30 — 17:30",
  contactHoursDetail: "Saturday closed",
  contactResponseTime: "We respond within 1 business day",
  mapsUrl: "https://maps.google.com",
  linkedinUrl: "#",
  facebookUrl: "#",
  instagramUrl: "#",
};

// ─────────────────────────────────────────────────────────────
// ABOUT CONTENT (singleton)
// ─────────────────────────────────────────────────────────────
const ABOUT_CONTENT = {
  id: "singleton",
  storyEyebrow: "Who We Are",
  storyHeading: "Your Trusted Partner for Business Growth",
  storyParagraph1:
    "Biztra Business Advisory was established in 2023 in Kathmandu, Nepal, with a clear founding premise: that Nepalese businesses deserve access to advisory services that meet the same professional standards expected of leading global firms — delivered by professionals who genuinely understand the local operating environment. In a continuously evolving corporate and regulatory landscape, we provide a full spectrum of business advisory solutions supported by highly qualified professionals with diversified experience across multiple industries.",
  storyParagraph2:
    "What distinguishes Biztra is the approach we take to consulting. We are quality-driven, proactive, and professional — not in the surface-level sense those words are often used, but in the deeper sense of how we structure every engagement. Rather than simply responding to immediate challenges, we partner with businesses to anticipate changes, strengthen corporate structures, improve financial practices, ensure compliance, and optimize strategic positioning. This means we invest time in understanding the organization before recommending solutions, and we remain engaged through implementation rather than delivering a report and departing.",
  storyParagraph3:
    "Our objective is to help organizations achieve sustainable growth and long-term success by combining deep local expertise with rigorous professional standards. The Nepalese business environment is dynamic — shaped by regulatory evolution, capital market development, sector-specific opportunities, and the increasing expectations of stakeholders including regulators, lenders, investors, and customers. We help businesses navigate that environment with confidence, ensuring that financial discipline, compliance, and strategic clarity are strengths rather than constraints.",
  storyParagraph4:
    "Every engagement we accept is anchored in the same commitment: actionable recommendations grounded in evidence, delivered by qualified professionals, and structured to produce measurable improvement in how the organization operates. We are not a compliance-only provider. We are a strategic business partner — one that earns trust through the quality of work, the depth of insight, and the sustained impact we deliver over time.",
  storyQuote:
    "A trusted partner helping Nepalese businesses operate with global professional standards.",
  visionEyebrow: "Our Vision",
  visionText:
    "To accelerate enterprise growth across the industry by transforming conventional business practices into systematic, compliant, and globally standardized financial practices.",
  visionContext:
    "Our vision reflects the gap we see across the Nepalese corporate landscape — between the practices that have historically sustained businesses and the systematic, globally standardized practices that will sustain them in the years ahead. We exist to help close that gap, one organization at a time.",
  missionEyebrow: "Our Mission",
  missionHeading: "A One-Stop Hub for Comprehensive Advisory Excellence",
  missionText:
    "To serve as a premier, one-stop hub for comprehensive business advisory solutions, relentlessly delivering exceptional quality services. We are committed to actively empowering accounting & finance professionals and business owners while fostering widespread awareness and integration of globally standardized business practices across the corporate landscape.",
  coreValuesEyebrow: "Core Values",
  coreValuesHeading: "The Principles Behind Our Practice",
  coreValuesSubtitle:
    "Six values that govern every engagement we accept — and every recommendation we make.",
  whyChooseEyebrow: "Why Choose Us",
  whyChooseHeading: "A Practice Built on Substance, Not Slogans",
  whyChooseSubtitle:
    "We are chosen by organizations that value depth of expertise, structured thinking, and a partner who genuinely invests in their long-term outcomes.",
};

// ─────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    slug: "business-advisory-consulting",
    title: "Business Advisory & Consulting",
    shortDescription:
      "Strategic guidance that aligns financial discipline with business objectives — helping organizations navigate growth, restructuring, and complex operational decisions.",
    description:
      "Our business advisory practice helps organizations align financial discipline with strategic objectives. We partner with founders, boards, and management teams to navigate growth transitions, restructuring decisions, and complex operational challenges. Rather than offering generic frameworks, we work deeply within your operating context to identify what is genuinely actionable — then translate that into a practical roadmap your team can execute. Our advisory covers strategic planning, performance improvement, organizational effectiveness, and the financial implications of major business decisions. The objective is always the same: stronger systems, better decisions, and sustainable outcomes that compound over years rather than quarters.",
    iconName: "Briefcase",
    deliverables: [
      "Strategic business reviews",
      "Growth and restructuring roadmaps",
      "Operational diagnostics",
      "Decision-support frameworks",
    ],
  },
  {
    slug: "statutory-internal-audit",
    title: "Statutory & Internal Audit",
    shortDescription:
      "Independent audit services that strengthen governance, surface control gaps, and deliver assurance grounded in internationally accepted auditing standards.",
    description:
      "We provide independent audit services that strengthen governance, surface control gaps, and deliver assurance grounded in internationally accepted auditing standards. Our statutory audit work ensures regulatory compliance while providing meaningful insights into the financial health of the organization. Our internal audit practice goes beyond compliance — we evaluate the design and operating effectiveness of internal controls, identify process inefficiencies, and recommend improvements that protect value and reduce risk. Every audit engagement is staffed with qualified professionals who understand the sector, ensuring observations are practical and recommendations are implementable.",
    iconName: "ClipboardCheck",
    deliverables: [
      "Statutory audit engagements",
      "Internal audit programs",
      "Control evaluations",
      "Audit-ready documentation",
    ],
  },
  {
    slug: "accounting-financial-advisory",
    title: "Accounting & Financial Advisory",
    shortDescription:
      "From accounting framework design to financial reporting advisory, we build the financial backbone your organization needs to operate with confidence.",
    description:
      "From accounting framework design to financial reporting advisory, we build the financial backbone your organization needs to operate with confidence. Our team assists with chart-of-accounts design, accounting policy documentation, IFRS/Nepal Financial Reporting Standards (NFRS) alignment, and the implementation of close-and-reporting processes that produce reliable, decision-quality financial information. We also advise on complex accounting matters including revenue recognition, lease accounting, financial instruments, and business combinations. The objective is a finance function that produces trustworthy numbers — quickly, consistently, and in a form that supports both compliance and management decision-making.",
    iconName: "Calculator",
    deliverables: [
      "Accounting framework design",
      "Policy documentation",
      "IFRS / NFRS alignment",
      "Close-and-reporting optimization",
    ],
  },
  {
    slug: "taxation-compliance",
    title: "Taxation & Compliance",
    shortDescription:
      "Comprehensive tax planning, compliance, and advisory across direct and indirect taxes — keeping your business fully aligned with Nepalese regulatory requirements.",
    description:
      "We provide comprehensive tax planning, compliance, and advisory services across direct and indirect taxes, keeping your business fully aligned with Nepalese regulatory requirements. Our services cover corporate income tax, value-added tax (VAT), excise duty, customs, and withholding tax obligations, along with tax assessments and representation before tax authorities. Beyond compliance, we work proactively to identify planning opportunities, manage transfer pricing exposure, and structure transactions in a tax-efficient manner. Our objective is to ensure that tax is never a source of surprise — and that every obligation is met accurately, on time, and with full documentation.",
    iconName: "Receipt",
    deliverables: [
      "Tax compliance & filings",
      "Tax planning & structuring",
      "VAT and indirect tax advisory",
      "Assessment representation",
    ],
  },
  {
    slug: "financial-modeling",
    title: "Financial Modeling",
    shortDescription:
      "Investment-grade financial models that translate strategic assumptions into defensible projections, supporting fundraising, valuation, and decision-making.",
    description:
      "We build investment-grade financial models that translate strategic assumptions into defensible projections, supporting fundraising, valuation, and decision-making. Each model is built from first principles, fully transparent, and structured so that any user can trace every output back to its underlying assumption. We model three-statement projections, scenario and sensitivity analyses, valuation models, project finance models, and operating budgets. Our models are designed not only to be technically correct but to be genuinely useful — supporting the conversations that matter with boards, investors, lenders, and management teams.",
    iconName: "TrendingUp",
    deliverables: [
      "Three-statement projections",
      "Scenario & sensitivity analysis",
      "Valuation models",
      "Project finance models",
    ],
  },
  {
    slug: "budgeting-forecasting",
    title: "Budgeting & Forecasting",
    shortDescription:
      "Structured budgeting processes and rolling forecasts that connect operational targets to financial outcomes — keeping performance visible and accountable.",
    description:
      "We design structured budgeting processes and rolling forecasts that connect operational targets to financial outcomes, keeping performance visible and accountable across the organization. We work with management teams to define the right drivers, build a bottom-up budget that reflects operational reality, and establish a monthly forecasting rhythm that detects variances early. Our approach shifts budgeting from an annual compliance exercise to a continuous management tool — one that supports course correction, accountability, and the strategic conversation the leadership team needs to have.",
    iconName: "LineChart",
    deliverables: [
      "Annual budget design",
      "Rolling forecast frameworks",
      "Variance analysis cadence",
      "Driver-based planning",
    ],
  },
  {
    slug: "internal-control-process-review",
    title: "Internal Control & Business Process Review",
    shortDescription:
      "Systematic evaluation of internal controls and business processes, identifying inefficiencies and designing frameworks that protect value and reduce risk.",
    description:
      "We conduct systematic evaluations of internal controls and business processes, identifying inefficiencies and designing frameworks that protect value and reduce risk. Our review covers the full process lifecycle — procurement-to-pay, order-to-cash, payroll, treasury, and financial close — mapping each process, identifying control gaps and process bottlenecks, and recommending practical improvements. The output is a documented control framework that supports both operational efficiency and audit readiness, with clear ownership for each control and a sustainable cadence for monitoring.",
    iconName: "ShieldCheck",
    deliverables: [
      "Process mapping",
      "Control gap assessments",
      "Risk-control matrices",
      "Process improvement roadmaps",
    ],
  },
  {
    slug: "strategy-policy-development",
    title: "Strategy & Policy Development",
    shortDescription:
      "Corporate strategy, governance frameworks, and internal policies that codify how your organization operates — turning vision into documented practice.",
    description:
      "We help organizations translate vision into documented practice through corporate strategy development, governance frameworks, and internal policy design. Our work covers board governance structures, delegation-of-authority matrices, code-of-conduct and ethics policies, financial policies, procurement policies, and human resource policies. Each policy is drafted to align with the organization's operating reality and the applicable regulatory environment, ensuring it is implementable from day one. The objective is a governance and policy framework that codifies how the organization operates — reducing ambiguity, supporting scalability, and providing a defensible basis for decisions.",
    iconName: "Settings",
    deliverables: [
      "Corporate strategy documents",
      "Governance frameworks",
      "Policy manuals",
      "Delegation-of-authority matrices",
    ],
  },
  {
    slug: "training-professional-mentorship",
    title: "Training & Professional Mentorship",
    shortDescription:
      "Capacity-building programs and structured mentorship that elevate the capabilities of finance professionals and business owners across your organization.",
    description:
      "We deliver capacity-building programs and structured mentorship that elevate the capabilities of finance professionals and business owners across your organization. Our training covers financial reporting, taxation, internal audit, budgeting and forecasting, financial modeling, and the practical application of accounting standards in day-to-day work. Each program is tailored to the audience — from junior accounting staff to senior management — and combines conceptual depth with hands-on practice using real organizational data. Beyond training, we provide ongoing mentorship that supports finance professionals in their career progression and business owners in their financial literacy.",
    iconName: "GraduationCap",
    deliverables: [
      "Customized training programs",
      "Hands-on workshops",
      "Mentorship engagements",
      "Finance literacy for owners",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// INDUSTRIES
// ─────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    slug: "manufacturing",
    title: "Manufacturing",
    shortDescription:
      "Cost systems, inventory controls, and process discipline for production-driven enterprises.",
    description:
      "We work with manufacturing enterprises across Nepal to strengthen cost systems, inventory controls, and the process discipline required to operate efficiently at scale. Our engagements address production costing, variance analysis, working-capital optimization, and the financial controls that protect manufacturing margins. We understand the operational realities of Nepalese manufacturing — raw material volatility, supply chain constraints, energy costs, and regulatory obligations — and tailor our advisory to those realities rather than generic frameworks. The outcome is a finance function that supports both day-to-day operations and long-term capacity decisions.",
    services: ["Cost accounting systems", "Inventory controls", "Process improvement", "Compliance"],
    iconName: "Factory",
  },
  {
    slug: "trading",
    title: "Trading",
    shortDescription:
      "Margin analysis, working-capital optimization, and compliance frameworks for trading houses.",
    description:
      "Our trading-sector engagements focus on margin analysis, working-capital optimization, and the compliance frameworks that allow trading houses to operate profitably and confidently. We help trading businesses understand product-level profitability, optimize inventory turnover, manage foreign-exchange exposure on imports, and structure their tax position efficiently. Nepal's trading environment — with its dependence on imports, currency volatility, and competitive pricing pressure — demands advisory that is both financially rigorous and operationally grounded. Our work helps trading businesses protect margins while remaining fully compliant with regulatory obligations.",
    services: ["Margin analysis", "Working capital", "Forex exposure management", "Tax structuring"],
    iconName: "Store",
  },
  {
    slug: "banking-financial-institutions",
    title: "Banking & Financial Institutions",
    shortDescription:
      "Regulatory alignment, internal audit, and risk advisory tailored to the BFIs sector.",
    description:
      "We provide regulatory alignment, internal audit, and risk advisory services tailored to the specific requirements of the Banking and Financial Institutions (BFIs) sector. Our team understands the regulatory framework governing Nepalese BFIs — including NRB directives, prudential reporting, and risk-management expectations — and structures engagements accordingly. We support internal audit programs, credit portfolio reviews, compliance gap assessments, and the documentation required for regulatory examinations. Our objective is to strengthen the control environment, support regulatory confidence, and provide assurance that internal systems are operating as designed.",
    services: ["Regulatory alignment", "Internal audit", "Credit reviews", "Compliance assurance"],
    iconName: "Landmark",
  },
  {
    slug: "education",
    title: "Education",
    shortDescription:
      "Governance, fee structures, and financial systems for schools, colleges, and institutions.",
    description:
      "We work with schools, colleges, and educational institutions to strengthen governance, design sustainable fee structures, and build the financial systems required to operate educational institutions with confidence. Our engagements address budget planning, fee structure analysis, financial controls over collections and expenditures, and compliance with the regulatory framework governing educational institutions in Nepal. We help institutions move from informal financial management to documented, auditable systems — supporting both institutional sustainability and the trust of parents, boards, and regulators.",
    services: ["Governance frameworks", "Fee structure design", "Budget planning", "Compliance"],
    iconName: "GraduationCap",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortDescription:
      "Process reviews and compliance frameworks for hospitals, clinics, and healthcare operators.",
    description:
      "Our healthcare-sector engagements help hospitals, clinics, and healthcare operators strengthen financial processes, implement control frameworks, and navigate the regulatory environment governing healthcare in Nepal. We address revenue cycle management, procurement controls, inventory management for medical supplies, and the financial reporting that supports both operational decisions and regulatory compliance. Healthcare operators face unique pressures — cost containment, regulatory scrutiny, and the need to balance financial sustainability with patient care. Our advisory is structured around those realities.",
    services: ["Revenue cycle review", "Procurement controls", "Inventory management", "Compliance"],
    iconName: "HeartPulse",
  },
  {
    slug: "information-technology",
    title: "Information Technology",
    shortDescription:
      "Revenue recognition, scaling finance teams, and audit readiness for technology companies.",
    description:
      "We support information technology companies with revenue recognition, scaling finance teams, and the audit readiness required for growth-stage and enterprise technology businesses. Our advisory covers SaaS revenue recognition, deferred revenue management, equity compensation accounting, and the financial infrastructure required when technology companies raise capital or prepare for regulatory scrutiny. Nepal's growing IT sector — with software services, product companies, and export-driven businesses — demands finance functions that can scale with the business while remaining compliant with both Nepalese and international expectations.",
    services: ["Revenue recognition", "Finance team scaling", "Audit readiness", "Fundraising support"],
    iconName: "Cpu",
  },
  {
    slug: "hydropower",
    title: "Hydropower",
    shortDescription:
      "Project financial structuring, capital advisory, and statutory compliance for energy projects.",
    description:
      "We provide project financial structuring, capital advisory, and statutory compliance services for hydropower and energy projects in Nepal. Our work covers project financial modeling, debt-equity structuring, financial close documentation, and the ongoing compliance and reporting required throughout the project lifecycle. Hydropower projects involve long gestation periods, significant capital deployment, and complex multi-party arrangements — requiring advisory that combines financial rigor with deep understanding of the Nepalese energy sector. We support developers, sponsors, and lenders with the financial discipline these projects demand.",
    services: ["Project financial modeling", "Capital structuring", "Compliance", "Lender reporting"],
    iconName: "Droplets",
  },
  {
    slug: "service-industries",
    title: "Service Industries",
    shortDescription:
      "Operational advisory and financial discipline for professional and consumer service firms.",
    description:
      "Our engagements with service industries — professional services firms, hospitality operators, logistics businesses, and consumer service providers — focus on operational advisory and the financial discipline required to grow sustainably. We help service businesses understand unit economics, optimize pricing, manage working capital, and build the financial reporting that supports both daily operations and strategic decisions. Service businesses in Nepal face competitive pressure, talent costs, and the challenge of scaling without compromising quality — and our advisory is structured around helping them navigate those realities.",
    services: ["Unit economics", "Pricing strategy", "Working capital", "Operational reporting"],
    iconName: "Wrench",
  },
];

// ─────────────────────────────────────────────────────────────
// CORE VALUES
// ─────────────────────────────────────────────────────────────
const CORE_VALUES = [
  { slug: "integrity", title: "Integrity", description: "We uphold ethical standards in every professional engagement we accept.", iconName: "Scale" },
  { slug: "honesty", title: "Honesty", description: "We communicate transparently and responsibly, even when the message is difficult.", iconName: "Handshake" },
  { slug: "objectivity", title: "Objectivity", description: "We provide independent, fact-based professional advice free from undue influence.", iconName: "Target" },
  { slug: "professional-competence", title: "Professional Competence", description: "We continuously develop our knowledge, skills, and professional expertise.", iconName: "GraduationCap" },
  { slug: "confidentiality", title: "Confidentiality", description: "We protect sensitive business and financial information with the highest care.", iconName: "Lock" },
  { slug: "accountability", title: "Accountability", description: "We take responsibility for the quality and impact of every engagement we deliver.", iconName: "CheckCircle2" },
];

// ─────────────────────────────────────────────────────────────
// WHY CHOOSE
// ─────────────────────────────────────────────────────────────
const WHY_CHOOSE = [
  {
    slug: "local-expertise",
    title: "Local Expertise",
    description:
      "Deep understanding of Nepal's business environment, regulatory frameworks, taxation structures, and corporate practices across diverse sectors.",
    iconName: "MapPin",
  },
  {
    slug: "professional-excellence",
    title: "Professional Excellence",
    description:
      "A team of highly qualified professionals delivering reliable, quality-driven advisory services grounded in rigorous professional standards.",
    iconName: "Award",
  },
  {
    slug: "global-standards",
    title: "Global Standards",
    description:
      "Internationally aligned financial and business practices, thoughtfully adapted to the realities and nuances of the Nepalese market.",
    iconName: "Globe",
  },
  {
    slug: "practical-solutions",
    title: "Practical Solutions",
    description:
      "Actionable recommendations designed around real business challenges, ensuring measurable impact rather than theoretical frameworks.",
    iconName: "Target",
  },
  {
    slug: "multi-industry-experience",
    title: "Multi-Industry Experience",
    description:
      "Experience across manufacturing, trading, banking & financial institutions, education, healthcare, IT, hydropower, and service sectors.",
    iconName: "Building2",
  },
  {
    slug: "long-term-partnership",
    title: "Long-Term Partnership",
    description:
      "A collaborative approach focused on sustainable business growth, not short-term fixes — building relationships that compound over time.",
    iconName: "Handshake",
  },
];

// ─────────────────────────────────────────────────────────────
// APPROACH STEPS
// ─────────────────────────────────────────────────────────────
const APPROACH_STEPS = [
  {
    slug: "understand",
    title: "Understand",
    number: "01",
    description:
      "We begin by deeply understanding your organization's objectives, challenges, financial position, and operating environment.",
    iconName: "Users",
  },
  {
    slug: "analyze",
    title: "Analyze",
    number: "02",
    description:
      "We evaluate financial, operational, regulatory, and strategic factors using a structured, evidence-led methodology.",
    iconName: "FileBarChart",
  },
  {
    slug: "advise",
    title: "Advise",
    number: "03",
    description:
      "We develop customized, practical, and actionable recommendations aligned with your specific business context.",
    iconName: "Settings",
  },
  {
    slug: "empower",
    title: "Empower",
    number: "04",
    description:
      "We support implementation and help organizations establish sustainable systems for long-term, scalable growth.",
    iconName: "TrendingUp",
  },
];

// ─────────────────────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  {
    slug: "narendra-chaudhary",
    title: "Mr. Narendra Chaudhary",
    subtitle: "Managing Director",
    description:
      "Chartered Accountant with over six years of professional experience across manufacturing, trading, banking and financial institutions, education, healthcare, IT, hydropower, and various service sectors. Multi-disciplinary expertise spans the full spectrum of professional advisory — from audit and accounting frameworks to strategy, financial modeling, and compliance — combining the discipline of international professional practice with the practical understanding of how Nepalese businesses actually operate. Prior to founding Biztra, his professional experience at PwC — one of the world's leading professional services firms — anchors the firm's commitment to globally standardized professional practice and rigorous quality.",
    iconName: "Award",
    featured: true,
    initials: "NC",
    role: "Managing Director",
    designation: "Chartered Accountant",
    expertise: [
      "Business Advisory & Consulting",
      "Statutory & Internal Audit",
      "Accounting Frameworks",
      "Strategy & Policy Development",
      "Financial Modeling",
      "Budgeting & Forecasting",
      "Internal Controls",
      "Business Process Review",
      "Taxation & Compliance",
      "Training & Mentorship",
    ],
    highlights: [
      { label: "Experience", value: "6+ Years" },
      { label: "Foundation", value: "PwC Alumni" },
      { label: "Sectors", value: "8+ Industries" },
      { label: "Qualification", value: "Chartered Accountant" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// ARTICLES (existing — kept for idempotency)
// ─────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    slug: "navigating-nepal-tax-filing-2026",
    title: "Navigating Nepal's Evolving Tax Filing Landscape in 2026",
    excerpt:
      "A practical look at recent changes in Nepal's tax regulations and what finance teams should prioritize to remain fully compliant this fiscal year.",
    category: "Tax & Compliance",
    readTime: "6 min read",
    featured: true,
    content: `Recent changes to Nepal's tax filing framework have introduced both new obligations and new opportunities for finance teams across the country. For chartered accountants, CFOs, and business owners, the question is no longer whether to comply — it is how to comply efficiently while minimizing the operational burden on the finance function.

## What has changed

The Inland Revenue Department has continued to refine the electronic filing portal, with incremental updates to VAT returns, corporate income tax returns, and withholding tax submissions. For most businesses, the substantive obligations have not changed dramatically, but the format, the supporting documentation required, and the timelines for response have become stricter.

## What finance teams should prioritize

First, ensure your chart of accounts is structured to support tax reporting — not just accounting reporting. Many Nepalese businesses maintain charts of accounts designed for management reporting but lack the granularity required for direct tax extraction.

Second, document every withholding transaction at source. The IRD's audit approach increasingly focuses on withholding compliance, and undocumented or under-documented withholdings are a common source of assessment exposure.

Third, build a monthly tax close discipline rather than treating tax as an annual event. The cost of catching up at year-end is significantly higher than the cost of maintaining compliance continuously.

## Looking ahead

The regulatory direction is clear — toward more granular, more frequent, and more digitally integrated reporting. Finance teams that build the discipline now will find the next wave of changes easier to absorb; those that defer will face increasingly costly catch-up cycles.`,
  },
  {
    slug: "building-scalable-finance-function",
    title: "Building a Finance Function That Scales With Your Business",
    excerpt:
      "From chart-of-accounts design to monthly close discipline — the foundational practices that separate sustainable finance functions from reactive ones.",
    category: "Accounting & Finance",
    readTime: "8 min read",
    featured: true,
    content: `A finance function that scales is not built by accident. It is the product of deliberate choices made early — choices that compound over years and ultimately determine whether the finance team is a strategic asset or a cost center.

## The foundational practices

The chart of accounts is the starting point. A well-structured chart of accounts supports both management reporting and statutory compliance, with enough granularity to extract meaningful insights without becoming unmanageably complex. Many Nepalese businesses operate with charts designed years ago that no longer reflect how the business actually generates revenue or incurs cost.

The monthly close is the second foundation. A disciplined monthly close — completed within 5-10 working days of period end — produces reliable numbers that management can act on. A delayed or rushed close produces numbers that are technically correct but operationally useless.

## What scales and what doesn't

Manual reconciliations do not scale. Spreadsheet-based consolidations do not scale. Ad-hoc approvals routed through individual inboxes do not scale. Each of these practices works at small scale and fails predictably as transaction volume grows.

What does scale: documented policies, system-based controls, automated reconciliations where possible, and clear ownership for every balance sheet account. These investments feel expensive at small scale and indispensable at scale.

## The path forward

For most Nepalese businesses, the path forward begins with a structured review of the current state — identifying which practices are sustainable, which are not, and where the highest-leverage improvements lie. The objective is not to rebuild the finance function overnight but to build, quarter by quarter, a function that supports the business the leadership team wants to become.`,
  },
  {
    slug: "internal-controls-as-growth-strategy",
    title: "Why Internal Controls Are a Growth Strategy, Not a Cost Center",
    excerpt:
      "How a well-designed internal control environment accelerates decision-making, builds investor confidence, and protects long-term enterprise value.",
    category: "Business Advisory",
    readTime: "5 min read",
    featured: true,
    content: `Internal controls are often discussed as a compliance obligation — something to be implemented because auditors or regulators require it. This framing misses the more important truth: a well-designed internal control environment is a growth strategy.

## The connection between controls and growth

Growth requires capital. Capital — whether debt or equity — requires confidence. Confidence, in turn, requires that the numbers a business reports can be relied upon. And reliable numbers are the product of a control environment that ensures transactions are recorded accurately, completely, and on time.

When a business approaches a lender or an investor, the diligence process ultimately evaluates the reliability of the financial information. A business with documented controls, evidence of control operation, and a clean audit history will command better terms and close faster than a business where financial information is informal.

## Beyond compliance

The same controls that satisfy auditors also accelerate internal decision-making. When management knows the numbers are reliable, decisions can be made faster. When approvals are routed through documented channels rather than ad-hoc conversations, accountability is clear. When exceptions are surfaced systematically rather than discovered accidentally, risks are addressed before they compound.

## A practical perspective

For most Nepalese businesses, the right starting point is not a comprehensive controls overhaul. It is a focused review of the highest-risk processes — typically procurement, cash disbursements, revenue recognition, and payroll — followed by targeted improvements that produce visible impact within a quarter or two. The objective is momentum, not perfection.`,
  },
  {
    slug: "corporate-governance-for-nepalese-boards",
    title: "Corporate Governance for Nepalese Boards: A Practical Framework",
    excerpt:
      "What effective board governance looks like in the Nepalese context — and the structures, policies, and practices that strengthen board effectiveness.",
    category: "Corporate Governance",
    readTime: "7 min read",
    featured: false,
    content: `Effective corporate governance is not an imported concept imposed on Nepalese businesses — it is a practical framework that helps boards make better decisions, manage risk more deliberately, and build the trust of stakeholders including shareholders, lenders, regulators, and employees.

## The building blocks

A functioning board requires three foundational elements: a clear composition with independent perspectives, documented terms of reference that define what the board decides versus what management decides, and a cadence of meetings that allows issues to be discussed rather than merely reported.

Many Nepalese boards operate without one or more of these elements. Boards composed entirely of executive directors lack the independent perspective that challenges management thinking. Boards without documented terms of reference find their authority expanding or contracting based on personality rather than policy. Boards that meet infrequently find themselves rubber-stamping decisions rather than shaping them.

## The committees

For larger organizations, the establishment of an audit committee and a risk committee transforms the board's effectiveness. The audit committee, in particular, becomes the bridge between the board and the external auditor — ensuring that audit findings are addressed rather than archived.

## A practical path forward

For most Nepalese businesses, the path forward begins with documentation — capturing what the board currently does, comparing it to leading practice, and identifying the highest-leverage improvements. The objective is not to import a foreign governance model but to build, deliberately, the governance practices that will support the organization's next stage of growth.`,
  },
  {
    slug: "strategic-budgeting-for-manufacturers",
    title: "Strategic Budgeting for Nepalese Manufacturers",
    excerpt:
      "How manufacturing businesses in Nepal can move beyond annual budgeting rituals toward rolling forecasts that genuinely inform operational decisions.",
    category: "Business Strategy",
    readTime: "9 min read",
    featured: false,
    content: `For Nepalese manufacturers, the annual budget has become, in many organizations, a ritual rather than a tool. Finance teams spend weeks producing a detailed document that is outdated within months and rarely referenced in operational decisions. There is a better way.

## Why annual budgets fail manufacturers

Manufacturing operations are exposed to input-cost volatility, supply-chain disruption, energy costs, and demand variability. An annual budget, fixed at the start of the fiscal year, cannot absorb these realities. By the second quarter, variance against budget becomes so large that the budget itself ceases to inform decisions.

The result is that operational leaders learn to ignore the budget — making decisions based on instinct, recent actuals, and informal forecasts — while the finance team continues to produce monthly variance reports that no one acts on.

## The rolling forecast alternative

Rolling forecasts — typically covering the next 12-18 months, updated monthly or quarterly — provide a more responsive planning tool. Rather than replacing the budget, they sit alongside it: the budget remains the annual commitment, while the rolling forecast becomes the operational planning tool that reflects current reality.

For Nepalese manufacturers, the highest-value starting point is typically a driver-based forecast built around the few variables that actually drive the business: raw material costs, production volume, selling prices, and working-capital requirements.

## Implementation realities

Implementing rolling forecasts requires three things: clean historical data, a small number of well-understood drivers, and the discipline to update the forecast on a fixed cadence. None of these are easy. All of them are achievable — and the payoff, in terms of decision quality, is substantial.`,
  },
  {
    slug: "hydropower-financial-structuring-nepal",
    title: "Financial Structuring for Hydropower Projects in Nepal",
    excerpt:
      "Key considerations in structuring the financial close for hydropower projects — from debt-equity calibration to lender reporting discipline.",
    category: "Nepal Business Updates",
    readTime: "10 min read",
    featured: false,
    content: `Hydropower remains one of Nepal's most significant long-term economic opportunities — and one of its most financially complex. The structuring of a hydropower project's financial close shapes the project's viability for decades. Getting it right requires both technical financial expertise and deep understanding of the Nepalese energy sector.

## The structuring decision

The core financial structuring decision in any hydropower project is the calibration of debt and equity. Too much debt, and the project becomes exposed to cash-flow shocks during construction delays or low-generation years. Too little debt, and the equity returns may not meet sponsor expectations.

The right calibration depends on multiple factors: the project's expected generation profile, the power purchase agreement terms, the construction timeline and risk profile, the cost of debt in the relevant market, and the sponsor's return expectations.

## Documentation and lender reporting

Once the capital structure is set, the documentation discipline begins. Lenders require detailed reporting throughout the construction and operational phases — including construction progress, cost variance, generation performance, and debt service coverage ratios.

For many developer teams, this reporting burden is underestimated. The cost of building the financial reporting capability — typically a combination of internal finance staff and external advisors — should be factored into the project's operational budget from the beginning.

## A long-term perspective

Hydropower projects operate on multi-decade horizons. The decisions made at financial close — about capital structure, about reporting cadence, about reserve accounts, about covenant packages — will shape the project's flexibility for years. Taking the time to structure these decisions thoughtfully, with experienced advisory support, is one of the highest-leverage investments a developer can make.`,
  },
];

async function upsertSingleton(model, data) {
  return model.upsert({ where: { id: "singleton" }, update: data, create: data });
}

async function upsertContentItem(type, slug, fields) {
  const existing = await db.contentItem.findUnique({
    where: { type_slug: { type, slug } },
  });
  if (existing) return existing;
  return db.contentItem.create({
    data: {
      type,
      slug,
      title: fields.title,
      subtitle: fields.subtitle || null,
      description: fields.description || null,
      iconName: fields.iconName || "Briefcase",
      order: fields.order ?? 0,
      published: fields.published !== false,
      featured: fields.featured || false,
      data: JSON.stringify(fields.data || {}),
    },
  });
}

async function main() {
  console.log("🌱 Seeding Biztra database (full content)...\n");

  // 1. Admin user
  const existingAdmin = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existingAdmin) {
    console.log(`✓ Admin user exists: ${ADMIN_EMAIL}`);
  } else {
    await db.user.create({
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Biztra Admin", role: "ADMIN" },
    });
    console.log(`✓ Created admin user: ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD})`);
  }

  // 2. Site settings singleton
  await upsertSingleton(db.siteSetting, SITE_SETTINGS);
  console.log("✓ Site settings seeded");

  // 3. About content singleton
  await upsertSingleton(db.aboutContent, ABOUT_CONTENT);
  console.log("✓ About content seeded");

  // 4. Services
  for (const [i, s] of SERVICES.entries()) {
    await upsertContentItem("service", s.slug, {
      title: s.title,
      description: s.description,
      iconName: s.iconName,
      order: i,
      published: true,
      data: { shortDescription: s.shortDescription, deliverables: s.deliverables },
    });
  }
  console.log(`✓ ${SERVICES.length} services seeded`);

  // 5. Industries
  for (const [i, ind] of INDUSTRIES.entries()) {
    await upsertContentItem("industry", ind.slug, {
      title: ind.title,
      description: ind.description,
      iconName: ind.iconName,
      order: i,
      published: true,
      data: { shortDescription: ind.shortDescription, services: ind.services },
    });
  }
  console.log(`✓ ${INDUSTRIES.length} industries seeded`);

  // 6. Core values
  for (const [i, v] of CORE_VALUES.entries()) {
    await upsertContentItem("core_value", v.slug, {
      title: v.title,
      description: v.description,
      iconName: v.iconName,
      order: i,
      data: {},
    });
  }
  console.log(`✓ ${CORE_VALUES.length} core values seeded`);

  // 7. Why choose items
  for (const [i, w] of WHY_CHOOSE.entries()) {
    await upsertContentItem("why_choose", w.slug, {
      title: w.title,
      description: w.description,
      iconName: w.iconName,
      order: i,
      data: {},
    });
  }
  console.log(`✓ ${WHY_CHOOSE.length} why-choose items seeded`);

  // 8. Approach steps
  for (const [i, a] of APPROACH_STEPS.entries()) {
    await upsertContentItem("approach_step", a.slug, {
      title: a.title,
      description: a.description,
      iconName: a.iconName,
      order: i,
      data: { number: a.number },
    });
  }
  console.log(`✓ ${APPROACH_STEPS.length} approach steps seeded`);

  // 9. Team members
  for (const [i, t] of TEAM_MEMBERS.entries()) {
    await upsertContentItem("team_member", t.slug, {
      title: t.title,
      subtitle: t.role,
      description: t.description,
      iconName: t.iconName,
      order: i,
      featured: t.featured || false,
      published: true,
      data: {
        initials: t.initials,
        role: t.role,
        designation: t.designation,
        expertise: t.expertise,
        highlights: t.highlights,
      },
    });
  }
  console.log(`✓ ${TEAM_MEMBERS.length} team members seeded`);

  // 10. Articles (idempotent)
  let created = 0;
  let skipped = 0;
  for (const article of ARTICLES) {
    const existing = await db.article.findUnique({ where: { slug: article.slug } });
    if (existing) {
      skipped++;
      continue;
    }
    await db.article.create({
      data: { ...article, published: true, publishedAt: new Date() },
    });
    created++;
  }
  console.log(`✓ Articles: ${created} created, ${skipped} already present`);

  console.log("\n🌱 Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
