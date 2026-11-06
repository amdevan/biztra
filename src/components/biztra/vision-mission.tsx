"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { CORE_VALUES } from "./data";

export function Vision() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-24 lg:py-32">
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.555 0.072 148 / 0.6) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold">
              <Eye className="h-4.5 w-4.5" />
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Our Vision
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <blockquote className="mt-6 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.6rem] lg:leading-[1.25] font-medium italic">
            &ldquo;To accelerate enterprise growth across the industry by transforming conventional
            business practices into systematic, compliant, and{" "}
            <span className="text-gold not-italic">globally standardized</span> financial
            practices.&rdquo;
          </blockquote>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 mx-auto h-px w-16 bg-white/15" />
        </Reveal>
      </div>
    </section>
  );
}

export function Mission() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left visual */}
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-mist">
              {/* Concentric visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-3/4 w-3/4">
                  {[1, 2, 3, 4].map((ring, i) => (
                    <motion.div
                      key={ring}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute rounded-full border"
                      style={{
                        inset: `${i * 12}%`,
                        borderColor:
                          i === 0
                            ? "oklch(0.328 0.071 254)"
                            : i === 1
                              ? "oklch(0.555 0.072 148 / 0.6)"
                              : i === 2
                                ? "oklch(0.328 0.071 254 / 0.3)"
                                : "oklch(0.555 0.072 148 / 0.25)",
                      }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-deep text-white shadow-lg">
                      <Target className="h-6 w-6" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-lg border border-border bg-white/95 backdrop-blur-sm p-4 shadow-sm">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                    Mission Compass
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Exceptional quality. Sustainable practice. Widespread awareness.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Our Mission
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15] font-medium text-navy-deep">
                A One-Stop Hub for Comprehensive Advisory Excellence
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
                To serve as a premier, one-stop hub for comprehensive business advisory solutions,
                relentlessly delivering exceptional quality services. We are committed to actively
                empowering accounting &amp; finance professionals and business owners while
                fostering widespread awareness and integration of globally standardized business
                practices across the corporate landscape.
              </p>
            </Reveal>

            {/* Three pillars */}
            <Reveal delay={0.24}>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Premier Hub", desc: "One-stop advisory" },
                  { label: "Empower", desc: "Professionals & owners" },
                  { label: "Awareness", desc: "Global standards" },
                ].map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-lg border border-border bg-white px-4 py-3.5"
                  >
                    <div className="font-serif text-sm font-semibold text-navy-deep">
                      {pillar.label}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{pillar.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoreValues() {
  return (
    <section
      id="core-values"
      className="relative py-20 lg:py-28"
      style={{ background: "oklch(0.97 0.005 250)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" />
              Core Values
              <span className="h-px w-6 bg-gold" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
              The Principles Behind Our Practice
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              Six values that govern every engagement we accept — and every recommendation we make.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          stagger={0.07}
        >
          {CORE_VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <ValueCard value={value} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ValueCard({ value }: { value: (typeof CORE_VALUES)[number] }) {
  const Icon = value.icon;
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full rounded-xl border border-border bg-white p-7 transition-colors hover:border-gold/40"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-deep/10 text-navy-deep transition-colors group-hover:border-gold group-hover:text-gold">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-navy-deep">{value.title}</h3>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{value.description}</p>

      {/* Bottom accent line on hover */}
      <span className="absolute bottom-0 left-7 right-7 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </motion.article>
  );
}
