import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";

export default async function BlogPostView({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) return <div>No data found</div> // Show 404 page if post is missing

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
    </section>
  );
}
