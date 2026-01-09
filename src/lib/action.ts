"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function handleSubmit(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const newPost = await prisma.post.create({
      data:{
        title: title,
        content: content,
      }
    })
    revalidatePath('/');
    return { success: true, post: newPost };
  }
    catch(error) {
      console.log(error)
      return {success: false, error: 'Failed to create post...sorry'}
    }
}

export async function createPost(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { success: false, error: 'Unauthorized' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return { success: false, error: 'Title and content are required' };
    }

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

    // Revalidate any pages that display posts
    revalidatePath('/posts'); // adjust path as needed
    revalidatePath('/');

    return { success: true, post: newPost };

  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: 'Failed to create post' };
  } finally {
    await prisma.$disconnect();
  }
}

