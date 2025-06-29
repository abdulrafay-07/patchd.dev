import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { navItems } from "@/constants";

export const Navbar = () => {
  return (
    <header className="flex h-15 gap-x-2 pr-2">
      <div className="w-16 bg-secondary border-primary/50 border-r-2 border-b-2 rounded-br-xl" />
      <Link href="/" className="min-w-[155px] max-w-[155px] h-[60px]">
        <Image
          src="/patchd-nobg.png"
          alt="Patchd logo"
          width={800}
          height={300}
          className="size-auto"
        />
      </Link>
      <div className="flex-1 flex items-center justify-between bg-secondary border-primary/50 border-x-2 border-b-2 rounded-b-xl px-4">
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
      <div className="flex items-center">
        <Button size="lg" className="text-md cursor-pointer">
          Claim your page
        </Button>
      </div>
    </header>
  )
};
