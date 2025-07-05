import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Step2 = () => {
  return (
    <div className="h-full flex items-center justify-center p-2 gap-x-2 shadow-sm rounded-lg bg-background">
      <div className="flex h-7 items-center">
        <span className="mr-1">
          patchd.dev/
        </span>
        <Input
          placeholder="rafay"
          min={3}
          max={24}
          className="border-none rounded-xs focus-visible:ring-0 md:focus-visible:border-background"
        />
      </div>
      <Button className="cursor-pointer px-6">
        Claim
      </Button>
    </div>
  )
};
