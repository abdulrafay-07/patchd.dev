import { useMutation } from "@tanstack/react-query";

import { ApiResponse } from "@/types";

interface UseCreateProfileHandleProps {
  handle: string;
};

export const useCreateProfileHandle = ({
  handle,
}: UseCreateProfileHandleProps) => {
  return useMutation({
    mutationFn: () => createUserProfileHandle(handle),
  });
};

const createUserProfileHandle = async (handle: string) => {
  const response = await fetch(`/api/profile/handle?handle=${handle}`, {
    method: "POST",
  });
  
  return await response.json() as ApiResponse;
};
