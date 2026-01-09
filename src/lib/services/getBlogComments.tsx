import { prisma } from "../prisma";
import { CloudinaryImage } from "../types/user";

type User = {
  id: string;
  name: string;
  image?: CloudinaryImage
};
type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  user: User;
}

const getBlogComments = async (postId: string): Promise<Comment[] | []> => {
  if (!postId) {
    throw new Error("Post ID is required");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  console.log("Post comments fetched:", post);

  if (!post) {
    return []; // Return an empty array if no post is found
  }

  // Map comments to your desired shape
  return post.comments.map((c: Comment) => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt,
    user: {
      id: c.user.id,
      name: c.user.name,
      image: c.user.image,
    },
  }));
};

export default getBlogComments;