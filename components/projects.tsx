"use client"

import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProject } from "@/features/profile/api/delete-project";
import { useProjectModal } from "@/features/profile/hooks/use-project-modal";

import { Hint } from "@/components/hint";
import { toast } from "sonner";
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
import { Edit, Trash2 } from "lucide-react";

import { changeTextCase } from "@/lib/helpers";
import { useConfirm } from "@/hooks/use-confirm";
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
  const [DeleteDialog, confirm] = useConfirm(
    "Delete Project",
    "This action cannot be undone"
  );

  const queryClient = useQueryClient();
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (!ok) return;

    deleteProject(id, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      },
      onError: (data) => {
        toast.error(data.message);
      },
    })
  };

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
    <>
      <DeleteDialog />
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
                disabled={isPending}
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
                <div className="flex items-center gap-x-2">
                  <Hint label="Edit project" sideOffset={8}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => open(project.id)}
                      disabled={isPending}
                    >
                      <Edit />
                    </Button>
                  </Hint>
                  <Hint label="Delete project" sideOffset={8}>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleDelete(project.id)}
                      disabled={isPending}
                    >
                      <Trash2 />
                    </Button>
                  </Hint>
                </div>
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
    </>
  )
};
