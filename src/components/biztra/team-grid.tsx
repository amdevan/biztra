"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./reveal";

type GridMember = {
  slug: string;
  name: string;
  role: string;
  designation: string;
  initials: string;
  featured: boolean;
};

export function TeamGrid({ members }: { members: GridMember[] }) {
  if (members.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">Team profiles are coming soon.</p>
      </div>
    );
  }

  return (
    <StaggerGroup
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
      stagger={0.08}
    >
      {members.map((member) => (
        <StaggerItem key={member.slug}>
          <TeamCard member={member} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function TeamCard({ member }: { member: GridMember }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card shadow-warm hover:shadow-warm-lg transition-shadow"
    >
      {/* Portrait area — navy gradient with monogram */}
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-gradient noise-overlay">
        {/* Soft organic blob behind monogram */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-60"
          style={{ filter: "blur(30px)" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,30 30,15 50,15 Z"
              fill="oklch(0.555 0.072 148 / 0.35)"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          {/* Monogram circle */}
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-white/5 backdrop-blur-sm">
              <span className="font-serif text-2xl font-medium text-gold">
                {member.initials}
              </span>
            </div>
            {member.featured && (
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Hover overlay with "View Profile" */}
        <div className="absolute inset-0 bg-navy-deep/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-navy-deep shadow-lg">
            View Profile
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 left-3 h-5 w-5 border-l border-t border-gold/30" />
        <div className="absolute bottom-3 right-3 h-5 w-5 border-r border-b border-gold/30" />
      </div>

      {/* Body */}
      <div className="p-5 lg:p-6">
        <h3 className="font-serif text-lg lg:text-xl font-semibold text-navy-deep leading-snug">
          {member.name}
        </h3>
        {member.role && (
          <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {member.role}
          </p>
        )}
        {member.designation && (
          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {member.designation}
          </p>
        )}

        {/* "View Profile" link at bottom */}
        <Link
          href={`/team/${member.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors"
        >
          View Full Profile
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Bottom accent line */}
      <span className="absolute bottom-0 left-5 right-5 lg:left-6 lg:right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </motion.div>
  );
}
