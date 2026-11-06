import {
  Briefcase,
  ClipboardCheck,
  Calculator,
  Receipt,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Settings,
  GraduationCap,
  Factory,
  Store,
  Landmark,
  HeartPulse,
  Cpu,
  Droplets,
  Wrench,
  MapPin,
  Globe,
  Scale,
  Target,
  Handshake,
  Lock,
  Award,
  CheckCircle2,
  Users,
  Building2,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Our Team", href: "/team" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

export type CredibilityItem = {
  stat: string;
  label: string;
};

export const CREDIBILITY_ITEMS: CredibilityItem[] = [
  { stat: "6+", label: "Years Professional Experience" },
  { stat: "9", label: "Service Verticals" },
  { stat: "8+", label: "Industries Served" },
  { stat: "100%", label: "Nepal-Focused Advisory" },
];

export type FeatureCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const WHY_CHOOSE: FeatureCard[] = [
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Deep understanding of Nepal's business environment, regulatory frameworks, taxation structures, and corporate practices across diverse sectors.",
  },
  {
    icon: Award,
    title: "Professional Excellence",
    description:
      "A team of highly qualified professionals delivering reliable, quality-driven advisory services grounded in rigorous professional standards.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description:
      "Internationally aligned financial and business practices, thoughtfully adapted to the realities and nuances of the Nepalese market.",
  },
  {
    icon: Target,
    title: "Practical Solutions",
    description:
      "Actionable recommendations designed around real business challenges, ensuring measurable impact rather than theoretical frameworks.",
  },
  {
    icon: Building2,
    title: "Multi-Industry Experience",
    description:
      "Experience across manufacturing, trading, banking & financial institutions, education, healthcare, IT, hydropower, and service sectors.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "A collaborative approach focused on sustainable business growth, not short-term fixes — building relationships that compound over time.",
  },
];

export type ServiceCard = {
  icon: LucideIcon;
  name: string;
  shortDescription: string;
  description: string;
  deliverables: string[];
};

