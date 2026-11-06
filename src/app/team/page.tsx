import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal } from "@/components/biztra/reveal";
import { TeamGrid } from "@/components/biztra/team-grid";
import { Squiggle } from "@/components/biztra/human";
import { getTeamMembers } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team · Biztra Business Advisory",
  description:
    "Biztra is led by a Chartered Accountant with multi-sector experience and a foundation built at one of the world's leading professional services firms.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const gridMembers = teamMembers.map((m) => ({
    slug: m.slug,
    name: m.title,
    role: m.subtitle || (m.data.role as string) || "",
    designation: (m.data.designation as string) || "",
    initials: (m.data.initials as string) || "",
    featured: m.featured,
  }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Team"
        title="Leadership That Combines Experience With Vision"
        subtitle="Biztra is led by a Chartered Accountant with multi-sector experience and a foundation built at one of the world's leading professional services firms."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Team" }]}
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />

      {/* Team Grid */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Our People
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Meet the Team Leading Biztra
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <Squiggle color="gold" width={120} animated className="mt-3" />
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
                Click on any team member&apos;s card to view their full profile, expertise, and professional background.
              </p>
            </Reveal>
          </div>

          <TeamGrid members={gridMembers} />

          {/* Note for future members */}
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-xl border border-border bg-mist p-6 text-center" style={{ background: "oklch(0.97 0.005 250)" }}>
              <p className="text-sm text-muted-foreground">
                We are actively building a multi-disciplinary team of qualified professionals.{" "}
                <Link href="/contact" className="text-navy-deep font-semibold hover:text-gold transition-colors">
                  Explore career opportunities
                </Link>
              </p>
            </div>
          </Reveal>
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
            Engage With Our Team
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Ready to Work With Biztra?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Whether you need a single advisory engagement or a long-term strategic partner, we would
            welcome the opportunity to discuss your needs.
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
              View Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
