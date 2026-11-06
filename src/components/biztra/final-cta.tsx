"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Reveal } from "./reveal";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy-gradient noise-overlay text-white py-24 lg:py-32">
      {/* Decorative financial/business visual elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial glow top-right */}
        <div
          className="absolute top-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.555 0.072 148 / 0.6) 0%, transparent 70%)",
          }}
        />
        {/* Radial glow bottom-left */}
        <div
          className="absolute bottom-[-30%] left-[-10%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.40 0.06 254) 0%, transparent 70%)",
          }}
        />

        {/* Subtle bar chart silhouette */}
        <svg
          className="absolute right-10 bottom-10 opacity-[0.06] hidden lg:block"
          width="220"
          height="120"
          viewBox="0 0 220 120"
          fill="none"
        >
          {[60, 80, 50, 100, 75, 110, 90].map((h, i) => (
            <rect
              key={i}
              x={i * 28 + 10}
              y={120 - h}
              width="18"
              height={h}
              fill="white"
              rx="1"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Start the Conversation
            <span className="h-px w-6 bg-gold" />
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1] font-medium">
            Ready to Build a Stronger, Smarter Business?
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            Let's discuss your business challenges and identify practical opportunities for
            sustainable growth.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="mailto:info@biztra.com.np"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-white"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:+977140000000"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Quick contact row */}
        <Reveal delay={0.32}>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm">
            <a
              href="tel:+977140000000"
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              +977-1-4000000
            </a>
            <span className="hidden sm:block h-3 w-px bg-white/20" />
            <a
              href="mailto:info@biztra.com.np"
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              info@biztra.com.np
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
