"use client";

import { memo } from "react";
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

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase, ClipboardCheck, Calculator, Receipt, TrendingUp, LineChart,
  ShieldCheck, Settings, GraduationCap, Factory, Store, Landmark, HeartPulse,
  Cpu, Droplets, Wrench, MapPin, Globe, Scale, Target, Handshake, Lock, Award,
  CheckCircle2, Users, Building2, FileBarChart,
};

/**
 * Client-side dynamic icon renderer.
 * Pass the icon name as a string; the lookup happens here.
 * Safe to use in both server and client components.
 */
export const Icon = memo(function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const LucideIcon = ICON_MAP[name] || Briefcase;
  return <LucideIcon className={className} />;
});
