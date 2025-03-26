import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received POST request:", body);
    if (!body.title || !body.post) {
      console.error("Validation failed: Missing title or post");
      return NextResponse.json({ error: "Title and post are required" }, { status: 400 });
    }

    const newPost = await prisma.blog.create({
      data: {
        title: body.title,
        post: body.post,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error); // Log detailed error
    return NextResponse.json({ error: "Failed to create post", details: error }, { status: 500 });
  }
}
