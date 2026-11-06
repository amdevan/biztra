import { ContentList } from "@/components/biztra/content-list";

export default function AdminCoreValuesPage() {
  return (
    <ContentList
      type="core_value"
      title="Core Values"
      subtitle="Manage the six principles behind the Biztra practice."
      singularLabel="Core Value"
      basePath="/admin/core-values"
      showFeatured={false}
      showDescription={true}
    />
  );
}
