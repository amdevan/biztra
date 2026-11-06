import { ContentEditPage } from "@/components/biztra/content-edit-page";

export default function EditApproachStepPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ContentEditPage
      type="approach_step"
      basePath="/admin/approach-steps"
      singularLabel="Approach Step"
      params={params}
    />
  );
}
