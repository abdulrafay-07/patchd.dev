"use client"

import Link from "next/link";

import { useGetProfileByHandle } from "@/features/profile/api/get-profile-by-handle";

import { Hint } from "@/components/hint";
import { Loading } from "@/components/loading";
import { ProjectCard } from "@/components/project-card";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DollarSign, MapPin } from "lucide-react";

import { changeTextCase, makeUrl } from "@/lib/helpers";
import { socialMap, socials as socialConst } from "@/constants";

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
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-4 flex flex-col gap-6 lg:flex-row lg:gap-12">
      <div className="flex flex-col w-full lg:max-w-[480px]">
        <div className="flex gap-x-4 mb-4">
          <Avatar className="size-20 border-2 border-primary/20">
            <AvatarImage src={user?.image!} alt="User Avatar" />
            <AvatarFallback>
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-extrabold">
              {user?.name}
            </h1>
            <div className="flex items-center gap-x-2 mb-2">
              <span className="text-sm font-bold text-primary">@{profile?.handle}</span>
              {profile?.tag && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r to-amber-100 hover:from-amber-100 hover:to-transparent text-primary border">
                  {profile?.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {profile?.tagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          {profile?.location && (
            <div className="flex items-center gap-x-1">
              <MapPin className="size-4" />
              {profile?.location}
            </div>
          )}
          {profile?.location && profile.revenue && (
            <Separator orientation="vertical" />
          )}
          {profile?.revenue && (
            <div className="flex items-center">
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

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">
            Projects
          </h3>
          <span>
            {projects?.length} projects
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  )
};
