"use client"

import { authClient } from "@/lib/auth-client";

import { Dashboard } from "@/components/dashboard";

export default function DashboardPage() {
  const { data, isPending } = authClient.useSession();
  const userId = data?.user.id!;

  if (isPending) {
    return (
      <div>
        Loading...
      </div>
    )
  };

  return (
    <Dashboard userId={userId} />
  )
};
