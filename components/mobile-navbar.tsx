import Link from "next/link";

import { navItems } from "@/constants";

export const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 z-50 bg-secondary h-15 px-2">
      <nav className="flex items-center justify-evenly h-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs font-semibold flex flex-col items-center"
          >
            <item.icon className="size-5 text-primary" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
};
