import AddComment from "@/components/addComment";
import CommentReel from "@/components/commentReel";
import { prisma } from "@/lib/prisma";
import Image from 'next/image';

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
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${image.version}/${image.publicId}.${image.format}`;
};

const {title, content, author, comments } = post;
const authorProfileImage = author?.image;

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16">
      <div className="flex gap-2">
      <Image 
        src={getImageUrl(authorProfileImage) || '/profile_blank.png'}
        width={200}
        height={200} 
        alt={title}        
        />
    <h2>Author: {author?.name}</h2>
    </div>
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
