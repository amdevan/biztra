import { ContentEditPage } from "@/components/biztra/content-edit-page";

export default function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ContentEditPage
      type="team_member"
      basePath="/admin/team"
      singularLabel="Team Member"
      params={params}
    />
  );
}
