"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { WHY_CHOOSE } from "./data";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — visual */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              {/* Image-like framed composition */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-gradient noise-overlay">
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                      <span className="h-px w-5 bg-gold" />
                      Established 2023
                    </div>
                    <p className="mt-5 font-serif text-2xl lg:text-3xl leading-snug text-balance font-medium">
                      &ldquo;A trusted partner helping Nepalese businesses operate with global
                      professional standards.&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    {[
                      { v: "Kathmandu", l: "Headquarters" },
                      { v: "Multi-sector", l: "Coverage" },
                      { v: "CA-led", l: "Practice" },
                    ].map((item) => (
                      <div key={item.l}>
                        <div className="font-serif text-base font-semibold">{item.v}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-wider text-white/55">
                          {item.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-xl border border-border bg-white shadow-lg p-5 max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-deep text-white">
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="font-serif text-sm font-semibold text-navy-deep">
                      Quality-Driven Practice
                    </div>
                    <div className="text-[11px] text-muted-foreground">Proactive &amp; Professional</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                Who We Are
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
                Your Trusted Partner for Business Growth
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
              <Reveal delay={0.16}>
                <p>
                  Established in 2023 in Kathmandu, Nepal,{" "}
                  <span className="text-navy-deep font-medium">Biztra Business Advisory</span> has
                  rapidly emerged as a trusted choice for comprehensive advisory and consulting
                  services across the country. In a continuously evolving corporate and regulatory
                  environment, we provide a full spectrum of business advisory solutions supported
                  by highly qualified professionals with diversified experience across multiple
                  industries.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p>
                  Biztra takes a{" "}
                  <span className="text-navy-deep font-medium">
                    quality-driven, proactive, and professional
                  </span>{" "}
                  approach to consulting. Rather than simply responding to immediate challenges, we
                  partner with businesses to anticipate changes, strengthen corporate structures,
                  improve financial practices, ensure compliance, and optimize strategic
                  positioning.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p>
                  Our objective is to help organizations achieve sustainable growth and long-term
                  success by combining deep local expertise with rigorous professional standards —
                  delivering advisory that is genuinely practical, not theoretical.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.36}>
              <a
                href="#leadership"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-5 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-navy-deep hover:text-white"
              >
                Discover Biztra
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="relative bg-mist py-20 lg:py-28"
      style={{ background: "oklch(0.97 0.005 250)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" />
              Why Choose Us
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
              A Practice Built on Substance, Not Slogans
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
              We are chosen by organizations that value depth of expertise, structured thinking,
              and a partner who genuinely invests in their long-term outcomes.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <StaggerGroup
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          stagger={0.08}
        >
          {WHY_CHOOSE.map((feature) => (
            <StaggerItem key={feature.title}>
              <FeatureCard item={feature} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function FeatureCard({ item }: { item: (typeof WHY_CHOOSE)[number] }) {
  const Icon = item.icon;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative h-full rounded-xl border border-border bg-white p-6 lg:p-7 shadow-sm transition-colors hover:border-navy-deep/20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-deep">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

      {/* Subtle accent corner */}
      <span className="absolute top-0 right-0 h-px w-12 bg-gradient-to-r from-transparent to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}
