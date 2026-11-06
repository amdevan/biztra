import { ContentList } from "@/components/biztra/content-list";

export default function AdminWhyChoosePage() {
  return (
    <ContentList
      type="why_choose"
      title="Why Choose Us"
      subtitle="Manage the six differentiators shown on the About page."
      singularLabel="Why Choose Item"
      basePath="/admin/why-choose"
      showFeatured={false}
      showDescription={true}
    />
  );
}
