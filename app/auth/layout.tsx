import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="h-full flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link href="/" className="flex items-center justify-center mx-auto w-[150px]">
          <Image
            src="/patchd-nobg.png"
            alt="Patchd logo"
            width={250}
            height={100}
            className="size-auto"
          />
        </Link>
        {children}
      </div>
    </main>
  )
};