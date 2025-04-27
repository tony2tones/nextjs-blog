import AddComment from "@/components/addComment";
import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";


type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
  };
};

export default async function BlogPostView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {name:true}
      },
      comments: {
        orderBy: {createdAt: 'desc'},
        include: {
          user: {
            select: {name:true}
          }
        }
      }
    }
  });

  if (!post) return <div>No data found</div> // Show 404 page if post is missing

  const {title, content, author, comments} = post;


  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
    <h2>{author?.name}</h2>
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
    {comments.map((comment:CommentWithUser) => (
  <div key={comment.id}>
    <p>{comment.user.name}: {comment.content}</p>
  </div>
))}

    <AddComment postId={id}/>
    </section>
  );
}
