interface AuthLayoutProps {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="h-full flex items-center justify-center">
      {children}
    </main>
  )
};