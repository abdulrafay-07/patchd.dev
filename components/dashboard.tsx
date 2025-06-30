"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      router.push("/dashboard/claim");
    };
  }, [isLoading, profile, router]);

  if (isLoading || !profile?.success) {
    return (
      <div>
        Loading...
      </div>
    )
  };

  return (
    <div>
      {profile?.message}
    </div>
  )
};
