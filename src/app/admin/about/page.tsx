"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

type AboutContent = {
  storyEyebrow: string;
  storyHeading: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  storyParagraph4: string;
  storyQuote: string;
  visionEyebrow: string;
  visionText: string;
  visionContext: string;
  missionEyebrow: string;
  missionHeading: string;
  missionText: string;
  coreValuesEyebrow: string;
  coreValuesHeading: string;
  coreValuesSubtitle: string;
  whyChooseEyebrow: string;
  whyChooseHeading: string;
  whyChooseSubtitle: string;
};

const DEFAULT: AboutContent = {
  storyEyebrow: "Who We Are",
  storyHeading: "",
  storyParagraph1: "",
  storyParagraph2: "",
  storyParagraph3: "",
  storyParagraph4: "",
  storyQuote: "",
  visionEyebrow: "Our Vision",
  visionText: "",
  visionContext: "",
  missionEyebrow: "Our Mission",
  missionHeading: "",
  missionText: "",
  coreValuesEyebrow: "Core Values",
  coreValuesHeading: "",
  coreValuesSubtitle: "",
  whyChooseEyebrow: "Why Choose Us",
  whyChooseHeading: "",
  whyChooseSubtitle: "",
};

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleField =
    (field: keyof AboutContent) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setContent((prev) => ({ ...prev, [field]: e.target.value }));
    };

  useState(() => {
    fetch("/api/about")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.about) setContent({ ...DEFAULT, ...data.about });
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
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setContent({ ...DEFAULT, ...data.about });
      setSuccess("About content saved successfully.");
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
          About Page
        </span>
        <h1 className="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
          About Page Content
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Edit the company story, vision, mission, and section headings shown on the About page.
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
        {/* Story section */}
        <Section title="Story Section" description="The main company narrative shown at the top of the About page.">
          <Field label="Story Eyebrow" value={content.storyEyebrow} onChange={handleField("storyEyebrow")} />
          <Field label="Story Heading" value={content.storyHeading} onChange={handleField("storyHeading")} />
          <Textarea label="Story Paragraph 1" value={content.storyParagraph1} onChange={handleField("storyParagraph1")} rows={5} />
          <Textarea label="Story Paragraph 2" value={content.storyParagraph2} onChange={handleField("storyParagraph2")} rows={5} />
          <Textarea label="Story Paragraph 3" value={content.storyParagraph3} onChange={handleField("storyParagraph3")} rows={5} />
          <Textarea label="Story Paragraph 4" value={content.storyParagraph4} onChange={handleField("storyParagraph4")} rows={5} />
          <Textarea label="Story Quote (shown in framed card)" value={content.storyQuote} onChange={handleField("storyQuote")} rows={2} />
        </Section>

        {/* Vision */}
        <Section title="Vision Section" description="The vision statement shown on a dark navy section.">
          <Field label="Vision Eyebrow" value={content.visionEyebrow} onChange={handleField("visionEyebrow")} />
          <Textarea label="Vision Text (the quote itself)" value={content.visionText} onChange={handleField("visionText")} rows={4} />
          <Textarea label="Vision Context (supporting paragraph)" value={content.visionContext} onChange={handleField("visionContext")} rows={3} />
        </Section>

        {/* Mission */}
        <Section title="Mission Section">
          <Field label="Mission Eyebrow" value={content.missionEyebrow} onChange={handleField("missionEyebrow")} />
          <Field label="Mission Heading" value={content.missionHeading} onChange={handleField("missionHeading")} />
          <Textarea label="Mission Text" value={content.missionText} onChange={handleField("missionText")} rows={5} />
        </Section>

        {/* Core Values heading */}
        <Section title="Core Values Section Heading" description="Manage the individual core values from the &ldquo;Core Values&rdquo; sidebar link.">
          <Field label="Core Values Eyebrow" value={content.coreValuesEyebrow} onChange={handleField("coreValuesEyebrow")} />
          <Field label="Core Values Heading" value={content.coreValuesHeading} onChange={handleField("coreValuesHeading")} />
          <Textarea label="Core Values Subtitle" value={content.coreValuesSubtitle} onChange={handleField("coreValuesSubtitle")} rows={2} />
        </Section>

        {/* Why Choose heading */}
        <Section title="Why Choose Us Section Heading" description="Manage the individual &ldquo;why choose&rdquo; items from the sidebar link.">
          <Field label="Why Choose Eyebrow" value={content.whyChooseEyebrow} onChange={handleField("whyChooseEyebrow")} />
          <Field label="Why Choose Heading" value={content.whyChooseHeading} onChange={handleField("whyChooseHeading")} />
          <Textarea label="Why Choose Subtitle" value={content.whyChooseSubtitle} onChange={handleField("whyChooseSubtitle")} rows={2} />
        </Section>

        {/* Save button */}
        <div className="fixed bottom-6 right-6 z-30">
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
                Save About Content
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
      {description && <p className="mt-1 text-[12px] text-muted-foreground" dangerouslySetInnerHTML={{ __html: description || "" }} />}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
        {label}
      </label>
      <input
        type="text"
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
