import { ContentEditPage } from "@/components/biztra/content-edit-page";

export default function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ContentEditPage
      type="service"
      basePath="/admin/services"
      singularLabel="Service"
      params={params}
    />
  );
}
