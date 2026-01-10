'use client'
import { useState } from "react";
import { useUser } from "@/lib/context/userContext";
import Image from 'next/image';
import toast from "react-hot-toast";
import { createComment } from "@/lib/action";

type AddCommentProps = {
  postId: string;
};

const AddComment = ({postId}: AddCommentProps) => {
  const [comment, setComment] = useState('')
  const { user } = useUser();

  function handleCommentInput(e:React.ChangeEvent< HTMLTextAreaElement>) {
    e.preventDefault();
    setComment(e.target.value)
  }

  const handleCreateComment = async (formData: FormData) => {
    formData.append('postId', postId)
    formData.append('content', comment);
    const response = await createComment(formData);
    if(response.success) {
      toast('Comment has been successfully added');
      setComment('')
    } else {
      toast(response.message || 'Failed to add comment')
    }
  }

    return (
        <form action={handleCreateComment} className="bg-slate-900" >
          <section className="flex flex-col gap-4 p-4 rounded-md">
            <div className="flex justify-evenly">
              <div className="flex justify-center items-center border-black rounded-3xl">
                <Image 
                  src={user?.image ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${user?.image?.version}/${user?.image?.publicId}.${user?.image?.format}` : '/profile_blank.png'}
                  alt={'user profile image'}  
                  objectFit="cover"
                  className="rounded-full"
                  height={150}
                  width={150}
                  />
              </div>
              <div>
              <h2 className="font-semibold">Add comment?</h2>
              <label htmlFor="comment" className="sr-only">Comment</label>
              <textarea 
                className="p-2 border rounded-md w-full" 
                id="comment" 
                name="comment" 
                typeof="text"
                rows={3}
                cols={30}
                value={comment} 
                placeholder="Add a comment " 
                onChange={handleCommentInput}
                />
              <button type="submit">Add comment</button>
              </div>
            </div>
          </section>
        </form>
    )
  }

export default AddComment;