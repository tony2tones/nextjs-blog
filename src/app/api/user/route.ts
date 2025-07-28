import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = (await (cookieStore))?.get("token")?.value;
  // let userDetails:User | null = null;
  try {

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };

    console.log("Decoded token:", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select : {
          id: true,
          name: true,
          email: true,
          image: true,
        }
    });

    console.log("User details fetched:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('IS THIS SHOWING' ,error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
