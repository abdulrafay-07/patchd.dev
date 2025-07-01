import { useMutation } from "@tanstack/react-query";

import z from "zod";

import { projectSchema } from "@/schema";
import { ApiResponse } from "@/types";

interface UseUpdateProjectProps {
  id: string;
};

export const useUpdateProject = ({
  id,
}: UseUpdateProjectProps) => {
  return useMutation({
    mutationFn: (data: z.infer<typeof projectSchema>) => updateUserProject(data, id),
  });
};

const updateUserProject = async (data: z.infer<typeof projectSchema>, id: string) => {
  const response = await fetch(`/api/profile/project/${id}`, {
    body: JSON.stringify(data),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return await response.json() as ApiResponse;
};