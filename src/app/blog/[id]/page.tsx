import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";

export default async function BlogPostView({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {name:true}
      }
    }
  });

  const {title, content, author} = post;

  if (!post) return <div>No data found</div> // Show 404 page if post is missing

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
    <h2>{author?.name}</h2>
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
    </section>
  );
}
