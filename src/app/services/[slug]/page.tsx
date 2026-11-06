import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal } from "@/components/biztra/reveal";
import { Icon } from "@/components/biztra/icon";
import { getContentItem, getServices } from "@/lib/content";
import type { Metadata } from "next";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getContentItem("service", slug);
  if (!service) return { title: "Service Not Found · Biztra Business Advisory" };
  return {
    title: `${service.title} · Biztra Business Advisory`,
    description: (service.data.shortDescription as string) || service.description || "",
  };
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = await getContentItem("service", slug);
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  const shortDescription = (service.data.shortDescription as string) || "";
  const deliverables = Array.isArray(service.data.deliverables)
    ? (service.data.deliverables as string[])
    : [];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title={service.title}
        subtitle={shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Service body */}
      <article className="relative bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          {/* Icon + lead */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep">
                <Icon name={service.iconName} className="h-6 w-6" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Service
                </div>
                <div className="font-serif text-lg font-semibold text-navy-deep">
                  {service.title}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.08}>
            <div className="prose-content text-base leading-relaxed text-muted-foreground space-y-4">
              {service.description?.split("\n\n").map((para, i) => (
                <p key={i} className="text-pretty">{para.trim()}</p>
              ))}
            </div>
          </Reveal>

          {/* Deliverables */}
          {deliverables.length > 0 && (
            <Reveal delay={0.16}>
              <div className="mt-10 rounded-xl border border-border bg-mist p-6 lg:p-8" style={{ background: "oklch(0.97 0.005 250)" }}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">
                  Key Deliverables
                </h3>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-navy-deep">
                      <CheckCircle2 className="h-4 w-4 flex-none text-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* CTA */}
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors"
              >
                Discuss This Service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-semibold text-navy-deep hover:bg-muted transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Services
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related services */}
      {related.length > 0 && (
        <section className="relative py-16 lg:py-20" style={{ background: "oklch(0.97 0.005 250)" }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Continue Exploring
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-serif tracking-executive text-balance text-2xl sm:text-3xl font-medium text-navy-deep">
                Related Services
              </h2>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r, i) => {
                const rShort = (r.data.shortDescription as string) || r.description || "";
                return (
                  <Reveal key={r.slug} delay={i * 0.08}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group block h-full rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white">
                        <Icon name={r.iconName} className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-serif text-base font-semibold text-navy-deep leading-snug">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-muted-foreground line-clamp-2">{rShort}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors">
                        Learn More
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
