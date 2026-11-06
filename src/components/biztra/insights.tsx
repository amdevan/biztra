"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { INSIGHTS, INSIGHT_CATEGORIES } from "./data";

export function Insights() {
  return (
    <section id="insights" className="relative py-20 lg:py-28" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Research & Insights"
          title="Research and Insights for Better Business Decisions"
          subtitle="Practical perspectives on tax, accounting, governance, and strategy — researched and written for finance professionals and business owners across Nepal."
        />

        {/* Category pills */}
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {INSIGHT_CATEGORIES.map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-full border border-border bg-white px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-navy-deep/30 hover:text-navy-deep cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Featured articles */}
        <StaggerGroup
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.1}
        >
          {INSIGHTS.map((article) => (
            <StaggerItem key={article.title}>
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* View all */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all hover:bg-navy-deep hover:text-white"
            >
              View All Research & Insights
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: (typeof INSIGHTS)[number] }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Top visual band with abstract editorial pattern */}
      <div className="relative h-44 overflow-hidden bg-navy-gradient noise-overlay">
        {/* Abstract editorial pattern */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`grad-${article.title.replace(/[^a-zA-Z]/g, "")}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(0.328 0.071 254)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Bar chart silhouette */}
            <g opacity="0.85">
              {[40, 65, 50, 80, 70, 95, 60, 85, 75, 110, 90, 130].map((h, i) => (
                <rect
                  key={i}
                  x={i * 32 + 20}
                  y={180 - h * 0.6}
                  width="20"
                  height={h * 0.6}
                  fill={`url(#grad-${article.title.replace(/[^a-zA-Z]/g, "")})`}
                  rx="2"
                />
              ))}
            </g>
            {/* Trend line */}
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

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
            {article.category}
          </span>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy-deep shadow">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg font-semibold text-navy-deep leading-snug group-hover:text-navy transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}</span>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">{article.date}</span>
        </div>

        {/* Read more */}
        <a
          href="#contact"
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}
