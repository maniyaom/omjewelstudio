import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { verifyJWTAccessToken } from "@/lib/auth/jwt";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    // ==================== Authentication ====================
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Token is required", success: false },
        { status: 401 }
      );
    }
    await verifyJWTAccessToken(token);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired access token", success: false },
      { status: 401 }
    );
  }

  try {
    // ==================== Parse Request Body ====================
    const body = await req.json();
    const {
      productName,
      productCategory,
      fileName,
      blobUrl,
      isFeatured,
      isVideo,
    } = body;

    // ==================== Validation ====================
    if (!productName || !productCategory || !fileName || !blobUrl) {
      return NextResponse.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }

    // ==================== Create Product in Database ====================
    const product = await prisma.product.create({
      data: {
        name: productName,
        fileName: fileName,
        imageURL: isVideo ? null : blobUrl,
        videoURL: isVideo ? blobUrl : null,
        category: productCategory,
        isFeatured: isFeatured || false,
      },
    });

    console.log("Product created successfully:", product.id);

    return NextResponse.json(
      {
        message: "Product added successfully",
        success: true,
        data: {
          productId: product.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}