export const SERVICES: ServiceCard[] = [
  {
    icon: Briefcase,
    name: "Business Advisory & Consulting",
    shortDescription:
      "Strategic guidance that aligns financial discipline with business objectives — helping organizations navigate growth, restructuring, and complex operational decisions.",
    description:
      "Our business advisory practice helps organizations align financial discipline with strategic objectives. We partner with founders, boards, and management teams to navigate growth transitions, restructuring decisions, and complex operational challenges. Rather than offering generic frameworks, we work deeply within your operating context to identify what is genuinely actionable — then translate that into a practical roadmap your team can execute. Our advisory covers strategic planning, performance improvement, organizational effectiveness, and the financial implications of major business decisions. The objective is always the same: stronger systems, better decisions, and sustainable outcomes that compound over years rather than quarters.",
    deliverables: [
      "Strategic business reviews",
      "Growth and restructuring roadmaps",
      "Operational diagnostics",
      "Decision-support frameworks",
    ],
  },
  {
    icon: ClipboardCheck,
    name: "Statutory & Internal Audit",
    shortDescription:
      "Independent audit services that strengthen governance, surface control gaps, and deliver assurance grounded in internationally accepted auditing standards.",
    description:
      "We provide independent audit services that strengthen governance, surface control gaps, and deliver assurance grounded in internationally accepted auditing standards. Our statutory audit work ensures regulatory compliance while providing meaningful insights into the financial health of the organization. Our internal audit practice goes beyond compliance — we evaluate the design and operating effectiveness of internal controls, identify process inefficiencies, and recommend improvements that protect value and reduce risk. Every audit engagement is staffed with qualified professionals who understand the sector, ensuring observations are practical and recommendations are implementable.",
    deliverables: [
      "Statutory audit engagements",
      "Internal audit programs",
      "Control evaluations",
      "Audit-ready documentation",
    ],
  },
  {
    icon: Calculator,
    name: "Accounting & Financial Advisory",
    shortDescription:
      "From accounting framework design to financial reporting advisory, we build the financial backbone your organization needs to operate with confidence.",
    description:
      "From accounting framework design to financial reporting advisory, we build the financial backbone your organization needs to operate with confidence. Our team assists with chart-of-accounts design, accounting policy documentation, IFRS/Nepal Financial Reporting Standards (NFRS) alignment, and the implementation of close-and-reporting processes that produce reliable, decision-quality financial information. We also advise on complex accounting matters including revenue recognition, lease accounting, financial instruments, and business combinations. The objective is a finance function that produces trustworthy numbers — quickly, consistently, and in a form that supports both compliance and management decision-making.",
    deliverables: [
      "Accounting framework design",
      "Policy documentation",
      "IFRS / NFRS alignment",
      "Close-and-reporting optimization",
    ],
  },
  {
    icon: Receipt,
    name: "Taxation & Compliance",
    shortDescription:
      "Comprehensive tax planning, compliance, and advisory across direct and indirect taxes — keeping your business fully aligned with Nepalese regulatory requirements.",
    description:
      "We provide comprehensive tax planning, compliance, and advisory services across direct and indirect taxes, keeping your business fully aligned with Nepalese regulatory requirements. Our services cover corporate income tax, value-added tax (VAT), excise duty, customs, and withholding tax obligations, along with tax assessments and representation before tax authorities. Beyond compliance, we work proactively to identify planning opportunities, manage transfer pricing exposure, and structure transactions in a tax-efficient manner. Our objective is to ensure that tax is never a source of surprise — and that every obligation is met accurately, on time, and with full documentation.",
    deliverables: [
      "Tax compliance & filings",
      "Tax planning & structuring",
      "VAT and indirect tax advisory",
      "Assessment representation",
    ],
  },
  {
    icon: TrendingUp,
    name: "Financial Modeling",
    shortDescription:
      "Investment-grade financial models that translate strategic assumptions into defensible projections, supporting fundraising, valuation, and decision-making.",
    description:
      "We build investment-grade financial models that translate strategic assumptions into defensible projections, supporting fundraising, valuation, and decision-making. Each model is built from first principles, fully transparent, and structured so that any user can trace every output back to its underlying assumption. We model three-statement projections, scenario and sensitivity analyses, valuation models, project finance models, and operating budgets. Our models are designed not only to be technically correct but to be genuinely useful — supporting the conversations that matter with boards, investors, lenders, and management teams.",
    deliverables: [
      "Three-statement projections",
      "Scenario & sensitivity analysis",
      "Valuation models",
      "Project finance models",
    ],
  },
  {
    icon: LineChart,
    name: "Budgeting & Forecasting",
    shortDescription:
      "Structured budgeting processes and rolling forecasts that connect operational targets to financial outcomes — keeping performance visible and accountable.",
    description:
      "We design structured budgeting processes and rolling forecasts that connect operational targets to financial outcomes, keeping performance visible and accountable across the organization. We work with management teams to define the right drivers, build a bottom-up budget that reflects operational reality, and establish a monthly forecasting rhythm that detects variances early. Our approach shifts budgeting from an annual compliance exercise to a continuous management tool — one that supports course correction, accountability, and the strategic conversation the leadership team needs to have.",
    deliverables: [
      "Annual budget design",
      "Rolling forecast frameworks",
      "Variance analysis cadence",
      "Driver-based planning",
    ],
  },
  {
    icon: ShieldCheck,
    name: "Internal Control & Business Process Review",
    shortDescription:
      "Systematic evaluation of internal controls and business processes, identifying inefficiencies and designing frameworks that protect value and reduce risk.",
    description:
      "We conduct systematic evaluations of internal controls and business processes, identifying inefficiencies and designing frameworks that protect value and reduce risk. Our review covers the full process lifecycle — procurement-to-pay, order-to-cash, payroll, treasury, and financial close — mapping each process, identifying control gaps and process bottlenecks, and recommending practical improvements. The output is a documented control framework that supports both operational efficiency and audit readiness, with clear ownership for each control and a sustainable cadence for monitoring.",
    deliverables: [
      "Process mapping",
      "Control gap assessments",
      "Risk-control matrices",
      "Process improvement roadmaps",
    ],
  },
  {
    icon: Settings,
    name: "Strategy & Policy Development",
    shortDescription:
      "Corporate strategy, governance frameworks, and internal policies that codify how your organization operates — turning vision into documented practice.",
    description:
      "We help organizations translate vision into documented practice through corporate strategy development, governance frameworks, and internal policy design. Our work covers board governance structures, delegation-of-authority matrices, code-of-conduct and ethics policies, financial policies, procurement policies, and human resource policies. Each policy is drafted to align with the organization's operating reality and the applicable regulatory environment, ensuring it is implementable from day one. The objective is a governance and policy framework that codifies how the organization operates — reducing ambiguity, supporting scalability, and providing a defensible basis for decisions.",
    deliverables: [
      "Corporate strategy documents",
      "Governance frameworks",
      "Policy manuals",
      "Delegation-of-authority matrices",
    ],
  },
  {
    icon: GraduationCap,
    name: "Training & Professional Mentorship",
    shortDescription:
      "Capacity-building programs and structured mentorship that elevate the capabilities of finance professionals and business owners across your organization.",
    description:
      "We deliver capacity-building programs and structured mentorship that elevate the capabilities of finance professionals and business owners across your organization. Our training covers financial reporting, taxation, internal audit, budgeting and forecasting, financial modeling, and the practical application of accounting standards in day-to-day work. Each program is tailored to the audience — from junior accounting staff to senior management — and combines conceptual depth with hands-on practice using real organizational data. Beyond training, we provide ongoing mentorship that supports finance professionals in their career progression and business owners in their financial literacy.",
    deliverables: [
      "Customized training programs",
      "Hands-on workshops",
      "Mentorship engagements",
      "Finance literacy for owners",
    ],
  },
];

