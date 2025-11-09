import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      {
        message: "Product ID is required",
        success: false,
      },
      { status: 400 }
    );
  }
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        message: "Product deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          message: "Product not found",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
