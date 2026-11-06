import { ContentEditPage } from "@/components/biztra/content-edit-page";

export default function EditWhyChoosePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ContentEditPage
      type="why_choose"
      basePath="/admin/why-choose"
      singularLabel="Why Choose Item"
      params={params}
    />
  );
}
