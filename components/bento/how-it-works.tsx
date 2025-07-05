import { Step1 } from "@/components/bento/step1";
import { Step2 } from "@/components/bento/step2";
import { Step3 } from "@/components/bento/step3";
import { Step4 } from "@/components/bento/step4";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Grip, LogIn, Share, Star } from "lucide-react";

const items = [
  {
    title: "/01",
    description: (
      <span>
        Sign in to create an account with google or github.
      </span>
    ),
    header: <Step1 />,
    className: "md:col-span-1",
    icon: <LogIn className="size-4" />,
  },
  {
    title: "/02",
    description: (
      <span>
        Pick your handle and get a custom url.
      </span>
    ),
    header: <Step2 />,
    className: "md:col-span-2",
    icon: <Grip className="size-4" />,
  },
  {
    title: "/03",
    description: (
      <span>
        Fill in your details like bio, socials, and projects.
      </span>
    ),
    header: <Step3 />,
    className: "md:col-span-2",
    icon: <Star className="size-4" />,
  },
  {
    title: "/04",
    description: (
      <span>
        Share your profile with others.
      </span>
    ),
    header: <Step4 />,
    className: "md:col-span-1",
    icon: <Share className="size-4" />,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 flex flex-col items-center w-full">
      <h3 className="text-lg text-muted-foreground font-semibold mb-2">How it works</h3>
      <h2 className="text-2xl mb-8">
        All of the steps take maximum of 5 minutes.
      </h2>
      <BentoGrid className="w-full md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  )
};
