"use client";

import { useEffect, useState, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Loader2,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map of available icons — same as ICON_MAP in lib/content.ts but imported here
// so the dynamic icon lookup happens inside a memoized component (lint-safe).
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, ClipboardCheck, Calculator, Receipt, TrendingUp, LineChart,
  ShieldCheck, Settings, GraduationCap, Factory, Store, Landmark, HeartPulse,
  Cpu, Droplets, Wrench, MapPin, Globe, Scale, Target, Handshake, Lock, Award,
  CheckCircle2, Users, Building2, FileBarChart,
};

// Memoized wrapper for dynamic Lucide icons.
const DynamicIcon = memo(function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] || Briefcase;
  return <Icon className={className} />;
});

type ContentItem = {
  id: string;
  type: string;
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

export function ContentList({
  type,
  title,
  subtitle,
  singularLabel,
  basePath,
  showFeatured = false,
  showDescription = true,
}: {
  type: string;
  title: string;
  subtitle: string;
  singularLabel: string;
  basePath: string;
  showFeatured?: boolean;
  showDescription?: boolean;
}) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, [type]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content/${type}?admin=true`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      console.error("Failed to load items:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, itemTitle: string) => {
    if (!confirm(`Delete "${itemTitle}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/content/${type}/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.slug !== slug));
    } catch (e) {
      alert("Failed to delete item.");
      console.error(e);
    }
  };

  const handleTogglePublished = async (item: ContentItem) => {
    try {
      const res = await fetch(`/api/content/${type}/${item.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setItems((prev) =>
        prev.map((i) => (i.slug === item.slug ? { ...i, ...data.item } : i))
      );
    } catch (e) {
      alert("Failed to update status.");
      console.error(e);
    }
  };

  const handleToggleFeatured = async (item: ContentItem) => {
    try {
      const res = await fetch(`/api/content/${type}/${item.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setItems((prev) =>
        prev.map((i) => (i.slug === item.slug ? { ...i, ...data.item } : i))
      );
    } catch (e) {
      alert("Failed to update featured status.");
      console.error(e);
    }
  };

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
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Link
          href={`${basePath}/new`}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          New {singularLabel}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Total" value={items.length} />
        <StatCard label="Published" value={items.filter((i) => i.published).length} />
        <StatCard label="Unpublished" value={items.filter((i) => !i.published).length} />
      </div>

      {/* Items */}
      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">
              No {title.toLowerCase()} yet. Create your first {singularLabel.toLowerCase()}.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item) => (
              <ContentRow
                key={item.id}
                item={item}
                onTogglePublished={() => handleTogglePublished(item)}
                onToggleFeatured={showFeatured ? () => handleToggleFeatured(item) : undefined}
                onDelete={() => handleDelete(item.slug, item.title)}
                editHref={`${basePath}/edit/${item.slug}`}
                showFeatured={showFeatured}
                showDescription={showDescription}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-[11px] text-muted-foreground">{items.length} items total</p>
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

function ContentRow({
  item,
  onTogglePublished,
  onToggleFeatured,
  onDelete,
  editHref,
  showFeatured,
  showDescription,
}: {
  item: ContentItem;
  onTogglePublished: () => void;
  onToggleFeatured?: () => void;
  onDelete: () => void;
  editHref: string;
  showFeatured: boolean;
  showDescription: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 lg:p-5 hover:bg-mist/60 transition-colors"
      style={{ background: "transparent" }}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-navy-deep/10 bg-navy-deep/[0.03] text-navy-deep">
          <DynamicIcon name={item.iconName} className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {showFeatured && item.featured && (
              <span
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: "oklch(0.555 0.072 148 / 0.15)", color: "oklch(0.42 0.07 148)" }}
              >
                <Star className="h-2.5 w-2.5 fill-current" />
                Featured
              </span>
            )}
            {!item.published && (
              <span className="inline-flex items-center rounded-md border border-amber-300/40 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                Draft
              </span>
            )}
            {item.subtitle && (
              <span className="text-[11px] text-muted-foreground font-medium">{item.subtitle}</span>
            )}
          </div>
          <h3 className="mt-1 font-serif text-base font-semibold text-navy-deep leading-snug">
            {item.title}
          </h3>
          {showDescription && item.description && (
            <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">{item.description}</p>
          )}
          <div className="mt-1.5 text-[11px] text-muted-foreground font-mono">
            slug: {item.slug}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-none">
        {onToggleFeatured && (
          <ActionButton
            onClick={onToggleFeatured}
            title={item.featured ? "Unfeature" : "Mark as featured"}
            active={item.featured}
          >
            <Star className={cn("h-4 w-4", item.featured && "fill-current")} />
          </ActionButton>
        )}
        <ActionButton
          onClick={onTogglePublished}
          title={item.published ? "Unpublish" : "Publish"}
        >
          {item.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </ActionButton>
        <Link
          href={editHref}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-muted transition-colors"
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Delete"
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
