import { useMutation } from "@tanstack/react-query";

import z from "zod";

import { projectSchema } from "@/schema";
import { ApiResponse } from "@/types";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof projectSchema>) => createUserProject(data),
  });
};

const createUserProject = async (data: z.infer<typeof projectSchema>) => {
  const response = await fetch("/api/profile/project", {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return await response.json() as ApiResponse;
};