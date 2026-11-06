import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/biztra/reveal";
import { IndustriesGrid } from "@/components/biztra/industries-grid";
import { getIndustries } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries · Biztra Business Advisory",
  description:
    "Sector-specific insight across the industries that shape Nepal's economy — built on real engagement, not theoretical models.",
};

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const industries = await getIndustries();

  const gridIndustries = industries.map((i) => ({
    slug: i.slug,
    name: i.title,
    shortDescription: (i.data.shortDescription as string) || i.description || "",
    iconName: i.iconName,
  }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Industries"
        title="Industry Expertise That Understands Your Business"
        subtitle="Sector-specific insight across the industries that shape Nepal's economy — built on real engagement, not theoretical models."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />

      {/* Industries Grid — compact */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <IndustriesGrid industries={gridIndustries} />
        </div>
      </section>

      {/* Stats / engagement overview */}
      <EngagementSection />

      {/* CTA */}
      <CTASection />
    </SiteShell>
  );
}

function EngagementSection() {
  const stats = [
    { stat: "8+", label: "Industries Served" },
    { stat: "9", label: "Service Verticals" },
    { stat: "100%", label: "Nepal-Focused" },
    { stat: "6+", label: "Years Experience" },
  ];
  return (
    <section className="relative py-20 lg:py-24" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-8 lg:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Multi-Sector Engagement
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                  Sector Insight Built on Real Engagement
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
                  Our industry expertise is not theoretical. It is built engagement by engagement —
                  working alongside operators, finance teams, and boards across each of the sectors
                  we serve. This means our recommendations are grounded in how these industries
                  actually work, the constraints they face, and the opportunities that are
                  genuinely available to them in the Nepalese context.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.24}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border bg-mist p-5"
                      style={{ background: "oklch(0.97 0.005 250)" }}
                    >
                      <div className="font-serif text-3xl font-semibold text-navy-deep tracking-executive">
                        {s.stat}
                      </div>
                      <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground leading-snug">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-20">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Start the Conversation
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Don&apos;t See Your Industry Listed?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Our advisory experience extends beyond the sectors listed here. Reach out — even if
            your industry isn&apos;t shown, we likely have relevant engagement experience to draw
            on.
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
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
