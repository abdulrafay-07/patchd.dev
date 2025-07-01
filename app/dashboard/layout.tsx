import { Modal } from "@/components/modal";

interface AuthLayoutProps {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="h-full">
      <Modal />
      {children}
    </main>
  )
};