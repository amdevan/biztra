"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

type SiteSettings = {
  brandName: string;
  brandTagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroStat1Value: string;
  heroStat1Label: string;
  heroStat2Value: string;
  heroStat2Label: string;
  heroStat3Value: string;
  heroStat3Label: string;
  heroStat4Value: string;
  heroStat4Label: string;
  footerTagline: string;
  footerDescription: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactAddressDetail: string;
  contactHours: string;
  contactHoursDetail: string;
  contactResponseTime: string;
  mapsUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "Biztra",
  brandTagline: "Business Advisory",
  heroEyebrow: "Kathmandu · Nepal · Est. 2023",
  heroHeadline: "",
  heroSubtitle: "",
  heroPrimaryCta: "Book a Consultation",
  heroSecondaryCta: "Explore Our Services",
  heroStat1Value: "6+",
  heroStat1Label: "Years Professional Experience",
  heroStat2Value: "9",
  heroStat2Label: "Service Verticals",
  heroStat3Value: "8+",
  heroStat3Label: "Industries Served",
  heroStat4Value: "100%",
  heroStat4Label: "Nepal-Focused Advisory",
  footerTagline: "",
  footerDescription: "",
  contactPhone: "",
  contactEmail: "",
  contactAddress: "",
  contactAddressDetail: "",
  contactHours: "",
  contactHoursDetail: "",
  contactResponseTime: "",
  mapsUrl: "",
  linkedinUrl: "#",
  facebookUrl: "#",
  instagramUrl: "#",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleField =
    (field: keyof SiteSettings) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSettings((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // Load settings on mount
  useState(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.settings) {
          setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
      setSuccess("Settings saved successfully.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-navy-deep" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-6 bg-gold" />
          Site Settings
        </span>
        <h1 className="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
          Site Settings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage brand name, hero section content, contact information, and footer.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="h-4 w-4 flex-none" />
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 flex-none" />
          {success}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 pb-24">
        <Section title="Brand">
          <Grid2>
            <Field label="Brand Name" value={settings.brandName} onChange={handleField("brandName")} />
            <Field label="Brand Tagline" value={settings.brandTagline} onChange={handleField("brandTagline")} />
          </Grid2>
        </Section>

        <Section title="Hero Section" description="Content shown in the large hero at the top of the homepage.">
          <Field label="Hero Eyebrow (small badge text)" value={settings.heroEyebrow} onChange={handleField("heroEyebrow")} />
          <Field label="Hero Headline" value={settings.heroHeadline} onChange={handleField("heroHeadline")} />
          <Textarea label="Hero Subtitle" value={settings.heroSubtitle} onChange={handleField("heroSubtitle")} rows={3} />
          <Grid2>
            <Field label="Primary CTA Button" value={settings.heroPrimaryCta} onChange={handleField("heroPrimaryCta")} />
            <Field label="Secondary CTA Button" value={settings.heroSecondaryCta} onChange={handleField("heroSecondaryCta")} />
          </Grid2>
          <div className="mt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep mb-3">
              Credibility Indicators (4 stats)
            </p>
            <Grid4>
              <Field label="Stat 1 Value" value={settings.heroStat1Value} onChange={handleField("heroStat1Value")} />
              <Field label="Stat 1 Label" value={settings.heroStat1Label} onChange={handleField("heroStat1Label")} />
              <Field label="Stat 2 Value" value={settings.heroStat2Value} onChange={handleField("heroStat2Value")} />
              <Field label="Stat 2 Label" value={settings.heroStat2Label} onChange={handleField("heroStat2Label")} />
              <Field label="Stat 3 Value" value={settings.heroStat3Value} onChange={handleField("heroStat3Value")} />
              <Field label="Stat 3 Label" value={settings.heroStat3Label} onChange={handleField("heroStat3Label")} />
              <Field label="Stat 4 Value" value={settings.heroStat4Value} onChange={handleField("heroStat4Value")} />
              <Field label="Stat 4 Label" value={settings.heroStat4Label} onChange={handleField("heroStat4Label")} />
            </Grid4>
          </div>
        </Section>

        <Section title="Contact Information">
          <Grid2>
            <Field label="Phone Number" value={settings.contactPhone} onChange={handleField("contactPhone")} />
            <Field label="Email" value={settings.contactEmail} onChange={handleField("contactEmail")} />
            <Field label="Address (short)" value={settings.contactAddress} onChange={handleField("contactAddress")} />
            <Field label="Address Detail" value={settings.contactAddressDetail} onChange={handleField("contactAddressDetail")} />
            <Field label="Office Hours" value={settings.contactHours} onChange={handleField("contactHours")} />
            <Field label="Hours Detail" value={settings.contactHoursDetail} onChange={handleField("contactHoursDetail")} />
            <Field label="Response Time" value={settings.contactResponseTime} onChange={handleField("contactResponseTime")} />
            <Field label="Google Maps URL" value={settings.mapsUrl} onChange={handleField("mapsUrl")} />
          </Grid2>
        </Section>

        <Section title="Footer Content">
          <Field label="Footer Tagline" value={settings.footerTagline} onChange={handleField("footerTagline")} />
          <Textarea label="Footer Description" value={settings.footerDescription} onChange={handleField("footerDescription")} rows={3} />
          <Grid3>
            <Field label="LinkedIn URL" value={settings.linkedinUrl} onChange={handleField("linkedinUrl")} />
            <Field label="Facebook URL" value={settings.facebookUrl} onChange={handleField("facebookUrl")} />
            <Field label="Instagram URL" value={settings.instagramUrl} onChange={handleField("instagramUrl")} />
          </Grid3>
        </Section>

        {/* Save button */}
        <div className="fixed bottom-6 right-6 z-30 lg:right-[calc(1.5rem+0px)]">
          <button
            type="submit"
            disabled={saving}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-7 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-navy transition-all disabled:opacity-60 disabled:cursor-wait"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h3 className="font-serif text-lg font-semibold text-navy-deep">{title}</h3>
      {description && <p className="mt-1 text-[12px] text-muted-foreground">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function Grid3({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-3 gap-4">{children}</div>;
}

function Grid4({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-y"
      />
    </div>
  );
}
