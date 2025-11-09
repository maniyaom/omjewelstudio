import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import crypto from "crypto";
import prisma from "@/config/prisma";
import { verifyJWTAccessToken } from "@/lib/auth/jwt";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
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
    // ==================== Parse FormData ====================
    const formData = await req.formData();

    // Extract all fields at once
    const productName = formData.get("productName") as string;
    const productCategory = formData.get("productCategory") as string;
    const productMedia = formData.get("productMedia") as File | null;
    const isFeaturedValue = formData.get("isFeatured");
    const isFeatured = isFeaturedValue === "true";
    const mediaType = formData.get("mediaType") as string;

    // ==================== Validation ====================
    if (!productName || !productMedia || !productCategory) {
      return NextResponse.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }

    // Validate that productMedia is a File
    if (!(productMedia instanceof File)) {
      return NextResponse.json(
        {
          message: "Invalid file",
          success: false,
        },
        { status: 400 }
      );
    }

    // ==================== File Upload to Azure ====================
    // Convert File to Buffer
    const bytes = await productMedia.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Azure Blob Storage setup
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_CONTAINER_NAME || "omjewelstudio";

    if (!connectionString) {
      console.error("Azure connection string not configured");
      return NextResponse.json(
        {
          message: "Internal server error",
          success: false,
        },
        { status: 500 }
      );
    }

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate unique filename with extension
    const fileExtension =
      productMedia.name.split(".").pop() ||
      (productMedia.type.startsWith("video") ? "mp4" : "jpg");
    const fileName = `${crypto
      .randomBytes(16)
      .toString("hex")}.${fileExtension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    console.log("Uploading file:", fileName);

    // Upload to Azure Blob Storage
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: productMedia.type,
      },
    });

    // Get the blob URL
    const blobUrl = blockBlobClient.url;

    if (!blobUrl) {
      console.error("Failed to upload file to Azure");
      return NextResponse.json(
        {
          message: "Failed to upload file",
          success: false,
        },
        { status: 500 }
      );
    }

    console.log("File uploaded successfully:", blobUrl);

    const isVideo =
      mediaType === "video" || productMedia.type.startsWith("video");

    console.log("Creating product in database:", {
      name: productName,
      fileName,
      category: productCategory,
      isFeatured,
      isVideo,
    });

    const product = await prisma.product.create({
      data: {
        name: productName,
        fileName: fileName,
        imageURL: isVideo ? null : blobUrl,
        videoURL: isVideo ? blobUrl : null,
        category: productCategory,
        isFeatured: isFeatured,
      },
    });

    console.log("Product created successfully:", product.id);

    const response = NextResponse.json(
      {
        message: "Product added successfully",
        success: true,
        data: {
          productId: product.id,
        },
      },
      { status: 201 }
    );

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
