import { AlertTriangle, CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface AlertMessageProps {
  success: boolean;
  message: string;
};

export const AlertMessage = ({
  success,
  message,
}: AlertMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 px-3 py-2 rounded-sm",
        success ? "bg-green-700/10" : "bg-destructive/10"
      )}
    >
      {success ? (
        <CheckCircle className="shrink-0 size-4 text-green-700" />
      ) : (
        <AlertTriangle className="shrink-0 size-4 text-destructive" />
      )}
      <span
        className={cn(
          "text-sm truncate",
          success ? "text-green-700" : "text-destructive",
        )}
      >
        {message}
      </span>
    </div>
  )
};
