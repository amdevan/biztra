import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const VALID_TYPES = [
  "service",
  "industry",
  "core_value",
  "why_choose",
  "approach_step",
  "team_member",
];

// GET /api/content/[type]/[slug] — fetch single content item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  try {
    const { type, slug } = await params;
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const admin = new URL(request.url).searchParams.get("admin") === "true";

    const item = await db.contentItem.findUnique({
      where: { type_slug: { type, slug } },
    });
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    if (!admin && !item.published) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(item.data || "{}");
    } catch {
      data = {};
    }

    return NextResponse.json({ item: { ...item, data } });
  } catch (error) {
    console.error("GET /api/content/[type]/[slug] error:", error);
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
  }
}

// PUT /api/content/[type]/[slug] — update content item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  try {
    const { type, slug } = await params;
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const body = await request.json();

    const existing = await db.contentItem.findUnique({
      where: { type_slug: { type, slug } },
    });
    if (!existing) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // If slug is being changed, check uniqueness within type
    if (body.slug && body.slug !== slug) {
      const conflict = await db.contentItem.findUnique({
        where: { type_slug: { type, slug: body.slug } },
      });
      if (conflict) {
        return NextResponse.json(
          { error: "An item with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle || null;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.iconName !== undefined) updateData.iconName = body.iconName;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.published !== undefined) updateData.published = !!body.published;
    if (body.featured !== undefined) updateData.featured = !!body.featured;
    if (body.data !== undefined) {
      updateData.data = typeof body.data === "string" ? body.data : JSON.stringify(body.data);
    }

    const item = await db.contentItem.update({
      where: { type_slug: { type, slug } },
      data: updateData as Record<string, never>,
    });

    return NextResponse.json({
      item: {
        ...item,
        data: (() => {
          try {
            return JSON.parse(item.data || "{}");
          } catch {
            return {};
          }
        })(),
      },
    });
  } catch (error) {
    console.error("PUT /api/content/[type]/[slug] error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

// DELETE /api/content/[type]/[slug] — delete content item
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  try {
    const { type, slug } = await params;
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const existing = await db.contentItem.findUnique({
      where: { type_slug: { type, slug } },
    });
    if (!existing) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await db.contentItem.delete({ where: { type_slug: { type, slug } } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/content/[type]/[slug] error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

// PATCH /api/content/[type]/[slug] — partial update (used for quick toggles)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  // Reuse PUT logic — same behavior
  return PUT(request, { params });
}
