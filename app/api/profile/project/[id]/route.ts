import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { projectSchema } from "@/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { ProjectCategory, ProjectStatus } from "@/lib/generated/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { data, error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };
  const userId = data.user.id;
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!project) {
    return NextResponse.json({
      success: false,
      message: "No project found",
    }, { status: 200 });
  };
  
  return NextResponse.json({
    success: true,
    message: "Project found",
    project,
  }, { status: 200 });
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { data, error } = await authMiddleware();

  if (error != null) {
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: 401 });
  };
  const userId = data.user.id;

  const body = await req.json();
  const validated = projectSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({
      success: false,
      message: "Invalid data",
      error: validated.error.format(),
    }, { status: 400 });
  };

  const { id } = await params;
  const { name, description, url, category, image, revenue, status } = validated.data;

  const project = await prisma.project.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
      url,
      category: category as ProjectCategory,
      description,
      image,
      revenue,
      status: status as ProjectStatus,
    },
  });

  return NextResponse.json({
    success: false,
    message: "Project updated successfully",
    project,
  }, { status: 200 });
};
