import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/auth-middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { data, error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };
  const userIdFromSession = data.user.id;
  
  const { userId } = await params;

  if (userId !== userIdFromSession) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized",
    }, { status: 401 });
  };
  
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId: userIdFromSession,
    },
    include: {
      socialLinks: true,
      projects: true,
    }
  });

  if (!profile) {
    return NextResponse.json({
      success: false,
      message: "No profile found",
    }, { status: 200 });
  };

  return NextResponse.json({
    success: true,
    message: "Profile found successfully",
    data: profile,
  }, { status: 200 });
}
