import { ContentList } from "@/components/biztra/content-list";

export default function AdminTeamPage() {
  return (
    <ContentList
      type="team_member"
      title="Team Members"
      subtitle="Manage leadership profiles shown on the Our Team page."
      singularLabel="Team Member"
      basePath="/admin/team"
      showFeatured={true}
      showDescription={true}
    />
  );
}
