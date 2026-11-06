"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  TrendingUp,
  ShieldCheck,
  Globe2,
  FileText,
  BarChart3,
  Building2,
  Briefcase,
  ClipboardCheck,
  Calculator,
  Receipt,
  LineChart,
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
  FileBarChart,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { LogoMark } from "./logo";
import { Squiggle, OrganicBlob, HandDrawnArrow, InkDot } from "./human";
import type { SiteSettings, AboutContentData } from "@/lib/content";

// Map string icon name → Lucide component (must match ICON_MAP in lib/content.ts)
const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase, ClipboardCheck, Calculator, Receipt, TrendingUp, LineChart,
  ShieldCheck, Settings, GraduationCap, Factory, Store, Landmark, HeartPulse,
  Cpu, Droplets, Wrench, MapPin, Globe, Scale, Target, Handshake, Lock, Award,
  CheckCircle2, Users, Building2, FileBarChart,
};

// Memoized dynamic icon component (avoids "components during render" lint error)
const DynamicIcon = memo(function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] || Briefcase;
  return <Icon className={className} />;
});

/* ─────────────────────────────────────────────────────────── */
/* HERO                                                         */
/* ─────────────────────────────────────────────────────────── */

type HeroProps = {
  settings?: SiteSettings | null;
};

