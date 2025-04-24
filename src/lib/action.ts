"use server";
import { prisma } from "./prisma";

export default async function handleSubmit(formData: {title: string, content:string}) {
  try {
    const newPost = await prisma.post.create({
      data:{
        title: formData.title,
        content: formData.content,
        
      }
    })
    return { success: true, post: newPost };
  }
      catch(error) {
        console.log(error)
      }
  return {success: false, error: 'Failed to create post...sorry'}
}