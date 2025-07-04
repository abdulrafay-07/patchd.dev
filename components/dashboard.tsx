"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/loading";
import { Socials } from "@/components/socials";
import { Projects } from "@/components/projects";
import { MiscForm } from "@/components/misc-form";
import { CopyHandle } from "@/components/copy-handle";

import { useGetUserProfile } from "@/features/profile/api/get-user-profile";

interface DashboardProps {
  userId: string;
};

export const Dashboard = ({
  userId,
}: DashboardProps) => {
  const { data: profile, isLoading } = useGetUserProfile({ userId });

  const router = useRouter();

  // Redirect to claim page if no existing profile found
  useEffect(() => {
    if (!isLoading && !profile?.success) {
      router.push(`/dashboard/claim?userId=${userId}`);
    };
  }, [isLoading, profile, router, userId]);

  if (isLoading || !profile?.success) return <Loading />

  if (!profile || !profile.data) {
    return (
      <div>
        Something went wrong...
      </div>
    )
  };

  return (
    <div className="flex flex-col gap-6 items-center py-12 px-4 max-w-xl mx-auto">
      <CopyHandle handle={profile.data.handle} />
      <MiscForm userId={userId} profile={profile.data} />
      <Socials userId={userId} profile={profile.data} />
      <Projects userId={userId} profile={profile.data} />
    </div>
  )
};
