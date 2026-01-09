import { CloudinaryImage } from "@/lib/types/user";
import Image from "next/image";

type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image?: CloudinaryImage | null;
  };
};

type CommentProps = {
  comments: CommentWithUser[];
}

export default function CommentReel({comments}:CommentProps) {
return (
  <div>
  {comments.map((comment => (
  <div key={comment.id}>
    {comment.user.image && (
      <div className="flex items-center gap-2 mb-2">
      <Image
        className="rounded-full" 
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${comment.user.image.version}/${comment.user.image.publicId}.${comment.user.image.format}`}
        alt={comment.user.name}
        width={50}
        height={50}
      />
    <p>{comment.user.name}: {comment.content}</p>
      </div>
    )}
  </div>
  )))}
  </div>
  )
}