"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  TrendingUp,
  ShieldCheck,
  Globe2,
  FileText,
  BarChart3,
  Building2,
} from "lucide-react";
import { CREDIBILITY_ITEMS } from "./data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-gradient noise-overlay text-white"
    >
      {/* Ambient decorative layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gold radial glow */}
        <div
          className="absolute top-[-15%] right-[-10%] h-[55vh] w-[55vh] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.555 0.072 148 / 0.5) 0%, transparent 70%)",
          }}
        />
        {/* Bottom navy glow */}
        <div
          className="absolute bottom-[-30%] left-[-10%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.40 0.06 254 / 0.7) 0%, transparent 70%)",
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

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column — copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
                Kathmandu · Nepal · Est. 2023
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-serif tracking-executive text-balance text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.05] font-medium"
            >
              Transforming Businesses Through Smarter Advisory &amp;{" "}
              <span className="italic text-gold">Financial Practices</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl"
            >
              Biztra Business Advisory helps businesses across Nepal build stronger financial
              systems, maintain compliance, optimize operations, and achieve sustainable growth
              through professional, practical, and globally aligned advisory solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Credibility indicators */}
            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/10 pt-8 max-w-2xl"
            >
              {CREDIBILITY_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="font-serif text-3xl lg:text-4xl font-semibold text-white tracking-executive">
                    {item.stat}
                  </dt>
                  <dd className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 leading-snug">
                    {item.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right column — visual composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] w-full max-w-md mx-auto">
      {/* Primary framed card — corporate dashboard composition */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Advisory Snapshot
            </span>
          </div>
          <Building2 className="h-4 w-4 text-white/40" />
        </div>

        {/* Card body — composition of iconography + simulated content */}
        <div className="p-5 space-y-4">
          {/* Numeric KPI row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-white/55">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider">Revenue Health</span>
              </div>
              <div className="mt-2 font-serif text-2xl text-white font-semibold">+18.4%</div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-gold" />
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-white/55">
                <ShieldCheck className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider">Compliance</span>
              </div>
              <div className="mt-2 font-serif text-2xl text-white font-semibold">100%</div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full rounded-full bg-gold" />
              </div>
            </div>
          </div>

          {/* Mini chart */}
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-white/55">
                <BarChart3 className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider">Forecast Trajectory</span>
              </div>
              <span className="text-[9px] text-white/40">FY 26 — FY 30</span>
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-14" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(0.555 0.072 148)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 50 L20 46 L40 42 L60 38 L80 33 L100 28 L120 24 L140 18 L160 14 L180 9 L200 5 L200 60 L0 60 Z"
                fill="url(#lineFill)"
              />
              <path
                d="M0 50 L20 46 L40 42 L60 38 L80 33 L100 28 L120 24 L140 18 L160 14 L180 9 L200 5"
                stroke="oklch(0.555 0.072 148)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Tagged list */}
          <div className="space-y-2">
            {[
              { icon: FileText, label: "Statutory Audit Completed" },
              { icon: Globe2, label: "IFRS-aligned Reporting" },
              { icon: Compass, label: "Strategic Review Refresh" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2"
              >
                <Icon className="h-3.5 w-3.5 text-gold" />
                <span className="text-[11px] text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent — rotated frame */}
      <div
        className="absolute -top-4 -right-4 -bottom-4 -left-4 rounded-2xl border border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating badge — top left */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute -top-3 -left-3 lg:-left-6 rounded-lg border border-white/15 bg-navy-deep/90 backdrop-blur-sm px-3.5 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">
            Audit Ready
          </span>
        </div>
      </motion.div>

      {/* Floating badge — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="absolute -bottom-3 -right-3 lg:-right-6 rounded-lg border border-white/15 bg-navy-deep/90 backdrop-blur-sm px-3.5 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Globe2 className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">
            Global Standards
          </span>
        </div>
      </motion.div>
    </div>
  );
}
