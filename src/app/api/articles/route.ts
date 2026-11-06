import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/articles — list published articles (public) or all articles (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedParam = searchParams.get("published");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");
    const admin = searchParams.get("admin") === "true";

    const where: {
      published?: boolean;
      category?: string;
    } = {};
    if (!admin) {
      where.published = true;
    } else if (publishedParam === "true") {
      where.published = true;
    } else if (publishedParam === "false") {
      where.published = false;
    }
    if (category && category !== "All") {
      where.category = category;
    }

    const articles = await db.article.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit ? parseInt(limit, 10) : undefined,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        author: true,
        readTime: true,
        published: true,
        featured: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST /api/articles — create a new article (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.slug || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, excerpt, content, category" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await db.article.findUnique({
      where: { slug: body.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 409 }
      );
    }

    const article = await db.article.create({
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        author: body.author || "Biztra Business Advisory",
        readTime: body.readTime || "5 min read",
        published: !!body.published,
        featured: !!body.featured,
        publishedAt: body.published ? new Date() : null,
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
