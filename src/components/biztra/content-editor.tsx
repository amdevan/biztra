"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";

// Available icons (must match ICON_MAP in src/lib/content.ts)
const AVAILABLE_ICONS = [
  "Briefcase", "ClipboardCheck", "Calculator", "Receipt", "TrendingUp",
  "LineChart", "ShieldCheck", "Settings", "GraduationCap", "Factory",
  "Store", "Landmark", "HeartPulse", "Cpu", "Droplets", "Wrench",
  "MapPin", "Globe", "Scale", "Target", "Handshake", "Lock", "Award",
  "CheckCircle2", "Users", "Building2", "FileBarChart",
];

type EditorProps = {
  type: string;
  mode: "create" | "edit";
  basePath: string;
  singularLabel: string;
  initialData?: {
    slug: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    iconName: string;
    order: number;
    published: boolean;
    featured: boolean;
    data: Record<string, unknown>;
  };
  originalSlug?: string;
};

export function ContentEditor({
  type,
  mode,
  basePath,
  singularLabel,
  initialData,
  originalSlug,
}: EditorProps) {
  const router = useRouter();

  // Common fields
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [iconName, setIconName] = useState(initialData?.iconName || "Briefcase");
  const [order, setOrder] = useState(initialData?.order ?? 0);
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [featured, setFeatured] = useState(initialData?.featured ?? false);

  // Type-specific data fields (stored in `data` JSON)
  const [shortDescription, setShortDescription] = useState(
    (initialData?.data?.shortDescription as string) || ""
  );
  const [deliverables, setDeliverables] = useState(
    Array.isArray(initialData?.data?.deliverables)
      ? (initialData!.data.deliverables as string[]).join("\n")
      : ""
  );
  const [industryServices, setIndustryServices] = useState(
    Array.isArray(initialData?.data?.services)
      ? (initialData!.data.services as string[]).join(", ")
      : ""
  );
  const [approachNumber, setApproachNumber] = useState(
    (initialData?.data?.number as string) || ""
  );
  // Team member fields
  const [initials, setInitials] = useState(
    (initialData?.data?.initials as string) || ""
  );
  const [role, setRole] = useState(
    (initialData?.data?.role as string) || (initialData?.subtitle as string) || ""
  );
  const [designation, setDesignation] = useState(
    (initialData?.data?.designation as string) || ""
  );
  const [expertise, setExpertise] = useState(
    Array.isArray(initialData?.data?.expertise)
      ? (initialData!.data.expertise as string[]).join("\n")
      : ""
  );
  const [highlights, setHighlights] = useState(
    Array.isArray(initialData?.data?.highlights)
      ? (initialData!.data.highlights as { label: string; value: string }[])
          .map((h) => `${h.label}: ${h.value}`)
          .join("\n")
      : ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTitleBlur = () => {
    if (mode === "create" && !slug && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80);
      setSlug(generated);
    }
  };

  const buildData = (): Record<string, unknown> => {
    const data: Record<string, unknown> = {};
    if (type === "service") {
      data.shortDescription = shortDescription;
      data.deliverables = deliverables
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (type === "industry") {
      data.shortDescription = shortDescription;
      data.services = industryServices
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (type === "approach_step") {
      data.number = approachNumber;
    } else if (type === "team_member") {
      data.initials = initials;
      data.role = role;
      data.designation = designation;
      data.expertise = expertise
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      data.highlights = highlights
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((line) => {
          const [label, ...rest] = line.split(":");
          return { label: label?.trim() || "", value: rest.join(":").trim() };
        })
        .filter((h) => h.label && h.value);
    }
    return data;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        slug,
        title,
        subtitle: ["team_member", "approach_step"].includes(type) ? subtitle || null : null,
        description: ["service", "industry", "core_value", "why_choose", "approach_step", "team_member"].includes(type)
          ? description
          : null,
        iconName,
        order,
        published,
        featured,
        data: buildData(),
      };

      const url =
        mode === "create"
          ? `/api/content/${type}`
          : `/api/content/${type}/${originalSlug || slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setSuccess(
        mode === "create"
          ? `${singularLabel} created successfully.`
          : `${singularLabel} updated successfully.`
      );

      if (mode === "create") {
        setTimeout(() => router.push(basePath), 800);
      } else if (originalSlug && slug !== originalSlug) {
        setTimeout(() => router.replace(`${basePath}/edit/${slug}`), 800);
      }
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl pb-24">
      <div className="mb-8">
        <Link
          href={basePath}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy-deep transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {singularLabel}s
        </Link>
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-6 bg-gold" />
          {mode === "create" ? `New ${singularLabel}` : `Edit ${singularLabel}`}
        </span>
        <h1 className="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
          {mode === "create" ? `Create New ${singularLabel}` : `Edit ${singularLabel}`}
        </h1>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic fields */}
        <Section title="Basic Information">
          <Field
            label={`Title *`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            required
          />
          <Field
            label="Slug (URL) *"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            pattern="[a-z0-9-]+"
            required
            hint="Lowercase letters, numbers, and hyphens only."
          />
          {type === "team_member" && (
            <Field
              label="Subtitle (e.g., role shown below name)"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          )}
          {type === "approach_step" && (
            <Field
              label="Approach Step Number (e.g., 01, 02, 03, 04)"
              value={approachNumber}
              onChange={(e) => setApproachNumber(e.target.value)}
            />
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
                Icon
              </label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Display Order (lower = first)"
              type="number"
              value={String(order)}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
            />
          </div>
        </Section>

        {/* Type-specific sections */}
        {type === "service" && (
          <>
            <Section title="Service Details">
              <Textarea
                label="Short Description (shown on cards/previews)"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={3}
              />
              <Textarea
                label="Full Description (shown on detail page)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
              />
              <Textarea
                label="Key Deliverables (one per line)"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                rows={5}
                hint="Each line becomes a checklist item on the service detail page."
              />
            </Section>
          </>
        )}

        {type === "industry" && (
          <Section title="Industry Details">
            <Textarea
              label="Short Description (shown on cards/previews)"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={3}
            />
            <Textarea
              label="Full Description (shown on detail page)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />
            <Field
              label="Related Services (comma-separated)"
              value={industryServices}
              onChange={(e) => setIndustryServices(e.target.value)}
              hint="e.g., Cost accounting systems, Inventory controls, Process improvement"
            />
          </Section>
        )}

        {(type === "core_value" || type === "why_choose") && (
          <Section title={`${singularLabel} Details`}>
            <Textarea
              label="Description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </Section>
        )}

        {type === "approach_step" && (
          <Section title="Step Details">
            <Textarea
              label="Description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </Section>
        )}

        {type === "team_member" && (
          <Section title="Team Member Details">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Initials (shown in avatar circle, e.g., NC)"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
              />
              <Field
                label="Role (e.g., Managing Director)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Field
                label="Designation (e.g., Chartered Accountant)"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <Textarea
              label="Bio (full biographical paragraph)"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />
            <Textarea
              label="Areas of Expertise (one per line)"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              rows={6}
            />
            <Textarea
              label="Highlights (one per line, format: Label: Value)"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              rows={5}
              hint="e.g., Experience: 6+ Years, Foundation: PwC Alumni"
            />
          </Section>
        )}

        {/* Publish settings */}
        <Section title="Publish Settings">
          <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-4 hover:bg-mist/60 transition-colors" style={{ background: "transparent" }}>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-navy-deep cursor-pointer"
            />
            <div>
              <div className="text-sm font-semibold text-navy-deep">
                Publish this {singularLabel.toLowerCase()}
              </div>
              <div className="text-[12px] text-muted-foreground">
                Published items are visible on the live website. Unchecked items remain as drafts.
              </div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-4 hover:bg-mist/60 transition-colors" style={{ background: "transparent" }}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-gold cursor-pointer"
            />
            <div>
              <div className="text-sm font-semibold text-navy-deep">
                Mark as featured
              </div>
              <div className="text-[12px] text-muted-foreground">
                Featured items are highlighted on the homepage and may appear more prominently.
              </div>
            </div>
          </label>
        </Section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <Link
            href={basePath}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
          <div className="flex gap-3">
            {mode === "edit" && slug && (
              <Link
                href={
                  type === "team_member"
                    ? `/team#${slug}`
                    : type === "service"
                      ? `/services#${slug}`
                      : type === "industry"
                        ? `/industries#${slug}`
                        : `/about`
                }
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-muted transition-colors"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Link>
            )}
            <button
              type="submit"
              disabled={saving}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-7 py-3 text-sm font-semibold text-white hover:bg-navy transition-all disabled:opacity-60 disabled:cursor-wait"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {mode === "create" ? `Create ${singularLabel}` : "Save Changes"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h3 className="font-serif text-lg font-semibold text-navy-deep mb-5">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  pattern,
  hint,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  pattern?: string;
  hint?: string;
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
        onBlur={onBlur}
        required={required}
        pattern={pattern}
        className="mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
      {hint && <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  hint?: string;
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
      {hint && <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}
