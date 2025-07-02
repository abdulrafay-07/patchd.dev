"use client"

import Link from "next/link";

import { useGetProfileByHandle } from "@/features/profile/api/get-profile-by-handle";

import { Hint } from "@/components/hint";
import { Loading } from "@/components/loading";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DollarSign, MapPin } from "lucide-react";

import { socialMap, socials as socialConst } from "@/constants";
import { changeTextCase, makeUrl } from "@/lib/helpers";

interface ProfileHandleProps {
  handle: string;
};

export const ProfileHandle = ({
  handle,
}: ProfileHandleProps) => {
  const { data, isLoading } = useGetProfileByHandle({ handle });

  const user = data?.fullProfile?.user;
  const profile = data?.fullProfile;
  const socials = data?.fullProfile?.socialLinks;
  const projects = data?.fullProfile?.projects;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    toast.success("Mail copied to clipboard")
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col w-fit max-w-[500px]">
        <div className="flex gap-x-4 mb-4">
          <Avatar className="size-20 border-2 border-primary">
            <AvatarImage src={user?.image!} alt="User Avatar" />
            <AvatarFallback>
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {user?.name}
            </h1>
            <div className="flex items-center gap-x-2 mb-2">
              <span className="text-sm font-semibold">@{profile?.handle}</span>
              {profile?.tag && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-100 to-amber-100 text-primary border border-primary-200">
                  {profile?.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {profile?.tagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 justify-between">
          {profile?.location && (
            <div className="flex items-center gap-x-1">
              <MapPin className="size-4" />
              {profile?.location}
            </div>
          )}
          {profile?.revenue && (
            <div className="flex items-center gap-x-1">
              <DollarSign className="size-4" />
              {profile?.revenue}
            </div>
          )}
        </div>
        <Separator className="my-6" />
        {socials && (
          <div className="flex items-center gap-x-4">
            {socials.map((social) => {
              const Icon = socialMap[social.platform];
              const url = makeUrl(social.url);

              if (social.platform !== "EMAIL") {
                return (
                  <Hint
                    key={social.id}
                    label={socialConst.find(s => s.value === social.platform)?.name!}
                    sideOffset={4}
                  >
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                    >
                      <Link href={`${url}?ref=patchd`} target="_blank">
                        <Icon />
                      </Link>
                    </Button>
                  </Hint>
                );
              }

              if (social.platform === "EMAIL") {
                return (
                  <Hint
                    key={social.id}
                    label={changeTextCase(social.platform)}
                    sideOffset={4}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopy(social.url)}
                      className="cursor-pointer"
                    >
                      <Icon />
                    </Button>
                  </Hint>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    </div>
  )
};
