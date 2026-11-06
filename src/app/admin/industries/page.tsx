import { ContentList } from "@/components/biztra/content-list";

export default function AdminIndustriesPage() {
  return (
    <ContentList
      type="industry"
      title="Industries"
      subtitle="Manage the industry sectors served by Biztra."
      singularLabel="Industry"
      basePath="/admin/industries"
      showFeatured={false}
      showDescription={true}
    />
  );
}
