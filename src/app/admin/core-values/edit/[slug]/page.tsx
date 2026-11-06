import { ContentEditPage } from "@/components/biztra/content-edit-page";

export default function EditCoreValuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ContentEditPage
      type="core_value"
      basePath="/admin/core-values"
      singularLabel="Core Value"
      params={params}
    />
  );
}