export type IndustryCard = {
  icon: LucideIcon;
  name: string;
  shortDescription: string;
  description: string;
  services: string[];
};

export const INDUSTRIES: IndustryCard[] = [
  {
    icon: Factory,
    name: "Manufacturing",
    shortDescription:
      "Cost systems, inventory controls, and process discipline for production-driven enterprises.",
    description:
      "We work with manufacturing enterprises across Nepal to strengthen cost systems, inventory controls, and the process discipline required to operate efficiently at scale. Our engagements address production costing, variance analysis, working-capital optimization, and the financial controls that protect manufacturing margins. We understand the operational realities of Nepalese manufacturing — raw material volatility, supply chain constraints, energy costs, and regulatory obligations — and tailor our advisory to those realities rather than generic frameworks. The outcome is a finance function that supports both day-to-day operations and long-term capacity decisions.",
    services: ["Cost accounting systems", "Inventory controls", "Process improvement", "Compliance"],
  },
  {
    icon: Store,
    name: "Trading",
    shortDescription:
      "Margin analysis, working-capital optimization, and compliance frameworks for trading houses.",
    description:
      "Our trading-sector engagements focus on margin analysis, working-capital optimization, and the compliance frameworks that allow trading houses to operate profitably and confidently. We help trading businesses understand product-level profitability, optimize inventory turnover, manage foreign-exchange exposure on imports, and structure their tax position efficiently. Nepal's trading environment — with its dependence on imports, currency volatility, and competitive pricing pressure — demands advisory that is both financially rigorous and operationally grounded. Our work helps trading businesses protect margins while remaining fully compliant with regulatory obligations.",
    services: ["Margin analysis", "Working capital", "Forex exposure management", "Tax structuring"],
  },
  {
    icon: Landmark,
    name: "Banking & Financial Institutions",
    shortDescription:
      "Regulatory alignment, internal audit, and risk advisory tailored to the BFIs sector.",
    description:
      "We provide regulatory alignment, internal audit, and risk advisory services tailored to the specific requirements of the Banking and Financial Institutions (BFIs) sector. Our team understands the regulatory framework governing Nepalese BFIs — including NRB directives, prudential reporting, and risk-management expectations — and structures engagements accordingly. We support internal audit programs, credit portfolio reviews, compliance gap assessments, and the documentation required for regulatory examinations. Our objective is to strengthen the control environment, support regulatory confidence, and provide assurance that internal systems are operating as designed.",
    services: ["Regulatory alignment", "Internal audit", "Credit reviews", "Compliance assurance"],
  },
  {
    icon: GraduationCap,
    name: "Education",
    shortDescription:
      "Governance, fee structures, and financial systems for schools, colleges, and institutions.",
    description:
      "We work with schools, colleges, and educational institutions to strengthen governance, design sustainable fee structures, and build the financial systems required to operate educational institutions with confidence. Our engagements address budget planning, fee structure analysis, financial controls over collections and expenditures, and compliance with the regulatory framework governing educational institutions in Nepal. We help institutions move from informal financial management to documented, auditable systems — supporting both institutional sustainability and the trust of parents, boards, and regulators.",
    services: ["Governance frameworks", "Fee structure design", "Budget planning", "Compliance"],
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    shortDescription:
      "Process reviews and compliance frameworks for hospitals, clinics, and healthcare operators.",
    description:
      "Our healthcare-sector engagements help hospitals, clinics, and healthcare operators strengthen financial processes, implement control frameworks, and navigate the regulatory environment governing healthcare in Nepal. We address revenue cycle management, procurement controls, inventory management for medical supplies, and the financial reporting that supports both operational decisions and regulatory compliance. Healthcare operators face unique pressures — cost containment, regulatory scrutiny, and the need to balance financial sustainability with patient care. Our advisory is structured around those realities.",
    services: ["Revenue cycle review", "Procurement controls", "Inventory management", "Compliance"],
  },
  {
    icon: Cpu,
    name: "Information Technology",
    shortDescription:
      "Revenue recognition, scaling finance teams, and audit readiness for technology companies.",
    description:
      "We support information technology companies with revenue recognition, scaling finance teams, and the audit readiness required for growth-stage and enterprise technology businesses. Our advisory covers SaaS revenue recognition, deferred revenue management, equity compensation accounting, and the financial infrastructure required when technology companies raise capital or prepare for regulatory scrutiny. Nepal's growing IT sector — with software services, product companies, and export-driven businesses — demands finance functions that can scale with the business while remaining compliant with both Nepalese and international expectations.",
    services: ["Revenue recognition", "Finance team scaling", "Audit readiness", "Fundraising support"],
  },
  {
    icon: Droplets,
    name: "Hydropower",
    shortDescription:
      "Project financial structuring, capital advisory, and statutory compliance for energy projects.",
    description:
      "We provide project financial structuring, capital advisory, and statutory compliance services for hydropower and energy projects in Nepal. Our work covers project financial modeling, debt-equity structuring, financial close documentation, and the ongoing compliance and reporting required throughout the project lifecycle. Hydropower projects involve long gestation periods, significant capital deployment, and complex multi-party arrangements — requiring advisory that combines financial rigor with deep understanding of the Nepalese energy sector. We support developers, sponsors, and lenders with the financial discipline these projects demand.",
    services: ["Project financial modeling", "Capital structuring", "Compliance", "Lender reporting"],
  },
  {
    icon: Wrench,
    name: "Service Industries",
    shortDescription:
      "Operational advisory and financial discipline for professional and consumer service firms.",
    description:
      "Our engagements with service industries — professional services firms, hospitality operators, logistics businesses, and consumer service providers — focus on operational advisory and the financial discipline required to grow sustainably. We help service businesses understand unit economics, optimize pricing, manage working capital, and build the financial reporting that supports both daily operations and strategic decisions. Service businesses in Nepal face competitive pressure, talent costs, and the challenge of scaling without compromising quality — and our advisory is structured around helping them navigate those realities.",
    services: ["Unit economics", "Pricing strategy", "Working capital", "Operational reporting"],
  },
];

