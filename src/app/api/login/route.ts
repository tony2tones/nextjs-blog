import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req:Request) {
  try {
    const {email, password} = await req.json();
    const user = await prisma.user.findUnique({
      where: {email},
    })

    if(!user) {
      return NextResponse.json({error: 'Invalid email or password'}, {status: 401});
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
      return NextResponse.json({error: 'Invalid email or password'}, {status:401});
    }
    const token = jwt.sign(
      {userId:user.id, email:user.email},
      process.env.JWT_SECRET!,
      {expiresIn: '7d'}
    )
    const response = NextResponse.json({token}, {status: 200})

     response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

    } catch (error) {
      console.log(error)
      return NextResponse.json({error: 'Something went wrong'}, {status: 500})
    }
  }

