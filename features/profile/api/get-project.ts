import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/types";

interface useGetProjectProps {
  id: string;
};

export const useGetProject = ({
  id,
}: useGetProjectProps) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getUserProject(id),
  });
};

const getUserProject = async (id: string): Promise<ApiResponse> => {
  const response = await fetch(`/api/profile/project/${id}`);
  
  return await response.json() as ApiResponse;
};
