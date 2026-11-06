import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/about — fetch about content
export async function GET() {
  try {
    const about = await db.aboutContent.findUnique({ where: { id: "singleton" } });
    if (!about) {
      return NextResponse.json({ error: "About content not found" }, { status: 404 });
    }
    return NextResponse.json({ about });
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
  }
}

// PUT /api/about — update about content (admin)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const allowedFields = [
      "storyEyebrow",
      "storyHeading",
      "storyParagraph1",
      "storyParagraph2",
      "storyParagraph3",
      "storyParagraph4",
      "storyQuote",
      "visionEyebrow",
      "visionText",
      "visionContext",
      "missionEyebrow",
      "missionHeading",
      "missionText",
      "coreValuesEyebrow",
      "coreValuesHeading",
      "coreValuesSubtitle",
      "whyChooseEyebrow",
      "whyChooseHeading",
      "whyChooseSubtitle",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const about = await db.aboutContent.upsert({
      where: { id: "singleton" },
      update: updateData as Record<string, never>,
      create: {
        id: "singleton",
        ...updateData,
      } as Record<string, never>,
    });

    return NextResponse.json({ about });
  } catch (error) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}
