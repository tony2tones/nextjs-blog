"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { cookies } from 'next/headers';
import jwt, {JwtPayload} from 'jsonwebtoken';

// Define your JWT payload type
interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

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

export async function createComment(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if(!token) {
      return { success: false, message: 'Unauthorized' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as CustomJwtPayload;

    const postId = formData.get('postId') as string;
    const content = formData.get('content') as string;

    const newComment = await prisma.comment.create({
      data: {
        content,
        post : { connect:{id: postId }},
        user: { connect: {id: decoded.userId }}
      },
      include: {
        user: true,
      }
    })

    // Revalidate any pages that display posts
    revalidatePath(`/blog/${postId}`); // adjust path as needed

    return { success: true, post: newComment };

    } catch (error) {
    console.error('Error creating comment:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, message: 'Invalid token' };
    }
    return { success: false, message: 'Failed to create comment' };
  } finally {
    await prisma.$disconnect();
  }
}
