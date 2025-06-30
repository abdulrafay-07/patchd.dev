"use client"

import { useState } from "react";

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
    window.navigator.clipboard.writeText(`patchd.dev/${handle}`);

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
          defaultValue={`patchd.dev/${handle}`}
          placeholder="rafay"
          disabled
          className="disabled:opacity-80 rounded-sm disabled:text-base"
        />
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
      </CardContent>
    </Card>
  )
};
