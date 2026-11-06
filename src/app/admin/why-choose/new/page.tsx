import { ContentEditor } from "@/components/biztra/content-editor";

export default function NewWhyChoosePage() {
  return (
    <ContentEditor
      type="why_choose"
      mode="create"
      basePath="/admin/why-choose"
      singularLabel="Why Choose Item"
    />
  );
}