export type CoreValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const CORE_VALUES: CoreValue[] = [
  {
    icon: Scale,
    title: "Integrity",
    description: "We uphold ethical standards in every professional engagement we accept.",
  },
  {
    icon: Handshake,
    title: "Honesty",
    description: "We communicate transparently and responsibly, even when the message is difficult.",
  },
  {
    icon: Target,
    title: "Objectivity",
    description: "We provide independent, fact-based professional advice free from undue influence.",
  },
  {
    icon: GraduationCap,
    title: "Professional Competence",
    description: "We continuously develop our knowledge, skills, and professional expertise.",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    description: "We protect sensitive business and financial information with the highest care.",
  },
  {
    icon: CheckCircle2,
    title: "Accountability",
    description: "We take responsibility for the quality and impact of every engagement we deliver.",
  },
];

export type ApproachStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin by deeply understanding your organization's objectives, challenges, financial position, and operating environment.",
    icon: Users,
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "We evaluate financial, operational, regulatory, and strategic factors using a structured, evidence-led methodology.",
    icon: FileBarChart,
  },
  {
    number: "03",
    title: "Advise",
    description:
      "We develop customized, practical, and actionable recommendations aligned with your specific business context.",
    icon: Settings,
  },
  {
    number: "04",
    title: "Empower",
    description:
      "We support implementation and help organizations establish sustainable systems for long-term, scalable growth.",
    icon: TrendingUp,
  },
];

