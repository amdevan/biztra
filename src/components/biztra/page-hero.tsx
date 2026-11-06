"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type BreadcrumbItem = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  variant?: "navy" | "white";
  cta?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  variant = "navy",
  cta,
}: PageHeroProps) {
  const isNavy = variant === "navy";
  return (
    <section
      className={cn(
        "relative overflow-hidden noise-overlay pt-28 pb-16 lg:pt-36 lg:pb-24",
        isNavy ? "bg-navy-gradient text-white" : "bg-white text-navy-deep"
      )}
    >
      {isNavy && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Gold radial glow */}
          <div
            className="absolute top-[-15%] right-[-10%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.555 0.072 148 / 0.5) 0%, transparent 70%)",
            }}
          />
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol
                className={cn(
                  "flex items-center gap-1.5 text-[12px] font-medium",
                  isNavy ? "text-white/55" : "text-muted-foreground"
                )}
              >
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.label} className="flex items-center gap-1.5">
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className={cn(
                            "transition-colors hover:text-gold",
                            isNavy ? "hover:text-gold" : "hover:text-navy-deep"
                          )}
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={isLast ? (isNavy ? "text-white" : "text-navy-deep") : ""}>
                          {crumb.label}
                        </span>
                      )}
                      {!isLast && <ChevronRight className="h-3 w-3 opacity-50" />}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className="max-w-4xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" />
              {eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] font-medium">
              {title}
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal delay={0.16}>
              <p
                className={cn(
                  "mt-6 text-pretty text-base sm:text-lg leading-relaxed max-w-2xl",
                  isNavy ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            </Reveal>
          )}

          {cta && (
            <Reveal delay={0.24}>
              <Link
                href={cta.href}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-px",
          isNavy
            ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
            : "bg-gradient-to-r from-transparent via-border to-transparent"
        )}
      />
    </section>
  );
}
