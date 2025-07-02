import { ProfileHandle } from "@/components/profile-handle";

export default async function Handle({
  params,
}: {
  params: Promise<{handle: string}>,
}) {
  const { handle } = await params;

  return <ProfileHandle handle={handle} />;
};
