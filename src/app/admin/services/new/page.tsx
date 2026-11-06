import { ContentEditor } from "@/components/biztra/content-editor";

export default function NewServicePage() {
  return (
    <ContentEditor
      type="service"
      mode="create"
      basePath="/admin/services"
      singularLabel="Service"
    />
  );
}
