import AddComment from "@/components/addComment";
import CommentReel from "@/components/commentReel";
import { prisma } from "@/lib/prisma";
import Image from 'next/image';
// import placeHolderImage from './public/profile_blank';
// import { notFound } from "next/navigation";

type CloudinaryImage = {
  publicId: string;
  version: string;
  format: string;
  imageId: string;
  userId: string;
};


export default async function BlogPostView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name:true,
          image: true,
        },
      },
      comments: {
        orderBy: {createdAt: 'desc'},
        include: {
          user: {
            select: {
              name:true,
              image:true,
            },
          }
        }
      }
    }
  });

  if (!post) return <div>No data found</div> // Show 404 page if post is missing

  const getImageUrl = (image?: CloudinaryImage | null): string | null => {
  if (!image) return null;
  // const cloud_name = 'dcbvbkyjc';
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${image.version}/${image.publicId}.${image.format}`;
};

  console.log('post: ', post)
  const {title, content, author, comments, image } = post;

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
      <Image 
        src={getImageUrl(image) || '/profile_blank.png'}
        width={200}
        height={200} alt={""}        
        />
    <h2>Author: {author?.name}</h2>
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
    <h2>Comments:</h2>
    <CommentReel comments={comments} />
    <AddComment postId={id}/>
    </section>
  );
}
