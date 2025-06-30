import { ChevronRight } from "lucide-react";

export const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <ChevronRight className="size-12 animate-pulse text-primary bg-primary/10 rounded-xl" />
    </div>
  )
};
