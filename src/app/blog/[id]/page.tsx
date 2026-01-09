import AddComment from "@/components/addComment";
import { BlogView } from "@/components/blogView";
import CommentReel from "@/components/commentReel";
import getBlogComments from "@/lib/services/getBlogComments";
import GetBlogPost from "@/lib/services/getBlogPost";

export default async function BlogPostView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const comments = await getBlogComments(id);
  const blogPost = await GetBlogPost(id);
  if (!blogPost) return <div>No data found</div>; // Show 404 page if post is missing

  if (!comments || comments.length === 0) return <div>No data found</div> // Show 404 page if post is missing
  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
      <div className="gap-2">
     <BlogView id={id} /> 
    <h2>Comments:</h2>
    <CommentReel comments={comments} />
    <AddComment postId={id}/>
    </div>
    </section>
  );
}
