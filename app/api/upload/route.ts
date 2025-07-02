import { NextResponse, NextRequest } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const { file } = await req.json();

  if (!file) {
    return NextResponse.json({
      success: false,
      message: "No image found",
    }, { status: 400 });
  };

  try {
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: "patchd"
    });

    return NextResponse.json({
      success: true,
      message: "Image uploaded",
      url: uploadRes.secure_url,
    }, { status: 200 });
  } catch (error) {
    console.error("Cloudinary upload failed", error);

    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  };
};
