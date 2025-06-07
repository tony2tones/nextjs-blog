'use client'
import { useEffect, useState } from "react";
import Loader from "./loader";
import Link from "next/link";

type Comment = {
  id: string;
  content:string;
  post:BlogPost;
  postId:string;
  user?:User;
  userId?:string;
  createdAt: Date;
}

type like = {
  id: string;
  post:BlogPost;
  postId:string;
  user:User;
  userId:string;
}

type User = {
  id: string;
  name: string;
  email:string;
  password:string;
  posts:BlogPost[];
  comments: Comment[];
  likes: like[]
}

type BlogPost = {
  id: number;
  title: string;
  content:string;
  author: User;
}

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('api/get-posts');
        const data:BlogPost[] = await response.json();
        setBlogPosts(data)

      }
      catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs();
  }, [])

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to the ideas Blog dawg`zz</h1>
      {loading ? (
        <Loader />
      ) : blogPosts.length > 0 ?  (
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}><h2>Title: {post.title}</h2></Link>
              <h3>Post</h3>
              <p>{post.content.substring(0,40) + '...'}</p>
              <br />
            </li>
          ))}
        </ul>
      ): (
        <p>No blog posts available</p>
      )}
    </div>
    </section>
  );
}