export function HomeHero({ settings }: HeroProps) {
  const eyebrow = settings?.heroEyebrow || "Kathmandu · Nepal · Est. 2023";
  const headline = settings?.heroHeadline || "Transforming Businesses Through Smarter Advisory & Financial Practices";
  const subtitle =
    settings?.heroSubtitle ||
    "Biztra Business Advisory helps businesses across Nepal build stronger financial systems, maintain compliance, optimize operations, and achieve sustainable growth through professional, practical, and globally aligned advisory solutions.";
  const primaryCta = settings?.heroPrimaryCta || "Book a Consultation";
  const secondaryCta = settings?.heroSecondaryCta || "Explore Our Services";

  const stats = [
    { stat: settings?.heroStat1Value || "6+", label: settings?.heroStat1Label || "Years Professional Experience" },
    { stat: settings?.heroStat2Value || "9", label: settings?.heroStat2Label || "Service Verticals" },
    { stat: settings?.heroStat3Value || "8+", label: settings?.heroStat3Label || "Industries Served" },
    { stat: settings?.heroStat4Value || "100%", label: settings?.heroStat4Label || "Nepal-Focused Advisory" },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-gradient noise-overlay text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Organic blob — top right, gold/sage */}
        <div
          className="absolute top-[-12%] right-[-8%] w-[55vh] h-[55vh] opacity-40"
          style={{ filter: "blur(80px)" }}
        >
          <OrganicBlob variant="gold" opacity={0.55} className="w-full h-full" />
        </div>
        {/* Organic blob — bottom left, navy lighter */}
        <div
          className="absolute bottom-[-25%] left-[-12%] w-[60vh] h-[60vh] opacity-50"
          style={{ filter: "blur(100px)" }}
        >
          <OrganicBlob variant="navy" opacity={0.4} className="w-full h-full" />
        </div>
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5"
            >
              <InkDot color="gold" size={10} />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
                {eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.05] font-medium"
            >
              {headline.split(" & ")[0]}
              {headline.includes("&") && (
                <>
                  {" "}&amp;{" "}
                  <span className="relative italic text-gold inline-block">
                    {headline.split(" & ").slice(1).join(" & ")}
                    {/* Hand-drawn squiggle under the gold phrase */}
                    <Squiggle
                      color="gold"
                      width={280}
                      animated
                      className="absolute left-0 -bottom-3"
                    />
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white"
              >
                {primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                {secondaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/10 pt-8 max-w-2xl"
            >
              {stats.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="font-serif text-3xl lg:text-4xl font-semibold text-white tracking-executive">
                    {item.stat}
                  </dt>
                  <dd className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 leading-snug">
                    {item.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Advisory Snapshot
            </span>
          </div>
          <Building2 className="h-4 w-4 text-white/40" />
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-white/55">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider">Revenue Health</span>
              </div>
              <div className="mt-2 font-serif text-2xl text-white font-semibold">+18.4%</div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-gold" />
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-white/55">
                <ShieldCheck className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider">Compliance</span>
              </div>
              <div className="mt-2 font-serif text-2xl text-white font-semibold">100%</div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full rounded-full bg-gold" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-white/55">
                <BarChart3 className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider">Forecast Trajectory</span>
              </div>
              <span className="text-[9px] text-white/40">FY 26 — FY 30</span>
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-14" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 50 L20 46 L40 42 L60 38 L80 33 L100 28 L120 24 L140 18 L160 14 L180 9 L200 5 L200 60 L0 60 Z"
                fill="url(#lineFill)"
              />
              <path
                d="M0 50 L20 46 L40 42 L60 38 L80 33 L100 28 L120 24 L140 18 L160 14 L180 9 L200 5"
                stroke="oklch(0.555 0.072 148)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="space-y-2">
            {[
              { icon: FileText, label: "Statutory Audit Completed" },
              { icon: Globe2, label: "IFRS-aligned Reporting" },
              { icon: Compass, label: "Strategic Review Refresh" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2"
              >
                <Icon className="h-3.5 w-3.5 text-gold" />
                <span className="text-[11px] text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 -bottom-4 -left-4 rounded-2xl border border-gold/20 pointer-events-none" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute -top-3 -left-3 lg:-left-6 rounded-lg border border-white/15 bg-navy-deep/90 backdrop-blur-sm px-3.5 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">Audit Ready</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="absolute -bottom-3 -right-3 lg:-right-6 rounded-lg border border-white/15 bg-navy-deep/90 backdrop-blur-sm px-3.5 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Globe2 className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">Global Standards</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* WHO WE ARE TEASER                                            */
/* ─────────────────────────────────────────────────────────── */

export function WhoWeAreTeaser({ about }: { about?: AboutContentData | null }) {
  const heading = about?.storyHeading || "Your Trusted Partner for Business Growth";
  const eyebrow = about?.storyEyebrow || "Who We Are";
  const quote = about?.storyQuote || "A trusted partner helping Nepalese businesses operate with global professional standards.";
  const paragraph1 = about?.storyParagraph1 || "";
  const paragraph2 = about?.storyParagraph2 || "";

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-gradient noise-overlay">
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                      <span className="h-px w-5 bg-gold" />
                      Established 2023
                    </div>
                    <p className="mt-5 font-serif text-2xl lg:text-3xl leading-snug text-balance font-medium">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    {[
                      { v: "Kathmandu", l: "Headquarters" },
                      { v: "Multi-sector", l: "Coverage" },
                      { v: "CA-led", l: "Practice" },
                    ].map((item) => (
                      <div key={item.l}>
                        <div className="font-serif text-base font-semibold">{item.v}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-wider text-white/55">{item.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-xl border border-border bg-white shadow-lg p-5 max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-deep text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-serif text-sm font-semibold text-navy-deep">Quality-Driven Practice</div>
                    <div className="text-[11px] text-muted-foreground">Proactive &amp; Professional</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                {heading}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <Squiggle color="gold" width={110} animated className="mt-3" />
            </Reveal>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
              {paragraph1 && (
                <Reveal delay={0.16}>
                  <p>{paragraph1}</p>
                </Reveal>
              )}
              {paragraph2 && (
                <Reveal delay={0.22}>
                  <p>{paragraph2}</p>
                </Reveal>
              )}
            </div>
            <Reveal delay={0.36}>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-5 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-navy-deep hover:text-white"
              >
                Discover Biztra
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* SERVICES TEASER                                              */
/* ─────────────────────────────────────────────────────────── */

type TeaserService = {
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
};

export function ServicesTeaser({ services }: { services: TeaserService[] }) {
  const teaserServices = services.slice(0, 6);
  return (
    <section id="services" className="relative py-20 lg:py-28" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-5xl">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Services
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Comprehensive Advisory Solutions
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap"
            >
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Professional expertise designed to help businesses operate better, comply confidently, and grow sustainably — across nine interrelated advisory disciplines.
          </p>
        </Reveal>

        {teaserServices.length === 0 ? (
          <Reveal delay={0.24}>
            <div className="mt-12 rounded-xl border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Services are coming soon.{" "}
                <Link href="/contact" className="text-navy-deep font-semibold hover:text-gold transition-colors">
                  Get in touch
                </Link>{" "}
                with our team.
              </p>
            </div>
          </Reveal>
        ) : (
          <StaggerGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" stagger={0.06}>
            {teaserServices.map((service, idx) => (
              <StaggerItem key={service.slug}>
                <ServiceTeaserCard service={service} index={idx + 1} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
}

function ServiceTeaserCard({ service, index }: { service: TeaserService; index: number }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full rounded-xl border border-border bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
          <DynamicIcon name={service.iconName} className="h-5 w-5" />
        </div>
        <span className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-deep">{service.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.shortDescription}</p>
      <Link
        href="/services"
        className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors"
      >
        Learn More
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* INDUSTRIES TEASER                                            */
/* ─────────────────────────────────────────────────────────── */

type TeaserIndustry = {
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
};

export function IndustriesTeaser({ industries }: { industries: TeaserIndustry[] }) {
  const teaserIndustries = industries.slice(0, 4);
  return (
    <section id="industries" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-5xl">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Industries
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Industry Expertise That Understands Your Business
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/industries"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap"
            >
              View All Industries
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {teaserIndustries.length === 0 ? (
          <Reveal delay={0.24}>
            <div className="mt-12 rounded-xl border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground">Industries are coming soon.</p>
            </div>
          </Reveal>
        ) : (
          <StaggerGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5" stagger={0.07}>
            {teaserIndustries.map((industry) => (
              <StaggerItem key={industry.slug}>
                <IndustryTeaserCard industry={industry} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
}

function IndustryTeaserCard({ industry }: { industry: TeaserIndustry }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-28 overflow-hidden bg-navy-gradient noise-overlay">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-gold">
            <DynamicIcon name={industry.iconName} className="h-6 w-6" />
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-navy-deep leading-snug">{industry.name}</h3>
          <ArrowUpRight className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{industry.shortDescription}</p>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* APPROACH TEASER                                              */
/* ─────────────────────────────────────────────────────────── */

type TeaserStep = {
  number: string;
  title: string;
  description: string;
  iconName: string;
};

export function ApproachTeaser({ steps }: { steps: TeaserStep[] }) {
  return (
    <section id="approach" className="relative py-20 lg:py-28" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" />
              Our Approach
              <span className="h-px w-6 bg-gold" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
              A Structured Approach to Better Business
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              A disciplined methodology that turns advisory engagement into measurable, sustainable outcomes.
            </p>
          </Reveal>
        </div>

        {steps.length === 0 ? (
          <Reveal delay={0.24}>
            <div className="mt-12 rounded-xl border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground">Approach steps are coming soon.</p>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-16 hidden lg:block">
              <div className="relative">
                <div className="absolute top-[3.25rem] left-[8%] right-[8%] h-px approach-line opacity-50" />
                <div className="grid grid-cols-4 gap-6">
                  {steps.map((step, idx) => (
                    <Reveal key={step.number || idx} delay={idx * 0.12}>
                      <ApproachStepCard step={step} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 lg:hidden">
              <div className="relative">
                <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold/40 via-border to-gold/40" />
                <div className="space-y-6">
                  {steps.map((step, idx) => {
                    return (
                      <Reveal key={step.number || idx} delay={idx * 0.08}>
                        <div className="relative pl-20">
                          <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-navy-deep shadow-sm">
                            <DynamicIcon name={step.iconName} className="h-5 w-5" />
                          </div>
                          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] font-medium tracking-wider text-gold">{step.number}</span>
                              <span className="h-px w-4 bg-border" />
                              <h3 className="font-serif text-lg font-semibold text-navy-deep">{step.title}</h3>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ApproachStepCard({ step }: { step: TeaserStep }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative text-center"
    >
      <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-white text-navy-deep shadow-sm transition-colors group-hover:border-gold group-hover:text-gold">
        <DynamicIcon name={step.iconName} className="h-5 w-5" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-deep text-[10px] font-mono font-semibold text-white">
          {step.number}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-deep">{step.title}</h3>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* LEADERSHIP TEASER                                            */
/* ─────────────────────────────────────────────────────────── */

type TeaserMember = {
  slug: string;
  name: string;
  role: string;
  designation: string;
  initials: string;
  bio: string;
  highlights: { label: string; value: string }[];
  expertise: string[];
  featured: boolean;
} | null;

export function LeadershipTeaser({ member }: { member: TeaserMember }) {
  if (!member) return null;
  return (
    <section id="leadership" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden bg-navy-gradient noise-overlay border border-navy-deep/20">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                      <span className="font-serif text-5xl font-medium text-gold">{member.initials}</span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-7 text-center px-6"
                  >
                    <h3 className="font-serif text-2xl font-semibold">{member.name}</h3>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{member.role}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60">{member.designation}</p>
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-gold/40" />
                <div className="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-gold/40" />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Our Team
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Leadership That Combines Experience With Vision
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
                Biztra is led by{" "}
                <span className="text-navy-deep font-medium">{member.name}</span>, {member.bio.split(".")[1]?.trim() || "a qualified Chartered Accountant with multi-sector experience"}.
              </p>
            </Reveal>
            {member.highlights.length > 0 && (
              <Reveal delay={0.24}>
                <div className="mt-6 flex flex-wrap gap-3">
                  {member.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="rounded-lg border border-border bg-mist px-4 py-2.5"
                      style={{ background: "oklch(0.97 0.005 250)" }}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{h.label}</div>
                      <div className="mt-0.5 font-serif text-sm font-semibold text-navy-deep">{h.value}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.32}>
              <Link
                href="/team"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-deep px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy"
              >
                Meet Our Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* INSIGHTS TEASER                                              */
/* ─────────────────────────────────────────────────────────── */

type TeaserArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export function InsightsTeaser({ articles }: { articles: TeaserArticle[] }) {
  return (
    <section id="insights" className="relative py-20 lg:py-28" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-5xl">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Research &amp; Insights
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Insights for Better Business Decisions
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap"
            >
              View All Research
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {articles.length === 0 ? (
          <Reveal delay={0.24}>
            <div className="mt-12 rounded-xl border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Research articles are coming soon. Check back shortly, or{" "}
                <Link href="/contact" className="text-navy-deep font-semibold hover:text-gold transition-colors">
                  get in touch
                </Link>{" "}
                with our team.
              </p>
            </div>
          </Reveal>
        ) : (
          <StaggerGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {articles.map((article) => (
              <StaggerItem key={article.slug}>
                <InsightTeaserCard article={article} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
}

function InsightTeaserCard({ article }: { article: TeaserArticle }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-44 overflow-hidden bg-navy-gradient noise-overlay">
        <div className="absolute inset-0">
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`grad-${article.slug}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(0.328 0.071 254)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <g opacity="0.85">
              {[40, 65, 50, 80, 70, 95, 60, 85, 75, 110, 90, 130].map((h, i) => (
                <rect
                  key={i}
                  x={i * 32 + 20}
                  y={180 - h * 0.6}
                  width="20"
                  height={h * 0.6}
                  fill={`url(#grad-${article.slug})`}
                  rx="2"
                />
              ))}
            </g>
            <path
              d="M20 160 L60 130 L100 145 L140 110 L180 120 L220 90 L260 95 L300 60 L340 70 L380 40"
              stroke="oklch(0.555 0.072 148)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
            {article.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy-deep shadow">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg font-semibold text-navy-deep leading-snug">{article.title}</h3>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[11px] font-medium text-muted-foreground">{article.date}</span>
          <span className="text-[11px] text-muted-foreground">{article.readTime}</span>
        </div>
        <Link
          href={`/research/${article.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* FINAL CTA                                                    */
/* ─────────────────────────────────────────────────────────── */

export function FinalCTA({ settings }: { settings?: SiteSettings | null }) {
  const phone = settings?.contactPhone || "+977-1-4000000";
  const email = settings?.contactEmail || "info@biztra.com.np";
  return (
    <section className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute top-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-[130px]"
          style={{ background: "radial-gradient(circle, oklch(0.555 0.072 148 / 0.6) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-30%] left-[-10%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[130px]"
          style={{ background: "radial-gradient(circle, oklch(0.40 0.06 254) 0%, transparent 70%)" }}
        />
        <svg className="absolute right-10 bottom-10 opacity-[0.06] hidden lg:block" width="220" height="120" viewBox="0 0 220 120" fill="none">
          {[60, 80, 50, 100, 75, 110, 90].map((h, i) => (
            <rect key={i} x={i * 28 + 10} y={120 - h} width="18" height={h} fill="white" rx="1" />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="flex justify-center mb-6">
            <LogoMark size={56} variant="light" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Start the Conversation
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>
        <Reveal delay={0.16}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1] font-medium">
            Ready to Build a Stronger, Smarter Business?
          </h2>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Let&apos;s discuss your business challenges and identify practical opportunities for sustainable growth.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm">
            <a href={`tel:${phone}`} className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
              <ArrowRight className="h-3.5 w-3.5" />
              {phone}
            </a>
            <span className="hidden sm:block h-3 w-px bg-white/20" />
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
              <ArrowRight className="h-3.5 w-3.5" />
              {email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
