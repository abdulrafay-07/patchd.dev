import { Project, SocialLink, User, UserProfile } from "@/lib/generated/prisma";

export type UserProfileWithRelations = UserProfile & {
  socialLinks: SocialLink[];
  projects: Project[];
};

export type UserProfileWithAllRelations = UserProfile & {
  socialLinks: SocialLink[];
  projects: Project[];
  user: User;
};

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: UserProfileWithRelations | null;
  fullProfile?: UserProfileWithAllRelations | null;
  project?: Project;
  error?: string;
  url?: string;
};
