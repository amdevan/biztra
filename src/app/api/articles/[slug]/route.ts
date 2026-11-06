import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/articles/[slug] — fetch a single article by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const admin = new URL(request.url).searchParams.get("admin") === "true";

    const article = await db.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Non-admin requests can only view published articles
    if (!admin && !article.published) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("GET /api/articles/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[slug] — update an article (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const existing = await db.article.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== slug) {
      const slugConflict = await db.article.findUnique({
        where: { slug: body.slug },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: "An article with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // If publishing for the first time, set publishedAt
    const wasUnpublished = !existing.published;
    const isNowPublished = body.published === true;
    const shouldSetPublishedAt = wasUnpublished && isNowPublished && !existing.publishedAt;

    const updateData: {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      category?: string;
      author?: string;
      readTime?: string;
      published?: boolean;
      featured?: boolean;
      publishedAt?: Date;
    } = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.readTime !== undefined) updateData.readTime = body.readTime;
    if (body.published !== undefined) updateData.published = !!body.published;
    if (body.featured !== undefined) updateData.featured = !!body.featured;
    if (shouldSetPublishedAt) updateData.publishedAt = new Date();

    const article = await db.article.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("PUT /api/articles/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[slug] — delete an article (admin)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const existing = await db.article.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    await db.article.delete({ where: { slug } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/articles/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
