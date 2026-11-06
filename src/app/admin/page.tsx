"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Settings,
  FileText,
  Briefcase,
  Factory,
  Scale,
  Target,
  ListOrdered,
  Users,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";

type DashboardStats = {
  services: { total: number; published: number };
  industries: { total: number; published: number };
  coreValues: { total: number; published: number };
  whyChoose: { total: number; published: number };
  approachSteps: { total: number; published: number };
  teamMembers: { total: number; published: number };
  articles: { total: number; published: number; drafts: number; featured: number };
};

type ContentSection = {
  label: string;
  href: string;
  icon: typeof Briefcase;
  description: string;
  total: number;
  published: number;
  unit: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/content/service?admin=true").then((r) => r.json()),
      fetch("/api/content/industry?admin=true").then((r) => r.json()),
      fetch("/api/content/core_value?admin=true").then((r) => r.json()),
      fetch("/api/content/why_choose?admin=true").then((r) => r.json()),
      fetch("/api/content/approach_step?admin=true").then((r) => r.json()),
      fetch("/api/content/team_member?admin=true").then((r) => r.json()),
      fetch("/api/articles?admin=true").then((r) => r.json()),
    ])
      .then(
        ([
          services,
          industries,
          coreValues,
          whyChoose,
          approachSteps,
          teamMembers,
          articles,
        ]) => {
          setStats({
            services: {
              total: services.items?.length || 0,
              published: (services.items || []).filter((i: { published: boolean }) => i.published).length,
            },
            industries: {
              total: industries.items?.length || 0,
              published: (industries.items || []).filter((i: { published: boolean }) => i.published).length,
            },
            coreValues: {
              total: coreValues.items?.length || 0,
              published: (coreValues.items || []).filter((i: { published: boolean }) => i.published).length,
            },
            whyChoose: {
              total: whyChoose.items?.length || 0,
              published: (whyChoose.items || []).filter((i: { published: boolean }) => i.published).length,
            },
            approachSteps: {
              total: approachSteps.items?.length || 0,
              published: (approachSteps.items || []).filter((i: { published: boolean }) => i.published).length,
            },
            teamMembers: {
              total: teamMembers.items?.length || 0,
              published: (teamMembers.items || []).filter((i: { published: boolean }) => i.published).length,
            },
            articles: {
              total: articles.articles?.length || 0,
              published: (articles.articles || []).filter((a: { published: boolean }) => a.published).length,
              drafts: (articles.articles || []).filter((a: { published: boolean }) => !a.published).length,
              featured: (articles.articles || []).filter((a: { featured: boolean }) => a.featured).length,
            },
          });
          setLoading(false);
        }
      )
      .catch(() => setLoading(false));
  }, []);

  const sections: ContentSection[] = stats
    ? [
        {
          label: "Site Settings",
          href: "/admin/settings",
          icon: Settings,
          description: "Brand, hero, contact info, footer",
          total: 1,
          published: 1,
          unit: "configuration",
        },
        {
          label: "About Page",
          href: "/admin/about",
          icon: FileText,
          description: "Story, vision, mission, section headings",
          total: 1,
          published: 1,
          unit: "configuration",
        },
        {
          label: "Services",
          href: "/admin/services",
          icon: Briefcase,
          description: "Advisory services offered",
          total: stats.services.total,
          published: stats.services.published,
          unit: "services",
        },
        {
          label: "Industries",
          href: "/admin/industries",
          icon: Factory,
          description: "Industry sectors served",
          total: stats.industries.total,
          published: stats.industries.published,
          unit: "industries",
        },
        {
          label: "Core Values",
          href: "/admin/core-values",
          icon: Scale,
          description: "Six principles behind the practice",
          total: stats.coreValues.total,
          published: stats.coreValues.published,
          unit: "values",
        },
        {
          label: "Why Choose Us",
          href: "/admin/why-choose",
          icon: Target,
          description: "Six differentiators",
          total: stats.whyChoose.total,
          published: stats.whyChoose.published,
          unit: "items",
        },
        {
          label: "Approach Steps",
          href: "/admin/approach-steps",
          icon: ListOrdered,
          description: "Four-step engagement methodology",
          total: stats.approachSteps.total,
          published: stats.approachSteps.published,
          unit: "steps",
        },
        {
          label: "Team Members",
          href: "/admin/team",
          icon: Users,
          description: "Leadership profiles",
          total: stats.teamMembers.total,
          published: stats.teamMembers.published,
          unit: "members",
        },
        {
          label: "Research Articles",
          href: "/admin/articles",
          icon: BookOpen,
          description: "Published research & insights",
          total: stats.articles.total,
          published: stats.articles.published,
          unit: "articles",
        },
      ]
    : [];

  return (
    <div className="p-6 lg:p-10">
      {/* Welcome header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-6 bg-gold" />
          Dashboard
        </span>
        <h1 className="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
          Welcome back, Admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage all content across the Biztra Business Advisory website from this dashboard.
        </p>
      </div>

      {/* Quick stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <QuickStat
            label="Total Content Items"
            value={Object.values(stats)
              .filter((s) => typeof s === "object" && "total" in s)
              .reduce((acc, s) => acc + (s as { total: number }).total, 0)}
            icon={TrendingUp}
          />
          <QuickStat
            label="Published Articles"
            value={stats.articles.published}
            icon={Eye}
          />
          <QuickStat
            label="Draft Articles"
            value={stats.articles.drafts}
            icon={EyeOff}
          />
          <QuickStat
            label="Featured Articles"
            value={stats.articles.featured}
            icon={Target}
          />
        </div>
      )}

      {/* Content sections */}
      <div className="mb-6">
        <h2 className="font-serif text-xl font-semibold text-navy-deep">Content Sections</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Click any section below to manage its content.
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-white p-6 shadow-sm animate-pulse"
            >
              <div className="h-12 w-12 rounded-lg bg-muted" />
              <div className="mt-4 h-5 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-3 w-full rounded bg-muted" />
              <div className="mt-2 h-3 w-3/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                href={section.href}
                className="group block h-full rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-navy-deep/20 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-navy-deep transition-all -translate-x-1 group-hover:translate-x-0" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-navy-deep">
                  {section.label}
                </h3>
                <p className="mt-1.5 text-[12px] text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[11px]">
                  <span className="font-semibold text-navy-deep">{section.total}</span>
                  <span className="text-muted-foreground">{section.unit}</span>
                  {section.total !== section.published && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-amber-600 font-medium">
                        {section.total - section.published} unpublished
                      </span>
                    </>
                  )}
                  {section.total === section.published && section.total > 0 && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-emerald-600 font-medium">All published</span>
                    </>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="mt-10 rounded-xl border border-border bg-white p-5 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-navy-deep">Need help?</span> All changes
          made in this dashboard are reflected immediately on the live website. Use the
          &ldquo;View Live Site&rdquo; link in the sidebar to verify your changes.
        </p>
      </div>
    </div>
  );
}

function QuickStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof TrendingUp;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="mt-2 font-serif text-3xl font-semibold text-navy-deep">{value}</div>
    </div>
  );
}
