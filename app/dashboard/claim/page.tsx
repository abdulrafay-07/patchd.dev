"use client"

import { useCallback, useState } from "react";

import { useQueryState } from "nuqs";

import { checkUserHandle } from "@/features/profile/api/check-user-handle";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { debounce } from "@/lib/debounce";
import { AlertMessage } from "@/components/alert-message";

export default function ClaimPage() {
  const [response, setResponse] = useState<{
    success: boolean,
    message: string,
  } | null>(null);
  const [handle, setHandle] = useQueryState("handle");

  const debouncedSearch = useCallback(
    debounce(async (q: string) => {
      const data = await checkUserHandle(q);
      setResponse(data);
    }, 1500),
    []
  );

  const handleDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setHandle(null);
      setResponse(null);
      return;
    };

    setHandle(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="max-w-sm w-full gap-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Claim your page
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex h-7 items-center">
            <span className="mr-1">
              patchd.dev/
            </span>
            <Input
              value={handle || ""}
              onChange={(e) => handleDebounce(e)}
              placeholder="rafay"
              min={3}
              max={24}
              className="border-none border-primary rounded-xs focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          {response && (
            <AlertMessage
              success={response.success}
              message={response.message}
            />
          )}
          <Button
            disabled={!response?.success}
            className="cursor-pointer"
          >
            Claim
          </Button>
        </CardContent>
      </Card>
    </div>
  )
};
