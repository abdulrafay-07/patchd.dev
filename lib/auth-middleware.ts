import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "./auth";

export const authMiddleware = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data?.session || !data.user) {
    return {
      data: null,
      error: {
        success: false,
        message: "Unauthorized",
      },
    };
  };

  if (data?.session?.expiresAt && new Date(data.session.expiresAt).getTime() < Date.now()) {
    return {
      data: null,
      error: {
        success: false,
        message: "Session is expired",
      },
    };
  };

  return {
    data,
    error: null,
  };
};