export type InsightArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "navigating-nepal-tax-filing-2026",
    category: "Tax & Compliance",
    title: "Navigating Nepal's Evolving Tax Filing Landscape in 2026",
    excerpt:
      "A practical look at recent changes in Nepal's tax regulations and what finance teams should prioritize to remain fully compliant this fiscal year.",
    date: "Feb 12, 2026",
    readTime: "6 min read",
  },
  {
    slug: "building-scalable-finance-function",
    category: "Accounting & Finance",
    title: "Building a Finance Function That Scales With Your Business",
    excerpt:
      "From chart-of-accounts design to monthly close discipline — the foundational practices that separate sustainable finance functions from reactive ones.",
    date: "Jan 28, 2026",
    readTime: "8 min read",
  },
  {
    slug: "internal-controls-as-growth-strategy",
    category: "Business Advisory",
    title: "Why Internal Controls Are a Growth Strategy, Not a Cost Center",
    excerpt:
      "How a well-designed internal control environment accelerates decision-making, builds investor confidence, and protects long-term enterprise value.",
    date: "Jan 14, 2026",
    readTime: "5 min read",
  },
  {
    slug: "corporate-governance-for-nepalese-boards",
    category: "Corporate Governance",
    title: "Corporate Governance for Nepalese Boards: A Practical Framework",
    excerpt:
      "What effective board governance looks like in the Nepalese context — and the structures, policies, and practices that strengthen board effectiveness.",
    date: "Dec 22, 2025",
    readTime: "7 min read",
  },
  {
    slug: "strategic-budgeting-for-manufacturers",
    category: "Business Strategy",
    title: "Strategic Budgeting for Nepalese Manufacturers",
    excerpt:
      "How manufacturing businesses in Nepal can move beyond annual budgeting rituals toward rolling forecasts that genuinely inform operational decisions.",
    date: "Dec 8, 2025",
    readTime: "9 min read",
  },
  {
    slug: "hydropower-financial-structuring-nepal",
    category: "Nepal Business Updates",
    title: "Financial Structuring for Hydropower Projects in Nepal",
    excerpt:
      "Key considerations in structuring the financial close for hydropower projects — from debt-equity calibration to lender reporting discipline.",
    date: "Nov 28, 2025",
    readTime: "10 min read",
  },
];

export const INSIGHT_CATEGORIES = [
  "Tax & Compliance",
  "Accounting & Finance",
  "Business Advisory",
  "Corporate Governance",
  "Business Strategy",
  "Nepal Business Updates",
];

export type TeamMember = {
  name: string;
  role: string;
  designation?: string;
  initials: string;
  bio: string;
  expertise: string[];
  highlights: { label: string; value: string }[];
  featured?: boolean;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mr. Narendra Chaudhary",
    role: "Managing Director",
    designation: "Chartered Accountant",
    initials: "NC",
    bio: "Mr. Narendra Chaudhary, a qualified Chartered Accountant, serves as the Managing Director and driving force behind Biztra Business Advisory. With over six years of professional experience, he has worked across manufacturing, trading, banking and financial institutions, education, healthcare, IT, hydropower, and various service sectors. His multi-disciplinary expertise spans the full spectrum of professional advisory — from audit and accounting frameworks to strategy, financial modeling, and compliance — combining the discipline of international professional practice with the practical understanding of how Nepalese businesses actually operate. Prior to founding Biztra, his professional experience at PwC — one of the world's leading professional services firms — anchors the firm's commitment to globally standardized professional practice and rigorous quality.",
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
    featured: true,
  },
];

export type BreadcrumbItem = { label: string; href?: string };
