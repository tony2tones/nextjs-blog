import { GetServerSideProps } from "next";

type BlogPost = {
  id: number;
  title: string;
  post:string;
}

export default function blogPostView({post}: {post:BlogPost}) {
  if(!post) return <div>No blog data found.</div>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.post}</p>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async ({params}) => {
  const res = await fetch(`ttp://localhost:3000/api/blog/${params?.id}`);
  const post:BlogPost | null = res.ok ?  await res.json() : null;
  return {
    props: {post},
  }
}