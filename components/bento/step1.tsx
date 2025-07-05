import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export const Step1 = () => {
  return (
    <div className="h-full flex flex-col gap-3 py-2 items-center justify-center bg-background shadow-sm rounded-lg">
      <Button
        variant="secondary"
        className="cursor-pointer"
      >
        <FaGoogle />
        Login with Google
      </Button>
      <Button
        variant="secondary"
        className="cursor-pointer"
      >
        <FaGithub />
        Login with Github
      </Button>
    </div>
  )
};
