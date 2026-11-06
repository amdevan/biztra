import { ContentEditPage } from "@/components/biztra/content-edit-page";

export default function EditIndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ContentEditPage
      type="industry"
      basePath="/admin/industries"
      singularLabel="Industry"
      params={params}
    />
  );
}
