import { ContentEditor } from "@/components/biztra/content-editor";

export default function NewApproachStepPage() {
  return (
    <ContentEditor
      type="approach_step"
      mode="create"
      basePath="/admin/approach-steps"
      singularLabel="Approach Step"
    />
  );
}
