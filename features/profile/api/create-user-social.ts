import { useMutation } from "@tanstack/react-query";

import z from "zod";

import { urlSchema } from "@/schema";
import { ApiResponse } from "@/types";

export const useCreateSocial = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof urlSchema>) => createUserSocial(data),
  });
};

const createUserSocial = async (data: z.infer<typeof urlSchema>) => {
  const response = await fetch("/api/profile/social", {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return await response.json() as ApiResponse;
};
