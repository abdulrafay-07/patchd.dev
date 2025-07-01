import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { urlSchema } from "@/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { SocialPlatform } from "@/lib/generated/prisma";

export async function POST(req: NextRequest) {
  const { data, error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };
  const userId = data.user.id;

  const body = await req.json();
  const validated = urlSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({
      success: false,
      message: "Invalid data",
      error: validated.error.format(),
    }, { status: 400 });
  };

  const { platform, url } = validated.data;

  const socialLink = await prisma.socialLink.findUnique({
    where: {
      userId,
      platform: platform as SocialPlatform,
    },
  });

  // Social already exists, update it
  if (socialLink) {
    await prisma.socialLink.update({
      where : {
        userId,
        platform: platform as SocialPlatform,
      },
      data: {
        url,
      },
    });

    return NextResponse.json({
      success: true,
      message: "URL updated successfully",
    }, { status: 200 });
  };

  await prisma.socialLink.create({
    data: {
      url,
      userId,
      platform: platform as SocialPlatform,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Social created successfully",
  }, { status: 200 });
};
