import { Suspense } from "react";

import { Modal } from "@/components/modal";

interface AuthLayoutProps {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: AuthLayoutProps) {
  return (
    <Suspense>
      <main className="h-full">
        <Modal />
        {children}
      </main>
    </Suspense>
  )
};