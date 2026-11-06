import { db } from "@/lib/db";
import type { LucideIcon } from "lucide-react";
import {
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

// Map string icon name to Lucide icon component
const ICON_MAP: Record<string, LucideIcon> = {
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
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Briefcase;
}

export type SiteSettings = {
  brandName: string;
  brandTagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroStat1Value: string;
  heroStat1Label: string;
  heroStat2Value: string;
  heroStat2Label: string;
  heroStat3Value: string;
  heroStat3Label: string;
  heroStat4Value: string;
  heroStat4Label: string;
  footerTagline: string;
  footerDescription: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactAddressDetail: string;
  contactHours: string;
  contactHoursDetail: string;
  contactResponseTime: string;
  mapsUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const s = await db.siteSetting.findUnique({ where: { id: "singleton" } });
    if (!s) return null;
    return s;
  } catch (error) {
    console.error("getSiteSettings error:", error);
    return null;
  }
}

export type AboutContentData = {
  storyEyebrow: string;
  storyHeading: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  storyParagraph4: string;
  storyQuote: string;
  visionEyebrow: string;
  visionText: string;
  visionContext: string;
  missionEyebrow: string;
  missionHeading: string;
  missionText: string;
  coreValuesEyebrow: string;
  coreValuesHeading: string;
  coreValuesSubtitle: string;
  whyChooseEyebrow: string;
  whyChooseHeading: string;
  whyChooseSubtitle: string;
};

export async function getAboutContent(): Promise<AboutContentData | null> {
  try {
    const a = await db.aboutContent.findUnique({ where: { id: "singleton" } });
    if (!a) return null;
    return a;
  } catch (error) {
    console.error("getAboutContent error:", error);
    return null;
  }
}

export type ContentItemData = {
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
  createdAt: string;
  updatedAt: string;
};

type ContentItemDB = {
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
  data: string;
  createdAt: Date;
  updatedAt: Date;
};

function mapContentItem(item: ContentItemDB): ContentItemData {
  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(item.data || "{}");
  } catch {
    data = {};
  }
  return {
    id: item.id,
    type: item.type,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    iconName: item.iconName,
    order: item.order,
    published: item.published,
    featured: item.featured,
    data,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

// Fetch all published content items of a given type, ordered
export async function getPublishedContent(
  type: string
): Promise<ContentItemData[]> {
  try {
    const items = await db.contentItem.findMany({
      where: { type, published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return items.map(mapContentItem);
  } catch (error) {
    console.error(`getPublishedContent(${type}) error:`, error);
    return [];
  }
}

// Fetch all content items of a given type (including drafts) — for admin
export async function getAllContent(type: string): Promise<ContentItemData[]> {
  try {
    const items = await db.contentItem.findMany({
      where: { type },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return items.map(mapContentItem);
  } catch (error) {
    console.error(`getAllContent(${type}) error:`, error);
    return [];
  }
}

// Fetch a single content item by type + slug
export async function getContentItem(
  type: string,
  slug: string,
  includeUnpublished = false
): Promise<ContentItemData | null> {
  try {
    const item = await db.contentItem.findUnique({
      where: { type_slug: { type, slug } },
    });
    if (!item) return null;
    if (!includeUnpublished && !item.published) return null;
    return mapContentItem(item);
  } catch (error) {
    console.error(`getContentItem(${type}, ${slug}) error:`, error);
    return null;
  }
}

// Typed convenience wrappers
export async function getServices() {
  return getPublishedContent("service");
}
export async function getIndustries() {
  return getPublishedContent("industry");
}
export async function getCoreValues() {
  return getPublishedContent("core_value");
}
export async function getWhyChoose() {
  return getPublishedContent("why_choose");
}
export async function getApproachSteps() {
  return getPublishedContent("approach_step");
}
export async function getTeamMembers() {
  return getPublishedContent("team_member");
}

// Articles (already in articles.ts but re-export for convenience)
export {
  getArticleBySlug,
  getPublishedArticles,
  getPublishedCategories,
} from "./articles";
