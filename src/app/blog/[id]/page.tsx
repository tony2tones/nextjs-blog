// Your page component
// 'use client';

import CommentSection from "@/components/CommentSection";
import { BlogView } from "@/components/blogView";
import getBlogComments from "@/lib/services/getBlogComments";
import GetBlogPost from "@/lib/services/getBlogPost";
import { getCurrentUser } from "@/lib/services/getCurrentUser";

export default async function BlogPostView({ params }: { params: Promise<{ id: string }> }) {
  console.log("BlogPostView params:", params);
  const { id } = await params;

  const [comments, blogPost, currentUser] = await Promise.all([
    getBlogComments(id),
    GetBlogPost(id),
    getCurrentUser(),
  ]);

  if (!blogPost) return <div>No data found</div>;

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
      <div className="gap-2">
        <BlogView id={id} />
        <CommentSection
          initialComments={comments || []}
          postId={id}
          currentUser={currentUser || { name: 'Guest' }}
        />
      </div>
    </section>
  );
}