"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Briefcase,
  ClipboardCheck,
  Calculator,
  Receipt,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Settings,
  GraduationCap,
  Factory,
  Store,
  Landmark,
  HeartPulse,
  Cpu,
  Droplets,
  Wrench,
  MapPin,
  Globe,
  Scale,
  Target,
  Handshake,
  Lock,
  Award,
  CheckCircle2,
  Users,
  Building2,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";
import { StaggerGroup, StaggerItem } from "./reveal";

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase, ClipboardCheck, Calculator, Receipt, TrendingUp, LineChart,
  ShieldCheck, Settings, GraduationCap, Factory, Store, Landmark, HeartPulse,
  Cpu, Droplets, Wrench, MapPin, Globe, Scale, Target, Handshake, Lock, Award,
  CheckCircle2, Users, Building2, FileBarChart,
};

const DynamicIcon = memo(function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] || Briefcase;
  return <Icon className={className} />;
});

type GridIndustry = {
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
};

export function IndustriesGrid({ industries }: { industries: GridIndustry[] }) {
  if (industries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">Industries are coming soon.</p>
      </div>
    );
  }

  return (
    <StaggerGroup
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
      stagger={0.05}
    >
      {industries.map((industry) => (
        <StaggerItem key={industry.slug}>
          <IndustryCard industry={industry} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function IndustryCard({ industry }: { industry: GridIndustry }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-warm hover:shadow-warm-lg transition-shadow"
    >
      {/* Top visual band — compact, with organic blob background */}
      <div className="relative h-24 overflow-hidden bg-navy-gradient noise-overlay">
        {/* Soft organic blob behind icon */}
        <div
          className="absolute -top-4 -left-4 w-20 h-20 opacity-50"
          style={{ filter: "blur(20px)" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            <path
              d="M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,30 30,15 50,15 Z"
              fill="oklch(0.555 0.072 148 / 0.4)"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-gold">
            <DynamicIcon name={industry.iconName} className="h-5 w-5" />
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Hover arrow */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy-deep shadow">
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Body — compact */}
      <div className="p-4">
        <h3 className="font-serif text-base font-semibold text-navy-deep leading-snug">
          {industry.name}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
          {industry.shortDescription}
        </p>
      </div>

      {/* Bottom accent line */}
      <span className="absolute bottom-0 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </motion.div>
  );
}
