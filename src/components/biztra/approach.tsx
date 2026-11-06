"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { APPROACH_STEPS } from "./data";

export function Approach() {
  return (
    <section id="approach" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Approach"
          title="A Structured Approach to Better Business"
          subtitle="A disciplined methodology that turns advisory engagement into measurable, sustainable outcomes."
        />

        {/* Desktop horizontal timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[3.25rem] left-[8%] right-[8%] h-px approach-line opacity-50" />

            <div className="grid grid-cols-4 gap-6">
              {APPROACH_STEPS.map((step, idx) => (
                <Reveal key={step.number} delay={idx * 0.12}>
                  <ApproachStepCard step={step} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet vertical timeline */}
        <div className="mt-12 lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold/40 via-border to-gold/40" />
            <div className="space-y-6">
              {APPROACH_STEPS.map((step, idx) => (
                <Reveal key={step.number} delay={idx * 0.08}>
                  <div className="relative pl-20">
                    <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-navy-deep shadow-sm">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-medium tracking-wider text-gold">
                          {step.number}
                        </span>
                        <span className="h-px w-4 bg-border" />
                        <h3 className="font-serif text-lg font-semibold text-navy-deep">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachStepCard({
  step,
}: {
  step: (typeof APPROACH_STEPS)[number];
}) {
  const Icon = step.icon;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative text-center"
    >
      {/* Numbered circle */}
      <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-white text-navy-deep shadow-sm transition-colors group-hover:border-gold group-hover:text-gold">
        <Icon className="h-5 w-5" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-deep text-[10px] font-mono font-semibold text-white">
          {step.number}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-deep">{step.title}</h3>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
    </motion.div>
  );
}
