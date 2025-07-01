import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/auth-middleware";

export async function GET(req: NextRequest) {
  const { error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };

  const queryName = req.nextUrl.searchParams.get("handle");
  if (queryName === null || queryName === "") {
    return NextResponse.json({
      success: false,
      message: "Invalid handle",
    }, { status: 400 });
  };

  if (queryName.length < 3) {
    return NextResponse.json({
      success: false,
      message: "Handle must be 3 characters long",
    }, { status: 400 });
  };

  if (queryName.length > 24) {
    return NextResponse.json({
      success: false,
      message: "Handle cannot be greater than 24 characters",
    }, { status: 400 });
  };

  const profile = await prisma.userProfile.findUnique({
    where: {
      handle: queryName,
    },
  });
  if (profile) {
    return NextResponse.json({
      success: false,
      message: "Profile with this handle already exists",
    }, { status: 200 });
  };

  return NextResponse.json({
    success: true,
    message: `${queryName} is available`,
  }, { status: 200 });
};

export async function POST(req: NextRequest) {
  const { data, error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };
  const userId = data.user.id;

  const queryName = req.nextUrl.searchParams.get("handle");
  if (queryName === null || queryName === "") {
    return NextResponse.json({
      success: false,
      message: "Invalid handle",
    }, { status: 400 });
  };

  const existingProfile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });
  if (existingProfile) {
    return NextResponse.json({
      success: false,
      message: "Profile already exists",
    }, { status: 400 });
  };

  await prisma.userProfile.create({
    data: {
      userId,
      handle: queryName,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Profile handle created successfully!",
  }, { status: 200 });
};
