"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string | null;
};

export function ResearchGrid({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const allCategories = ["All", ...categories];

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <Reveal>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={
                  isActive
                    ? "inline-flex items-center rounded-full border border-navy-deep bg-navy-deep px-4 py-1.5 text-[12px] font-semibold text-white transition-colors"
                    : "inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:border-navy-deep/30 hover:text-navy-deep"
                }
              >
                {category}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No articles in this category yet. Check back soon.
        </div>
      ) : (
        <StaggerGroup
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.08}
          key={activeCategory}
        >
          {filtered.map((article) => (
            <StaggerItem key={article.slug}>
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Top visual band */}
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
        <h3 className="font-serif text-lg font-semibold text-navy-deep leading-snug">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}</span>
          </div>
          {formattedDate && (
            <span className="text-[11px] font-medium text-muted-foreground">
              {formattedDate}
            </span>
          )}
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
