import { ContentList } from "@/components/biztra/content-list";

export default function AdminServicesPage() {
  return (
    <ContentList
      type="service"
      title="Services"
      subtitle="Manage the advisory services offered by Biztra."
      singularLabel="Service"
      basePath="/admin/services"
      showFeatured={false}
      showDescription={true}
    />
  );
}
