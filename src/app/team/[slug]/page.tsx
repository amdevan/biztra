import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Award, Briefcase, Building2 } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal } from "@/components/biztra/reveal";
import { getContentItem, getTeamMembers } from "@/lib/content";
import type { Metadata } from "next";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const member = await getContentItem("team_member", slug);
  if (!member) return { title: "Team Member Not Found · Biztra Business Advisory" };
  return {
    title: `${member.title} · Biztra Business Advisory`,
    description: member.description?.slice(0, 160) || "",
  };
}

export const dynamic = "force-dynamic";

export default async function TeamMemberDetailPage({ params }: Params) {
  const { slug } = await params;
  const member = await getContentItem("team_member", slug);
  if (!member) notFound();

  const allMembers = await getTeamMembers();
  const others = allMembers.filter((m) => m.slug !== member.slug).slice(0, 3);

  const name = member.title;
  const role = member.subtitle || (member.data.role as string) || "";
  const designation = (member.data.designation as string) || "";
  const initials = (member.data.initials as string) || "";
  const bio = member.description || "";
  const expertise = Array.isArray(member.data.expertise)
    ? (member.data.expertise as string[])
    : [];
  const highlights = Array.isArray(member.data.highlights)
    ? (member.data.highlights as { label: string; value: string }[])
    : [];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Team"
        title={name}
        subtitle={role ? `${role}${designation ? ` · ${designation}` : ""}` : designation}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Team", href: "/team" },
          { label: name },
        ]}
      />

      {/* Profile body */}
      <section className="relative bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left — portrait */}
            <Reveal className="lg:col-span-5">
              <div className="relative lg:sticky lg:top-28">
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-navy-gradient noise-overlay border border-navy-deep/20">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="relative">
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                        <span className="font-serif text-5xl font-medium text-gold">{initials}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                        <Award className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-7 text-center px-6">
                      <h3 className="font-serif text-2xl font-semibold">{name}</h3>
                      {role && (
                        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                          {role}
                        </p>
                      )}
                      {designation && (
                        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                          {designation}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-gold/40" />
                  <div className="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-gold/40" />
                </div>

                {/* Highlights grid */}
                {highlights.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                    {highlights.map((h) => (
                      <div
                        key={h.label}
                        className="rounded-lg border border-border bg-white p-4 shadow-sm"
                      >
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {h.label}
                        </div>
                        <div className="mt-1 font-serif text-base font-semibold text-navy-deep">
                          {h.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Right — bio */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Profile
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15] font-medium text-navy-deep">
                  About {name}
                </h2>
              </Reveal>

              {/* Bio paragraphs */}
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
                {bio.split("\n\n").map((para, i) => (
                  <Reveal key={i} delay={0.12 + i * 0.04}>
                    <p>{para.trim()}</p>
                  </Reveal>
                ))}
              </div>

              {/* Expertise grid */}
              {expertise.length > 0 && (
                <Reveal delay={0.2}>
                  <div className="mt-8">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gold" />
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">
                        Areas of Expertise
                      </h4>
                    </div>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
                      {expertise.map((area) => (
                        <li
                          key={area}
                          className="flex items-center gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy-deep/5 text-gold">
                            <span className="h-1 w-1 rounded-full bg-gold" />
                          </span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* PwC highlight (only for featured member) */}
              {member.featured && (
                <Reveal delay={0.28}>
                  <div className="mt-8 rounded-xl border border-navy-deep/15 bg-navy-deep/[0.02] p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-navy-deep text-white">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif text-base font-semibold text-navy-deep">
                            PwC — PricewaterhouseCoopers
                          </span>
                          <span
                            className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: "oklch(0.42 0.07 148)" }}
                          >
                            Big Four Foundation
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                          Professional experience at PwC anchors Biztra&apos;s commitment to globally
                          standardized professional practice and rigorous quality.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* CTA */}
              <Reveal delay={0.36}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors"
                  >
                    Book a Consultation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/team"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-semibold text-navy-deep hover:bg-muted transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Team
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Other team members */}
      {others.length > 0 && (
        <section className="relative py-16 lg:py-20" style={{ background: "oklch(0.97 0.005 250)" }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Continue Meeting
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-serif tracking-executive text-balance text-2xl sm:text-3xl font-medium text-navy-deep">
                Other Team Members
              </h2>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((m, i) => {
                const mInitials = (m.data.initials as string) || "";
                const mRole = m.subtitle || (m.data.role as string) || "";
                return (
                  <Reveal key={m.slug} delay={i * 0.08}>
                    <Link
                      href={`/team/${m.slug}`}
                      className="group block h-full rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-navy-gradient noise-overlay">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                            <span className="font-serif text-xl font-medium text-gold">
                              {mInitials}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-base font-semibold text-navy-deep">
                          {m.title}
                        </h3>
                        {mRole && (
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                            {mRole}
                          </p>
                        )}
                      </div>
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
