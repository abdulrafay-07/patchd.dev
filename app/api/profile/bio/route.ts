import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { bioSchema } from "@/schema";
import { authMiddleware } from "@/lib/auth-middleware";

export async function POST (req: NextRequest) {
  const { data, error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };
  const userId = data.user.id;

  const body = await req.json();
  const validated = bioSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({
      success: false,
      message: "Invalid data",
      error: validated.error.format(),
    }, { status: 400 });
  };

  const { location, revenue, tag, tagline } = validated.data;

  await prisma.userProfile.update({
    where: {
      userId,
    },
    data: {
      tagline,
      tag,
      revenue,
      location,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Bio updated successfully",
  }, { status: 200 })
};
