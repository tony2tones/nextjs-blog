import { CloudinaryImage } from "../types/user";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: CloudinaryImage | null;
  };
}

export default async function getBlogPost(blogPostId:string): Promise<BlogPost | null> {
  if (!blogPostId) {
    throw new Error("User ID is required");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!baseUrl) {
    throw new Error("Base URL is not defined");
  }

  try{
    const res = await fetch(`${baseUrl}/api/get-posts/${blogPostId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blog post");
    }
    const data = await res.json();
    console.log("Blog post fetched successfully", data);
    return data;
  }
  catch (error) {
    console.error("Error fetching blog post:", error);
    return null; // Return null or handle the error as needed
  }
}