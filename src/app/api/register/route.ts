import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
  try {
    const {name, email, password} = await req.json();

    const existingUser = await prisma.user.findUnique({where: email});
    if(existingUser) {
      return NextResponse.json({error: 'User already exists'}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data:{name,email, password: hashedPassword},
    });

    return NextResponse.json({message: 'User created successfully',user}, {status: 201});


  } catch(error) {
    console.log(error);
    return NextResponse.json({error: 'Error creating user'}, {status: 500})
  }
}