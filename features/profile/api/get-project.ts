import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/types";

interface useGetProjectProps {
  id: string | null;
};

export const useGetProject = ({
  id,
}: useGetProjectProps) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getUserProject(id),
  });
};

const getUserProject = async (id: string | null): Promise<ApiResponse> => {
  if (!id) return {
    success: false,
    message: "No Project ID",
  };

  const response = await fetch(`/api/profile/project/${id}`);
  
  return await response.json() as ApiResponse;
};
