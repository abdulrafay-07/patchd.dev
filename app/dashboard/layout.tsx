interface AuthLayoutProps {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main>
      {children}
    </main>
  )
};