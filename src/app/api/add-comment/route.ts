import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'; 
import jwt from 'jsonwebtoken';

export async function POST(req:Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if(!token) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string}

    const { postId, content } = await req.json();

    if(!postId || !content) {
      return NextResponse.json({error: 'fields are missing'}, {status: 400})
    }
    const newComment = await prisma.comment.create({
      data: {
        content,
        post : {
          connect:{postId}
        },
        user: {
          connect: {id: decoded.userId}
        }
      },
      include: {
        user:true,
      }
    });
    return NextResponse.json({success:true, comment:newComment})
  }
  catch(error) {
    console.log(error);
    return new Response('Failed to add comment',{status: 500})
  } finally {
    await prisma.$disconnect()
  }
}
