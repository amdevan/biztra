"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { Reveal } from "./reveal";

const EXPERTISE_AREAS = [
  "Business Advisory & Consulting",
  "Statutory & Internal Audit",
  "Accounting Frameworks",
  "Strategy & Policy Development",
  "Financial Modeling",
  "Budgeting & Forecasting",
  "Internal Controls",
  "Business Process Review",
  "Taxation & Compliance",
  "Training & Mentorship",
];

export function Leadership() {
  return (
    <section id="leadership" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" />
              Our Team
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium text-navy-deep">
              Leadership That Combines Experience With Vision
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-navy-gradient noise-overlay border border-navy-deep/20">
                {/* Portrait composition with monogram */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
                      <span className="font-serif text-5xl font-medium text-gold">NC</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                      <Award className="h-5 w-5" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-7 text-center px-6"
                  >
                    <h3 className="font-serif text-2xl font-semibold">Mr. Narendra Chaudhary</h3>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                      Managing Director
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                      Chartered Accountant
                    </p>
                  </motion.div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-gold/40" />
                <div className="absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-gold/40" />
              </div>

              {/* Floating credential */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-5 -right-3 sm:right-6 rounded-xl border border-border bg-white shadow-lg px-4 py-3 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-deep text-white">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Former Experience
                    </div>
                    <div className="text-sm font-semibold text-navy-deep">PwC</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Right — bio */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
               {" "}
                <span className="text-navy-deep font-medium">
                  Mr. Narendra Chaudhary
                </span>
                , a qualified Chartered Accountant, serves as the Managing Director and driving
                force behind Biztra Business Advisory. With over six years of professional
                experience, he has worked across{" "}
                <span className="text-navy-deep font-medium">
                  manufacturing, trading, banking and financial institutions, education,
                  healthcare, IT, hydropower, and various service sectors
                </span>
                .
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
                His multi-disciplinary expertise spans the full spectrum of professional advisory —
                from audit and accounting frameworks to strategy, financial modeling, and
                compliance — combining the discipline of international professional practice with
                the practical understanding of how Nepalese businesses actually operate.
              </p>
            </Reveal>

            {/* Expertise grid */}
            <Reveal delay={0.16}>
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gold" />
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">
                    Areas of Expertise
                  </h4>
                </div>
                <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
                  {EXPERTISE_AREAS.map((area) => (
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

            {/* PwC highlight */}
            <Reveal delay={0.24}>
              <div className="mt-8 rounded-xl border border-navy-deep/15 bg-navy-deep/[0.02] p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-navy-deep text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-semibold text-navy-deep">
                        PwC — PricewaterhouseCoopers
                      </span>
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-soft" style={{ color: "oklch(0.42 0.07 148)" }}>
                        Big Four Foundation
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      Professional experience at PwC — one of the world's leading professional
                      services firms — anchors Biztra's commitment to globally standardized
                      professional practice and rigorous quality.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-deep px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy"
              >
                Meet Our Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
