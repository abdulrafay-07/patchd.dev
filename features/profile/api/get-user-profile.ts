import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/types";

interface useGetUserProfileProps {
  userId: string;
};

export const useGetUserProfile = ({
  userId,
}: useGetUserProfileProps) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
  });
};

const getUserProfile = async (userId: string): Promise<ApiResponse> => {
  const response = await fetch(`/api/profile/${userId}`);
  
  return await response.json() as ApiResponse;
};
