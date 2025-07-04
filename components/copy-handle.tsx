"use client"

import { useState } from "react";

import { Hint } from "@/components/hint";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CopyHandleProps {
  handle: string;
};

export const CopyHandle = ({
  handle,
}: CopyHandleProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    window.navigator.clipboard.writeText(`patchd.vercel.app/${handle}`);
    toast.success("Copied to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Handle
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-x-2">
        <Input
          defaultValue={`patchd.vercel.app/${handle}`}
          placeholder="rafay"
          disabled
          className="rounded-sm disabled:text-base"
        />
        <Hint label="Copy to clipboard" sideOffset={4}>
          <Button
            onClick={onCopy}
            variant="secondary"
            className="cursor-pointer w-20 md:w-24 duration-300 transition-all ease-in"
          >
            {!isCopied ? (
              <>
                <Copy />
                Copy
              </>
            ) : (
              <>
                <Check />
                Copied
              </>
            )}
          </Button>
        </Hint>
      </CardContent>
    </Card>
  )
};
