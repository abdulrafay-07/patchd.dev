import { useMutation } from "@tanstack/react-query";

import z from "zod";

import { bioSchema } from "@/schema";
import { ApiResponse } from "@/types";

export const useCreateBio = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof bioSchema>) => createUserProfileHandle(data),
  });
};

const createUserProfileHandle = async (data: z.infer<typeof bioSchema>) => {
  const response = await fetch("/api/profile/bio", {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return await response.json() as ApiResponse;
};