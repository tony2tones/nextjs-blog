'use client'
import { useEffect, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  post:string;
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
      <h1>Welcome to the Blog dawg`zz</h1>
      {loading ? (
        <div>...loading</div>
      ) : blogPosts.length > 0 ?  (
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <h2>Title: {post.title}</h2>
              <h3>Post</h3>
              <p>{post.post}</p>
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
