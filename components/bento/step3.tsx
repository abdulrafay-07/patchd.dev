import { Button } from "@/components/ui/button";

import { CardSim } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";

export const Step3 = () => {
  return (
    <div className="h-full flex items-center justify-center gap-x-2 p-2 shadow-sm rounded-lg bg-background">
      <Button
        variant="outline"
        className="w-24"
      >
        <RiProfileFill className="size-4" />
        Bio
      </Button>
      <Button
        variant="secondary"
        className="w-24"
      >
        <FaGithub className="size-4" />
        Socials
      </Button>
      <Button
        className="w-24"
      >
        <CardSim className="size-4" />
        Projects
      </Button>
    </div>
  )
};
