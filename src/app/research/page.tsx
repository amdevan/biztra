import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal } from "@/components/biztra/reveal";
import { ResearchGrid } from "@/components/biztra/research-grid";
import { getPublishedArticles, getPublishedCategories } from "@/lib/articles";
import { INSIGHT_CATEGORIES } from "@/components/biztra/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Insights · Biztra Business Advisory",
  description:
    "Practical perspectives on tax, accounting, governance, and strategy — researched and written for finance professionals and business owners across Nepal.",
  openGraph: {
    title: "Research & Insights · Biztra Business Advisory",
    description:
      "Practical perspectives on tax, accounting, governance, and strategy — researched and written for finance professionals and business owners across Nepal.",
  },
};

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const articles = await getPublishedArticles();
  const activeCategories = await getPublishedCategories();
  // Merge preset categories with active ones (to keep filters consistent even when empty)
  const categories = Array.from(
    new Set([...INSIGHT_CATEGORIES.filter((c) => activeCategories.includes(c)), ...activeCategories])
  );

  return (
    <SiteShell>
      <PageHero
        eyebrow="Research & Insights"
        title="Research and Insights for Better Business Decisions"
        subtitle="Practical perspectives on tax, accounting, governance, and strategy — researched and written for finance professionals and business owners across Nepal."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
      />

      {/* Articles — client-side filtering */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ResearchGrid articles={articles} categories={categories} />
        </div>
      </section>

      {/* Newsletter signup */}
      <NewsletterSection />

      {/* CTA */}
      <CTASection />
    </SiteShell>
  );
}

function NewsletterSection() {
  return (
    <section className="relative py-20 lg:py-24" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-8 lg:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Stay Informed
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                  Receive Research Updates From Biztra
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
                  Practical perspectives on tax changes, accounting standards, governance practice,
                  and strategic finance — delivered to your inbox as we publish them. No marketing
                  noise, just the research that matters for finance professionals and business
                  owners in Nepal.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.24}>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com.np"
                    className="flex-1 rounded-full border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  We respect your inbox. Unsubscribe anytime.
                </p>
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
            Have a Question?
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium">
            Need Advisory on a Specific Topic?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Our research is grounded in real engagement. If you have a specific business challenge
            that requires tailored advisory, we would welcome the conversation.
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
