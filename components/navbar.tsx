import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { navItems } from "@/constants";

export const Navbar = () => {
  return (
    <header className="flex h-15 gap-x-2 pr-2">
      <div className="w-full sm:w-20 md:w-16 bg-secondary border-primary/50 border-r-2 border-b-2 rounded-br-xl" />
      <Link href="/" className="min-w-[155px] max-w-[155px] h-[60px]">
        <Image
          src="/patchd-nobg.png"
          alt="Patchd logo"
          width={800}
          height={300}
          className="size-auto"
        />
      </Link>
      <div className="hidden md:flex-1 md:flex items-center justify-between bg-secondary border-primary/50 border-x-2 border-b-2 rounded-b-xl px-4">
        <nav className="flex items-center gap-x-2">
          {navItems.map((item) => (
            <Button
              asChild
              key={item.href}
              variant="ghost"
            >
              <Link
                href={item.href}
              >
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="hidden sm:flex md:hidden lg:flex sm:ml-auto md:ml-0 items-center">
        <Button
          asChild
          size="xl"
          className="text-md cursor-pointer"
        >
          <Link href="/auth">
            Claim your page
          </Link>
        </Button>
      </div>
    </header>
  )
};
