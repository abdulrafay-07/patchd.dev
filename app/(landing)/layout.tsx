import { Navbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/mobile-navbar";

interface LandingLayoutProps {
  children: React.ReactNode;
};

export default function LandingLayout({
  children,
}: LandingLayoutProps) {
  return (
    <main>
      <Navbar />
      <div className="relative md:hidden">
        <MobileNavbar />
      </div>
      {children}
    </main>
  );
}
