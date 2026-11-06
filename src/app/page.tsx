import { SiteShell } from "@/components/biztra/site-shell";
import {
  HomeHero,
  WhoWeAreTeaser,
  ServicesTeaser,
  IndustriesTeaser,
  ApproachTeaser,
  LeadershipTeaser,
  InsightsTeaser,
  FinalCTA,
} from "@/components/biztra/home-sections";
import {
  getSiteSettings,
  getAboutContent,
  getServices,
  getIndustries,
  getApproachSteps,
  getTeamMembers,
  getPublishedArticles,
  type ContentItemData,
} from "@/lib/content";

export const dynamic = "force-dynamic";

// Adapter: convert DB content item → shape expected by home-sections.tsx
// Pass iconName as string — the client component looks it up.
function adaptService(s: ContentItemData) {
  return {
    slug: s.slug,
    name: s.title,
    shortDescription: (s.data.shortDescription as string) || s.description || "",
    iconName: s.iconName,
  };
}

function adaptIndustry(i: ContentItemData) {
  return {
    slug: i.slug,
    name: i.title,
    shortDescription: (i.data.shortDescription as string) || i.description || "",
    iconName: i.iconName,
  };
}

function adaptApproachStep(s: ContentItemData) {
  return {
    number: (s.data.number as string) || "",
    title: s.title,
    description: s.description || "",
    iconName: s.iconName,
  };
}

function adaptTeamMember(m: ContentItemData) {
  return {
    slug: m.slug,
    name: m.title,
    role: m.subtitle || (m.data.role as string) || "",
    designation: (m.data.designation as string) || "",
    initials: (m.data.initials as string) || "",
    bio: m.description || "",
    highlights: Array.isArray(m.data.highlights)
      ? (m.data.highlights as { label: string; value: string }[])
      : [],
    expertise: Array.isArray(m.data.expertise) ? (m.data.expertise as string[]) : [],
    featured: m.featured,
  };
}

function adaptArticle(a: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string | null;
}) {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    readTime: a.readTime,
    date: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "",
  };
}

export default async function Home() {
  const [
    settings,
    about,
    services,
    industries,
    approachSteps,
    teamMembers,
    articles,
  ] = await Promise.all([
    getSiteSettings(),
    getAboutContent(),
    getServices(),
    getIndustries(),
    getApproachSteps(),
    getTeamMembers(),
    getPublishedArticles(),
  ]);

  const teaserArticles = articles.slice(0, 3).map(adaptArticle);
  const featuredMember = teamMembers.find((m) => m.featured) || teamMembers[0];

  return (
    <SiteShell settings={settings || undefined}>
      <HomeHero settings={settings || undefined} />
      <WhoWeAreTeaser about={about || undefined} />
      <ServicesTeaser services={services.map(adaptService)} />
      <IndustriesTeaser industries={industries.map(adaptIndustry)} />
      <ApproachTeaser steps={approachSteps.map(adaptApproachStep)} />
      <LeadershipTeaser member={featuredMember ? adaptTeamMember(featuredMember) : null} />
      <InsightsTeaser articles={teaserArticles} />
      <FinalCTA settings={settings || undefined} />
    </SiteShell>
  );
}
