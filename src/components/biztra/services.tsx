"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { SERVICES } from "./data";

export function Services() {
  return (
    <section id="services" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Comprehensive Advisory Solutions"
          subtitle="Professional expertise designed to help businesses operate better, comply confidently, and grow sustainably."
        />

        <StaggerGroup
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border"
          stagger={0.06}
        >
          {SERVICES.map((service, idx) => (
            <StaggerItem key={service.name}>
              <ServiceCard
                service={service}
                index={idx + 1}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* View all CTA */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all hover:bg-navy-deep hover:text-white"
            >
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.article
      whileHover="hover"
      className="group relative h-full bg-white p-7 lg:p-8 transition-colors hover:bg-navy-deep"
    >
      {/* Top row: number + icon */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground group-hover:text-white/40 transition-colors">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <motion.h3
        variants={{ hover: { x: 4 } }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="mt-6 font-serif text-xl font-semibold text-navy-deep group-hover:text-white transition-colors"
      >
        {service.name}
      </motion.h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-white/70 transition-colors">
        {service.description}
      </p>

      {/* Learn More */}
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors"
      >
        Learn More
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {/* Bottom accent line */}
      <span className="absolute bottom-0 left-7 right-7 lg:left-8 lg:right-8 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </motion.article>
  );
}
