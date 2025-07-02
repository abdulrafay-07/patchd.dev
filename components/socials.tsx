"use client"

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useCreateSocial } from "@/features/profile/api/create-user-social";

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
import { IconType } from "react-icons/lib";
import { Check } from "lucide-react";

import { urlSchema } from "@/schema";
import { socials } from "@/constants";
import { UserProfileWithRelations } from "@/types";
import { SocialPlatform } from "@/lib/generated/prisma";

interface SocialsProps {
  userId: string;
  profile: UserProfileWithRelations
};

type SocialType = {
  value: SocialPlatform;
  name: string;
  icon: IconType;
  placeholder: string;
};

export const Socials = ({
  userId,
  profile,
}: SocialsProps) => {
  const [url, setUrl] = useState("");
  const [socialData, setSocialData] = useState<SocialType>();

  const { mutate, isPending } = useCreateSocial();
  const queryClient = useQueryClient();

  const handleSocial = (social: SocialType) => {
    setUrl(profile.socialLinks.find(p => p.platform === social.value)?.url || "");

    if (socialData === social) {
      setSocialData(undefined);
      return;
    };
    
    setSocialData(social);
  };

  const handleSubmit = () => {
    const values = {
      platform: socialData?.value as string,
      url,
    };

    const validatedData = urlSchema.safeParse(values);
    if (!validatedData.success) {
      toast.error("Invalid values")
      console.log(validatedData.error.format())
      return
    };

    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["profile", userId] });
        setUrl("");
        setSocialData(undefined);
      },
      onError: (data) => {
        toast.error(data.message);
      }
    });
  };

  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Socials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-x-4 w-full">
          {socials.map((social) => (
            <Hint
              key={social.name}
              label={social.name}
              sideOffset={8}
            >
              <Button
                size="icon"
                variant={social.value === socialData?.value ? "secondary" : "outline"}
                onClick={() => handleSocial(social)}
                className="flex flex-col items-center cursor-pointer relative"
                disabled={isPending}
              >
                {profile.socialLinks.find(p => p.platform === social.value) && (
                  <Check className="size-5 absolute -top-3 -right-3 bg-primary/30 text-primary p-0.5 rounded-sm shrink-0" />
                )}
                <social.icon />
              </Button>
            </Hint>
          ))}
        </div>
        {socialData && (
          <div className="flex items-center gap-x-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
              placeholder={socialData.placeholder}
              disabled={isPending}
            />
            <Button
              className="w-20 md:w-24 cursor-pointer"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {profile.socialLinks.find((p) => p.platform === socialData?.value) ? "Update" : "Add"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
};
