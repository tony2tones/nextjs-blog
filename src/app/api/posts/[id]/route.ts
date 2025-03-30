import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, {params}: {params: {id:string}}) {
  try {
    const post = await prisma.blog.findUnique({
      where: {id: params.id}
  })
  if(!post) return new NextResponse(JSON.stringify("No post found"));
  return NextResponse.json(post)

} catch(error) {
  console.log(error)
  return new NextResponse(JSON.stringify(`We have found the post ${error}`))
}
}