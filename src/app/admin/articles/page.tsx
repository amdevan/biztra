"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  Loader2,
} from "lucide-react";
import { INSIGHT_CATEGORIES } from "@/components/biztra/data";
import { cn } from "@/lib/utils";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles?admin=true");
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (e) {
      console.error("Failed to load articles:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
    } catch (e) {
      alert("Failed to delete article. Please try again.");
      console.error(e);
    }
  };

  const handleTogglePublished = async (article: Article) => {
    try {
      const res = await fetch(`/api/articles/${article.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !article.published }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setArticles((prev) =>
        prev.map((a) => (a.slug === article.slug ? { ...a, ...data.article } : a))
      );
    } catch (e) {
      alert("Failed to update article status.");
      console.error(e);
    }
  };

  const handleToggleFeatured = async (article: Article) => {
    try {
      const res = await fetch(`/api/articles/${article.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !article.featured }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setArticles((prev) =>
        prev.map((a) => (a.slug === article.slug ? { ...a, ...data.article } : a))
      );
    } catch (e) {
      alert("Failed to update featured status.");
      console.error(e);
    }
  };

  const filtered = articles.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || a.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && a.published) ||
      (statusFilter === "draft" && !a.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-10">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" />
            Content Management
          </span>
          <h1 className="mt-3 font-serif tracking-executive text-3xl sm:text-4xl font-medium text-navy-deep">
            Research Articles
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage research articles published on the Biztra website.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Total" value={articles.length} />
        <StatCard label="Published" value={articles.filter((a) => a.published).length} />
        <StatCard label="Drafts" value={articles.filter((a) => !a.published).length} />
        <StatCard label="Featured" value={articles.filter((a) => a.featured).length} />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-white p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, excerpt, or slug…"
              className="w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            <option value="All">All categories</option>
            {INSIGHT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
            className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Articles table */}
      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading articles…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">
              {articles.length === 0
                ? "No articles yet. Create your first article."
                : "No articles match your filters."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((article) => (
              <ArticleRow
                key={article.id}
                article={article}
                onTogglePublished={() => handleTogglePublished(article)}
                onToggleFeatured={() => handleToggleFeatured(article)}
                onDelete={() => handleDelete(article.slug, article.title)}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-[11px] text-muted-foreground">
        {filtered.length} of {articles.length} articles shown
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 font-serif text-2xl font-semibold text-navy-deep">{value}</div>
    </div>
  );
}

function ArticleRow({
  article,
  onTogglePublished,
  onToggleFeatured,
  onDelete,
}: {
  article: Article;
  onTogglePublished: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 lg:p-5 hover:bg-mist/60 transition-colors"
      style={{ background: "transparent" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            style={{ background: "oklch(0.97 0.005 250)" }}
          >
            {article.category}
          </span>
          {article.featured && (
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: "oklch(0.555 0.072 148 / 0.15)", color: "oklch(0.42 0.07 148)" }}
            >
              <Star className="h-2.5 w-2.5 fill-current" />
              Featured
            </span>
          )}
          {!article.published && (
            <span className="inline-flex items-center rounded-md border border-amber-300/40 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
              Draft
            </span>
          )}
        </div>
        <h3 className="mt-2 font-serif text-base font-semibold text-navy-deep leading-snug truncate">
          {article.title}
        </h3>
        <p className="mt-1 text-[12px] text-muted-foreground line-clamp-1">{article.excerpt}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>/research/{article.slug}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span>{article.readTime}</span>
          {article.publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>
                Published{" "}
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-none">
        <ActionButton
          onClick={onToggleFeatured}
          title={article.featured ? "Unfeature" : "Mark as featured"}
          active={article.featured}
        >
          <Star className={cn("h-4 w-4", article.featured && "fill-current")} />
        </ActionButton>
        <ActionButton
          onClick={onTogglePublished}
          title={article.published ? "Unpublish" : "Publish"}
        >
          {article.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </ActionButton>
        <Link
          href={`/admin/articles/edit/${article.slug}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-muted transition-colors"
          title="Edit article"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Delete article"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ActionButton({
  onClick,
  title,
  active,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        active
          ? "text-gold bg-gold/10 hover:bg-gold/20"
          : "text-muted-foreground hover:bg-muted hover:text-navy-deep"
      )}
    >
      {children}
    </button>
  );
}
