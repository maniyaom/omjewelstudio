import { NextRequest, NextResponse } from "next/server";
import {
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import crypto from "crypto";
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
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
      return NextResponse.json(
        {
          message: "fileName and fileType are required",
          success: false,
        },
        { status: 400 }
      );
    }

    // ==================== Azure Configuration ====================
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_CONTAINER_NAME || "omjewelstudio";

    if (!accountName || !accountKey) {
      console.error("Azure credentials not configured");
      return NextResponse.json(
        {
          message: "Internal server error",
          success: false,
        },
        { status: 500 }
      );
    }

    // ==================== Generate Unique Filename ====================
    const fileExtension = fileName.split(".").pop() || "jpg";
    const uniqueFileName = `${crypto
      .randomBytes(16)
      .toString("hex")}.${fileExtension}`;

    // ==================== Create Shared Key Credential ====================
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey
    );

    // ==================== Generate SAS Token ====================
    const sasOptions = {
      containerName,
      blobName: uniqueFileName,
      permissions: BlobSASPermissions.parse("cw"), // create and write
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour expiry
    };

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      sharedKeyCredential
    ).toString();

    // ==================== Construct URLs ====================
    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${uniqueFileName}`;
    const uploadUrl = `${blobUrl}?${sasToken}`;

    return NextResponse.json(
      {
        message: "Upload URL generated successfully",
        success: true,
        data: {
          uploadUrl, // URL with SAS token for uploading
          blobUrl, // Clean URL without SAS token for database storage
          fileName: uniqueFileName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Generate URL error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}