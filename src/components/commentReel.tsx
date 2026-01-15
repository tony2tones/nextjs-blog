'use client';
import { CloudinaryImage } from "@/lib/types/user";
import { getCloudinaryImageUrl } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";

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
  const memoedComments = useMemo(() => [...comments].sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime()), [comments]);

  const formatDate = (date: Date) => {
    // Use ISO date parts to avoid timezone issues between server/client
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(date));
  };

  return (
    <div>
      {memoedComments.map((comment) => {
        const imageUrl = getCloudinaryImageUrl(comment.user.image);
        return (
          <div key={comment.id}>
            <div className="flex justify-between items-center gap-2 mb-2 bg-slate-900 rounded-3xl p-2">
              <div className="flex gap-4">
                <Image
                  className="rounded-full"
                  src={imageUrl}
                  alt={comment.user.name}
                  width={50}
                  height={50}
                />
                <p>{comment.user.name}: {comment.content}</p>
              </div>
              <div className="text-white">{formatDate(comment.createdAt)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}