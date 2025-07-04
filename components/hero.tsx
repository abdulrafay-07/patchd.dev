import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-12 md:py-24 flex flex-col items-center relative min-h-[80vh] overflow-hidden">
      <Badge variant="outline" className="z-10 sm:px-4 sm:py-2">
        💻
        <span className="ml-1 font-medium text-base bg-gradient-to-r from-primary to-amber-800 bg-clip-text text-transparent hover:from-amber-800 hover:to-primary duration-100 transition ease-in">
          The developer portfolio that doesn&apos;t suck
        </span>
      </Badge>
      <h1 className="flex z-10 mt-8 text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-pretty leading-tight max-w-5xl">
        Showcase your developer journey. Not just your resume.
      </h1>
      <p className="z-10 mt-5 text-lg md:text-xl text-pretty max-w-3xl mx-auto text-center font-medium  text-muted-foreground">
        Build a public dev profile that actually shows what you&apos;ve built — projects, stack, learnings, and contributions. For devs, communities, and recruiters.
      </p>
      <div className="hidden z-10 sm:flex items-center gap-x-2 mt-8">
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
      <div className="flex sm:hidden z-10 items-center gap-x-2 mt-8">
        <Button
          asChild
          size="lg"
        >
          <Link href="/auth">
            Start Building <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
        >
          <Link href="/#example">
            See the Magic
          </Link>
        </Button>
      </div>
      {/* TODO: add social proof (stats eg no. of projects, no. of developers) */}

      <Image
        src="/hero.png"
        alt="Hero background"
        width={2200}
        height={1000}
        className="absolute top-72 lg:top-52 xl:left-40 z-[1] size-auto opacity-15 rounded-2xl"
      />
    </section>
  )
};
