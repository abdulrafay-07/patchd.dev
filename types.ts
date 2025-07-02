import { Project, SocialLink, UserProfile } from "@/lib/generated/prisma";

export type UserProfileWithRelations = UserProfile & {
  socialLinks: SocialLink[];
  projects: Project[];
};

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: UserProfileWithRelations | null;
  project?: Project;
  error?: string;
  url?: string;
};
