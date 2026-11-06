"use client";

import { memo } from "react";
import Link from "next/link";
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

type GridService = {
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
  order: number;
};

export function ServicesGrid({ services }: { services: GridService[] }) {
  if (services.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          Services are coming soon.{" "}
          <Link href="/contact" className="text-navy-deep font-semibold hover:text-gold transition-colors">
            Get in touch
          </Link>{" "}
          with our team.
        </p>
      </div>
    );
  }

  return (
    <StaggerGroup
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
      stagger={0.05}
    >
      {services.map((service) => (
        <StaggerItem key={service.slug}>
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function ServiceCard({ service }: { service: GridService }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-full flex flex-col rounded-2xl border border-border bg-card p-6 lg:p-7 shadow-warm hover:shadow-warm-lg transition-shadow"
    >
      {/* Top: icon + number */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep transition-colors group-hover:bg-navy-deep group-hover:text-white group-hover:border-navy-deep">
          <DynamicIcon name={service.iconName} className="h-5 w-5" />
        </div>
        <span className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground">
          {String(service.order).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 font-serif text-lg font-semibold text-navy-deep leading-snug">
        {service.name}
      </h3>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.shortDescription}
      </p>

      {/* Footer link */}
      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-deep group-hover:text-gold transition-colors"
      >
        Learn More
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      {/* Bottom hand-drawn squiggle accent — appears on hover */}
      <svg
        className="absolute bottom-3 left-6 right-6 lg:left-7 lg:right-7 h-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        viewBox="0 0 120 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,4 Q15,1 30,4 T60,4 T90,4 T120,4"
          stroke="oklch(0.555 0.072 148)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
