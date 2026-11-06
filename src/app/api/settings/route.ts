import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/settings — fetch site settings
export async function GET() {
  try {
    const settings = await db.siteSetting.findUnique({ where: { id: "singleton" } });
    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT /api/settings — update site settings (admin)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Allowed fields for update
    const allowedFields = [
      "brandName",
      "brandTagline",
      "heroEyebrow",
      "heroHeadline",
      "heroSubtitle",
      "heroPrimaryCta",
      "heroSecondaryCta",
      "heroStat1Value",
      "heroStat1Label",
      "heroStat2Value",
      "heroStat2Label",
      "heroStat3Value",
      "heroStat3Label",
      "heroStat4Value",
      "heroStat4Label",
      "footerTagline",
      "footerDescription",
      "contactPhone",
      "contactEmail",
      "contactAddress",
      "contactAddressDetail",
      "contactHours",
      "contactHoursDetail",
      "contactResponseTime",
      "mapsUrl",
      "linkedinUrl",
      "facebookUrl",
      "instagramUrl",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const settings = await db.siteSetting.upsert({
      where: { id: "singleton" },
      update: updateData as Record<string, never>,
      create: {
        id: "singleton",
        ...updateData,
        storyParagraph1: "",
        storyParagraph2: "",
        storyParagraph3: "",
        storyParagraph4: "",
      } as Record<string, never>,
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
