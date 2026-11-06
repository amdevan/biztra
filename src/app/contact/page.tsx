"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Send,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { SiteShell } from "@/components/biztra/site-shell";
import { PageHero } from "@/components/biztra/page-hero";
import { Reveal } from "@/components/biztra/reveal";

const SERVICE_OPTIONS = [
  "Business Advisory & Consulting",
  "Statutory & Internal Audit",
  "Accounting & Financial Advisory",
  "Taxation & Compliance",
  "Financial Modeling",
  "Budgeting & Forecasting",
  "Internal Control & Process Review",
  "Strategy & Policy Development",
  "Training & Mentorship",
  "Other / Not Sure",
];

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Office",
    value: "Kathmandu, Nepal",
    detail: "Office address shared on request",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977-1-4000000",
    detail: "Sunday — Friday, 9:30 AM — 5:30 PM",
    href: "tel:+977140000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@biztra.com.np",
    detail: "We respond within 1 business day",
    href: "mailto:info@biztra.com.np",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Sun — Fri · 9:30 — 17:30",
    detail: "Saturday closed",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate submission
    setTimeout(() => {
      setFormState("success");
    }, 1200);
  };

  const handleField =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Let's Discuss Your Business"
        subtitle="Tell us about your organization, your challenges, and the outcomes you're working toward. We'll respond within one business day with a thoughtful next step."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact form + info */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Send a Message
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                  Book a Consultation
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                  Share a few details about your business and the advisory area you&apos;re
                  exploring. The more context you provide, the more targeted our response can be.
                </p>
              </Reveal>

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy-deep">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-deep">
                    Message Received
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out to Biztra Business Advisory. A member of our team
                    will respond within one business day to schedule your consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormState("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-navy-deep hover:text-white transition-colors"
                  >
                    Send Another Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <Reveal delay={0.24}>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 grid sm:grid-cols-2 gap-5"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                      >
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleField("name")}
                        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                      >
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleField("email")}
                        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="you@company.com.np"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleField("phone")}
                        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                      >
                        Organization
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={handleField("company")}
                        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                        placeholder="Your company"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="service"
                        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                      >
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={handleField("service")}
                        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      >
                        <option value="">Select a service (optional)</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                      >
                        Message <span className="text-gold">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleField("message")}
                        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-y"
                        placeholder="Tell us about your business and what you'd like to discuss…"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy transition-all disabled:opacity-60 disabled:cursor-wait"
                      >
                        {formState === "submitting" ? "Sending…" : "Send Message"}
                        {formState === "submitting" ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        )}
                      </button>
                      <p className="mt-3 text-[11px] text-muted-foreground">
                        Your information is treated with full confidentiality and is never shared
                        with third parties.
                      </p>
                    </div>
                  </form>
                </Reveal>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-5">
              <Reveal delay={0.16}>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Office &amp; Contact
                </span>
              </Reveal>
              <Reveal delay={0.24}>
                <h2 className="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                  Reach Out Directly
                </h2>
              </Reveal>
              <Reveal delay={0.32}>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                  Prefer to reach us directly? Use any of the channels below — we are responsive
                  and happy to discuss your needs.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                {CONTACT_INFO.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm hover:border-navy-deep/20 hover:shadow-md transition-all">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep flex-none">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="mt-1 font-serif text-base font-semibold text-navy-deep">
                          {info.value}
                        </div>
                        <div className="mt-1 text-[12px] text-muted-foreground">{info.detail}</div>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>

              <Reveal delay={0.4}>
                <div className="mt-8">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep">
                    Follow Us
                  </h4>
                  <div className="mt-3 flex items-center gap-2">
                    {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                        aria-label="Social media link"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <MapSection />
    </SiteShell>
  );
}

function MapSection() {
  return (
    <section className="relative py-20 lg:py-24" style={{ background: "oklch(0.97 0.005 250)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-border bg-white p-8 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Visit Us
                </span>
                <h2 className="mt-4 font-serif tracking-executive text-balance text-2xl sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] font-medium text-navy-deep">
                  Find Us in Kathmandu
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
                  Biztra Business Advisory is headquartered in Kathmandu, Nepal. We serve clients
                  across the Kathmandu Valley and throughout Nepal, with engagement models that
                  accommodate both in-person and remote collaboration.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-navy-gradient noise-overlay">
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 300"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <path d="M0 80 L400 120" stroke="white" strokeWidth="1" opacity="0.15" />
                    <path d="M0 180 L400 220" stroke="white" strokeWidth="1" opacity="0.15" />
                    <path d="M80 0 L120 300" stroke="white" strokeWidth="1" opacity="0.15" />
                    <path d="M240 0 L280 300" stroke="white" strokeWidth="1" opacity="0.15" />
                    <path d="M0 150 Q200 100 400 180" stroke="white" strokeWidth="1" opacity="0.2" fill="none" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-navy-deep/80 backdrop-blur-sm px-3.5 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                      Kathmandu
                    </div>
                    <div className="text-[11px] text-white/85">Biztra HQ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
