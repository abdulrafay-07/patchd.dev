import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ handle: string }> },
) {  
  const { handle } = await params;
  
  const profile = await prisma.userProfile.findUnique({
    where: {
      handle,
    },
    include: {
      socialLinks: {
        orderBy: {
          createdAt: "asc",
        },
      },
      projects: true,
      user: true,
    },
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
    fullProfile: profile,
  }, { status: 200 });
}
