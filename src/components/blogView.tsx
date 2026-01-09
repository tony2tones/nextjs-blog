'use client';
import { useUser } from "@/lib/context/userContext";
import getBlogPost from "@/lib/services/getBlogPost";
import { CloudinaryImage } from "@/lib/types/user";
import Image from 'next/image';
import { useEffect, useState } from "react";

type BlogId = {
  id:string;
}

type BlogPostProps = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: CloudinaryImage | null;
};
};

export function BlogView({id}: BlogId) {
  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  const [blogPost, setBlogPost] = useState<BlogPostProps | null>(null);

  useEffect(() => {
    setLoading(true);
    async function fetchBlogPost() {
    const blogPost = await getBlogPost(id);
    if (!blogPost) {
      console.error("Blog post not found");
    }
    setBlogPost(blogPost);
    setLoading(false);
  }
    fetchBlogPost();
    console.log("Blog post fetched successfully:", blogPost);
  },[]);

  if(!blogPost) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  const { title, content, author, } = blogPost || {};
  if (!user) return <div>No user data found</div>; // Show 404 page if user is missing
  if (!author) return <div>No author found</div>; // Show 404 page if author is missing
  if (!title || !content) return <div>No blog post data found</div>; // Show 404 page if post is missing
  console.log("Blog post data:", blogPost);
  console.log("Blog post data:", blogPost.author.image);

  const getImageUrl = (image?: CloudinaryImage | null): string | null => {
  if (!image) return null;
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${image.version}/${image.publicId}.${image.format}`;
};

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
      {loading ? (<div>Loading...</div>) : (
        <>  
        <div className="flex gap-2">
                  <Image 
                    src={getImageUrl(author?.image) || '/profile_blank.png'}
                    width={200}
                    height={200} 
                    alt={`Profile image of ${author?.name || 'Anonymous'}`}
                    className="rounded-full object-cover"
                    style={{ width: '200px', height: '200px' }}
                    priority        
                    />
                <h2>Author: {author?.name}</h2>
                </div>
                <article>
                  <h2>{title}</h2>
                  <p>{content}</p>
                </article>
        </>
      )}
      </section>
          
  );  
      };