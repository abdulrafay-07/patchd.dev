"use client"

import { useProjectModal } from "@/features/profile/hooks/use-project-modal";

import { Hint } from "@/components/hint";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import { Edit } from "lucide-react";

import { changeTextCase } from "@/lib/helpers";
import { UserProfileWithRelations } from "@/types";

interface ProjectsProps {
  userId: string;
  profile: UserProfileWithRelations;
};

export const Projects = ({
  userId,
  profile,
}: ProjectsProps) => {
  const { open } = useProjectModal();

  if (profile.projects.length === 0) {
    return (
      <Card className="w-full gap-2">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">
            No projects found.
          </CardTitle>
          <CardDescription>
            You don&apos;t have any projects.{" "}
            <span
              onClick={() => open()}
              className="hover:underline text-primary cursor-pointer"
            >
              Add a project
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    )
  };

  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-bold">
          Projects
          <Hint label="Create project" sideOffset={4}>
            <Button
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => open()}
            >
              <RiAddCircleFill className="size-5" />
            </Button>
          </Hint>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {profile.projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col p-4 rounded-md border bg-background"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <h3 className="text-xl font-bold">{project.name}</h3>
                {project.category && (
                  <Hint label="Category" sideOffset={8}>
                    <Badge variant="secondary" className="shrink-0">
                      {changeTextCase(project.category)}
                    </Badge>
                  </Hint>
                )}
                {project.status && (
                  <Hint label="Status" sideOffset={8}>
                    <Badge variant="secondary" className="shrink-0">
                      {changeTextCase(project.status)}
                    </Badge>
                  </Hint>
                )}
              </div>
              <Hint label="Edit Project" sideOffset={8}>
                <Button
                  size="icon"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => open(project.id)}
                >
                  <Edit />
                </Button>
              </Hint>
            </div>
            {project.description && (
              <p className=" line-clamp-2 text-muted-foreground mt-1">
              {project.description}
              </p>
            )}
            {project.revenue && (
              <span className="text-sm mt-3">
                {!project.revenue.includes("$") && "$"} {project.revenue}
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
};
