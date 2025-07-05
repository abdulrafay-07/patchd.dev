import { z } from "zod";

import { ProjectCategory, ProjectStatus, SocialPlatform } from "@/lib/generated/prisma";

export const bioSchema = z.object({
  tagline: z.string().min(5, "Tagline should be at least 5 characters long").max(80, "Tagline cannot exceed 80 characters").nullable(),
  location: z.string().min(5, "Location should be at least 5 characters long").max(40, "Location cannot exceed 40 characters").nullable(),
  revenue: z.string().min(1, "Revenue should be at least 1 character long").max(20, "Revenue cannot exceed 20 characters").nullable(),
  tag: z.string().min(4, "Tag should be at least 4 characters long").max(40, "Tag cannot exceed 40 characters").nullable(),
});

export const urlSchema = z.object({
  url: z
    .string()
    .regex(/^(https?:\/\/)?(www\.)?(github\.com\/[A-Za-z0-9-._]+|twitter\.com\/[A-Za-z0-9_]+|x\.com\/[A-Za-z0-9_]+|linkedin\.com\/(in|company)\/[A-Za-z0-9-._]+|instagram\.com\/[A-Za-z0-9_.]+|youtube\.com\/(@[A-Za-z0-9._-]+|(c|channel|user)\/[A-Za-z0-9-_]+)|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/i),
  platform: z.enum(Object.values(SocialPlatform) as [string, ...string[]]),
});

export const projectSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").max(25, "Name cannot exceed 25 characters"),
  description: z.string().min(10).max(120).optional(),
  image: z.string().optional(),
  url: z.string().min(4, "Link is required and should be at least 4 characters long"),
  revenue: z.string().min(1).max(20).optional(),
  category: z.enum(Object.values(ProjectCategory) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid category" }),
  }).optional(),
  status: z.enum(Object.values(ProjectStatus) as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid status" }),
  }).optional(),
});
