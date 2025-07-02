import { useMutation } from "@tanstack/react-query";

import { ApiResponse } from "@/types";

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUserProject(id),
  });
};

const deleteUserProject = async (id: string) => {
  const response = await fetch(`/api/profile/project/${id}`, {
    body: JSON.stringify(id),
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return await response.json() as ApiResponse;
};
