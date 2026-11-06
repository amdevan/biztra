import { ContentEditor } from "@/components/biztra/content-editor";

export default function NewIndustryPage() {
  return (
    <ContentEditor
      type="industry"
      mode="create"
      basePath="/admin/industries"
      singularLabel="Industry"
    />
  );
}
