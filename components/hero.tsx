import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-12 flex flex-col items-center relative">
      <Badge variant="outline" className="z-10">
        💻
        <span className="ml-1 font-medium text-base bg-gradient-to-r from-primary to-amber-800 bg-clip-text text-transparent hover:from-amber-800 hover:to-primary duration-100 transition ease-in">
          The developer portfolio that doesn't suck
        </span>
      </Badge>
      <h1 className="z-10 mt-8 text-6xl font-bold text-center leading-tight">
        Showcase your developer journey. <br/> Not just your resume.
      </h1>
      <p className="z-10 mt-5 text-xl text-pretty max-w-3xl mx-auto text-center font-medium  text-muted-foreground">
        Build a public dev profile that actually shows what you’ve built — projects, stack, learnings, and contributions. For devs, communities, and recruiters.
      </p>
      <div className="z-10 flex items-center gap-x-2 mt-8">
        <Button
          asChild
          size="xl"
        >
          <Link href="/auth">
            Start Building <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="xl"
          variant="outline"
        >
          <Link href="/#example">
            See the Magic
          </Link>
        </Button>
      </div>

      <Image
        src="/hero.png"
        alt="Hero background"
        width={2200}
        height={1000}
        className="absolute top-1/2 left-20 z-[1] size-auto opacity-15 rounded-2xl"
      />
    </section>
  )
};
