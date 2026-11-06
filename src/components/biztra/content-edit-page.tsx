"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ContentEditor } from "@/components/biztra/content-editor";

type ItemData = {
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

export function ContentEditPage({
  type,
  basePath,
  singularLabel,
  params,
}: {
  type: string;
  basePath: string;
  singularLabel: string;
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/content/${type}/${slug}?admin=true`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.item) {
          setError(`${singularLabel} not found.`);
          setLoading(false);
          return;
        }
        setItem(data.item);
        setLoading(false);
      })
      .catch(() => {
        setError(`Failed to load ${singularLabel.toLowerCase()}.`);
        setLoading(false);
      });
  }, [slug, type, singularLabel]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-navy-deep" />
      </div>
    );
  }

  if (error || !item || !slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-5">
        <p className="text-sm text-muted-foreground">{error || `${singularLabel} not found.`}</p>
        <a
          href={basePath}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy transition-colors"
        >
          Back to {singularLabel}s
        </a>
      </div>
    );
  }

  return (
    <ContentEditor
      type={type}
      mode="edit"
      basePath={basePath}
      singularLabel={singularLabel}
      initialData={item}
      originalSlug={slug}
    />
  );
}
