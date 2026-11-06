"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { SERVICES } from "./data";
import type { SiteSettings } from "@/lib/content";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Industries", href: "/industries" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ settings }: { settings?: SiteSettings }) {
  // Show first 6 services in footer
  const footerServices = SERVICES.slice(0, 6).map((s) => ({
    label: s.name.split(" & ")[0].split(" —")[0],
    href: "/services",
  }));

  const footerTagline = settings?.footerTagline || "Professional Advisory. Practical Solutions. Sustainable Growth.";
  const footerDescription = settings?.footerDescription || "A Nepal-focused business advisory practice combining local market expertise with globally standardized professional practices.";
  const phone = settings?.contactPhone || "+977-1-4000000";
  const email = settings?.contactEmail || "info@biztra.com.np";
  const address = settings?.contactAddress || "Kathmandu, Nepal";
  const addressDetail = settings?.contactAddressDetail || "Office address shared on request";
  const mapsUrl = settings?.mapsUrl || "https://maps.google.com";
  const linkedinUrl = settings?.linkedinUrl || "#";
  const facebookUrl = settings?.facebookUrl || "#";
  const instagramUrl = settings?.instagramUrl || "#";

  return (
    <footer className="relative bg-navy-deep text-white">
      {/* Top decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top section: brand + columns */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo variant="light" showTagline markSize={44} />

            <p className="mt-6 text-pretty text-sm leading-relaxed text-white/60 max-w-sm">
              {footerTagline}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-sm">
              {footerDescription}
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-2">
              {[
                { Icon: Linkedin, url: linkedinUrl },
                { Icon: Facebook, url: facebookUrl },
                { Icon: Instagram, url: instagramUrl },
              ].map(({ Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  whileHover={{ y: -2 }}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:border-gold hover:text-gold hover:bg-gold/5"
                  aria-label="Social media link"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-8">
            {/* Company */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Company
              </h4>
              <ul className="mt-5 space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Services
              </h4>
              <ul className="mt-5 space-y-3">
                {footerServices.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-none text-white/40" />
                <div>
                  <div className="text-white/85">{address}</div>
                  <div className="mt-0.5 text-white/50 text-[12px]">{addressDetail}</div>
                </div>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 text-white/65 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 flex-none text-white/40" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-white/65 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 flex-none text-white/40" />
                  {email}
                </a>
              </li>
            </ul>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold hover:text-white transition-colors"
            >
              Open in Google Maps
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-14 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/50">
            © 2026 Biztra Business Advisory. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-[12px] text-white/50 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-[12px] text-white/50 hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
