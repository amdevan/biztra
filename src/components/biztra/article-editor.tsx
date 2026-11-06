"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { INSIGHT_CATEGORIES } from "@/components/biztra/data";
import { cn } from "@/lib/utils";

export type ArticleFormData = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  featured: boolean;
};

type ArticleEditorProps = {
  mode: "create" | "edit";
  initialData?: ArticleFormData;
  originalSlug?: string;
};

export function ArticleEditor({
  mode,
  initialData,
  originalSlug,
}: ArticleEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormData>(
    initialData || {
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: INSIGHT_CATEGORIES[0],
      author: "Biztra Business Advisory",
      readTime: "5 min read",
      published: false,
      featured: false,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleField =
    <K extends keyof ArticleFormData>(field: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value as ArticleFormData[K] }));
    };

  // Auto-generate slug from title (only in create mode + if slug empty)
  const handleTitleBlur = () => {
    if (mode === "create" && !formData.slug && formData.title) {
      const generated = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80);
      setFormData((prev) => ({ ...prev, slug: generated }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const isPublishing = formData.published;
      const url =
        mode === "create"
          ? "/api/articles"
          : `/api/articles/${originalSlug || formData.slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save article");
        setSaving(false);
        return;
      }

      setSuccess(
        mode === "create"
          ? isPublishing
            ? "Article created and published successfully."
            : "Article created as draft."
          : "Article updated successfully."
      );

      // If we changed the slug during edit, redirect to the new edit URL
      if (
        mode === "edit" &&
        originalSlug &&
        formData.slug &&
        formData.slug !== originalSlug
      ) {
        setTimeout(() => {
          router.replace(`/admin/articles/edit/${formData.slug}`);
        }, 800);
      }

      setSaving(false);
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-mist" style={{ background: "oklch(0.97 0.005 250)" }}>
      <main className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            {mode === "create" ? "New Article" : "Edit Article"}
          </span>
          <h1 className="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
            {mode === "create" ? "Create New Article" : "Edit Article"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "create"
              ? "Compose a new research article for the Biztra website."
              : `Editing: ${initialData?.title || ""}`}
          </p>
        </div>

        {/* Alerts */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title + slug */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                >
                  Title <span className="text-gold">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleField("title")}
                  onBlur={handleTitleBlur}
                  maxLength={200}
                  className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-base font-serif text-navy-deep placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="e.g., Navigating Nepal's Tax Filing Landscape in 2026"
                />
              </div>
              <div>
                <label
                  htmlFor="slug"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                >
                  Slug (URL) <span className="text-gold">*</span>
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-mono">/research/</span>
                  <input
                    id="slug"
                    type="text"
                    required
                    value={formData.slug}
                    onChange={handleField("slug")}
                    pattern="[a-z0-9-]+"
                    className="flex-1 rounded-lg border border-border bg-white px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="article-slug"
                  />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Lowercase letters, numbers, and hyphens only. Used in the article URL.
                </p>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <label
              htmlFor="excerpt"
              className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
            >
              Excerpt <span className="text-gold">*</span>
            </label>
            <textarea
              id="excerpt"
              required
              rows={3}
              value={formData.excerpt}
              onChange={handleField("excerpt")}
              maxLength={400}
              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-y"
              placeholder="A short summary shown on the article card and in search results."
            />
            <p className="mt-2 text-[11px] text-muted-foreground">
              {formData.excerpt.length} / 400 characters
            </p>
          </div>

          {/* Content (Markdown) */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="content"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
              >
                Content (Markdown) <span className="text-gold">*</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <FileText className="h-3 w-3" />
                Supports ## headings and **bold**
              </span>
            </div>
            <textarea
              id="content"
              required
              rows={18}
              value={formData.content}
              onChange={handleField("content")}
              className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-y scrollbar-slim"
              placeholder={`## Section Heading\n\nArticle body goes here. Use Markdown for formatting.\n\n- Bullet points\n- **Bold text**\n- *Italic text*`}
            />
            <p className="mt-2 text-[11px] text-muted-foreground">
              The content will be rendered as formatted text on the public article page.
            </p>
          </div>

          {/* Metadata */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep mb-4">
              Metadata
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="category"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                >
                  Category <span className="text-gold">*</span>
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleField("category")}
                  className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  {INSIGHT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="readTime"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                >
                  Read Time
                </label>
                <input
                  id="readTime"
                  type="text"
                  value={formData.readTime}
                  onChange={handleField("readTime")}
                  className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="5 min read"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="author"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep"
                >
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={handleField("author")}
                  className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Biztra Business Advisory"
                />
              </div>
            </div>
          </div>

          {/* Publish settings */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep mb-4">
              Publish Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-4 hover:bg-mist/60 transition-colors" style={{ background: "transparent" }}>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={handleField("published")}
                  className="mt-0.5 h-4 w-4 accent-navy-deep cursor-pointer"
                />
                <div>
                  <div className="text-sm font-semibold text-navy-deep">
                    Publish this article
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    Published articles are visible on the public /research page.
                    Unchecked articles remain as drafts and are only visible to admins.
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-4 hover:bg-mist/60 transition-colors" style={{ background: "transparent" }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleField("featured")}
                  className="mt-0.5 h-4 w-4 accent-gold cursor-pointer"
                />
                <div>
                  <div className="text-sm font-semibold text-navy-deep">
                    Mark as featured
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    Featured articles are highlighted on the homepage and may be
                    displayed more prominently on the Research page.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <Link
              href="/admin/articles"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel
            </Link>
            <div className="flex gap-3">
              {mode === "edit" && formData.slug && (
                <Link
                  href={`/research/${formData.slug}`}
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
                    {mode === "create" ? "Create Article" : "Save Changes"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
