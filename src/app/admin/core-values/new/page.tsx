import { ContentEditor } from "@/components/biztra/content-editor";

export default function NewCoreValuePage() {
  return (
    <ContentEditor
      type="core_value"
      mode="create"
      basePath="/admin/core-values"
      singularLabel="Core Value"
    />
  );
}
