import { db } from "@/lib/db";

export type PublicArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

// Fetch a single published article by slug (server-side)
export async function getArticleBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const article = await db.article.findUnique({
      where: { slug },
    });
    if (!article || !article.published) return null;
    return {
      ...article,
      publishedAt: article.publishedAt?.toISOString() ?? null,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("getArticleBySlug error:", error);
    return null;
  }
}

// Fetch all published articles (server-side)
export async function getPublishedArticles(): Promise<PublicArticle[]> {
  try {
    const articles = await db.article.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return articles.map((a) => ({
      ...a,
      publishedAt: a.publishedAt?.toISOString() ?? null,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("getPublishedArticles error:", error);
    return [];
  }
}

// Fetch published articles in a specific category
export async function getPublishedArticlesByCategory(
  category: string
): Promise<PublicArticle[]> {
  try {
    const articles = await db.article.findMany({
      where: { published: true, category },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return articles.map((a) => ({
      ...a,
      publishedAt: a.publishedAt?.toISOString() ?? null,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("getPublishedArticlesByCategory error:", error);
    return [];
  }
}

// Fetch all distinct categories that have published articles
export async function getPublishedCategories(): Promise<string[]> {
  try {
    const result = await db.article.findMany({
      where: { published: true },
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    });
    return result.map((r) => r.category);
  } catch (error) {
    console.error("getPublishedCategories error:", error);
    return [];
  }
}
