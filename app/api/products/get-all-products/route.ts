import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { CategoryType } from "@/types";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  // Get pagination parameters
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "10");
  const skip = (page - 1) * limit;

  // Get filter parameters
  const category = params.get("category")
    ? (params.get("category") as CategoryType)
    : undefined;
  const featured = params.get("featured")
    ? params.get("featured") === "true"
    : undefined;

  console.log({ category, featured, page, limit });

  // Validation
  if (!featured && !category) {
    return NextResponse.json(
      {
        message: "Category or featured parameter is required",
        success: false,
      },
      { status: 400 }
    );
  }

  // Build where clause
  const where: any = {};
  if (category) where.category = category;
  if (featured) where.isFeatured = true;

  try {
    // Get total count for pagination
    const total = await prisma.product.count({ where });

    // Get paginated products
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        imageURL: true,
        videoURL: true,
        category: true,
        isFeatured: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc", // or any other sorting you prefer
      },
    });

    return NextResponse.json(
      {
        products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
