import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies(); // no await here
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const { title, content } = await req.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: decoded.userId },
        },
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({ success: true, post: newPost });

  } catch (error) {
    console.error('Error creating post:', error);
    return new Response("Failed to create post", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
