import { ContentEditor } from "@/components/biztra/content-editor";

export default function NewTeamMemberPage() {
  return (
    <ContentEditor
      type="team_member"
      mode="create"
      basePath="/admin/team"
      singularLabel="Team Member"
    />
  );
}
