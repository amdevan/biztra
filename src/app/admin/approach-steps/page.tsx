import { ContentList } from "@/components/biztra/content-list";

export default function AdminApproachStepsPage() {
  return (
    <ContentList
      type="approach_step"
      title="Approach Steps"
      subtitle="Manage the four-step engagement methodology."
      singularLabel="Approach Step"
      basePath="/admin/approach-steps"
      showFeatured={false}
      showDescription={true}
    />
  );
}
