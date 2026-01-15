import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma.js';
import { verify } from "jsonwebtoken";

import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {

  const cookieStore = cookies();

  const token = (await cookieStore).get('token')?.value;

  if(!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as unknown as {userId: string};

    const { content, postId } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        post : { connect:{id: postId }},
        user: { connect: {id: decoded.userId }}
      },
      include: {
        user: true,
      }
    })

    // Return the saved comment with user info
    return NextResponse.json({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(), // Convert to ISO string for JSON
      user: {
        name: comment.user.name,
        image: comment.user.image,
      }
    }, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({error: 'Failed to create comment'}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }

}