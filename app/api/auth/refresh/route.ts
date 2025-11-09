import { NextResponse, NextRequest } from "next/server";
import prisma from "@/config/prisma";
import {
  generateJWTAccessToken,
  generateJWTRefreshToken,
  verifyJWTRefreshToken,
} from "@/lib/auth/jwt";
export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();
  console.log(refreshToken);
  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "Refresh token is required",
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    const decoded = await verifyJWTRefreshToken(refreshToken);
    if (decoded) {
      const data = await prisma.refreshToken.findUnique({
        where: {
          token: refreshToken,
        },
        select: {
          token: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      if (!data) {
        return NextResponse.json(
          {
            message: "Invalid or expired refresh token",
            success: false,
          },
          { status: 401 }
        );
      }

      const newAccessToken = generateJWTAccessToken({
        id: data?.user?.id as string,
        email: data?.user?.email as string,
      });

      const newRefreshToken = generateJWTRefreshToken(data?.user?.id as string);

      await prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: data?.user?.id as string,
        },
      });
      return NextResponse.json(
        {
          message: "Access token refreshed successfully",
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log("msg", error.message);
    return NextResponse.json(
      {
        message: "Invalid or expired refresh token",
        success: false,
      },
      { status: 401 }
    );
  }
}
