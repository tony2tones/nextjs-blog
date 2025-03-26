import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingBlogs = await prisma.blog.findFirst();
  if(!existingBlogs) {
    await prisma.blog.create({
      data: {
        title: 'First blog post',
        post: 'This blog post was seeded because the database was empty'
      },
    });
  } else {
    console.log('Database already contains blog posts, skipping seed.');
  }
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
})