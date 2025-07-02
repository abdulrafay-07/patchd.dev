import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/types";

interface useGetProfileByHandleProps {
  handle: string;
};

export const useGetProfileByHandle = ({
  handle,
}: useGetProfileByHandleProps) => {
  return useQuery({
    queryKey: ["profile", handle],
    queryFn: () => getUserProfile(handle),
  });
};

const getUserProfile = async (handle: string): Promise<ApiResponse> => {
  const response = await fetch(`/api/profile/handle/${handle}`);
  
  return await response.json() as ApiResponse;
};
