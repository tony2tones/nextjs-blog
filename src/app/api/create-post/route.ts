import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingBlogs = await prisma.blog.findFirst();

    if(!existingBlogs) {
      await prisma.blog.create({
        data: {
          title: 'Welcome to the blog',
          post:'This is the first automatically seeded blog post.'
        },
      });
    }

    const newPost = await prisma.blog.create({
      data: {
        title: body.title,
        post: body.post
      },
    });
    return new Response(JSON.stringify(newPost), {status: 201});
  } catch (error) {
    console.log('Error creating post', error);
    return new Response("Failed to create post", {status:500})
  } finally {
    await prisma.$disconnect();
  }
}