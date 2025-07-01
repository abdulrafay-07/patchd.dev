import { z } from "zod";

import { ProjectCategory, ProjectStatus, SocialPlatform } from "@/lib/generated/prisma";

export const bioSchema = z.object({
  tagline: z.string().min(5).max(80).nullable(),
  location: z.string().min(5).max(40).nullable(),
  revenue: z.string().min(1).max(20).nullable(),
  tag: z.string().min(4).max(40).nullable(),
});

export const urlSchema = z.object({
  url: z
    .string()
    .regex(/^(https?:\/\/)?(www\.)?(github\.com\/[A-Za-z0-9-._]+|twitter\.com\/[A-Za-z0-9_]+|x\.com\/[A-Za-z0-9_]+|linkedin\.com\/(in|company)\/[A-Za-z0-9-._]+|instagram\.com\/[A-Za-z0-9_.]+|youtube\.com\/(@[A-Za-z0-9._-]+|(c|channel|user)\/[A-Za-z0-9-_]+)|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/i),
  platform: z.enum(Object.values(SocialPlatform) as [string, ...string[]])
});

export const projectSchema = z.object({
  name: z.string().min(2).max(25),
  description: z.string().min(10).max(120).optional(),
  image: z.string().optional(),
  url: z.string().min(4),
  revenue: z.string().min(1).max(20).optional(),
  category: z.enum(Object.values(ProjectCategory) as [string, ...string[]]).optional(),
  status: z.enum(Object.values(ProjectStatus) as [string, ...string[]]).optional(),
});
