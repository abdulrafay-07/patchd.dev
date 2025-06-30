import { UserProfile } from "@/lib/generated/prisma";

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
  error?: string;
};
