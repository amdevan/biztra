import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Allowed content types
const VALID_TYPES = [
  "service",
  "industry",
  "core_value",
  "why_choose",
  "approach_step",
  "team_member",
];

// GET /api/content/[type] — list all items of a type
// Query params:
//   - admin=true → include unpublished items
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const admin = new URL(request.url).searchParams.get("admin") === "true";

    const items = await db.contentItem.findMany({
      where: {
        type,
        ...(admin ? {} : { published: true }),
      },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    // Parse data JSON for each item
    const parsed = items.map((item) => ({
      ...item,
      data: (() => {
        try {
          return JSON.parse(item.data || "{}");
        } catch {
          return {};
        }
      })(),
    }));

    return NextResponse.json({ items: parsed });
  } catch (error) {
    console.error("GET /api/content/[type] error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST /api/content/[type] — create a new content item
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug" },
        { status: 400 }
      );
    }

    // Check slug uniqueness within type
    const existing = await db.contentItem.findUnique({
      where: { type_slug: { type, slug: body.slug } },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An item with this slug already exists in this type" },
        { status: 409 }
      );
    }

    // Determine next order if not provided
    let order = body.order;
    if (order === undefined) {
      const count = await db.contentItem.count({ where: { type } });
      order = count;
    }

    const item = await db.contentItem.create({
      data: {
        type,
        slug: body.slug,
        title: body.title,
        subtitle: body.subtitle || null,
        description: body.description || null,
        iconName: body.iconName || "Briefcase",
        order,
        published: body.published !== false,
        featured: !!body.featured,
        data: JSON.stringify(body.data || {}),
      },
    });

    return NextResponse.json({
      item: {
        ...item,
        data: JSON.parse(item.data || "{}"),
      },
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/content/[type] error:", error);
    return NextResponse.json({ error: "Failed to create content item" }, { status: 500 });
  }
}
