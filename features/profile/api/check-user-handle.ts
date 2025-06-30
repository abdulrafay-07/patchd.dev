import { ApiResponse } from "@/types";

export const checkUserHandle = async (handle: string): Promise<ApiResponse> => {
  const response = await fetch(`/api/profile/handle?handle=${handle}`);

  return await response.json() as ApiResponse;
};
