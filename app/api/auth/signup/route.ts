import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { hashPassword } from "@/lib/auth/hash";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email.trim();
  const { password, secretCode } = body;
  if (!email || !password || !secretCode) {
    return NextResponse.json(
      {
        message: "All fields are required",
        success: false,
      },
      { status: 400 }
    );
  }
  if (secretCode !== process.env.SIGNUP_SECRET_CODE) {
    console.log(secretCode);
    return NextResponse.json(
      {
        message: "Incorrect secret code",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Signup successful",
        data: [],
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      console.log(error);
      return NextResponse.json(
        {
          message: "User already exists with this email",
          success: false,
        },
        { status: 409 }
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