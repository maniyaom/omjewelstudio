import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { comparePassword } from "@/lib/auth/hash";
import {
  generateJWTAccessToken,
  generateJWTRefreshToken,
} from "@/lib/auth/jwt";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email.trim();
  const password = body.password;
  if (!email || !password) {
    return NextResponse.json(
      {
        message: "All fields are required",
        success: false,
      },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Incorrect email or password",
          success: false,
        },
        {
          status: 401,
        }
      );
    }
    const passwordComparison = await comparePassword(password, user.password);
    if (passwordComparison === false) {
      return NextResponse.json(
        {
          message: "Incorrect email or password",
          success: false,
        },
        { status: 401 }
      );
    } else if (passwordComparison === true) {
      const accessToken = generateJWTAccessToken({
        id: user.id,
        email: user.email,
      });
      const refreshToken = generateJWTRefreshToken(user.id);
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
        },
      });
      return NextResponse.json(
        {
          message: "Login successful",
          data: {
            accessToken,
            refreshToken,
          },
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
