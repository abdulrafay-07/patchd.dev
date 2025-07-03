import Link from "next/link";
import Image from "next/image";

import { Hint } from "@/components/hint";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { changeTextCase } from "@/lib/helpers";
import { Project } from "@/lib/generated/prisma";
import { DollarSign } from "lucide-react";

interface ProjectCardProps {
  project: Project;
};

export const ProjectCard = ({
  project,
}: ProjectCardProps) => {
  return (
    <Hint label="Visit link" side="right" sideOffset={12}>
      <Link
        href={`${project.url}?ref=patchd`}
        target="_blank"
        className="bg-card/50 rounded-sm shadow-sm hover:scale-[102%] duration-200 transition-all"
      >
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.name} Image`}
            width={1920}
            height={1080}
            className="aspect-video object-cover w-full rounded-sm"
          />
        )}
        <div className="flex flex-col px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold">
              {project.name}
            </h1>
            <div className="flex items-center gap-x-2">
              {project.category && (
                <Badge variant="secondary">
                  {changeTextCase(project.category)}
                </Badge>
              )}
              {project.status && (
                <Badge variant="secondary">
                  {changeTextCase(project.status)}
                </Badge>
              )}
            </div>
          </div>
          {project.description && (
            <p className="">
              {project.description}
            </p>
          )}
          <Separator className="my-3" />
          {project.revenue && (
            <span className="flex items-center">
              <DollarSign className="size-4" />
              {project.revenue}
            </span>
          )}
        </div>
      </Link>
    </Hint>
  )
};
