import { z } from "zod";

export const bioSchema = z.object({
  tagline: z.string().min(5).max(80).nullable(),
  location: z.string().min(5).max(40).nullable(),
  revenue: z.string().min(1).max(20).nullable(),
  tag: z.string().min(4).max(40).nullable(),
});
