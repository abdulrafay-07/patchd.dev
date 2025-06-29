import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { navItems } from "@/constants";

export const Navbar = () => {
  return (
    <header className="flex h-15 gap-x-1">
      <div className="w-16 bg-secondary border-primary/50 border-r-2 border-b-2 rounded-br-xl" />
      <Image
        src="/patchd-nobg.png"
        alt="Patchd logo"
        width={800}
        height={300}
        className="size-auto"
      />
      <div className="flex-1 flex items-center justify-between bg-secondary border-primary/50 border-l-2 border-b-2 rounded-bl-xl px-4">
        <nav className="flex items-center gap-x-2">
          {navItems.map((item) => (
            <Button
              asChild
              key={item.href}
              size="sm"
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
        <Button size="lg">
          Claim your page
        </Button>
      </div>
    </header>
  )
};
