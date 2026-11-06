"use client";

import { motion } from "framer-motion";
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
import { Reveal } from "./reveal";

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase, ClipboardCheck, Calculator, Receipt, TrendingUp, LineChart,
  ShieldCheck, Settings, GraduationCap, Factory, Store, Landmark, HeartPulse,
  Cpu, Droplets, Wrench, MapPin, Globe, Scale, Target, Handshake, Lock, Award,
  CheckCircle2, Users, Building2, FileBarChart,
};

type Step = {
  number: string;
  title: string;
  description: string;
  iconName: string;
};

export function ApproachTimeline({ steps }: { steps: Step[] }) {
  return (
    <>
      {/* Desktop horizontal timeline */}
      <div className="mt-16 hidden lg:block">
        <div className="relative">
          <div className="absolute top-[3.25rem] left-[8%] right-[8%] h-px approach-line opacity-50" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <Reveal key={step.number || idx} delay={idx * 0.12}>
                <ApproachStepCard step={step} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet vertical timeline */}
      <div className="mt-12 lg:hidden">
        <div className="relative">
          <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold/40 via-border to-gold/40" />
          <div className="space-y-6">
            {steps.map((step, idx) => {
              const Icon = ICON_MAP[step.iconName] || Briefcase;
              return (
                <Reveal key={step.number || idx} delay={idx * 0.08}>
                  <div className="relative pl-20">
                    <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-navy-deep shadow-sm">
                      <Icon className="h-5 w-5" />
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
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function ApproachStepCard({ step }: { step: Step }) {
  const Icon = ICON_MAP[step.iconName] || Briefcase;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative text-center"
    >
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
