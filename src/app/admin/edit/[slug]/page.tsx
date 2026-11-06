"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ArticleEditor, type ArticleFormData } from "@/components/biztra/article-editor";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    // Check auth + load article in parallel
    Promise.all([
      fetch("/api/auth/session").then((r) => r.json()),
      fetch(`/api/articles/${slug}?admin=true`).then((r) => {
        if (!r.ok) return null;
        return r.json();
      }),
    ])
      .then(([session, articleData]) => {
        if (!session.authenticated) {
          router.replace("/admin/login");
          return;
        }
        if (!articleData || !articleData.article) {
          setError("Article not found.");
          setLoading(false);
          return;
        }
        const a = articleData.article;
        setArticle({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          content: a.content,
          category: a.category,
          author: a.author,
          readTime: a.readTime,
          published: a.published,
          featured: a.featured,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load article.");
        setLoading(false);
      });
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-navy-deep" />
      </div>
    );
  }

  if (error || !article || !slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-5">
        <p className="text-sm text-muted-foreground">
          {error || "Article not found."}
        </p>
        <a
          href="/admin"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy transition-colors"
        >
          Back to dashboard
        </a>
      </div>
    );
  }

  return <ArticleEditor mode="edit" initialData={article} originalSlug={slug} />;
}
