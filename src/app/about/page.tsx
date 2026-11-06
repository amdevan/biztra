"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Eye, Target } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/biztra/reveal";
import { SectionHeading } from "@/components/biztra/section-heading";
import { WHY_CHOOSE, CORE_VALUES } from "@/components/biztra/data";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Us"
        title="Your Trusted Partner for Business Growth"
        subtitle="Established in 2023 in Kathmandu, Biztra Business Advisory provides a full spectrum of advisory and consulting services — combining deep local expertise with rigorous professional standards."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        cta={{ label: "Discover Biztra", href: "#story" }}
      />

      <StorySection />
      <VisionSection />
      <MissionSection />
      <CoreValuesSection />
      <WhyChooseSection />
      <CTASection />
    </SiteShell>
  );
}

function StorySection() {
  return (
    <section id="story" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-gradient noise-overlay">
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                      <span className="h-px w-5 bg-gold" />
                      Established 2023
                    </div>
                    <p className="mt-5 font-serif text-2xl lg:text-3xl leading-snug text-balance font-medium">
                      &ldquo;A trusted partner helping Nepalese businesses operate with global
                      professional standards.&rdquo;
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
                        <div className="mt-1 text-[9px] uppercase tracking-wider text-white/55">
                          {item.l}
                        </div>
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
                    <div className="font-serif text-sm font-semibold text-navy-deep">
                      Quality-Driven Practice
                    </div>
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
                Our Story
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Building a Trusted Standard for Nepalese Advisory
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
              <Reveal delay={0.16}>
                <p>
                  Biztra Business Advisory was established in 2023 in Kathmandu, Nepal, with a clear
                  founding premise: that Nepalese businesses deserve access to advisory services
                  that meet the same professional standards expected of leading global firms —
                  delivered by professionals who genuinely understand the local operating
                  environment. In a continuously evolving corporate and regulatory landscape, we
                  provide a full spectrum of business advisory solutions supported by highly
                  qualified professionals with diversified experience across multiple industries.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p>
                  What distinguishes Biztra is the approach we take to consulting. We are
                  quality-driven, proactive, and professional — not in the surface-level sense
                  those words are often used, but in the deeper sense of how we structure every
                  engagement. Rather than simply responding to immediate challenges, we partner
                  with businesses to anticipate changes, strengthen corporate structures, improve
                  financial practices, ensure compliance, and optimize strategic positioning. This
                  means we invest time in understanding the organization before recommending
                  solutions, and we remain engaged through implementation rather than delivering a
                  report and departing.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p>
                  Our objective is to help organizations achieve sustainable growth and long-term
                  success by combining deep local expertise with rigorous professional standards.
                  The Nepalese business environment is dynamic — shaped by regulatory evolution,
                  capital market development, sector-specific opportunities, and the increasing
                  expectations of stakeholders including regulators, lenders, investors, and
                  customers. We help businesses navigate that environment with confidence,
                  ensuring that financial discipline, compliance, and strategic clarity are
                  strengths rather than constraints.
                </p>
              </Reveal>
              <Reveal delay={0.34}>
                <p>
                  Every engagement we accept is anchored in the same commitment: actionable
                  recommendations grounded in evidence, delivered by qualified professionals, and
                  structured to produce measurable improvement in how the organization operates.
                  We are not a compliance-only provider. We are a strategic business partner — one
                  that earns trust through the quality of work, the depth of insight, and the
                  sustained impact we deliver over time.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-24 lg:py-32">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.555 0.072 148 / 0.6) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold">
              <Eye className="h-5 w-5" />
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Our Vision
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <blockquote className="mt-6 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.6rem] lg:leading-[1.25] font-medium italic">
            &ldquo;To accelerate enterprise growth across the industry by transforming conventional
            business practices into systematic, compliant, and{" "}
            <span className="text-gold not-italic">globally standardized</span> financial
            practices.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mt-8 text-pretty text-base leading-relaxed text-white/65 max-w-3xl mx-auto">
            Our vision reflects the gap we see across the Nepalese corporate landscape — between
            the practices that have historically sustained businesses and the systematic, globally
            standardized practices that will sustain them in the years ahead. We exist to help
            close that gap, one organization at a time.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-10 mx-auto h-px w-16 bg-white/15" />
        </Reveal>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-mist">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-3/4 w-3/4">
                  {[1, 2, 3, 4].map((ring, i) => (
                    <motion.div
                      key={ring}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute rounded-full border"
                      style={{
                        inset: `${i * 12}%`,
                        borderColor:
                          i === 0
                            ? "oklch(0.328 0.071 254)"
                            : i === 1
                              ? "oklch(0.555 0.072 148 / 0.6)"
                              : i === 2
                                ? "oklch(0.328 0.071 254 / 0.3)"
                                : "oklch(0.555 0.072 148 / 0.25)",
                      }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-deep text-white shadow-lg">
                      <Target className="h-6 w-6" />
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-lg border border-border bg-white/95 backdrop-blur-sm p-4 shadow-sm">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                    Mission Compass
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Exceptional quality. Sustainable practice. Widespread awareness.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Our Mission
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15] font-medium text-navy-deep">
                A One-Stop Hub for Comprehensive Advisory Excellence
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
                To serve as a premier, one-stop hub for comprehensive business advisory solutions,
                relentlessly delivering exceptional quality services. We are committed to actively
                empowering accounting &amp; finance professionals and business owners while
                fostering widespread awareness and integration of globally standardized business
                practices across the corporate landscape.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Premier Hub", desc: "One-stop advisory" },
                  { label: "Empower", desc: "Professionals & owners" },
                  { label: "Awareness", desc: "Global standards" },
                ].map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-lg border border-border bg-white px-4 py-3.5"
                  >
                    <div className="font-serif text-sm font-semibold text-navy-deep">
                      {pillar.label}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{pillar.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValuesSection() {
  return (
    <section id="core-values" className="relative py-20 lg:py-28" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Values"
          title="The Principles Behind Our Practice"
          subtitle="Six values that govern every engagement we accept — and every recommendation we make."
        />
        <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" stagger={0.07}>
          {CORE_VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <ValueCard value={value} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ValueCard({ value }: { value: (typeof CORE_VALUES)[number] }) {
  const Icon = value.icon;
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full rounded-xl border border-border bg-white p-7 transition-colors hover:border-gold/40"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-deep/10 text-navy-deep transition-colors group-hover:border-gold group-hover:text-gold">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-navy-deep">{value.title}</h3>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
      <span className="absolute bottom-0 left-7 right-7 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </motion.article>
  );
}

function WhyChooseSection() {
  return (
    <section id="why-choose" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A Practice Built on Substance, Not Slogans"
          subtitle="We are chosen by organizations that value depth of expertise, structured thinking, and a partner who genuinely invests in their long-term outcomes."
        />
        <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" stagger={0.08}>
          {WHY_CHOOSE.map((feature) => (
            <StaggerItem key={feature.title}>
              <FeatureCard item={feature} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function FeatureCard({ item }: { item: (typeof WHY_CHOOSE)[number] }) {
  const Icon = item.icon;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative h-full rounded-xl border border-border bg-white p-6 lg:p-7 shadow-sm transition-colors hover:border-navy-deep/20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-deep">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      <span className="absolute top-0 right-0 h-px w-12 bg-gradient-to-r from-transparent to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Get Started
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Ready to Build a Stronger, Smarter Business?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Let&apos;s discuss your business challenges and identify practical opportunities for
            sustainable growth.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
