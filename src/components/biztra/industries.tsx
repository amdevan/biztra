"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem, Reveal } from "./reveal";
import { INDUSTRIES } from "./data";

export function Industries() {
  return (
    <section
      id="industries"
      className="relative py-20 lg:py-28"
      style={{ background: "oklch(0.97 0.005 250)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Industry Expertise That Understands Your Business"
          subtitle="Sector-specific insight across the industries that shape Nepal's economy — built on real engagement, not theoretical models."
        />

        <StaggerGroup
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          stagger={0.07}
        >
          {INDUSTRIES.map((industry) => (
            <StaggerItem key={industry.name}>
              <IndustryCard industry={industry} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  const Icon = industry.icon;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Top visual band with subtle industry gradient */}
      <div className="relative h-28 overflow-hidden bg-navy-gradient noise-overlay">
        {/* Floating icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-gold"
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        </div>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Hover wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-navy-deep leading-snug">
            {industry.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          {industry.description}
        </p>
      </div>
    </motion.article>
  );
}
