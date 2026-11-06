import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/biztra/reveal";
import { SectionHeading } from "@/components/biztra/section-heading";
import { ServicesGrid } from "@/components/biztra/services-grid";
import { getServices, getApproachSteps, getIcon } from "@/lib/content";
import { ApproachTimeline } from "@/components/biztra/approach-timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services · Biztra Business Advisory",
  description:
    "Comprehensive advisory solutions — business advisory, audit, accounting, taxation, financial modeling, budgeting, internal controls, strategy, and training.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, approachSteps] = await Promise.all([
    getServices(),
    getApproachSteps(),
  ]);

  // Adapt for the grid component (iconName → string, lookups happen client-side)
  const gridServices = services.map((s, i) => ({
    slug: s.slug,
    name: s.title,
    shortDescription: (s.data.shortDescription as string) || s.description || "",
    iconName: s.iconName,
    order: i + 1,
  }));

  const gridSteps = approachSteps.map((s) => ({
    number: (s.data.number as string) || "",
    title: s.title,
    description: s.description || "",
    iconName: s.iconName,
  }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title="Comprehensive Advisory Solutions"
        subtitle="Professional expertise designed to help businesses operate better, comply confidently, and grow sustainably — across nine interrelated advisory disciplines."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />

      {/* Services Grid */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ServicesGrid services={gridServices} />
        </div>
      </section>

      {/* Our Approach */}
      <section
        id="approach"
        className="relative py-20 lg:py-28"
        style={{ background: "oklch(0.97 0.005 250)" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="A Structured Approach to Every Engagement"
            subtitle="A disciplined methodology that turns advisory engagement into measurable, sustainable outcomes."
          />
          <ApproachTimeline steps={gridSteps} />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </SiteShell>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Engage With Us
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Not Sure Which Service Fits Your Needs?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Most engagements span multiple disciplines. Our advisory team can help you scope the
            right combination of services for your specific context — no obligation, no pressure.
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
              href="/industries"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              View Industries We Serve
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
