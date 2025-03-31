import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";

export default async function BlogPostView({ params }: { params: { id: string } }) {
  const post = await prisma.blog.findUnique({
    where: { id: params.id },
  });

  if (!post) return <div>No data found</div> // Show 404 page if post is missing

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.post}</p>
    </article>
  );
}
