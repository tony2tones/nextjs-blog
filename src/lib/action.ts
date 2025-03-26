"use server";
import { prisma } from "./prisma";

export default async function handleSubmit(formData: {title: string, post:string}) {
  try {
    console.log(formData)
    const newPost = await prisma.blog.create({
      data:{
        title: formData.title,
        post: formData.post,
      }
    })
    return { success: true, post: newPost };
  }
      catch(error) {
        console.log(error)
      }
  return {success: false, error: 'Failed to create post...sorry'}
}