import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { projectSchema } from "@/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { ProjectCategory, ProjectStatus } from "@/lib/generated/prisma";

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
  const validated = projectSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({
      success: false,
      message: "Invalid data",
      error: validated.error.format(),
    }, { status: 400 });
  };

  const { name, description, url, category, image, revenue, status } = validated.data;

  await prisma.project.create({
    data: {
      userId,
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
    message: "Project created successfully",
  }, { status: 201 });
};
