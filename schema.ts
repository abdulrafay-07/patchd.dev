import { z } from "zod";

import { SocialPlatform } from "@/lib/generated/prisma";

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
})
  