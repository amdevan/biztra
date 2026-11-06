import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal } from "@/components/biztra/reveal";
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Article Not Found · Biztra Business Advisory" };
  }
  return {
    title: `${article.title} · Biztra Business Advisory`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticleDetailPage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category, excluding current)
  const allArticles = await getPublishedArticles();
  const related = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  // Also pull a couple from other categories if we don't have 3 related
  const fallbackRelated = allArticles
    .filter((a) => a.slug !== article.slug && a.category !== article.category)
    .slice(0, 3 - related.length);
  const recommended = [...related, ...fallbackRelated].slice(0, 3);

  const htmlContent = renderMarkdown(article.content);
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <SiteShell>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: article.category },
        ]}
      />

      {/* Article body */}
      <article className="relative bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          {/* Meta row */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground border-b border-border pb-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep text-white text-[10px] font-semibold">
                  {article.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <span className="font-medium text-navy-deep">{article.author}</span>
              </div>
              {formattedDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </Reveal>

          {/* Excerpt as lead */}
          <Reveal delay={0.08}>
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-navy-deep text-pretty mb-10">
              {article.excerpt}
            </p>
          </Reveal>

          {/* Rendered Markdown content */}
          <Reveal delay={0.16}>
            <div
              className="prose-content text-base leading-relaxed text-muted-foreground space-y-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </Reveal>

          {/* Back to research */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Research
            </Link>
          </div>
        </div>
      </article>

      {/* Recommended articles */}
      {recommended.length > 0 && (
        <section className="relative py-16 lg:py-20" style={{ background: "oklch(0.97 0.005 250)" }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10 max-w-5xl">
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    <span className="h-px w-6 bg-gold" />
                    Continue Reading
                  </span>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="mt-3 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] font-medium text-navy-deep">
                    More Research &amp; Insights
                  </h2>
                </Reveal>
              </div>
              <Link
                href="/research"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-navy-deep hover:text-gold transition-colors whitespace-nowrap"
              >
                View All Research
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.08}>
                  <Link
                    href={`/research/${r.slug}`}
                    className="group block h-full rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative h-32 overflow-hidden bg-navy-gradient noise-overlay">
                      <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <linearGradient id={`rec-${r.slug}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="oklch(0.328 0.071 254)" stopOpacity="0.2" />
                          </linearGradient>
                        </defs>
                        <g opacity="0.85">
                          {[40, 65, 50, 80, 70, 95, 60, 85, 75, 110, 90, 130].map((h, idx) => (
                            <rect
                              key={idx}
                              x={idx * 32 + 20}
                              y={180 - h * 0.6}
                              width="20"
                              height={h * 0.6}
                              fill={`url(#rec-${r.slug})`}
                              rx="2"
                            />
                          ))}
                        </g>
                      </svg>
                    </div>
                    <div className="p-5">
                      <span className="inline-flex items-center rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-deep" style={{ background: "oklch(0.97 0.005 250)" }}>
                        {r.category}
                      </span>
                      <h3 className="mt-3 font-serif text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-muted-foreground line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
