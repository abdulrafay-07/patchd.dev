"use client"

import { authClient } from "@/lib/auth-client";

import { Loading } from "@/components/loading";
import { Dashboard } from "@/components/dashboard";

export default function DashboardPage() {
  const { data, isPending } = authClient.useSession();
  const userId = data?.user.id!;

  if (isPending) return <Loading />

  return (
    <Dashboard userId={userId} />
  )
};
