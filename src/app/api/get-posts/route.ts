import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allBlogs = await prisma.post.findMany({
      where: {}
    })
    if(!allBlogs) {
      return new Response(JSON.stringify('No blogs found'), {status : 200})
    }
    
    return new Response(JSON.stringify(allBlogs), {status : 200})
  } catch(error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }

}